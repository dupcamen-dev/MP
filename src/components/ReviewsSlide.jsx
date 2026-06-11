import { useEffect, useRef } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';

export default function ReviewsSlide({ cardPhase }) {
  const mobile = useMobile();
  const tablet = useTablet();
  const gridRef = useRef(null);

  const reviews = [
    { text: '"Fast execution. Clean handoff. Exactly what we needed to ship on schedule."', author: 'CTO, SaaS Platform' },
    { text: '"Eight days from sketch to live product. The pace is unmatched in our space."', author: 'Founder, Web3 Studio' },
    { text: '"They reset our timeline expectations. We\'re still catching up internally."', author: 'Head of Engineering, DeFi' },
  ];

  const cardStyle = (visible) => {
    if (mobile) {
      return {
        padding: mobile ? (tablet ? 28 : 24) : 32,
        background: 'transparent',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      };
    }
    const p = cardPhase;
    return {
      padding: 32,
      background: 'transparent',
      opacity: p,
      transform: `translateY(${30 * (1 - p)}px)`,
      transition: 'opacity 0.4s ease, transform 0.4s ease',
    };
  };

  useEffect(() => {
    if (!mobile) return;
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll('.review-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Array.from(cards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.setAttribute('data-visible', 'true');
          }, idx * 120);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [mobile]);

  return (
    <section className="slide reviews-slide" id="reviews" style={{
      width: '100vw', flex: '0 0 100vw',
      height: mobile ? 'auto' : '100vh',
      minHeight: mobile ? '100dvh' : undefined,
      background: 'var(--surface-low)', overflow: mobile ? 'visible' : 'hidden',
      position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center',
      padding: mobile ? '60px 24px' : '0 80px',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/reviews-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.08,
        filter: 'sepia(0.5) saturate(0.6) contrast(1.1)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'relative', zIndex: 1, width: '100%', maxWidth: 1200,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
      }}>
        <h2 style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: mobile ? 'clamp(3rem, 12vw, 5rem)' : 'clamp(3.5rem, 8vw, 7rem)',
          lineHeight: 0.9, color: 'var(--primary)', textTransform: 'uppercase',
          letterSpacing: '0.01em', margin: 0, textAlign: 'center',
        }}>
          TRUSTED BY BUILDERS
        </h2>

        <div ref={gridRef} className="reviews-grid" style={{
          display: 'grid', gridTemplateColumns: (mobile && !tablet) ? '1fr' : 'repeat(2, 1fr)',
          gap: mobile ? (tablet ? 32 : 24) : 48, maxWidth: 1200, width: '100%',
          marginTop: mobile ? 32 : 24,
        }}>
          {reviews.slice(0, 2).map((r, i) => (
            <div key={i} className="review-card" data-visible={mobile ? 'false' : 'true'} style={cardStyle(!mobile || true)}>
              <p style={{
                fontFamily: "'Geist', sans-serif", fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
                lineHeight: 1.5, color: 'var(--text)', margin: 0, fontWeight: 400,
              }}>{r.text}</p>
              <h4 style={{
                fontFamily: "'Geist', sans-serif", fontSize: '0.95rem',
                fontWeight: 500, letterSpacing: '0.02em',
                color: 'var(--text-dim)', marginTop: 20,
              }}>{r.author}</h4>
            </div>
          ))}
          <div className="review-card" data-visible={mobile ? 'false' : 'true'} style={{ gridColumn: mobile ? '1' : '1 / -1', ...cardStyle(!mobile || true) }}>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
              lineHeight: 1.5, color: 'var(--text)', margin: 0, fontWeight: 400, maxWidth: 800,
            }}>{reviews[2].text}</p>
            <h4 style={{
              fontFamily: "'Geist', sans-serif", fontSize: '0.95rem',
              fontWeight: 500, letterSpacing: '0.02em',
              color: 'var(--text-dim)', marginTop: 20,
            }}>{reviews[2].author}</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
