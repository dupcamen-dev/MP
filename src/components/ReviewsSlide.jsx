export default function ReviewsSlide({ cardPhase }) {
  const reviews = [
    { text: '"No fluff, no endless spec docs. Just pure, unadulterated shipping. The MVP was live before we even finished our internal meetings."', author: 'CTO, SaaS Platform' },
    { text: '"We went from napkin sketch to production in 8 days. MILLIONPIXELS doesn\'t just build — they weaponize code."', author: 'Founder, Web3 Startup' },
    { text: '"Vibe coding sounded like a joke until we saw the results. It\'s not a methodology, it\'s a weapon. Use it."', author: 'VP Product, Fintech X' },
  ];

  const missingAuthor = [
    { text: '"The speed of delivery broke our traditional procurement cycles. We had to adapt our entire operational model to keep up. That\'s how fast they are."', author: 'Head of Engineering, DeFi Protocol' },
  ];

  const cardStyle = (i) => {
    const stagger = i * 0.18;
    const p = Math.min(1, Math.max(0, (cardPhase - stagger) / 0.32));
    return {
      padding: 28, display: 'flex', flexDirection: 'column', gap: 16,
      background: 'rgba(33,32,34,0.6)',
      opacity: p,
      transform: `translateY(${40 * (1 - p)}px)`,
    };
  };

  return (
    <section className="slide reviews-slide" id="reviews" style={{
      width: '100vw', flex: '0 0 100vw', height: '100vh',
      background: 'var(--surface-low)', overflow: 'hidden', position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '0 64px',
    }}>
      <h2 style={{
        fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
        color: 'var(--text)', borderLeft: '8px solid var(--primary)',
        paddingLeft: 16, marginBottom: 64, width: '100%', maxWidth: 1200,
      }}>
        TRUSTED BY <span style={{ color: 'var(--secondary)' }}>BUILDERS</span>
      </h2>
      <div className="reviews-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
        maxWidth: 1200, width: '100%',
      }}>
        {reviews.map((r, i) => (
          <div key={i} style={{
            ...cardStyle(i),
            borderLeft: i === 1 ? '4px solid var(--text)' : '4px solid var(--primary)',
          }}>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontSize: '0.95rem',
              lineHeight: '1.5rem', color: 'rgba(255,255,255,0.85)',
            }}>{r.text}</p>
            <h4 style={{
              fontFamily: "'Geist', sans-serif", fontSize: '0.85rem',
              fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--secondary)', marginTop: 12,
            }}>{r.author}</h4>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1200, width: '100%', marginTop: 24 }}>
        {missingAuthor.map((r, i) => (
          <div key={i} style={{
            ...cardStyle(i + 3),
            borderLeft: '4px solid var(--primary)',
          }}>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontSize: '0.95rem',
              lineHeight: '1.5rem', color: 'rgba(255,255,255,0.85)',
            }}>{r.text}</p>
            <h4 style={{
              fontFamily: "'Geist', sans-serif", fontSize: '0.85rem',
              fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--secondary)', marginTop: 12,
            }}>{r.author}</h4>
          </div>
        ))}
      </div>
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 6, opacity: 0.4, pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
          letterSpacing: '0.1em', color: 'var(--text)', textTransform: 'uppercase',
        }}>SCROLL TO EXPLORE</span>
        <div style={{
          width: 20, height: 32, border: '2px solid var(--text)', borderRadius: 10,
          position: 'relative', opacity: 0.4,
        }}>
          <div style={{
            position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
            width: 2, height: 8, background: 'var(--text)',
            animation: 'scroll-wheel 2s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  );
}
