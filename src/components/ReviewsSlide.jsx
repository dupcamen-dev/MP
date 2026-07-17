import { useEffect, useRef } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';
import PixelSeam from './PixelSeam';

const reviews = [
  {
    text: 'They took our rough idea and turned it into a working product in one week. No endless meetings, no delays — just results.',
    author: 'ZHYTO',
    role: 'Restaurant ordering platform',
  },
  {
    text: 'From zero to a fully functional e-commerce site with payments. Shipped faster than our previous agency took to send a proposal.',
    author: 'RAQT FUEL',
    role: 'Supplements brand',
  },
  {
    text: 'We needed an MVP fast to test the market. Got a production-ready app in 7 days. Saved us months of hiring.',
    author: 'NORD STUDIO',
    role: 'Architecture portfolio',
  },
  {
    text: 'Clean code, real deployment, everything documented. The kind of handoff that makes you want to come back for the next project.',
    author: 'KRAKOW BAKERY',
    role: 'Online ordering system',
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
        }}>WHAT FOUNDERS SAY</p>
        <h2 style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: mobile ? 'clamp(2.2rem, 9vw, 3.5rem)' : 'clamp(2.5rem, 5vw, 4rem)',
          lineHeight: 0.95, color: 'var(--ink)', textTransform: 'uppercase',
          letterSpacing: '-0.01em', margin: '0 0 48px 0',
        }}>
          Shipped. <span style={{ color: 'var(--terracotta)' }}>Loved.</span> Running.
        </h2>

        <div ref={gridRef} className="reviews-grid" style={{
          display: 'grid', gridTemplateColumns: (mobile && !tablet) ? '1fr' : 'repeat(2, 1fr)',
          gap: mobile ? (tablet ? 32 : 24) : 32, width: '100%',
        }}>
          {reviews.map((r, i) => (
            <div key={i} className="review-card" style={{
              border: '1px solid var(--sienna)', padding: '28px 28px 24px',
              background: 'transparent',
            }}>
              <p style={{
                fontFamily: "'Geist', sans-serif", fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                lineHeight: 1.5, color: 'var(--ink)', margin: 0, fontWeight: 400,
              }}>&ldquo;{r.text}&rdquo;</p>
              <div style={{ marginTop: 20, borderTop: '1px solid rgba(135, 70, 38, 0.2)', paddingTop: 16 }}>
                <h4 style={{
                  fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.9rem',
                  fontWeight: 600, letterSpacing: '0.02em',
                  color: 'var(--terracotta)', margin: 0, textTransform: 'uppercase',
                }}>{r.author}</h4>
                <p style={{
                  fontFamily: "'Geist Mono', monospace", fontSize: 10,
                  letterSpacing: '0.1em', color: 'var(--sienna)',
                  margin: '4px 0 0 0', textTransform: 'uppercase',
                }}>{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
