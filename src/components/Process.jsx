import { useEffect, useRef } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';

export default function Process({ progress }) {
  const marqueeRef = useRef(null);
  const totalWRef = useRef(null);
  const mobile = useMobile();
  const tablet = useTablet();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    if (marqueeRef.current) totalWRef.current = marqueeRef.current.scrollWidth / 2;
    const el = document.getElementById('process');
    if (!el) return;

    const supportsSDA = CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

    function update() {
      const sy = window.scrollY;
      // Marquee always needs JS
      if (marqueeRef.current && totalWRef.current) {
        const offset = Math.round((-sy * 0.5) % totalWRef.current);
        marqueeRef.current.style.transform = `translateX(${offset}px)`;
      }
      // Parallax: use CSS SDA when supported
      if (supportsSDA) return;
      const vh = window.innerHeight;
      const t = Math.max(0, Math.min(1, (sy - vh) / vh));
      el.style.transform = `translateY(${-50 * (1 - t)}vh)`;
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('#process .card-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); observer.unobserve(e.target); } });
    }, { threshold: 0 });
    cards.forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" style={{
      position: 'relative', zIndex: 3,
      marginBottom: mobile ? '0' : '-100vh',
      background: 'var(--bg-alt)', padding: mobile ? (tablet ? '80px 0 0' : '60px 0 0') : '120px 0 0',
    }}>
      <div className="section-inner" style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 64px',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#f5f5f5', padding: '8px 16px 8px 20px',
          position: 'relative', overflow: 'hidden', marginBottom: 32,
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
            background: 'repeating-linear-gradient(45deg, #ddd 0px, #ddd 3px, var(--primary) 3px, var(--primary) 6px)',
          }} />
          <span style={{
            marginLeft: 8, fontFamily: "'Space Mono', monospace",
            fontSize: '0.75rem', letterSpacing: '0.05em',
            color: '#666', textTransform: 'uppercase',
          }}>
            M.26 / INITIATED
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(4rem,10vw,8.75rem)',
          lineHeight: 0.85, textTransform: 'uppercase',
          color: 'var(--primary)',
          position: 'relative', zIndex: 1,
        }}>
          THE GRIND<br />
          <span style={{
            color: 'var(--secondary)', display: 'inline-block',
            marginLeft: 'clamp(2rem,6vw,6rem)',
          }}>PROTOCOL</span>
        </h1>
        <p style={{
          fontFamily: "'Geist', sans-serif", fontSize: 'clamp(1.5rem,3vw,2rem)',
          lineHeight: 1.3, letterSpacing: '0.02em',
          color: '#333', maxWidth: 800, marginTop: 48, fontWeight: 300,
        }}>
          RAW CRAFT. ZERO EXCUSES.
        </p>
        <div className="process-actions" style={{ display: 'flex', gap: 16, marginTop: 48 }}>
          <a href="#process" className="process-btn primary" style={{
            padding: '16px 48px', background: 'var(--primary)',
            color: '#111', fontFamily: "'Anton', Impact, sans-serif",
            fontSize: 'clamp(1rem,2.5vw,1.25rem)', textTransform: 'uppercase',
            textDecoration: 'none', border: 'none',
            display: 'inline-block', fontWeight: 700,
          }}>ENGAGE</a>
          <a href="#showcase" className="process-btn outline" style={{
            padding: '16px 48px', background: 'transparent',
            color: '#111', fontFamily: "'Anton', Impact, sans-serif",
            fontSize: 'clamp(1rem,2.5vw,1.25rem)', textTransform: 'uppercase',
            textDecoration: 'none', border: '2px solid #111',
            display: 'inline-block',
          }}>VIEW WORK</a>
        </div>
      </div>

      <div className="section-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 64px' }}>
        <div className="process-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24,
          padding: '80px 0 120px', position: 'relative', zIndex: 2,
        }}>
          <div className="bento-card wide bento-wide card-in" style={{
            background: '#ffffff',
            border: '1px solid #e0e0e0',
            padding: 32, position: 'relative',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48,
            }}>
              <span style={{
                fontFamily: "'Anton', Impact, sans-serif", fontSize: '3rem',
                color: 'var(--secondary)', lineHeight: 1, display: 'block',
              }}>PHASE.1</span>
            </div>
            <h3 style={{
              fontFamily: "'Anton', Impact, sans-serif", fontSize: '2rem',
              textTransform: 'uppercase', color: '#111',
              marginBottom: 16, lineHeight: 1.1,
            }}>IDEATION</h3>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontSize: '1rem',
              lineHeight: 1.5, color: '#666',
            }}>
              Define the core. Strip the rest.
            </p>
          </div>
          <div className="bento-card card-in" style={{
            background: '#ffffff',
            border: '1px solid #e0e0e0', padding: 32, position: 'relative',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48,
            }}>
              <span style={{
                fontFamily: "'Anton', Impact, sans-serif", fontSize: '3rem',
                color: 'var(--secondary)', lineHeight: 1, display: 'block',
              }}>PHASE.2</span>
            </div>
            <h3 style={{
              fontFamily: "'Anton', Impact, sans-serif", fontSize: '2rem',
              textTransform: 'uppercase', color: '#111',
              marginBottom: 16, lineHeight: 1.1,
            }}>BUILD</h3>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontSize: '1rem',
              lineHeight: 1.5, color: '#666',
            }}>
              Code in the moment. Zero bottlenecks.
            </p>
          </div>
          <div className="bento-card full bento-full card-in" style={{
            background: 'var(--primary)',
            border: 'none', padding: 48, position: 'relative',
          }}>
            <div className="phase3-inner" style={{
              position: 'relative', zIndex: 1,
            }}>
              <div>
                <span style={{
                  fontFamily: "'Anton', Impact, sans-serif", fontSize: '2rem',
                  color: 'rgba(0,0,0,0.4)', lineHeight: 1, display: 'block', marginBottom: 16,
                }}>PHASE.3</span>
                <h3 style={{
                  fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
                  color: '#111', textTransform: 'uppercase', lineHeight: 1.1,
                }}>LAUNCH</h3>
              </div>
              <div style={{ maxWidth: 400 }}>
                <p style={{
                  fontFamily: "'Geist', sans-serif", fontSize: '1rem',
                  lineHeight: 1.5, color: 'rgba(0,0,0,0.7)', fontWeight: 500,
                }}>
                  Precision launch. Scale with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: 'var(--secondary)', padding: '24px 0', overflow: 'hidden',
        position: 'relative',
        zIndex: 3, marginTop: 48,
      }}>
        <div ref={marqueeRef} style={{
          display: 'flex', whiteSpace: 'nowrap', width: 'max-content',
          willChange: 'transform',
        }}>
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              <span style={{
                fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
                textTransform: 'uppercase', color: '#fff', padding: '0 32px',
              }}>RAW CRAFT</span>
              <span style={{
                fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', padding: '0 32px',
              }}>///</span>
              <span style={{
                fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
                textTransform: 'uppercase', color: '#fff', padding: '0 32px',
              }}>ZERO EXCUSES</span>
              <span style={{
                fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', padding: '0 32px',
              }}>///</span>
              <span style={{
                fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
                textTransform: 'uppercase', color: '#fff', padding: '0 32px',
              }}>SHIP IT</span>
              <span style={{
                fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', padding: '0 32px',
              }}>///</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
