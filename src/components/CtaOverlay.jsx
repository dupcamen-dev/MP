import { useRef, useEffect, useState } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';
import { useMagnetic } from '../hooks/useMagnetic';
import { useI18n } from '../i18n';
import OrderModal from './OrderModal';

const ctaBg = 'linear-gradient(rgba(253,253,253,0.72), rgba(253,253,253,0.72)), url(/cta-bg.webp)';

export default function CtaOverlay({ showModal: externalModal, setShowModal: externalSetShowModal, onBook }) {
  const overlayRef = useRef(null);
  const sectionRef = useRef(null);
  const mobile = useMobile();
  const tablet = useTablet();
  const [showModal, setShowModal] = useState(false);
  const [bgVisible, setBgVisible] = useState(false);
  const { t } = useI18n();

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

  useEffect(() => {
    if (!mobile) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setBgVisible(entry.isIntersecting);
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [mobile]);

  const btnPadding = tablet ? '20px 48px' : (mobile ? '18px 32px' : '24px 60px');
  const magnetic = useMagnetic();

  if (mobile) {
    return (
      <>
        <div aria-hidden="true" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
          backgroundImage: ctaBg, backgroundSize: 'cover', backgroundPosition: 'center',
          zIndex: 0, opacity: bgVisible ? 1 : 0,
          transition: 'opacity 0.3s ease', pointerEvents: 'none',
        }} />
        <section
          ref={(el) => { overlayRef.current = el; sectionRef.current = el; }}
          id="cta"
          style={{
            position: 'relative', width: '100%', zIndex: 2,
            minHeight: '100dvh',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
        >
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', maxWidth: 900, width: '100%', textAlign: 'center',
            padding: tablet ? '0 48px' : '0 24px',
          }}>
            <h2 className="cta-slide-title" style={{
              fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              lineHeight: 0.9, textTransform: 'uppercase', color: 'var(--ink)',
              letterSpacing: '-0.01em', marginBottom: 24,
            }}>
              <span className="line reveal" style={{ display: 'block' }}>{t('ctaH1a')}</span>
              <span className="line reveal" style={{ display: 'block' }}>{t('ctaH1b')}</span>
            </h2>
            <p className="cta-slide-sub reveal" style={{
              fontFamily: "'Geist', sans-serif", fontWeight: 300,
              fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', letterSpacing: '0.01em',
              color: 'var(--ink)', opacity: 0.7, marginBottom: 40, maxWidth: 520, lineHeight: 1.4,
            }}>
              {t('ctaSub')}
            </p>
            <button
              ref={magnetic.ref}
              className="cta-btn reveal"
              onClick={() => onBook ? onBook() : setIsModalOpen(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: btnPadding, background: 'var(--ink)', color: '#fff',
                fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.25rem, 2.4vw, 1.85rem)',
                textTransform: 'uppercase', border: 'none', borderRadius: 'var(--radius-pill)',
                cursor: 'pointer', letterSpacing: '0.03em',
                transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                willChange: 'transform',
              }}>
              {t('bookWeek')}
            </button>
          </div>
        </section>
        {isModalOpen && <OrderModal onClose={() => setIsModalOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <section
        ref={overlayRef}
        id="cta"
        style={{
          position: 'relative', width: '100%', zIndex: 3,
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundImage: ctaBg,
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
        }}
      >
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', maxWidth: 900, width: '100%', textAlign: 'center',
        }}>
          <h2 className="cta-slide-title" style={{
            fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            lineHeight: 0.9, textTransform: 'uppercase', color: 'var(--ink)',
            letterSpacing: '-0.01em', marginBottom: 24,
          }}>
            <span className="line reveal" style={{ display: 'block' }}>{t('ctaH1a')}</span>
            <span className="line reveal" style={{ display: 'block' }}>{t('ctaH1b')}</span>
          </h2>
          <p className="cta-slide-sub reveal" style={{
            fontFamily: "'Geist', sans-serif", fontWeight: 300,
            fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', letterSpacing: '0.01em',
            color: 'var(--ink)', opacity: 0.7, marginBottom: 40, maxWidth: 520, lineHeight: 1.4,
          }}>
            {t('ctaSub')}
          </p>
          <button
            ref={magnetic.ref}
            className="cta-btn reveal"
            onClick={() => onBook ? onBook() : setIsModalOpen(true)}
            onMouseMove={!mobile ? magnetic.onMouseMove : undefined}
            onMouseLeave={!mobile ? magnetic.onMouseLeave : undefined}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: btnPadding, background: 'var(--ink)', color: '#fff',
              fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.25rem, 2.4vw, 1.85rem)',
              textTransform: 'uppercase', border: 'none', borderRadius: 'var(--radius-pill)',
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
