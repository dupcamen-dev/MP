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
      position: 'fixed', bottom: 0, left: 0, right: 0,
      zIndex: 9999,
      background: 'var(--ink)',
      padding: '16px clamp(24px, 5%, 64px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16, flexWrap: 'wrap',
    }}>
      <p style={{
        fontFamily: "'Geist', sans-serif", fontSize: '0.85rem',
        color: 'var(--cream)', margin: 0, lineHeight: 1.4,
      }}>
        This site uses cookies for analytics and to improve your experience.
      </p>
      <button onClick={accept} style={{
        fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.85rem',
        textTransform: 'uppercase', color: 'var(--ink)',
        background: 'var(--cream)', border: 'none', borderRadius: 0,
        padding: '10px 28px', cursor: 'pointer', letterSpacing: '0.04em',
        whiteSpace: 'nowrap', flexShrink: 0,
      }}>Accept</button>
    </div>
  );
}
