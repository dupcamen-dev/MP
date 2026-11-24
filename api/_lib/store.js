// Minimal Upstash Redis REST client (no dependencies).
// Works with the env vars the Vercel ↔ Upstash integration injects:
//   KV_REST_API_URL / KV_REST_API_TOKEN   (Vercel KV / Upstash via Marketplace)
//   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN   (direct Upstash)

const ORDERS_KEY = 'mp:orders';

function config() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ''), token } : null;
}

function isConfigured() {
  return !!config();
}

async function redis(...command) {
  const cfg = config();
  if (!cfg) throw new Error('Storage is not configured');
  const res = await fetch(cfg.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) throw new Error(`Storage error: ${data.error || res.status}`);
  return data.result;
}

async function saveOrder(order) {
  await redis('HSET', ORDERS_KEY, order.id, JSON.stringify(order));
}

async function listOrders() {
  const flat = (await redis('HGETALL', ORDERS_KEY)) || [];
  const orders = [];
  for (let i = 1; i < flat.length; i += 2) {
    try { orders.push(JSON.parse(flat[i])); } catch { /* skip corrupt entry */ }
  }
  return orders.sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp)));
}

async function updateOrder(id, patch) {
  const raw = await redis('HGET', ORDERS_KEY, id);
  if (!raw) return null;
  const order = { ...JSON.parse(raw), ...patch, id };
  await redis('HSET', ORDERS_KEY, id, JSON.stringify(order));
  return order;
}

async function deleteOrder(id) {
  return (await redis('HDEL', ORDERS_KEY, id)) > 0;
}

async function clearOrders() {
  await redis('DEL', ORDERS_KEY);
}

// Fixed-window rate limit. Returns true when the caller is over the limit.
// Fails open (returns false) when storage is missing or errors, so orders are never blocked by infra issues.
async function isRateLimited(key, limit, windowSec) {
  if (!isConfigured()) return false;
  try {
    const n = await redis('INCR', key);
    if (n === 1) await redis('EXPIRE', key, windowSec);
    return n > limit;
  } catch {
    return false;
  }
}

module.exports = { isConfigured, saveOrder, listOrders, updateOrder, deleteOrder, clearOrders, isRateLimited };
