import { useEffect, useRef } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';
import ScrambleText from './ScrambleText';

export default function Hero({ progress }) {
  const pixelsRef = useRef(null);
  const mobile = useMobile();
  const tablet = useTablet();

  useEffect(() => {
    const el = pixelsRef.current;
    const title = el?.closest('.hero-title');
    if (!el || !title) return;
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const p = Math.min(1, window.scrollY / window.innerHeight);
        const maxSkew = mobile ? (tablet ? 6 : 4) : 12;
        const skew = p * maxSkew;
        const shadowPx = mobile ? (tablet ? 6 : 4) : 8;
        const r = Math.round(33 + (255 - 33) * p);
        const g = Math.round(32 + (255 - 32) * p);
        const b = Math.round(34 + (255 - 34) * p);
        el.style.color = `rgb(${r},${g},${b})`;
        el.style.transform = `translateY(-8px) skewX(${-skew}deg)`;
        const shadowPct = 1 - p;
        title.style.textShadow = `${Math.round(shadowPx * shadowPct)}px ${Math.round(shadowPx * shadowPct)}px 0 var(--secondary)`;
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="hero" style={{
      height: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'flex-start', paddingLeft: 'clamp(24px, 8%, 140px)', paddingRight: 'clamp(24px, 5%, 120px)', paddingTop: '120px', paddingBottom: '80px',
      position: 'sticky', top: 0, zIndex: 1, overflow: 'hidden',
      background: 'var(--primary)', color: 'var(--bg)',
    }}>
      <div style={{
        position: 'relative', zIndex: 2, maxWidth: 800,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        textAlign: 'left', gap: 40,
      }}>
        <h1 className="hero-title" style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(4rem,15vw,12.5rem)',
          lineHeight: 0.85, textTransform: 'uppercase', color: 'var(--bg)',
          width: '100%', textShadow: '8px 8px 0 var(--secondary)',
          margin: 0,
        }}>
          <span className="line" style={{ display: 'block' }}>
            <ScrambleText text="MILLION" delay={200} cascade={100} speed={120} />
          </span>
          <span ref={pixelsRef} className="line" style={{
            display: 'block', willChange: 'transform, color',
          }}>
            <ScrambleText text="PIXELS" delay={650} cascade={90} speed={100} />
          </span>
        </h1>
        <p className="hero-sub" style={{
          width: '100%',
          fontFamily: "'Geist', sans-serif",
          fontSize: 'clamp(1.25rem, 2.4vw, 1.875rem)',
          lineHeight: 1.3, letterSpacing: '0.01em', fontWeight: 300,
          color: 'var(--bg)', textAlign: 'left',
          margin: 0,
        }}>
          From idea to live product in 7 days.{' '}
          <span style={{ color: 'var(--secondary)', fontWeight: 500 }}>Senior engineers + AI.</span>
        </p>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start',
          gap: mobile ? 12 : 20, maxWidth: 100%,
        }}>
          {['Next.js', 'React', 'Node', 'Postgres', 'Stripe', 'TypeScript'].map((s) => (
            <span key={s} style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: '0.875rem', fontWeight: 500,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              color: 'rgba(42, 37, 32, 0.7)',
              padding: '6px 14px',
              border: '1px solid rgba(42, 37, 32, 0.25)',
            }}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
