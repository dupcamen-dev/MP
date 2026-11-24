// POST { credential } — a Google ID token from Google Identity Services.
// The token is verified by Google (signature, expiry) and then checked against our client ID
// and the ADMIN_EMAILS allow-list before an httpOnly session cookie is issued.

const session = require('./_lib/session');

const DEFAULT_CLIENT_ID = '727188971518-ijvkthta20eqaoo8rcl4mvvu4jkab565.apps.googleusercontent.com';
const ISSUERS = ['accounts.google.com', 'https://accounts.google.com'];

async function verifyGoogleToken(idToken) {
  const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
  if (!res.ok) return null;
  const info = await res.json();
  const clientId = process.env.GOOGLE_CLIENT_ID || DEFAULT_CLIENT_ID;
  if (info.aud !== clientId) return null;
  if (!ISSUERS.includes(info.iss)) return null;
  if (String(info.email_verified) !== 'true') return null;
  if (!info.exp || Number(info.exp) < Date.now() / 1000) return null;
  return { email: info.email, name: info.name || '', picture: info.picture || '' };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!session.secret()) {
    console.error('[auth] SESSION_SECRET is missing or shorter than 16 chars');
    return res.status(500).json({ error: 'not_configured' });
  }

  const credential = req.body && typeof req.body.credential === 'string' ? req.body.credential : '';
  if (!credential) return res.status(400).json({ error: 'credential_required' });

  let user;
  try {
    user = await verifyGoogleToken(credential);
  } catch (err) {
    console.error('[auth] token verification failed:', err.message);
    return res.status(502).json({ error: 'verification_failed' });
  }
  if (!user) return res.status(401).json({ error: 'invalid_token' });
  if (!session.isAdminEmail(user.email)) return res.status(403).json({ error: 'not_admin' });

  session.startSession(res, user);
  return res.status(200).json({ user });
};
