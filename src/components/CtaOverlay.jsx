import { useRef, useEffect } from 'react';

export default function CtaOverlay({ progress }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (progress > 0.75) {
      const localPhase = Math.min(1, (progress - 0.75) / 0.25);
      const tx = 100 - localPhase * 100;
      el.style.transform = `translateX(${tx}%)`;
      el.style.visibility = 'visible';
    } else {
      el.style.transform = 'translateX(100%)';
      el.style.visibility = 'hidden';
    }
  }, [progress]);

  return (
    <section
      ref={overlayRef}
      id="cta"
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center',
        background: 'var(--primary)', transform: 'translateX(100%)',
        willChange: 'transform', visibility: 'hidden',
      }}
    >
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', maxWidth: 900, width: '100%', textAlign: 'center',
      }}>
        <h2 className="cta-slide-title" style={{
          fontFamily: "'Anton', sans-serif", fontSize: 'clamp(4rem,12vw,10rem)',
          lineHeight: 0.85, textTransform: 'uppercase', color: 'var(--bg)',
          textShadow: '8px 8px 0 rgba(0,0,0,0.15)', letterSpacing: '0.08em',
          marginBottom: 32,
        }}>
          <span className="line reveal" style={{
            display: 'block', letterSpacing: '0.12em',
            transition: 'transform 0.5s, color 0.5s, text-shadow 0.5s', cursor: 'crosshair',
          }}>START YOUR</span>
          <span className="line reveal" style={{
            display: 'block', letterSpacing: '0.12em', transform: 'translateY(-6px)',
            color: 'var(--secondary)', textShadow: '8px 8px 0 var(--bg)',
            transition: 'transform 0.5s, color 0.5s, text-shadow 0.5s', cursor: 'crosshair',
          }}>WEEK</span>
        </h2>
        <p className="cta-slide-sub reveal" style={{
          fontFamily: "'Geist', sans-serif", fontWeight: 600,
          fontSize: 'clamp(0.9rem,1.5vw,1.25rem)', letterSpacing: '0.15em',
          color: 'var(--bg)', marginBottom: 48, maxWidth: 600,
        }}>
          SECURE YOUR SLOT. WE BUILD YOUR MVP IN 7 DAYS. NO EXCUSES.
        </p>
        <button className="reveal" style={{
          display: 'inline-flex', alignItems: 'center', gap: 16,
          padding: '24px 60px', background: 'var(--bg)', color: 'var(--primary)',
          fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.2rem,2.5vw,1.75rem)',
          textTransform: 'uppercase', border: '4px solid var(--bg)',
          cursor: 'pointer', transition: 'all 0.3s',
        }}>
          INITIATE PROTOCOL
          <span className="material-icons" style={{ fontSize: '2.5rem' }}>arrow_forward</span>
        </button>
      </div>
      <div style={{
        marginTop: 'auto', width: '100%', maxWidth: 1100,
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 24,
        padding: '32px 64px 48px', borderTop: '2px solid var(--bg)',
      }}>
        <div style={{
          fontFamily: "'Anton', sans-serif", fontSize: '1.25rem',
          textTransform: 'uppercase', color: '#000',
        }}>
          &copy;2024 <span style={{ color: '#000' }}>MILLIONPIXELS.DEV</span> — SLASH THE RULES
        </div>
        <nav style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {['Terms', 'Privacy', 'Twitter', 'GitHub'].map((link) => (
            <a key={link} href="#" style={{
              fontFamily: "'Space Mono', monospace", fontSize: '0.75rem',
              letterSpacing: '0.05em', textTransform: 'uppercase',
              color: '#000', textDecoration: 'none',
            }}>{link}</a>
          ))}
        </nav>
      </div>
    </section>
  );
}
