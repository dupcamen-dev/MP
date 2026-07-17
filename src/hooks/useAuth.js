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
    const clientId = localStorage.getItem('mp_google_client_id') || '';

    if (!clientId) {
      alert('Google Client ID not configured. Go to Admin → Bot Config to set it.');
      setLoading(false);
      return;
    }

    if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          try {
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            const u = {
              name: payload.name,
              email: payload.email,
              picture: payload.picture,
              sub: payload.sub,
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
        auto_select: true,
      });
      window.google.accounts.id.prompt();
    } else {
      alert('Google SDK not loaded. Check your internet connection.');
      setLoading(false);
    }
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
