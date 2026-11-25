const crypto = require('crypto');
const store = require('./_lib/store');
const telegram = require('./_lib/telegram');
const { clientIp, isSameOrigin } = require('./_lib/http');

const MAX_PROJECT = 2000;
const MAX_CONTACT = 200;
const LOCALES = ['en', 'uk', 'pl'];

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return {};
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!isSameOrigin(req)) return res.status(403).json({ error: 'forbidden' });

  const body = readBody(req);

  // Honeypot: humans never see this field. Pretend success so bots don't retry.
  if (typeof body.website === 'string' && body.website.trim()) {
    return res.status(200).json({ ok: true });
  }

  const project = typeof body.project === 'string' ? body.project.trim() : '';
  const contact = typeof body.contact === 'string' ? body.contact.trim() : '';
  const locale = LOCALES.includes(body.locale) ? body.locale : null;

  if (!contact) return res.status(400).json({ error: 'contact_required' });
  if (contact.length > MAX_CONTACT || project.length > MAX_PROJECT) {
    return res.status(400).json({ error: 'too_long' });
  }

  if (await store.isRateLimited(`mp:rl:order:${clientIp(req)}`, 5, 600)) {
    return res.status(429).json({ error: 'rate_limited' });
  }

  const now = new Date();
  const order = {
    id: crypto.randomBytes(5).toString('hex'),
    project: project || '(not specified)',
    contact,
    locale,
    timestamp: now.toISOString(),
    displayTime: now.toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' }),
    status: 'new',
  };

  // Deliver through every configured channel. The request counts as received
  // if at least one channel accepted it — the client is told the truth either way.
  let stored = false;
  let sent = false;

  if (store.isConfigured()) {
    try { await store.saveOrder(order); stored = true; }
    catch (err) { console.error('[send-order] storage failed:', err.message); }
  }

  if (telegram.isConfigured()) {
    try { await telegram.sendMessage(telegram.orderMessage(order)); sent = true; }
    catch (err) { console.error('[send-order] telegram failed:', err.message); }
  }

  if (!stored && !sent) {
    console.error('[send-order] order NOT delivered', { id: order.id, storage: store.isConfigured(), telegram: telegram.isConfigured() });
    return res.status(502).json({ error: 'delivery_failed' });
  }

  return res.status(200).json({ ok: true, id: order.id });
};
