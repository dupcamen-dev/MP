import { useEffect } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';
import { useMagnetic } from '../hooks/useMagnetic';
import ScrambleText from './ScrambleText';

const phases = [
  { num: '01', title: 'IDEATION', desc: 'Day 1–2. We align on scope, stack, and success criteria.' },
  { num: '02', title: 'BUILD', desc: 'Day 2–6. Daily builds. You see real progress every 24h.' },
  { num: '03', title: 'LAUNCH', desc: 'Day 7. Live, documented, yours. Repo access from day 1.' },
];

export default function Process({ progress }) {
  const mobile = useMobile();
  const tablet = useTablet();
  const magPrimary = useMagnetic();
  const magOutline = useMagnetic();

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
      marginBottom: mobile ? '0' : '-100vh',
      background: 'var(--bg-alt)', paddingTop: mobile ? (tablet ? '80px' : '60px') : '120px', paddingBottom: mobile ? (tablet ? '60px' : '40px') : '100px',
      paddingLeft: 'clamp(24px, 5%, 80px)', paddingRight: 'clamp(24px, 5%, 80px)',
    }}>
      <div className="section-inner" style={{
        width: '100%', margin: '0 auto', paddingLeft: 'clamp(24px, 5%, 80px)', paddingRight: 'clamp(24px, 5%, 80px)',
        position: 'relative', zIndex: 2,
      }}>
        <h1 style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(4rem,10vw,8.75rem)',
          lineHeight: 0.85, textTransform: 'uppercase',
          color: 'var(--primary)',
          marginBottom: 32,
        }}>
          FROM IDEA<br />
          <span style={{
            color: 'var(--secondary)', display: 'inline-block',
            marginLeft: 'clamp(2rem,6vw,6rem)',
          }}>
            <ScrambleText text="TO LIVE" cascade={100} speed={110} />
          </span>
        </h1>
        <p style={{
          fontFamily: "'Geist', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)',
          lineHeight: 1.2, letterSpacing: '0.01em',
          color: '#333', maxWidth: 900, fontWeight: 300, margin: 0,
        }}>
          Three phases. Seven days. One live URL.
        </p>

        <div className="process-actions" style={{ display: 'flex', gap: 16, marginTop: 64, flexWrap: 'wrap' }}>
          <a ref={magPrimary.ref} href="#cta" className="process-btn primary"
            onMouseMove={!mobile ? magPrimary.onMouseMove : undefined}
            onMouseLeave={!mobile ? magPrimary.onMouseLeave : undefined}
            style={{
            padding: '18px 56px', background: 'var(--primary)',
            color: '#111', fontFamily: "'Anton', Impact, sans-serif",
            fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', textTransform: 'uppercase',
            textDecoration: 'none', border: 'none',
            display: 'inline-block', fontWeight: 700, letterSpacing: '0.05em',
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
            willChange: 'transform',
          }}>START YOUR MVP</a>
          <a ref={magOutline.ref} href="#showcase" className="process-btn outline"
            onMouseMove={!mobile ? magOutline.onMouseMove : undefined}
            onMouseLeave={!mobile ? magOutline.onMouseLeave : undefined}
            style={{
            padding: '18px 56px', background: 'transparent',
            color: '#111', fontFamily: "'Anton', Impact, sans-serif",
            fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', textTransform: 'uppercase',
            textDecoration: 'none', border: '2px solid #111',
            display: 'inline-block', letterSpacing: '0.05em',
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
            willChange: 'transform',
          }}>SEE OUR WORK</a>
        </div>
      </div>

      <div className="section-inner" style={{ width: '100%', margin: '0 auto', paddingLeft: 'clamp(24px, 5%, 80px)', paddingRight: 'clamp(24px, 5%, 80px)', marginTop: 120 }}>
        {phases.map((p, i) => (
          <div key={i} className="phase-item" style={{
            display: 'grid',
            gridTemplateColumns: mobile ? 'auto 1fr' : 'auto 1fr auto',
            alignItems: 'baseline', gap: mobile ? 16 : 32,
            padding: mobile ? '32px 0' : '48px 0',
            borderTop: i === 0 ? '1px solid #1a1a1a' : 'none',
            borderBottom: '1px solid #1a1a1a',
          }}>
            <span style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: mobile ? 'clamp(2.5rem, 8vw, 4rem)' : 'clamp(3rem, 6vw, 5rem)',
              color: 'var(--primary)', lineHeight: 1, fontWeight: 700,
            }}>{p.num}</span>
            <h3 style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: mobile ? 'clamp(2rem, 7vw, 3.5rem)' : 'clamp(2.5rem, 5vw, 4rem)',
              color: '#111', textTransform: 'uppercase', margin: 0, lineHeight: 1,
              letterSpacing: '0.01em',
            }}>{p.title}</h3>
            {!mobile && (
              <p style={{
                fontFamily: "'Geist', sans-serif", fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)',
                lineHeight: 1.4, color: '#666', maxWidth: 360, margin: 0, textAlign: 'right',
              }}>{p.desc}</p>
            )}
            {mobile && (
              <p style={{
                gridColumn: '1 / -1',
                fontFamily: "'Geist', sans-serif", fontSize: '1.125rem',
                lineHeight: 1.4, color: '#666', margin: 0,
              }}>{p.desc}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
