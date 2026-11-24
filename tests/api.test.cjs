// API tests — run with `npm test` (Node's built-in test runner, no dependencies).
// External services (Telegram, Google tokeninfo, Upstash Redis) are replaced with an in-memory fake fetch.

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const API = path.join(__dirname, '..', 'api');
const CLIENT_ID = '727188971518-ijvkthta20eqaoo8rcl4mvvu4jkab565.apps.googleusercontent.com';

// ---------- fakes ----------

let calls = [];
let redisHash = new Map();
let redisCounters = new Map();
let telegramStatus = 200;
let tokenInfo = null;

function fakeFetch(url, opts = {}) {
  url = String(url);
  calls.push({ url, opts });
  const json = (status, body) => Promise.resolve({ ok: status < 400, status, json: async () => body, text: async () => JSON.stringify(body) });

  if (url.startsWith('https://api.telegram.org/')) {
    return telegramStatus === 200 ? json(200, { ok: true }) : json(telegramStatus, { ok: false, description: "Bad Request: can't parse entities" });
  }
  if (url.startsWith('https://oauth2.googleapis.com/tokeninfo')) {
    return tokenInfo ? json(200, tokenInfo) : json(400, { error: 'invalid_token' });
  }
  if (url.startsWith('https://redis.test')) {
    const [cmd, key, ...args] = JSON.parse(opts.body);
    switch (cmd) {
      case 'HSET': redisHash.set(args[0], args[1]); return json(200, { result: 1 });
      case 'HGET': return json(200, { result: redisHash.get(args[0]) ?? null });
      case 'HGETALL': return json(200, { result: [...redisHash].flat() });
      case 'HDEL': return json(200, { result: redisHash.delete(args[0]) ? 1 : 0 });
      case 'DEL': redisHash.clear(); return json(200, { result: 1 });
      case 'INCR': { const n = (redisCounters.get(key) || 0) + 1; redisCounters.set(key, n); return json(200, { result: n }); }
      case 'EXPIRE': return json(200, { result: 1 });
      default: return json(400, { error: 'unknown command' });
    }
  }
  throw new Error('Unexpected fetch: ' + url);
}

function mockRes() {
  const res = { statusCode: 200, headers: {}, body: undefined };
  res.status = (c) => { res.statusCode = c; return res; };
  res.json = (b) => { res.body = b; return res; };
  res.setHeader = (k, v) => { res.headers[k.toLowerCase()] = v; };
  return res;
}

async function call(name, { method = 'GET', body, query = {}, cookie, ip = '1.1.1.1' } = {}) {
  const handler = require(path.join(API, name));
  const res = mockRes();
  await handler({ method, body, query, headers: { cookie, 'x-forwarded-for': ip } }, res);
  return res;
}

function sessionCookie(res) {
  return String(res.headers['set-cookie'] || '').split(';')[0];
}

