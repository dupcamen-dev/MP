import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('mp_cookies');
    if (!accepted) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('mp_cookies', '1');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 'clamp(12px, 2vh, 20px)',
      left: 'clamp(12px, 2vw, 24px)', right: 'clamp(12px, 2vw, 24px)',
      zIndex: 9999,
      background: '#ffffff',
      borderRadius: 'var(--radius)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      border: '1px solid #e8e8e8',
      padding: '16px clamp(20px, 4vw, 32px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16, flexWrap: 'wrap',
    }}>
      <p style={{
        fontFamily: "'Geist', sans-serif", fontSize: '0.85rem',
        color: 'var(--ink)', margin: 0, lineHeight: 1.4,
      }}>
        This site uses cookies for analytics and to improve your experience.
      </p>
      <button onClick={accept}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ink)'; }}
        style={{
        fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.85rem',
        textTransform: 'uppercase', color: '#ffffff',
        background: 'var(--ink)', border: 'none', borderRadius: 'var(--radius-pill)',
        padding: '10px 28px', cursor: 'pointer', letterSpacing: '0.04em',
        whiteSpace: 'nowrap', flexShrink: 0, transition: 'background 0.2s',
      }}>Accept</button>
    </div>
  );
}
