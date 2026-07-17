import { } from 'react';

export default function LoginModal({ onGoogleSignIn, onClose, loading }) {

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'rgba(15,15,18,0.85)', backdropFilter: 'blur(8px)',
    }} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="login-title">
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--cream)', padding: '48px 40px', maxWidth: 440, width: '90%',
        border: '2px solid var(--sienna)', textAlign: 'center',
      }}>
        <h3 id="login-title" style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: '2rem',
          color: 'var(--ink)', textTransform: 'uppercase', margin: '0 0 8px 0',
          letterSpacing: '-0.01em',
        }}>Sign In</h3>
        <p style={{
          fontFamily: "'Geist', sans-serif", fontSize: '0.95rem',
          color: 'var(--text-dim)', margin: '0 0 32px 0', lineHeight: 1.5,
        }}>
          Sign in to access the admin panel.
        </p>

        <button
          onClick={onGoogleSignIn}
          disabled={loading}
          style={{
            width: '100%', padding: '14px 24px',
            background: '#fff', color: '#333',
            border: '1px solid #dadce0', borderRadius: 0,
            cursor: loading ? 'wait' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            fontFamily: "'Geist', sans-serif", fontSize: '1rem', fontWeight: 500,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = '#f8f9fa'}
          onMouseLeave={e => e.target.style.background = '#fff'}
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          {loading ? 'Loading…' : 'Continue with Google'}
        </button>

        <button onClick={onClose} style={{
          display: 'block', margin: '20px auto 0', background: 'none', border: 'none',
          fontFamily: "'Geist Mono', monospace", fontSize: 12, color: 'var(--text-dim)',
          cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>Close</button>
      </div>
    </div>
  );
}
