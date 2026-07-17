import { useEffect, useRef } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';
import PixelSeam from './PixelSeam';

const projects = [
  {
    name: 'ZHYTO',
    url: 'zhyto.london',
    tagline: 'AI-powered business intelligence for Amazon sellers',
    stack: 'Next.js · React · Node · Postgres',
    metrics: [
      { label: 'Build time', value: '7 days' },
      { label: 'Pages shipped', value: '14' },
      { label: 'AI features', value: '3 live' },
    ],
  },
  {
    name: 'RAQT FUEL',
    url: 'raqtfuel.com',
    tagline: 'Premium supplements, direct-to-consumer',
    stack: 'Next.js · Stripe · Tailwind',
    metrics: [
      { label: 'Build time', value: '6 days' },
      { label: 'Stripe integration', value: 'Live' },
      { label: 'Product pages', value: '12' },
    ],
  },
];

export default function ReviewsSlide() {
  const mobile = useMobile();
  const tablet = useTablet();
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll('.review-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Array.from(cards).indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('active'), idx * 120);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="slide reviews-slide" id="reviews" style={{
      width: '100vw', flex: '0 0 100vw',
      height: mobile ? 'auto' : '100vh',
      minHeight: mobile ? '100dvh' : undefined,
      background: 'var(--cream)', overflow: mobile ? 'visible' : 'hidden',
      position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: mobile ? '60px' : '60px', paddingBottom: mobile ? '60px' : '60px',
      paddingLeft: 'clamp(24px, 8%, 100px)', paddingRight: 'clamp(24px, 5%, 80px)',
    }}>
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1240, margin: '0 auto' }}>
        <PixelSeam />
        <p style={{
          fontFamily: "'Geist Mono', monospace", fontSize: 12,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--sienna)', margin: '0 0 20px 0',
        }}>REAL SHIPS</p>
        <h2 style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: mobile ? 'clamp(2.2rem, 9vw, 3.5rem)' : 'clamp(2.5rem, 5vw, 4rem)',
          lineHeight: 0.95, color: 'var(--ink)', textTransform: 'uppercase',
          letterSpacing: '-0.01em', margin: '0 0 48px 0',
        }}>
          Not decks. Not mocks.<br /><span style={{ color: 'var(--terracotta)' }}>Live products.</span>
        </h2>

        <div ref={gridRef} className="reviews-grid" style={{
          display: 'grid', gridTemplateColumns: (mobile && !tablet) ? '1fr' : 'repeat(2, 1fr)',
          gap: mobile ? (tablet ? 32 : 24) : 40, width: '100%',
        }}>
          {projects.map((p, i) => (
            <div key={i} className="review-card" style={{
              border: '1px solid var(--sienna)', padding: 0,
              background: 'transparent', overflow: 'hidden',
            }}>
              {/* Project header */}
              <div style={{
                padding: '28px 32px 24px',
                borderBottom: '1px solid rgba(135, 70, 38, 0.2)',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 12 }}>
                  <h3 style={{
                    fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: 'var(--ink)', margin: 0, textTransform: 'uppercase', lineHeight: 1,
                  }}>{p.name}</h3>
                  <span style={{
                    fontFamily: "'Geist Mono', monospace", fontSize: 12,
                    color: 'var(--sienna)', letterSpacing: '0.05em',
                  }}>{p.url}</span>
                </div>
                <p style={{
                  fontFamily: "'Geist', sans-serif", fontWeight: 300,
                  fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', lineHeight: 1.4,
                  color: 'var(--text-dim)', margin: '0 0 12px 0',
                }}>{p.tagline}</p>
                <p style={{
                  fontFamily: "'Geist Mono', monospace", fontSize: 11,
                  letterSpacing: '0.08em', color: 'var(--sienna)', margin: 0,
                }}>{p.stack}</p>
              </div>

              {/* Metrics row */}
              <div style={{
                display: 'grid', gridTemplateColumns: `repeat(${p.metrics.length}, 1fr)`,
              }}>
                {p.metrics.map((m, j) => (
                  <div key={j} style={{
                    padding: '20px 24px',
                    borderRight: j < p.metrics.length - 1 ? '1px solid rgba(135, 70, 38, 0.2)' : 'none',
                  }}>
                    <p style={{
                      fontFamily: "'Anton', Impact, sans-serif",
                      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                      color: 'var(--terracotta)', margin: '0 0 4px 0', lineHeight: 1,
                    }}>{m.value}</p>
                    <p style={{
                      fontFamily: "'Geist Mono', monospace", fontSize: 10,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: 'var(--sienna)', margin: 0,
                    }}>{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
