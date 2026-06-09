import { useRef, useEffect, useState } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';
import OrderModal from './OrderModal';

export default function CtaOverlay({ progress }) {
  const overlayRef = useRef(null);
  const mobile = useMobile();
  const tablet = useTablet();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    if (mobile) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          const reveals = el.querySelectorAll('.reveal');
          reveals.forEach((r, i) => {
            setTimeout(() => r.classList.add('active'), i * 150);
          });
          observer.disconnect();
        }
      }, { threshold: 0.2 });
      observer.observe(el);
      return () => observer.disconnect();
    }

    if (progress > 0.94) {
      const localPhase = Math.min(1, (progress - 0.94) / 0.06);
      const ty = 100 - localPhase * 100;
      el.style.transform = `translateY(${ty}%)`;
      el.style.visibility = 'visible';
      el.querySelectorAll('.reveal').forEach(r => r.classList.add('active'));
    } else {
      el.style.transform = 'translateY(100%)';
      el.style.visibility = 'hidden';
    }
  }, [progress, mobile]);

  const btnPadding = tablet ? '20px 48px' : (mobile ? '18px 32px' : '24px 60px');
  const btnIconSize = tablet ? '2rem' : (mobile ? '1.5rem' : '2.5rem');
  const footerPadding = tablet ? '28px 48px 40px' : (mobile ? '24px' : '32px 64px 48px');

  return (
    <>
      <section
        ref={overlayRef}
        id="cta"
        style={{
          position: mobile ? 'relative' : 'fixed', top: 0, left: 0, width: '100%',
          height: mobile ? '100dvh' : '100%',
          zIndex: mobile ? 1 : 10, display: 'flex', flexDirection: 'column', alignItems: 'center',
          background: '#ffd300', transform: mobile ? 'translateY(0)' : 'translateY(100%)',
          willChange: 'transform', visibility: mobile ? 'visible' : 'hidden',
        }}
      >
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', maxWidth: 900, width: '100%', textAlign: 'center',
          padding: mobile ? (tablet ? '0 48px' : '0 24px') : 0,
        }}>
          <h2 className="cta-slide-title" style={{
            fontFamily: "'Anton', sans-serif", fontSize: 'clamp(4rem,12vw,10rem)',
            lineHeight: 0.85, textTransform: 'uppercase', color: '#0f0f12',
            textShadow: mobile ? '4px 4px 0 #d4001a' : '8px 8px 0 #d4001a', letterSpacing: '0.08em',
            marginBottom: 32,
          }}>
            <span className="line line-white reveal" style={{
              display: 'block', letterSpacing: '0.12em',
              transition: 'transform 0.5s, color 0.5s, text-shadow 0.5s',
            }}>START YOUR</span>
            <span className="line line-yellow reveal" style={{
              display: 'block', letterSpacing: '0.12em', transform: 'translateY(-6px)',
              color: '#0f0f12', textShadow: mobile ? '4px 4px 0 #d4001a' : '8px 8px 0 #d4001a',
              transition: 'transform 0.5s, color 0.5s, text-shadow 0.5s',
            }}>WEEK</span>
          </h2>
          <p className="cta-slide-sub reveal" style={{
            fontFamily: "'Geist', sans-serif", fontWeight: 600,
            fontSize: 'clamp(0.9rem,1.5vw,1.25rem)', letterSpacing: '0.15em',
            color: '#0f0f12', marginBottom: 48, maxWidth: 600,
          }}>
            SECURE YOUR SLOT. WE BUILD YOUR MVP IN 7 DAYS. NO EXCUSES.
          </p>
          <button
            className="cta-btn reveal"
            onClick={() => setShowModal(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: mobile ? 10 : 16,
              padding: btnPadding, background: '#0f0f12', color: '#ffd300',
              fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.2rem,2.5vw,1.75rem)',
              textTransform: 'uppercase', border: '4px solid #0f0f12',
              cursor: 'pointer',
            }}>
            INITIATE PROTOCOL
            <span className="material-icons" style={{ fontSize: btnIconSize }}>arrow_forward</span>
          </button>
        </div>
        {!mobile && (
          <div className="cta-footer" style={{
            marginTop: 'auto', width: '100%', maxWidth: 1100,
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: 24,
            padding: '32px 64px 48px', borderTop: '2px solid #0f0f12',
            background: '#0f0f12',
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
        )}
      </section>
      {showModal && <OrderModal onClose={() => setShowModal(false)} />}
      {mobile && (
        <footer style={{
          width: '100%',
          minHeight: '100dvh',
          background: '#0f0f12',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 24px 48px',
          position: 'relative',
        }}>
          <div style={{
            width: '100%', maxWidth: 900, textAlign: 'center',
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <h2 style={{
              fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3rem,10vw,5rem)',
              lineHeight: 0.9, textTransform: 'uppercase', color: '#ffd300',
              letterSpacing: '0.08em', marginBottom: 24,
            }}>
              MILLION<br /><span style={{ color: '#d4001a' }}>PIXELS</span>
            </h2>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontSize: 'clamp(0.85rem,3vw,1rem)',
              lineHeight: 1.6, color: '#e6e1e4', letterSpacing: '0.05em',
              textTransform: 'uppercase', maxWidth: 400, marginBottom: 48,
            }}>
              BUILDING RAW DIGITAL EXPERIENCES.<br />
              NO BUREAUCRACY. NO EXCUSES.
            </p>
            <div style={{
              display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center',
            }}>
              {['Twitter', 'GitHub', 'LinkedIn', 'Dribbble'].map((link) => (
                <a key={link} href="#" style={{
                  fontFamily: "'Space Mono', monospace", fontSize: '0.7rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: '#e6e1e4', textDecoration: 'none',
                  padding: '10px 20px', border: '1px solid rgba(107,110,115,0.3)',
                  transition: 'border-color 0.3s, color 0.3s',
                }}>{link}</a>
              ))}
            </div>
          </div>
          <div style={{
            width: '100%', borderTop: '1px solid rgba(107,110,115,0.15)',
            paddingTop: 24, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 12,
          }}>
            <div style={{
              fontFamily: "'Anton', sans-serif", fontSize: '1rem',
              textTransform: 'uppercase', color: '#ffd300',
            }}>
              &copy;2024 <span style={{ color: '#e6e1e4' }}>MILLIONPIXELS.DEV</span>
            </div>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
              letterSpacing: '0.1em', color: 'rgba(107,110,115,0.5)',
              textTransform: 'uppercase',
            }}>
              SLASH THE RULES
            </div>
          </div>
        </footer>
      )}
    </>
  );
}