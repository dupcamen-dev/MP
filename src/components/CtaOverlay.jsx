import { useRef, useEffect, useState } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';
import { useMagnetic } from '../hooks/useMagnetic';
import OrderModal from './OrderModal';

export default function CtaOverlay({ progress, showModal: externalModal, setShowModal: externalSetShowModal }) {
  const overlayRef = useRef(null);
  const mobile = useMobile();
  const tablet = useTablet();
  const [showModal, setShowModal] = useState(false);
  
  const isModalOpen = externalModal !== undefined ? externalModal : showModal;
  const setIsModalOpen = externalSetShowModal || setShowModal;

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
  const magnetic = useMagnetic();

  return (
    <>
      <section
        ref={overlayRef}
        id="cta"
        style={{
          position: mobile ? 'relative' : 'fixed', top: 0, left: 0, width: '100%',
          height: mobile ? '100dvh' : '100%',
          zIndex: mobile ? 1 : 10, display: 'flex', flexDirection: 'column', alignItems: 'center',
          background: 'var(--primary)', transform: mobile ? 'translateY(0)' : 'translateY(100%)',
          willChange: 'transform', visibility: mobile ? 'visible' : 'hidden',
        }}
      >
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', maxWidth: 900, width: '100%', textAlign: 'center',
          padding: mobile ? (tablet ? '0 48px' : '0 24px') : 0,
        }}>
          <h2 className="cta-slide-title" style={{
            fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(5rem, 14vw, 12rem)',
            lineHeight: 0.85, textTransform: 'uppercase', color: 'var(--surface-low)',
            textShadow: mobile ? '4px 4px 0 var(--secondary)' : '8px 8px 0 var(--secondary)', letterSpacing: '0.05em',
            marginBottom: 40,
          }}>
            <span className="line line-white reveal" style={{
              display: 'block', letterSpacing: '0.08em',
              transition: 'transform 0.5s, color 0.5s, text-shadow 0.5s',
            }}>START YOUR</span>
            <span className="line line-yellow reveal" style={{
              display: 'block', letterSpacing: '0.08em', transform: 'translateY(-6px)',
              color: 'var(--surface-low)', textShadow: mobile ? '4px 4px 0 var(--secondary)' : '8px 8px 0 var(--secondary)',
              transition: 'transform 0.5s, color 0.5s, text-shadow 0.5s',
            }}>WEEK</span>
          </h2>
          <p className="cta-slide-sub reveal" style={{
            fontFamily: "'Geist', sans-serif", fontWeight: 400,
            fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', letterSpacing: '0.02em',
            color: 'var(--surface-low)', marginBottom: 48, maxWidth: 600, lineHeight: 1.4,
          }}>
            One call to get started. Live URL in 7 days.
          </p>
          <button
            ref={magnetic.ref}
            className="cta-btn reveal"
            onClick={() => setIsModalOpen(true)}
            onMouseMove={!mobile ? magnetic.onMouseMove : undefined}
            onMouseLeave={!mobile ? magnetic.onMouseLeave : undefined}
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: btnPadding, background: 'var(--surface-low)', color: 'var(--primary)',
              fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
              textTransform: 'uppercase', border: '4px solid var(--surface-low)',
              cursor: 'pointer', letterSpacing: '0.05em', fontWeight: 700,
              transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
              willChange: 'transform',
            }}>
            START
          </button>
        </div>
        <div className="cta-footer" style={{
          marginTop: 'auto', width: '100%', maxWidth: 1100,
          padding: '24px 64px 32px', textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'Geist', sans-serif", fontSize: '0.875rem',
            letterSpacing: '0.05em', color: 'var(--surface-low)', opacity: 0.7,
          }}>
            © 2025 MILLIONPIXELS.DEV
          </div>
        </div>
      </section>
      {isModalOpen && <OrderModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
