// Stateless admin session: an HMAC-signed, httpOnly cookie. No dependencies.
// Requires SESSION_SECRET (any long random string). Without it nobody can sign in (fails closed).

const crypto = require('crypto');

const COOKIE = 'mp_session';
const MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const s = process.env.SESSION_SECRET;
  return s && s.length >= 16 ? s : null;
}

const b64url = (buf) => Buffer.from(buf).toString('base64url');

function sign(payload) {
  const key = secret();
  if (!key) throw new Error('SESSION_SECRET is not configured');
  const body = b64url(JSON.stringify(payload));
  const mac = crypto.createHmac('sha256', key).update(body).digest('base64url');
  return `${body}.${mac}`;
}

function verify(token) {
  const key = secret();
  if (!key || typeof token !== 'string' || !token.includes('.')) return null;
  const [body, mac] = token.split('.');
  const expected = crypto.createHmac('sha256', key).update(body).digest('base64url');
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

function parseCookies(req) {
  if (req.cookies) return req.cookies;
  const out = {};
  for (const part of String(req.headers?.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function cookieHeader(value, maxAge) {
  const secure = process.env.VERCEL ? '; Secure' : '';
  return `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

function startSession(res, user) {
  const now = Math.floor(Date.now() / 1000);
  const token = sign({ email: user.email, name: user.name, picture: user.picture, iat: now, exp: now + MAX_AGE_SEC });
  res.setHeader('Set-Cookie', cookieHeader(token, MAX_AGE_SEC));
}

function endSession(res) {
  res.setHeader('Set-Cookie', cookieHeader('', 0));
}

function getSession(req) {
  const session = verify(parseCookies(req)[COOKIE]);
  if (!session) return null;
  // Re-check the allow-list on every request so removing an email revokes access immediately.
  return isAdminEmail(session.email) ? session : null;
}

function adminEmails() {
  return String(process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function isAdminEmail(email) {
  return !!email && adminEmails().includes(String(email).toLowerCase());
}

// Guard for admin-only endpoints. Returns the session, or sends 401 and returns null.
function requireAdmin(req, res) {
  const session = getSession(req);
  if (!session) {
    res.status(401).json({ error: 'Not signed in' });
    return null;
  }
  return session;
}

module.exports = { startSession, endSession, getSession, requireAdmin, isAdminEmail, sign, verify, secret };
