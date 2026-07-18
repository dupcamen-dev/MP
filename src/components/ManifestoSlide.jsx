import { useEffect, useRef, useState } from 'react';
import { useMobile } from '../hooks/useMobile';

// Manifesto Line — one confident statement. No paragraph, no buzzwords.
export default function ManifestoSlide({ progress }) {
  const cardRef = useRef(null);
  const sectionRef = useRef(null);
  const mobile = useMobile();
  const [bgVisible, setBgVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('active'); observer.unobserve(el); }
    }, { threshold: 0.3 });
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

  const line = (
    <div ref={cardRef} className="card-in" style={{
      width: '100%', maxWidth: 1100, textAlign: 'left', position: 'relative', zIndex: 2,
    }}>
      <h2 style={{
        fontFamily: "'Anton', Impact, sans-serif",
        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
        lineHeight: 0.95, textTransform: 'uppercase',
        color: 'var(--cream)', margin: 0, letterSpacing: '0.005em',
      }}>
        <span style={{ color: 'var(--sienna)' }}>We don&apos;t do meetings about meetings.</span><br />
        <span style={{ color: 'var(--sienna)' }}>We do live </span><span style={{ color: 'var(--cream)' }}>software</span>,<br />
        <span style={{ color: 'var(--sienna)' }}>in </span><span style={{ color: 'var(--cream)' }}>seven days</span>.
      </h2>
    </div>
  );

  if (mobile) {
    return (
      <>
        <div aria-hidden="true" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/manifesto-bg.webp)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          zIndex: 0, opacity: bgVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }} />
        <section className="slide manifesto-slide" id="manifesto" ref={sectionRef} style={{
          width: '100%', minHeight: '80vh',
          overflow: 'hidden', position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'center',
          paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: 'clamp(80px, 12vh, 140px)',
          paddingLeft: 'clamp(24px, 8%, 140px)', paddingRight: 'clamp(24px, 5%, 100px)',
        }}>
          {line}
        </section>
      </>
    );
  }

  return (
    <section className="slide manifesto-slide" id="manifesto" style={{
      width: '100vw', flex: '0 0 100vw', height: '100vh',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/manifesto-bg.webp)',
      backgroundSize: 'cover', backgroundPosition: 'center',
      overflow: 'hidden', position: 'relative',
      display: 'flex', alignItems: 'center',
      paddingLeft: 'clamp(24px, 8%, 140px)', paddingRight: 'clamp(24px, 5%, 100px)',
    }}>
      {line}
    </section>
  );
}
