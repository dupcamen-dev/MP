import { useRef, useEffect, useState } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';
import { useMagnetic } from '../hooks/useMagnetic';
import OrderModal from './OrderModal';

export default function CtaOverlay({ showModal: externalModal, setShowModal: externalSetShowModal, onBook }) {
  const overlayRef = useRef(null);
  const mobile = useMobile();
  const tablet = useTablet();
  const [showModal, setShowModal] = useState(false);

  const isModalOpen = externalModal !== undefined ? externalModal : showModal;
  const setIsModalOpen = externalSetShowModal || setShowModal;

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll('.reveal').forEach((r, i) => {
          setTimeout(() => r.classList.add('active'), i * 150);
        });
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const btnPadding = tablet ? '20px 48px' : (mobile ? '18px 32px' : '24px 60px');
  const magnetic = useMagnetic();

  return (
    <>
      <section
        ref={overlayRef}
        id="cta"
        style={{
          position: 'relative', width: '100%', zIndex: 3,
          minHeight: mobile ? '100dvh' : '100vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          background: 'var(--cream)',
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
            <span className="line reveal" style={{ display: 'block', color: 'var(--ink)' }}>with one message.</span>
          </h2>
          <p className="cta-slide-sub reveal" style={{
            fontFamily: "'Geist', sans-serif", fontWeight: 300,
            fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', letterSpacing: '0.01em',
            color: 'var(--ink)', opacity: 0.8, marginBottom: 40, maxWidth: 520, lineHeight: 1.4,
          }}>
            One message. Seven days. A live product with your name on it.
          </p>
          <button
            ref={magnetic.ref}
            className="cta-btn reveal"
            onClick={() => onBook ? onBook() : setIsModalOpen(true)}
            onMouseMove={!mobile ? magnetic.onMouseMove : undefined}
            onMouseLeave={!mobile ? magnetic.onMouseLeave : undefined}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: btnPadding, background: 'var(--ink)', color: 'var(--cream)',
              fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.25rem, 2.4vw, 1.85rem)',
              textTransform: 'uppercase', border: 'none', borderRadius: 0,
              cursor: 'pointer', letterSpacing: '0.03em',
              transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
              willChange: 'transform',
            }}>
            Book a week →
          </button>
        </div>
      </section>
      {isModalOpen && <OrderModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
