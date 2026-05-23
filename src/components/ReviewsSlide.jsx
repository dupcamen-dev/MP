export default function ReviewsSlide({ cardPhase }) {
  const reviews = [
    { text: '"No fluff, no endless spec docs. Just pure, unadulterated shipping. The MVP was live before we even finished our internal meetings."', author: 'CTO, SaaS Platform' },
    { text: '"We went from napkin sketch to production in 8 days. MILLIONPIXELS doesn\'t just build — they weaponize code."', author: 'Founder, Web3 Startup' },
    { text: '"Vibe coding sounded like a joke until we saw the results. It\'s not a methodology, it\'s a weapon. Use it."', author: 'VP Product, Fintech X' },
    { text: '"The speed of delivery broke our traditional procurement cycles. We had to adapt our entire operational model to keep up. That\'s how fast they are."', author: 'Head of Engineering, DeFi Protocol' },
  ];

  const cardStyle = (i) => {
    const stagger = i * 0.18;
    const p = Math.min(1, Math.max(0, (cardPhase - stagger) / 0.32));
    return {
      padding: 32,
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(12px)',
      borderLeft: i % 2 === 0 ? '4px solid #ffd300' : '4px solid #e20000',
      opacity: p,
      transform: `translateY(${30 * (1 - p)}px)`,
      transition: 'border-color 0.3s',
    };
  };

  return (
    <section className="slide reviews-slide" id="reviews" style={{
      width: '100vw', flex: '0 0 100vw', height: '100vh',
      background: '#000', overflow: 'hidden', position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '0 80px',
    }}>
      <div style={{
        position: 'absolute', top: '-30%', right: '-10%', width: '60%', height: '80%',
        background: 'radial-gradient(ellipse, rgba(255,211,0,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', left: '-10%', width: '50%', height: '60%',
        background: 'radial-gradient(ellipse, rgba(226,0,0,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: 1200, marginBottom: 48,
        display: 'flex', alignItems: 'baseline', gap: 24,
      }}>
        <h2 style={{
          fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3rem,7vw,6rem)',
          lineHeight: 0.9, color: '#fff', textTransform: 'uppercase',
          letterSpacing: '0.02em', margin: 0,
        }}>
          TRUSTED BY
        </h2>
        <h2 style={{
          fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3.5rem,8vw,7rem)',
          lineHeight: 0.9, color: '#e20000', textTransform: 'uppercase',
          letterSpacing: '0.02em', margin: 0, textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
        }}>
          BUILDERS
        </h2>
      </div>

      <div className="reviews-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20,
        maxWidth: 1200, width: '100%',
      }}>
        {reviews.slice(0, 2).map((r, i) => (
          <div key={i} style={cardStyle(i)}>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontSize: '1rem',
              lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', margin: 0,
            }}>{r.text}</p>
            <h4 style={{
              fontFamily: "'Space Mono', monospace", fontSize: '0.75rem',
              fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: i % 2 === 0 ? '#ffd300' : '#e20000', marginTop: 16,
            }}>{r.author}</h4>
          </div>
        ))}
        <div style={cardStyle(2)}>
          <p style={{
            fontFamily: "'Geist', sans-serif", fontSize: '1rem',
            lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', margin: 0,
          }}>{reviews[2].text}</p>
          <h4 style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.75rem',
            fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#ffd300', marginTop: 16,
          }}>{reviews[2].author}</h4>
        </div>
        <div style={{ gridColumn: '1 / -1', ...cardStyle(3) }}>
          <p style={{
            fontFamily: "'Geist', sans-serif", fontSize: '1rem',
            lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', margin: 0,
          }}>{reviews[3].text}</p>
          <h4 style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.75rem',
            fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#e20000', marginTop: 16,
          }}>{reviews[3].author}</h4>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 6, opacity: 0.3,
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
          letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase',
        }}>SCROLL TO EXPLORE</span>
        <div style={{
          width: 20, height: 32, border: '2px solid rgba(255,255,255,0.4)', borderRadius: 10,
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
            width: 2, height: 8, background: '#fff',
            animation: 'scroll-wheel 2s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  );
}
