import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';

const GSI_SRC = 'https://accounts.google.com/gsi/client';

// Loads Google Identity Services only on this page instead of on every visit.
function loadGsi() {
  if (window.google?.accounts?.id) return Promise.resolve();
  let script = document.querySelector(`script[src="${GSI_SRC}"]`);
  if (!script) {
    script = document.createElement('script');
    script.src = GSI_SRC;
    script.async = true;
    document.head.appendChild(script);
  }
  return new Promise((resolve, reject) => {
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('Google sign-in failed to load')), { once: true });
  });
}

export default function LoginPage({ clientId, onSignIn }) {
  const btnRef = useRef(null);
  const onSignInRef = useRef(onSignIn);
  onSignInRef.current = onSignIn;
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadGsi()
      .then(() => {
        if (cancelled || !btnRef.current) return;
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            if (!response?.credential) return;
            setBusy(true);
            setError('');
            const result = await onSignInRef.current(response);
            if (result?.error) setError(result.error);
            setBusy(false);
          },
        });
        window.google.accounts.id.renderButton(btnRef.current, {
          theme: 'outline', size: 'large', width: 300, text: 'signin_with', shape: 'pill',
        });
      })
      .catch((e) => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }, [clientId]);

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <Logo href="#/" />
        </div>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)',
          padding: '40px 32px', textAlign: 'center', boxShadow: 'var(--shadow)',
        }}>
          <h1 className="h-card" style={{ fontSize: '1.75rem', marginBottom: 8 }}>Admin sign in</h1>
          <p className="muted" style={{ fontSize: 15, marginBottom: 32 }}>Only approved Google accounts can open the admin panel.</p>
          <div style={{ display: 'flex', justifyContent: 'center', minHeight: 44, opacity: busy ? 0.5 : 1 }}>
            <div ref={btnRef} />
          </div>
          {busy && <p className="muted" style={{ fontSize: 14, marginTop: 16 }}>Checking…</p>}
          {error && <p className="field-error" role="alert" style={{ margin: '16px 0 0' }}>{error}</p>}
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
            <a href="#/" className="link-arrow" style={{ fontSize: 14 }}>← Back to site</a>
          </div>
        </div>
      </div>
    </div>
  );
}
