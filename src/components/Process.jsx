import { useEffect } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';

const phases = [
  { num: '01', title: 'SCOPE', days: 'Day 1', desc: 'We turn your idea into a build plan. Stack, scope, success — locked before we write a line.' },
  { num: '02', title: 'BUILD', days: 'Days 2–6', desc: 'Daily builds you can click. You watch it become real, every 24 hours.' },
  { num: '03', title: 'SHIP', days: 'Day 7', desc: 'Live, documented, yours. Full repo access from day one.' },
];

export default function Process({ progress, onBook }) {
  const mobile = useMobile();
  const tablet = useTablet();

  useEffect(() => {
    const cards = document.querySelectorAll('#process .phase-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); observer.unobserve(e.target); } });
    }, { threshold: 0.2 });
    cards.forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" style={{
      position: 'relative', zIndex: 3,
      background: 'var(--cream)',
      paddingTop: mobile ? (tablet ? '80px' : '60px') : '120px',
      paddingBottom: mobile ? (tablet ? '60px' : '40px') : '100px',
      overflow: 'hidden',
    }}>
      {/* Intro */}
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        paddingLeft: 'clamp(24px, 5%, 80px)', paddingRight: 'clamp(24px, 5%, 80px)',
      }}>
        <p style={{
          fontFamily: "'Geist Mono', monospace", fontSize: 12,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--sienna)', margin: '0 0 16px 0',
        }}>THE SEVEN-DAY BUILD</p>
        <h2 style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
          lineHeight: 0.9, textTransform: 'uppercase', color: 'var(--ink)', margin: '0 0 20px 0',
        }}>
          From idea to live<br /><span style={{ color: 'var(--ink)' }}>in 168 hours.</span>
        </h2>
        <p style={{
          fontFamily: "'Geist', sans-serif", fontWeight: 300,
          fontSize: 'clamp(1.15rem, 2vw, 1.5rem)', lineHeight: 1.4,
          color: 'var(--text-dim)', maxWidth: 640, margin: '0 0 12px 0',
        }}>
          Three phases. Seven days. One live URL.
        </p>
        <p style={{
          fontFamily: "'Geist Mono', monospace", fontSize: 12,
          letterSpacing: '0.1em', color: 'var(--sienna)', margin: 0,
        }}>NEXT.JS · REACT · NODE · POSTGRES · STRIPE · TS</p>
      </div>

      {/* Beats */}
      <div style={{ maxWidth: 1240, margin: '72px auto 0' }}>
        {phases.map((p, i) => (
          <div key={i} className="phase-item" style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'clamp(120px, 14vw, 220px) 1fr auto',
            alignItems: 'center',
            gap: mobile ? 12 : 40,
            paddingTop: mobile ? 32 : 48, paddingBottom: mobile ? 32 : 48,
            paddingLeft: 'clamp(24px, 5%, 80px)', paddingRight: 'clamp(24px, 5%, 80px)',
            borderTop: '1px solid var(--sienna)',
            borderBottom: i === phases.length - 1 ? '1px solid var(--sienna)' : 'none',
          }}>
            {/* Oversized numeral, bleeding left */}
            <span aria-hidden="true" style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: mobile ? 'clamp(3rem, 14vw, 5rem)' : 'clamp(5rem, 10vw, 9rem)',
              color: 'var(--ink)', lineHeight: 0.8, fontWeight: 400,
              marginLeft: mobile ? '-4px' : 'clamp(-30px, -3vw, -12px)',
            }}>{p.num}</span>

            <div>
              <p style={{
                fontFamily: "'Geist Mono', monospace", fontSize: 13,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--sienna)', margin: '0 0 8px 0',
              }}>{p.days}</p>
              <h3 style={{
                fontFamily: "'Anton', Impact, sans-serif",
                fontSize: mobile ? 'clamp(2rem, 9vw, 3rem)' : 'clamp(2.5rem, 5vw, 4rem)',
                color: 'var(--ink)', textTransform: 'uppercase', margin: 0, lineHeight: 0.95,
              }}>{p.title}</h3>
            </div>

            <p style={{
              fontFamily: "'Geist', sans-serif", fontWeight: 300,
              fontSize: mobile ? '1.05rem' : 'clamp(1rem, 1.4vw, 1.25rem)',
              lineHeight: 1.5, color: 'var(--text-dim)',
              maxWidth: mobile ? '100%' : 380, margin: mobile ? '12px 0 0 0' : 0,
              textAlign: mobile ? 'left' : 'right',
            }}>{p.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        paddingLeft: 'clamp(24px, 5%, 80px)', paddingRight: 'clamp(24px, 5%, 80px)',
        textAlign: 'center', marginTop: 48,
      }}>
        <button onClick={onBook}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--sienna)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ink)'; }}
          style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
          color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer',
          textTransform: 'uppercase', letterSpacing: '0.02em', padding: '8px 0',
          transition: 'color 0.2s',
        }}>Start your week →</button>
      </div>
    </section>
  );
}
