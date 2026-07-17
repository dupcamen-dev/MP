import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'mp_user';
const ALLOWED_EMAILS_KEY = 'mp_allowed_emails';

function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function setStoredUser(user) {
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
}

function getAllowedEmails() {
  try {
    const raw = localStorage.getItem(ALLOWED_EMAILS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function isEmailAllowed(email) {
  const allowed = getAllowedEmails();
  if (allowed.length === 0) return true;
  return allowed.includes(email.toLowerCase());
}

export function useAuth() {
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) setUser(stored);
  }, []);

  const signInWithGoogle = useCallback(() => {
    setLoading(true);
    const clientId = localStorage.getItem('mp_google_client_id') || '727188971518-ijvkthta20eqaoo8rcl4mvvu4jkab565.apps.googleusercontent.com';

    if (!clientId) {
      alert('Google Client ID not configured. Go to Admin → Bot Config to set it.');
      setLoading(false);
      return;
    }

    function decodeJWT(token) {
      const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
      return JSON.parse(atob(padded));
    }

    function getClient(cb) {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'openid profile email',
        callback: (response) => {
          if (response.error) {
            alert('Sign-in failed: ' + response.error);
            setLoading(false);
            return;
          }
          const jwt = response.id_token || response.access_token;
          if (!jwt) {
            alert('No token received from Google.');
            setLoading(false);
            return;
          }
          try {
            const payload = decodeJWT(jwt);
            const u = {
              name: payload.name || '',
              email: payload.email || '',
              picture: payload.picture || '',
              sub: payload.sub || '',
            };
            if (!isEmailAllowed(u.email)) {
              alert('This email is not authorized.');
              setLoading(false);
              return;
            }
            setStoredUser(u);
            setUser(u);
          } catch {
            alert('Sign-in failed.');
          }
          setLoading(false);
        },
      });
      cb(client);
    }

    function trySignIn() {
      if (window.google?.accounts?.oauth2) {
        getClient(c => c.requestAccessToken());
      } else {
        const check = setInterval(() => {
          if (window.google?.accounts?.oauth2) {
            clearInterval(check);
            getClient(c => c.requestAccessToken());
          }
        }, 100);
        setTimeout(() => { clearInterval(check); setLoading(false); alert('Google SDK failed to load.'); }, 5000);
      }
    }

    trySignIn();
  }, []);

  const signOut = useCallback(() => {
    setStoredUser(null);
    setUser(null);
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
  }, []);

  return { user, loading, signInWithGoogle, signOut, isAuthenticated: !!user };
}

export function addAllowedEmail(email) {
  const emails = getAllowedEmails();
  const lower = email.toLowerCase().trim();
  if (!emails.includes(lower)) {
    emails.push(lower);
    localStorage.setItem(ALLOWED_EMAILS_KEY, JSON.stringify(emails));
  }
}

export function removeAllowedEmail(email) {
  const emails = getAllowedEmails().filter(e => e !== email.toLowerCase().trim());
  localStorage.setItem(ALLOWED_EMAILS_KEY, JSON.stringify(emails));
}

export function getAllowedEmailsList() {
  return getAllowedEmails();
}
