import { useEffect, useRef } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';

export default function ReviewsSlide({ cardPhase }) {
  const mobile = useMobile();
  const tablet = useTablet();
  const gridRef = useRef(null);

  const reviews = [
    { text: '4 pages → 14. Stripe live. 312 signups in week one. The MVP we launched had paying users by day 3.', author: 'SaaS founder, B2B platform' },
    { text: 'Smart contracts, landing page, and admin panel — all in 6 days. The audit passed on the first pass.', author: 'Studio lead, Web3 protocol' },
    { text: 'Audit-ready MVP in 5 days. We saved 6 weeks of in-house engineering and shipped before our competitor.', author: 'CTO, DeFi protocol' },
  ];

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

  const cardStyle = {
    padding: mobile ? (tablet ? 28 : 24) : 32,
    background: 'transparent',
  };

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
          fontFamily: "'Anton', Impact, sans-serif", fontSize: mobile ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(3rem, 6vw, 5rem)',
          lineHeight: 0.95, color: 'var(--primary)', textTransform: 'uppercase',
          letterSpacing: '0.01em', margin: 0, textAlign: 'center',
        }}>
          12 PROJECTS. 6.3 AVG DAYS.<br />ZERO HANDOVER DRAMA.
        </h2>

        <div ref={gridRef} className="reviews-grid" style={{
          display: 'grid', gridTemplateColumns: (mobile && !tablet) ? '1fr' : 'repeat(2, 1fr)',
          gap: mobile ? (tablet ? 32 : 24) : 48, maxWidth: 1200, width: '100%',
          marginTop: mobile ? 32 : 24,
        }}>
          {reviews.slice(0, 2).map((r, i) => (
            <div key={i} className="review-card" style={cardStyle}>
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
          <div className="review-card" style={{ gridColumn: mobile ? '1' : '1 / -1', ...cardStyle }}>
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
