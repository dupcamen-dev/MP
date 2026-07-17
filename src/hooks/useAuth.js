import { useState, useCallback, useEffect, useRef } from 'react';

const STORAGE_KEY = 'mp_user';
const GOOGLE_CLIENT_ID = '727188971518-ijvkthta20eqaoo8rcl4mvvu4jkab565.apps.googleusercontent.com';
const ALLOWED_EMAILS = ['ringoosamsungj710@gmail.com'];

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

function decodeCredential(jwt) {
  const parts = jwt.split('.');
  const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
  return JSON.parse(decodeURIComponent(
    atob(padded).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
  ));
}

export function useAuth() {
  const [user, setUser] = useState(getStoredUser);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const signIn = useCallback((credentialResponse) => {
    try {
      const payload = decodeCredential(credentialResponse.credential);
      if (!ALLOWED_EMAILS.includes(payload.email)) {
        alert('Access denied.');
        return null;
      }
      const u = {
        name: payload.name || '',
        email: payload.email || '',
        picture: payload.picture || '',
        sub: payload.sub || '',
      };
      setStoredUser(u);
      setUser(u);
      return u;
    } catch {
      return null;
    }
  }, []);

  const signOut = useCallback(() => {
    setStoredUser(null);
    setUser(null);
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
  }, []);

  return { user, signIn, signOut, isAuthenticated: !!user, clientId: GOOGLE_CLIENT_ID };
}
