import { useEffect, useRef, useState } from 'react';

export default function ManifestoSlide({ progress }) {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const mobile = window.innerWidth < 900;
  const [scrollProgress, setScrollProgress] = useState(0);

  const hlPct = mobile
    ? Math.min(100, Math.max(0, scrollProgress * 100))
    : Math.min(100, Math.max(0, ((progress - 0.58) / 0.15) * 100));

  useEffect(() => {
    if (!mobile) return;
    const container = containerRef.current;
    if (!container) return;

    function update() {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const containerHeight = container.offsetHeight;
      const scrollableDistance = containerHeight - vh;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / scrollableDistance));
      setScrollProgress(p);
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [mobile]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('active'); observer.unobserve(el); }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (mobile) {
    return (
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '250vh',
          zIndex: 1,
        }}
      >
        <section
          className="slide manifesto-slide"
          id="manifesto"
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            height: '100dvh',
            background: '#000',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 24px',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
            background: 'rgba(255,211,0,0.12)',
            transform: 'skew(12deg) translateX(25%)', pointerEvents: 'none',
          }} />
          <div ref={ref} className="card-in" style={{ maxWidth: 900, width: '100%', textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <h2 style={{
              fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
              color: 'var(--text)', marginBottom: 32,
            }}>
              SPEED IS A <span style={{ color: 'var(--secondary)' }}>FEATURE.</span>
            </h2>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontSize: 'clamp(1.1rem,2vw,1.5rem)',
              lineHeight: 1.6, color: 'var(--text)', textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              We reject the bureaucracy of modern software development. No endless meetings.
              No pixel-pushing committees. We code on instinct. We build for impact.{' '}
              <span style={{
                background: `linear-gradient(90deg, var(--primary) ${hlPct}%, transparent ${hlPct}%)`,
                padding: '2px 8px', color: 'var(--text)',
                transition: 'background 0.1s ease-out',
              }}>
                Vibe coding is the raw translation of thought to reality.
              </span>{' '}
              Slash the rules. Grind the raw.
            </p>
          </div>
          <div style={{
            position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
            zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 6, opacity: scrollProgress < 0.9 ? 0.4 : 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
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
      </div>
    );
  }

  return (
    <section className="slide manifesto-slide" id="manifesto" style={{
      width: '100vw', flex: '0 0 100vw', height: '100vh',
      background: '#000', overflow: 'hidden', position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '0 64px',
    }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
        background: 'rgba(255,211,0,0.12)',
        transform: 'skew(12deg) translateX(25%)', pointerEvents: 'none',
      }} />
      <div ref={ref} className="card-in" style={{ maxWidth: 900, width: '100%', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h2 style={{
          fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
          color: 'var(--text)', marginBottom: 32,
        }}>
          SPEED IS A <span style={{ color: 'var(--secondary)' }}>FEATURE.</span>
        </h2>
        <p style={{
          fontFamily: "'Geist', sans-serif", fontSize: 'clamp(1.1rem,2vw,1.5rem)',
          lineHeight: 1.6, color: 'var(--text)', textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          We reject the bureaucracy of modern software development. No endless meetings.
          No pixel-pushing committees. We code on instinct. We build for impact.{' '}
          <span style={{
            background: `linear-gradient(90deg, var(--primary) ${hlPct}%, transparent ${hlPct}%)`,
            padding: '2px 8px', color: 'var(--text)',
          }}>
            Vibe coding is the raw translation of thought to reality.
          </span>{' '}
          Slash the rules. Grind the raw.
        </p>
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
