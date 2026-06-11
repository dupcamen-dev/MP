import { useEffect, useRef, useState } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';
import ScrambleText from './ScrambleText';

export default function ManifestoSlide({ progress }) {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const mobile = useMobile();
  const tablet = useTablet();
  const [scrollProgress, setScrollProgress] = useState(0);

  const hlPct = mobile
    ? Math.min(100, Math.max(0, scrollProgress * 100))
    : Math.min(100, Math.max(0, ((progress - 0.78) / 0.16) * 100));

  useEffect(() => {
    if (!mobile) return;
    const container = containerRef.current;
    if (!container) return;

    function update() {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const containerHeight = container.offsetHeight;
      const scrollableDistance = containerHeight - vh;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / scrollableDistance));
      setScrollProgress(p);
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [mobile]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('active'); observer.unobserve(el); }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const renderGradientText = () => (
    <span style={{
      background: `linear-gradient(90deg, var(--primary) ${hlPct}%, rgba(42, 37, 32, 0.25) ${hlPct}%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      willChange: 'background',
    }}>
      Vibe coding turns thought into reality.
    </span>
  );

  const content = (
    <div ref={ref} className="card-in" style={{ maxWidth: 1000, width: '100%', textAlign: 'center', position: 'relative', zIndex: 2 }}>
      <h2 style={{
        fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(3rem, 8vw, 5.5rem)',
        color: 'var(--text)', marginBottom: 40, lineHeight: 0.9, letterSpacing: '0.01em',
      }}>
        WE SHIP IN DAYS.{' '}
        <span style={{ color: 'var(--secondary)' }}>
          <ScrambleText text="NOT WEEKS." cascade={70} speed={50} />
        </span>
      </h2>
      <p style={{
        fontFamily: "'Geist', sans-serif", fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
        lineHeight: 1.5, color: 'var(--text)', fontWeight: 300,
        maxWidth: 820, margin: '0 auto',
      }}>
        12 MVPs in 6 months. Average 6.3 days from first call to live.{' '}
        {renderGradientText()} It&apos;s not AI magic — it&apos;s senior engineers using AI to skip the boilerplate. Daily check-ins. Real product. No meetings about meetings.
      </p>
    </div>
  );

  if (mobile) {
    return (
      <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '180vh', zIndex: 1 }}>
        <section
          className="slide manifesto-slide"
          id="manifesto"
          style={{
            position: 'sticky', top: 0, width: '100%', height: '100dvh',
            background: 'var(--surface-low)', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: tablet ? '80px 40px' : '60px 24px',
          }}
        >
          {content}
        </section>
      </div>
    );
  }

  return (
    <section className="slide manifesto-slide" id="manifesto" style={{
      width: '100vw', flex: '0 0 100vw', height: '100vh',
      background: 'var(--surface-low)', overflow: 'hidden', position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '0 64px',
    }}>
      {content}
    </section>
  );
}
