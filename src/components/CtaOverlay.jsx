import { useRef, useEffect, useState } from 'react';
import OrderModal from './OrderModal';

export default function CtaOverlay({ progress }) {
  const overlayRef = useRef(null);
  const mobile = window.innerWidth < 900;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (mobile) {
      el.querySelectorAll('.reveal').forEach(r => r.classList.add('active'));
      return;
    }
    const p = progress;
    if (p > 0.78) {
      const localPhase = Math.min(1, (p - 0.78) / 0.22);
      const ty = 100 - localPhase * 100;
      el.style.transform = `translateY(${ty}%)`;
      el.style.visibility = 'visible';
      el.querySelectorAll('.reveal').forEach(r => r.classList.add('active'));
    } else {
      el.style.transform = 'translateY(100%)';
      el.style.visibility = 'hidden';
    }
  }, [progress, mobile]);

  return (
    <section
      ref={overlayRef}
      id="cta"
      style={{
        position: mobile ? 'relative' : 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: mobile ? 1 : 10, display: 'flex', flexDirection: 'column', alignItems: 'center',
        background: '#ffd300', transform: mobile ? 'translateY(0)' : 'translateY(100%)',
        willChange: 'transform', visibility: mobile ? 'visible' : 'hidden',
      }}
    >
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', maxWidth: 900, width: '100%', textAlign: 'center',
      }}>
        <h2 className="cta-slide-title" style={{
          fontFamily: "'Anton', sans-serif", fontSize: 'clamp(4rem,12vw,10rem)',
          lineHeight: 0.85, textTransform: 'uppercase', color: '#141315',
          textShadow: '8px 8px 0 #e10000', letterSpacing: '0.08em',
          marginBottom: 32,
        }}>
          <span className="line line-white reveal" style={{
            display: 'block', letterSpacing: '0.12em',
            transition: 'transform 0.5s, color 0.5s, text-shadow 0.5s',
          }}>START YOUR</span>
          <span className="line line-yellow reveal" style={{
            display: 'block', letterSpacing: '0.12em', transform: 'translateY(-6px)',
            color: '#141315', textShadow: '8px 8px 0 #e10000',
            transition: 'transform 0.5s, color 0.5s, text-shadow 0.5s',
          }}>WEEK</span>
        </h2>
        <p className="cta-slide-sub reveal" style={{
          fontFamily: "'Geist', sans-serif", fontWeight: 600,
          fontSize: 'clamp(0.9rem,1.5vw,1.25rem)', letterSpacing: '0.15em',
          color: '#141315', marginBottom: 48, maxWidth: 600,
        }}>
          SECURE YOUR SLOT. WE BUILD YOUR MVP IN 7 DAYS. NO EXCUSES.
        </p>
        <button
          className="cta-btn reveal"
          onClick={() => setShowModal(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 16,
            padding: '24px 60px', background: '#141315', color: '#ffd300',
            fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.2rem,2.5vw,1.75rem)',
            textTransform: 'uppercase', border: '4px solid #141315',
            cursor: 'pointer',
          }}>
          INITIATE PROTOCOL
          <span className="material-icons" style={{ fontSize: '2.5rem' }}>arrow_forward</span>
        </button>
      </div>
      <div className="cta-footer" style={{
        marginTop: 'auto', width: '100%', maxWidth: 1100,
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 24,
        padding: '32px 64px 48px', borderTop: '2px solid #141315',
        background: '#141315',
      }}>
        <div style={{
          fontFamily: "'Anton', sans-serif", fontSize: '1.25rem',
          textTransform: 'uppercase', color: '#ffd300',
        }}>
          &copy;2024 <span style={{ color: '#e6e1e4' }}>MILLIONPIXELS.DEV</span> — SLASH THE RULES
        </div>
        <nav style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {['Terms', 'Privacy', 'Twitter', 'GitHub'].map((link) => (
            <a key={link} href="#" style={{
              fontFamily: "'Space Mono', monospace", fontSize: '0.75rem',
              letterSpacing: '0.05em', textTransform: 'uppercase',
              color: '#e6e1e4', textDecoration: 'none',
            }}>{link}</a>
          ))}
        </nav>
      </div>
      {showModal && <OrderModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
