// GET    → { user } for the current admin session, or { user: null }
// DELETE → sign out (clears the session cookie)

const session = require('./_lib/session');
const { isSameOrigin } = require('./_lib/http');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    const s = session.getSession(req);
    return res.status(200).json({ user: s ? { email: s.email, name: s.name, picture: s.picture } : null });
  }

  if (req.method === 'DELETE') {
    if (!isSameOrigin(req)) return res.status(403).json({ error: 'forbidden' });
    session.endSession(res);
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', 'GET, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
};
