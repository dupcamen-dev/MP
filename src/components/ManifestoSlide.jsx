import { useEffect, useRef } from 'react';
import { useMobile } from '../hooks/useMobile';

// Manifesto Line — one confident statement. No paragraph, no buzzwords.
export default function ManifestoSlide({ progress }) {
  const ref = useRef(null);
  const mobile = useMobile();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('active'); observer.unobserve(el); }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const line = (
    <div ref={ref} className="card-in" style={{
      width: '100%', maxWidth: 1100, textAlign: 'left', position: 'relative', zIndex: 2,
    }}>
      <h2 style={{
        fontFamily: "'Anton', Impact, sans-serif",
        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
        lineHeight: 0.95, textTransform: 'uppercase',
        color: 'var(--ink)', margin: 0, letterSpacing: '0.005em',
      }}>
        We don&apos;t do meetings about meetings.<br />
        We do <span style={{ color: 'var(--terracotta)' }}>live software</span>,<br />
        in <span style={{ color: 'var(--terracotta)' }}>seven days</span>.
      </h2>
    </div>
  );

  if (mobile) {
    return (
      <section className="slide manifesto-slide" id="manifesto" style={{
        width: '100%', minHeight: '80vh',
        background: 'var(--cream)', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
        paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: 'clamp(80px, 12vh, 140px)',
        paddingLeft: 'clamp(24px, 8%, 140px)', paddingRight: 'clamp(24px, 5%, 100px)',
      }}>
        {line}
      </section>
    );
  }

  return (
    <section className="slide manifesto-slide" id="manifesto" style={{
      width: '100vw', flex: '0 0 100vw', height: '100vh',
      background: 'var(--cream)', overflow: 'hidden', position: 'relative',
      display: 'flex', alignItems: 'center',
      paddingLeft: 'clamp(24px, 8%, 140px)', paddingRight: 'clamp(24px, 5%, 100px)',
    }}>
      {line}
    </section>
  );
}
