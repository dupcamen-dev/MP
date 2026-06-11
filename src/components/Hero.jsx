import { useEffect, useRef } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';

export default function Hero({ progress }) {
  const pixelsRef = useRef(null);
  const mobile = useMobile();
  const tablet = useTablet();

  useEffect(() => {
    const el = pixelsRef.current;
    const title = el?.closest('.hero-title');
    if (!el || !title) return;
    function onScroll() {
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
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="hero" style={{
      height: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '120px 64px 80px',
      position: 'sticky', top: 0, zIndex: 1, overflow: 'hidden',
      background: 'var(--primary)', color: 'var(--bg)',
    }}>
      <div style={{
        position: 'relative', zIndex: 2, maxWidth: 1200, width: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: 48,
      }}>
        <h1 className="hero-title" style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(4rem,15vw,12.5rem)',
          lineHeight: 0.85, textTransform: 'uppercase', color: 'var(--bg)',
          width: '100%', textShadow: '8px 8px 0 var(--secondary)',
        }}>
          <span className="line" style={{ display: 'block' }}>
            MILLION
          </span>
          <span ref={pixelsRef} className="line" style={{
            display: 'block', willChange: 'transform, color',
          }}>
            PIXELS
          </span>
        </h1>
        <p className="hero-sub" style={{
          maxWidth: 800, width: '100%',
          fontFamily: "'Geist', sans-serif",
          fontSize: 'clamp(1.25rem, 2.4vw, 1.875rem)',
          lineHeight: 1.3, letterSpacing: '0.02em', fontWeight: 300,
          color: 'var(--bg)', textAlign: 'center', textTransform: 'none',
          margin: 0,
        }}>
          Your MVP in 7 days.{' '}
          <span style={{ color: 'var(--secondary)', fontWeight: 500 }}>Built with vibe coding.</span>
        </p>
      </div>
    </section>
  );
}
