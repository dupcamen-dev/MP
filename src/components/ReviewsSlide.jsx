import { useEffect, useRef } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';

export default function ReviewsSlide({ cardPhase }) {
  const mobile = useMobile();
  const tablet = useTablet();
  const gridRef = useRef(null);

  const reviews = [
    { text: '"Fast execution. Clean handoff. Exactly what we needed to ship on schedule."', author: 'CTO, SaaS Platform' },
    { text: '"Eight days from sketch to live product. The pace is unmatched in our space."', author: 'Founder, Web3 Studio' },
    { text: '"Vibe coding works. Don\'t knock it until you\'ve shipped with them."', author: 'VP Product, Fintech X' },
    { text: '"They reset our timeline expectations. We\'re still catching up internally."', author: 'Head of Engineering, DeFi' },
  ];

  const cardStyle = (i, visible) => {
    if (mobile) {
      return {
        padding: mobile ? (tablet ? 28 : 24) : 32,
        background: 'var(--surface)',
        borderLeft: `3px solid ${i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        boxShadow: '0 2px 8px rgba(135, 70, 38, 0.08)',
      };
    }
    const stagger = i * 0.18;
    const p = Math.min(1, Math.max(0, (cardPhase - stagger) / 0.32));
    return {
      padding: 32,
      background: 'var(--surface)',
      borderLeft: `3px solid ${i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'}`,
      opacity: p,
      transform: `translateY(${30 * (1 - p)}px)`,
      transition: 'border-color 0.3s, box-shadow 0.3s',
      boxShadow: '0 4px 16px rgba(135, 70, 38, 0.1)',
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
      {/* Layer 1: photo background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/reviews-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.18,
        filter: 'sepia(0.4) saturate(0.7) contrast(1.1)',
        pointerEvents: 'none',
      }} />
      {/* Layer 2: warm gradient overlay for readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(250,246,240,0.88) 0%, rgba(243,217,201,0.78) 100%)',
        pointerEvents: 'none',
      }} />
      {/* Layer 3: soft accent glows */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%', width: '50%', height: '70%',
        background: 'radial-gradient(ellipse, rgba(201, 123, 92, 0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-10%', width: '40%', height: '50%',
        background: 'radial-gradient(ellipse, rgba(135, 70, 38, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1, width: '100%', maxWidth: 1200,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{
          width: '100%', marginBottom: 32,
          display: 'flex', alignItems: 'baseline', gap: 16, justifyContent: 'center',
          flexWrap: 'wrap',
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
            lineHeight: 0.9, color: 'var(--primary)', textTransform: 'uppercase',
            letterSpacing: '0.02em', margin: 0,
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
                lineHeight: 1.6, color: 'var(--text)', margin: 0,
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
              lineHeight: 1.6, color: 'var(--text)', margin: 0,
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
              lineHeight: 1.6, color: 'var(--text)', margin: 0,
            }}>{reviews[3].text}</p>
            <h4 style={{
              fontFamily: "'Space Mono', monospace", fontSize: '0.75rem',
              fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--secondary)', marginTop: 16,
            }}>{reviews[3].author}</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
