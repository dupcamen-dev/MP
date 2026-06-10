import { useEffect, useRef } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';

export default function ReviewsSlide({ cardPhase }) {
  const mobile = useMobile();
  const tablet = useTablet();
  const gridRef = useRef(null);

  const reviews = [
    { text: '"No fluff, no endless spec docs. Just pure, unadulterated shipping. The MVP was live before we even finished our internal meetings."', author: 'CTO, SaaS Platform' },
    { text: '"We went from napkin sketch to production in 8 days. MILLIONPIXELS doesn\'t just build — they weaponize code."', author: 'Founder, Web3 Startup' },
    { text: '"Vibe coding sounded like a joke until we saw the results. It\'s not a methodology, it\'s a weapon. Use it."', author: 'VP Product, Fintech X' },
    { text: '"The speed of delivery broke our traditional procurement cycles. We had to adapt our entire operational model to keep up. That\'s how fast they are."', author: 'Head of Engineering, DeFi Protocol' },
  ];

  const cardStyle = (i, visible) => {
    if (mobile) {
      return {
        padding: mobile ? (tablet ? 28 : 24) : 32,
        background: 'rgba(15,15,18,0.8)',
        borderLeft: i % 2 === 0 ? '4px solid var(--primary)' : '4px solid var(--secondary)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      };
    }
    const stagger = i * 0.18;
    const p = Math.min(1, Math.max(0, (cardPhase - stagger) / 0.32));
    return {
      padding: 32,
      background: 'rgba(15,15,18,0.8)',
      backdropFilter: 'blur(12px)',
      borderLeft: i % 2 === 0 ? '4px solid var(--primary)' : '4px solid var(--secondary)',
      opacity: p,
      transform: `translateY(${30 * (1 - p)}px)`,
      transition: 'border-color 0.3s',
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
        position: 'absolute', top: '-30%', right: '-10%', width: '60%', height: '80%',
        background: 'radial-gradient(ellipse, rgba(255,211,0,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', left: '-10%', width: '50%', height: '60%',
        background: 'radial-gradient(ellipse, rgba(212,0,26,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: 1200, marginBottom: 32,
        display: 'flex', alignItems: 'baseline', gap: 16,
      }}>
        <h2 style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: mobile ? 'clamp(2.5rem,10vw,4rem)' : 'clamp(3rem,7vw,6rem)',
          lineHeight: 0.9, color: 'var(--text)', textTransform: 'uppercase',
          letterSpacing: '0.02em', margin: 0,
        }}>
          TRUSTED BY
        </h2>
        <h2 style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: mobile ? 'clamp(3rem,12vw,5rem)' : 'clamp(3.5rem,8vw,7rem)',
          lineHeight: 0.9, color: 'var(--secondary)', textTransform: 'uppercase',
          letterSpacing: '0.02em', margin: 0, textShadow: '4px 4px 0 rgba(15,15,18,0.3)',
        }}>
          BUILDERS
        </h2>
      </div>

      <div ref={gridRef} className="reviews-grid" style={{
        display: 'grid', gridTemplateColumns: (mobile && !tablet) ? '1fr' : 'repeat(2, 1fr)',
        gap: mobile ? (tablet ? 20 : 16) : 20, maxWidth: 1200, width: '100%',
      }}>
        {reviews.slice(0, 2).map((r, i) => (
          <div key={i} className="review-card" data-visible={mobile ? 'false' : 'true'} style={cardStyle(i, !mobile || true)}>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontSize: mobile ? '0.9rem' : '1rem',
              lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', margin: 0,
            }}>{r.text}</p>
            <h4 style={{
              fontFamily: "'Space Mono', monospace", fontSize: '0.75rem',
              fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)', marginTop: 16,
            }}>{r.author}</h4>
          </div>
        ))}
        <div className="review-card" data-visible={mobile ? 'false' : 'true'} style={cardStyle(2, !mobile || true)}>
          <p style={{
            fontFamily: "'Geist', sans-serif", fontSize: mobile ? '0.9rem' : '1rem',
            lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', margin: 0,
          }}>{reviews[2].text}</p>
          <h4 style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.75rem',
            fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--primary)', marginTop: 16,
          }}>{reviews[2].author}</h4>
        </div>
        <div className="review-card" data-visible={mobile ? 'false' : 'true'} style={{ gridColumn: mobile ? '1' : '1 / -1', ...cardStyle(3, !mobile || true) }}>
          <p style={{
            fontFamily: "'Geist', sans-serif", fontSize: mobile ? '0.9rem' : '1rem',
            lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', margin: 0,
          }}>{reviews[3].text}</p>
          <h4 style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.75rem',
            fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--secondary)', marginTop: 16,
          }}>{reviews[3].author}</h4>
        </div>
      </div>
    </section>
  );
}