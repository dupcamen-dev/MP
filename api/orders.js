// Admin-only order management.
// GET                      → { orders, health }
// PATCH  { id, status }    → { order }
// DELETE ?id=<id>          → { ok }
// DELETE ?all=1            → { ok }
// POST   { action: 'test' } → sends a test message to Telegram

const session = require('./_lib/session');
const store = require('./_lib/store');
const telegram = require('./_lib/telegram');
const { isSameOrigin } = require('./_lib/http');

const STATUSES = ['new', 'read'];

function health() {
  return {
    storage: store.isConfigured(),
    telegram: telegram.isConfigured(),
  };
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET' && !isSameOrigin(req)) return res.status(403).json({ error: 'forbidden' });
  if (!session.requireAdmin(req, res)) return;

  try {
    if (req.method === 'GET') {
      if (!store.isConfigured()) return res.status(200).json({ orders: [], health: health() });
      return res.status(200).json({ orders: await store.listOrders(), health: health() });
    }

    if (req.method === 'POST') {
      if (req.body?.action !== 'test') return res.status(400).json({ error: 'unknown_action' });
      if (!telegram.isConfigured()) return res.status(503).json({ error: 'telegram_not_configured' });
      await telegram.sendMessage('✅ <b>Millionpixels admin test</b> — Telegram delivery works.');
      return res.status(200).json({ ok: true });
    }

    if (!store.isConfigured()) return res.status(503).json({ error: 'storage_not_configured' });

    if (req.method === 'PATCH') {
      const { id, status } = req.body || {};
      if (typeof id !== 'string' || !STATUSES.includes(status)) return res.status(400).json({ error: 'bad_request' });
      const order = await store.updateOrder(id, { status });
      return order ? res.status(200).json({ order }) : res.status(404).json({ error: 'not_found' });
    }

    if (req.method === 'DELETE') {
      if (req.query?.all === '1') {
        await store.clearOrders();
        return res.status(200).json({ ok: true });
      }
      const id = req.query?.id;
      if (typeof id !== 'string' || !id) return res.status(400).json({ error: 'bad_request' });
      return (await store.deleteOrder(id))
        ? res.status(200).json({ ok: true })
        : res.status(404).json({ error: 'not_found' });
    }

    res.setHeader('Allow', 'GET, POST, PATCH, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[orders]', err.message);
    return res.status(500).json({ error: 'server_error' });
  }
};
