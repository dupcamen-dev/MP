import { useEffect, useRef, useCallback } from 'react';

export default function LoginPage({ clientId, onSignIn, onBack }) {
  const btnRef = useRef(null);
  const initialized = useRef(false);

  const handleCredentialResponse = useCallback((response) => {
    if (response.credential) {
      onSignIn(response);
    }
  }, [onSignIn]);

  useEffect(() => {
    if (initialized.current) return;

    function init() {
      if (!window.google?.accounts?.id) {
        setTimeout(init, 200);
        return;
      }
      initialized.current = true;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });
      if (btnRef.current) {
        window.google.accounts.id.renderButton(btnRef.current, {
          theme: 'outline',
          size: 'large',
          width: 320,
          text: 'signin_with',
          shape: 'rectangular',
        });
      }
    }

    init();
  }, [clientId, handleCredentialResponse]);

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--cream)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Geist', sans-serif",
    }}>
      <div style={{
        maxWidth: 440, width: '100%', padding: '0 24px',
      }}>
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <a href="/#/" onClick={(e) => { e.preventDefault(); window.location.hash = '/'; }}
            style={{
              fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              color: 'var(--terracotta)', textDecoration: 'none', letterSpacing: '-0.01em',
            }}>MILLIONPIXELS</a>
        </div>

        <div style={{
          background: '#fff', border: '1px solid var(--sienna)',
          padding: '48px 40px',
        }}>
          <h1 style={{
            fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            color: 'var(--ink)', textTransform: 'uppercase',
            letterSpacing: '-0.01em', margin: '0 0 8px 0', textAlign: 'center',
          }}>Sign In</h1>
          <p style={{
            fontFamily: "'Geist', sans-serif", fontSize: '0.95rem',
            color: 'var(--text-dim)', margin: '0 0 40px 0',
            textAlign: 'center', lineHeight: 1.5,
          }}>Access the admin panel to manage orders and bot settings.</p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div ref={btnRef} id="google-signin-btn" />
          </div>

          <div style={{
            marginTop: 32, textAlign: 'center',
            borderTop: '1px solid var(--sienna)', paddingTop: 24,
          }}>
            <a href="/#/" onClick={(e) => { e.preventDefault(); window.location.hash = '/'; }} style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 12,
              color: 'var(--text-dim)', textDecoration: 'none',
              letterSpacing: '0.06em',
            }}>&#8592; Back to site</a>
          </div>
        </div>
      </div>
    </div>
  );
}
