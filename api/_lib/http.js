// Small request helpers shared by the API routes.

// Real client IP on Vercel. `x-vercel-forwarded-for` and `x-real-ip` are set by the edge and
// can't be spoofed by the client; `x-forwarded-for` is only a fallback for local runs.
function clientIp(req) {
  const h = req.headers || {};
  const first = (v) => String(v || '').split(',')[0].trim();
  return first(h['x-vercel-forwarded-for']) || first(h['x-real-ip']) || first(h['x-forwarded-for']) || req.socket?.remoteAddress || 'unknown';
}

// Rejects cross-site browser requests to state-changing endpoints (defence in depth on top of
// SameSite=Lax cookies). Requests without an Origin header (server-to-server, curl) pass.
function isSameOrigin(req) {
  const h = req.headers || {};
  const origin = h.origin;
  if (!origin) return true;
  const host = h['x-forwarded-host'] || h.host;
  try {
    return !!host && new URL(origin).host === host;
  } catch {
    return false;
  }
}

function isJson(req) {
  return String(req.headers?.['content-type'] || '').toLowerCase().startsWith('application/json');
}

module.exports = { clientIp, isSameOrigin, isJson };