function reset({ storage = true, tg = true } = {}) {
  calls = [];
  redisHash = new Map();
  redisCounters = new Map();
  telegramStatus = 200;
  tokenInfo = null;
  global.fetch = fakeFetch;
  for (const k of ['KV_REST_API_URL', 'KV_REST_API_TOKEN', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID']) delete process.env[k];
  if (storage) { process.env.KV_REST_API_URL = 'https://redis.test'; process.env.KV_REST_API_TOKEN = 't'; }
  if (tg) { process.env.TELEGRAM_BOT_TOKEN = '123:abc'; process.env.TELEGRAM_CHAT_ID = '42'; }
  process.env.SESSION_SECRET = 'test-secret-that-is-long-enough';
  process.env.ADMIN_EMAILS = 'admin@example.com, Second@Example.com';
}

const telegramCalls = () => calls.filter((c) => c.url.startsWith('https://api.telegram.org/'));

// ---------- send-order ----------

test('order with "_" and "*" in contact reaches Telegram (the original bug)', async () => {
  reset();
  const res = await call('send-order', { method: 'POST', body: { project: 'Shop <script> & *bold*', contact: '@ivan_petrenko', locale: 'uk' } });
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.ok, true);
  const [tg] = telegramCalls();
  const payload = JSON.parse(tg.opts.body);
  assert.equal(payload.parse_mode, 'HTML');
  assert.match(payload.text, /@ivan_petrenko/);
  assert.match(payload.text, /Shop &lt;script&gt; &amp; \*bold\*/);
  assert.equal(redisHash.size, 1, 'order is stored');
});

test('order is accepted when only storage works', async () => {
  reset({ tg: false });
  const res = await call('send-order', { method: 'POST', body: { contact: 'a@b.co' } });
  assert.equal(res.statusCode, 200);
  assert.equal(redisHash.size, 1);
});

test('order is accepted when Telegram fails but storage works', async () => {
  reset();
  telegramStatus = 400;
  const res = await call('send-order', { method: 'POST', body: { contact: 'a@b.co' } });
  assert.equal(res.statusCode, 200);
  assert.equal(redisHash.size, 1);
});

test('client gets an error when no channel delivered the order', async () => {
  reset({ storage: false });
  telegramStatus = 400;
  const res = await call('send-order', { method: 'POST', body: { contact: 'a@b.co' } });
  assert.equal(res.statusCode, 502);
  assert.equal(res.body.error, 'delivery_failed');
});

test('client gets an error when nothing is configured', async () => {
  reset({ storage: false, tg: false });
  const res = await call('send-order', { method: 'POST', body: { contact: 'a@b.co' } });
  assert.equal(res.statusCode, 502);
});

test('validation: missing contact, too long, wrong method, missing body', async () => {
  reset();
  assert.equal((await call('send-order', { method: 'POST', body: { project: 'x' } })).statusCode, 400);
  assert.equal((await call('send-order', { method: 'POST', body: { contact: 'x'.repeat(201) } })).statusCode, 400);
  assert.equal((await call('send-order', { method: 'POST', body: { contact: 'a', project: 'x'.repeat(2001) } })).statusCode, 400);
  assert.equal((await call('send-order', { method: 'GET' })).statusCode, 405);
  assert.equal((await call('send-order', { method: 'POST', body: undefined })).statusCode, 400);
});

test('honeypot submissions are silently dropped', async () => {
  reset();
  const res = await call('send-order', { method: 'POST', body: { contact: 'bot', website: 'http://spam' } });
  assert.equal(res.statusCode, 200);
  assert.equal(calls.length, 0);
});

test('rate limit: 6th order from one IP within the window is rejected', async () => {
  reset();
  for (let i = 0; i < 5; i++) assert.equal((await call('send-order', { method: 'POST', body: { contact: 'a' }, ip: '9.9.9.9' })).statusCode, 200);
  assert.equal((await call('send-order', { method: 'POST', body: { contact: 'a' }, ip: '9.9.9.9' })).statusCode, 429);
  assert.equal((await call('send-order', { method: 'POST', body: { contact: 'a' }, ip: '8.8.8.8' })).statusCode, 200);
});

// ---------- auth + session ----------

const goodToken = (email) => ({ aud: CLIENT_ID, iss: 'https://accounts.google.com', email, email_verified: 'true', exp: String(Math.floor(Date.now() / 1000) + 600), name: 'Admin' });

test('allow-listed Google account gets an httpOnly session', async () => {
  reset();
  tokenInfo = goodToken('second@example.com');
  const res = await call('auth', { method: 'POST', body: { credential: 'jwt' } });
  assert.equal(res.statusCode, 200);
  const cookie = res.headers['set-cookie'];
  assert.match(cookie, /^mp_session=.+; Path=\/; HttpOnly; SameSite=Lax; Max-Age=\d+/);
  const me = await call('session', { cookie: sessionCookie(res) });
  assert.equal(me.body.user.email, 'second@example.com');
});

test('non-admin, wrong audience, unverified email and bad tokens are rejected', async () => {
  reset();
  tokenInfo = goodToken('someone@else.com');
  assert.equal((await call('auth', { method: 'POST', body: { credential: 'jwt' } })).statusCode, 403);
  tokenInfo = { ...goodToken('admin@example.com'), aud: 'other-client' };
  assert.equal((await call('auth', { method: 'POST', body: { credential: 'jwt' } })).statusCode, 401);
  tokenInfo = { ...goodToken('admin@example.com'), email_verified: 'false' };
  assert.equal((await call('auth', { method: 'POST', body: { credential: 'jwt' } })).statusCode, 401);
  tokenInfo = null;
  assert.equal((await call('auth', { method: 'POST', body: { credential: 'jwt' } })).statusCode, 401);
  assert.equal((await call('auth', { method: 'POST', body: {} })).statusCode, 400);
});

test('sign-in fails closed without SESSION_SECRET', async () => {
  reset();
  delete process.env.SESSION_SECRET;
  tokenInfo = goodToken('admin@example.com');
  assert.equal((await call('auth', { method: 'POST', body: { credential: 'jwt' } })).statusCode, 500);
});

test('forged, tampered or revoked sessions are not accepted', async () => {
  reset();
  tokenInfo = goodToken('admin@example.com');
  const cookie = sessionCookie(await call('auth', { method: 'POST', body: { credential: 'jwt' } }));
  // Forged: payload re-encoded with a different email, old signature kept.
  const [name, value] = cookie.split('=');
  const [, mac] = value.split('.');
  const forged = Buffer.from(JSON.stringify({ email: 'admin@example.com', exp: 9999999999 })).toString('base64url');
  assert.equal((await call('session', { cookie: `${name}=${forged}.${mac}` })).body.user, null);
  assert.equal((await call('session', { cookie: `${cookie}x` })).body.user, null);
  // The old client-side trick no longer does anything: there is no localStorage check on the server.
  assert.equal((await call('session', { cookie: 'mp_user={"email":"admin@example.com"}' })).body.user, null);
  // Revoked: email removed from ADMIN_EMAILS.
  process.env.ADMIN_EMAILS = 'second@example.com';
  assert.equal((await call('session', { cookie })).body.user, null);
});

test('sign out clears the cookie', async () => {
  reset();
  const res = await call('session', { method: 'DELETE' });
  assert.match(res.headers['set-cookie'], /Max-Age=0/);
});

// ---------- orders (admin) ----------

test('orders API requires an admin session', async () => {
  reset();
  assert.equal((await call('orders')).statusCode, 401);
  assert.equal((await call('orders', { method: 'DELETE', query: { all: '1' } })).statusCode, 401);
});

test('admin can list, mark read, delete and clear orders', async () => {
  reset();
  tokenInfo = goodToken('admin@example.com');
  const cookie = sessionCookie(await call('auth', { method: 'POST', body: { credential: 'jwt' } }));
  await call('send-order', { method: 'POST', body: { contact: 'one' }, ip: '1' });
  await call('send-order', { method: 'POST', body: { contact: 'two' }, ip: '2' });

  let list = await call('orders', { cookie });
  assert.equal(list.statusCode, 200);
  assert.equal(list.body.orders.length, 2);
  assert.deepEqual(list.body.health, { storage: true, telegram: true });

  const id = list.body.orders[0].id;
  const patched = await call('orders', { method: 'PATCH', body: { id, status: 'read' }, cookie });
  assert.equal(patched.body.order.status, 'read');
  assert.equal((await call('orders', { method: 'PATCH', body: { id, status: 'hacked' }, cookie })).statusCode, 400);

  assert.equal((await call('orders', { method: 'DELETE', query: { id }, cookie })).statusCode, 200);
  assert.equal((await call('orders', { method: 'DELETE', query: { id }, cookie })).statusCode, 404);
  list = await call('orders', { cookie });
  assert.equal(list.body.orders.length, 1);

  assert.equal((await call('orders', { method: 'DELETE', query: { all: '1' }, cookie })).statusCode, 200);
  assert.equal((await call('orders', { cookie })).body.orders.length, 0);
});

test('admin Telegram test message', async () => {
  reset();
  tokenInfo = goodToken('admin@example.com');
  const cookie = sessionCookie(await call('auth', { method: 'POST', body: { credential: 'jwt' } }));
  const res = await call('orders', { method: 'POST', body: { action: 'test' }, cookie });
  assert.equal(res.statusCode, 200);
  assert.equal(telegramCalls().length, 1);
});
