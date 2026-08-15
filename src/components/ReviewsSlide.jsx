import { useEffect, useRef } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';

const reviews = [
  {
    text: 'They took our rough idea and turned it into a working product in one week. No endless meetings, no delays — just results.',
    author: 'ZHYTO',
    role: 'Artisian homemade varenyky',
  },
  {
    text: 'From zero to a fully functional e-commerce site with payments. Shipped faster than our previous agency took to send a proposal.',
    author: 'RAQT FUEL',
    role: 'We Cook Anything You Crave',
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

const CARD_REVEALS = [
  { at: 0.43, dur: 0.035 },
  { at: 0.47, dur: 0.035 },
  { at: 0.51, dur: 0.035 },
  { at: 0.55, dur: 0.035 },
];

const HEAD_AT = 0.41;

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

export default function ReviewsSlide({ progress = 0 }) {
  const mobile = useMobile();
  const tablet = useTablet();
  const gridRef = useRef(null);

  useEffect(() => {
    if (!mobile) return;
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
  }, [mobile]);

  const headP = mobile
    ? 1
    : easeOutCubic(Math.min(1, Math.max(0, (progress - HEAD_AT) / 0.06)));
  const headWords = ['Shipped.', 'Loved.', 'Running.'];
  const headVisible = Math.round(headP * headWords.length);

  const reveal = (i) => {
    if (mobile) return { opacity: 1, transform: 'none', transition: 'none' };
    const r = CARD_REVEALS[i];
    const p = easeOutCubic(Math.min(1, Math.max(0, (progress - r.at) / r.dur)));
    return {
      opacity: p,
      transform: `translateY(${(1 - p) * 46}px)`,
      transition: 'opacity 0.3s ease, transform 0.3s ease',
    };
  };

  return (
    <section className="slide reviews-slide" id="reviews" style={{
      width: '100vw', flex: '0 0 100vw',
      height: mobile ? 'auto' : '100vh',
      minHeight: mobile ? '100dvh' : undefined,
      background: 'var(--cream)', overflow: mobile ? 'visible' : 'hidden',
      position: 'relative', zIndex: 2,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '60px', paddingBottom: '60px',
      paddingLeft: 'clamp(24px, 5%, 80px)', paddingRight: 'clamp(24px, 5%, 80px)',
    }}>
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1240, margin: '0 auto' }}>
        <p style={{
          fontFamily: "'Geist Mono', monospace", fontSize: 12,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--sienna)', margin: '0 0 20px 0',
          opacity: headP, transform: `translateY(${(1 - headP) * 16}px)`,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}>WHAT FOUNDERS SAY</p>
        <h2 style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: mobile ? 'clamp(2.2rem, 9vw, 3.5rem)' : 'clamp(2.5rem, 5vw, 4rem)',
          lineHeight: 0.95, color: 'var(--ink)', textTransform: 'uppercase',
          letterSpacing: '-0.01em', margin: '0 0 48px 0',
        }}>
          {headWords.map((w, i) => {
            const on = i < headVisible;
            return (
              <span key={i} style={{
                display: 'inline-block',
                opacity: on ? 1 : 0,
                transform: on ? 'scale(1)' : 'scale(0.9)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
                marginRight: '0.35em',
              }}>{w}{i === 2 ? '' : ''}</span>
            );
          })}
        </h2>

        <div ref={gridRef} className="reviews-grid" style={{
          display: 'grid', gridTemplateColumns: (mobile && !tablet) ? '1fr' : 'repeat(2, 1fr)',
          gap: mobile ? (tablet ? 32 : 24) : 32, width: '100%',
        }}>
          {reviews.map((r, i) => (
            <div key={i} className="review-card" style={{
              border: '1px solid var(--sienna)', padding: '28px 28px 24px',
              background: 'transparent',
              boxShadow: '5px 5px 0 rgba(0,0,0,0.08)',
              ...reveal(i),
            }}>
              <p style={{
                fontFamily: "'Geist', sans-serif", fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                lineHeight: 1.5, color: 'var(--ink)', margin: 0, fontWeight: 400,
              }}>&ldquo;{r.text}&rdquo;</p>
              <div style={{ marginTop: 20, borderTop: '1px solid rgba(0, 0, 0, 0.1)', paddingTop: 16 }}>
                <h4 style={{
                  fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.9rem',
                  letterSpacing: '0.02em',
                  color: 'var(--ink)', margin: 0, textTransform: 'uppercase',
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
