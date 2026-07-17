import { useRef, useEffect, useState } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';
import { useMagnetic } from '../hooks/useMagnetic';
import OrderModal from './OrderModal';
import Stamp from './Stamp';

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
          zIndex: mobile ? 1 : 10, display: 'flex', flexDirection: 'column',
          background: 'var(--cream)', transform: mobile ? 'translateY(0)' : 'translateY(100%)',
          willChange: 'transform', visibility: mobile ? 'visible' : 'hidden',
        }}
      >
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', maxWidth: 900, width: '100%', textAlign: 'center',
          padding: mobile ? (tablet ? '0 48px' : '0 24px') : 0,
        }}>
          <h2 className="cta-slide-title" style={{
            fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            lineHeight: 0.9, textTransform: 'uppercase', color: 'var(--ink)',
            letterSpacing: '-0.01em', marginBottom: 24,
          }}>
            <span className="line reveal" style={{ display: 'block' }}>Your week starts</span>
            <span className="line reveal" style={{ display: 'block', color: 'var(--terracotta)' }}>with one message.</span>
          </h2>
          <p className="cta-slide-sub reveal" style={{
            fontFamily: "'Geist', sans-serif", fontWeight: 300,
            fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', letterSpacing: '0.01em',
            color: 'var(--text-dim)', marginBottom: 40, maxWidth: 520, lineHeight: 1.4,
          }}>
            One message. Seven days. A live product with your name on it.
          </p>
          <button
            ref={magnetic.ref}
            className="cta-btn reveal"
            onClick={() => setIsModalOpen(true)}
            onMouseMove={!mobile ? magnetic.onMouseMove : undefined}
            onMouseLeave={!mobile ? magnetic.onMouseLeave : undefined}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: btnPadding, background: 'var(--terracotta)', color: 'var(--cream)',
              fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.25rem, 2.4vw, 1.85rem)',
              textTransform: 'uppercase', border: 'none', borderRadius: 0,
              cursor: 'pointer', letterSpacing: '0.03em',
              transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
              willChange: 'transform',
            }}>
            Book a week →
          </button>
        </div>
        <div style={{
          width: '100%', background: 'var(--ink)',
          padding: '32px clamp(24px,5%,64px) 40px',
        }}>
          <div style={{
            maxWidth: 1240, margin: '0 auto',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 24, flexWrap: 'wrap',
          }}>
            <div style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 12,
              letterSpacing: '0.08em', color: 'var(--cream)', opacity: 0.7,
            }}>
              © 2026 MILLIONPIXELS.DEV
            </div>
            <Stamp size={96} color="var(--cream)" />
          </div>
        </div>
      </section>
      {isModalOpen && <OrderModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
