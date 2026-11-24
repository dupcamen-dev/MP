// GET    → { user } for the current admin session, or { user: null }
// DELETE → sign out (clears the session cookie)

const session = require('./_lib/session');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    const s = session.getSession(req);
    return res.status(200).json({ user: s ? { email: s.email, name: s.name, picture: s.picture } : null });
  }

  if (req.method === 'DELETE') {
    session.endSession(res);
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', 'GET, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
};
