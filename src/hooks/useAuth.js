import { useState, useCallback, useEffect } from 'react';

// Public OAuth client ID (safe to ship to the browser). The server verifies every token
// against it and against the ADMIN_EMAILS allow-list — nothing here grants access by itself.
const GOOGLE_CLIENT_ID = '727188971518-ijvkthta20eqaoo8rcl4mvvu4jkab565.apps.googleusercontent.com';

// Remove the old client-side "session" left over from the previous implementation.
try { localStorage.removeItem('mp_user'); localStorage.removeItem('mp_bot_config'); localStorage.removeItem('mp_google_client_id'); } catch {}

const ERRORS = {
  not_admin: 'This Google account does not have admin access.',
  invalid_token: 'Google sign-in could not be verified. Please try again.',
  not_configured: 'Admin sign-in is not configured on the server yet.',
};

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/session', { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : { user: null }))
      .catch(() => ({ user: null }))
      .then((data) => { if (!cancelled) { setUser(data.user || null); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  // Returns { user } on success or { error } with a human-readable message.
  const signIn = useCallback(async (credentialResponse) => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse?.credential }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.user) return { error: ERRORS[data.error] || 'Sign-in failed. Please try again.' };
      setUser(data.user);
      return { user: data.user };
    } catch {
      return { error: 'Network error. Please try again.' };
    }
  }, []);

  const signOut = useCallback(async () => {
    try { await fetch('/api/session', { method: 'DELETE', credentials: 'same-origin' }); } catch {}
    setUser(null);
    window.google?.accounts?.id?.disableAutoSelect?.();
  }, []);

  return { user, loading, signIn, signOut, isAuthenticated: !!user, clientId: GOOGLE_CLIENT_ID };
}
