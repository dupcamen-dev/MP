import { useEffect } from 'react';

export default function Process() {
  useEffect(() => {
    const cards = document.querySelectorAll('#process .card-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); observer.unobserve(e.target); } });
    }, { threshold: 0.15 });
    cards.forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" style={{
      position: 'relative', background: 'var(--bg)', padding: '120px 0 0',
      zIndex: 0, transform: 'translateY(-50vh)',
    }}>
      <div className="section-inner" style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 64px',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--surface)', padding: '8px 16px 8px 20px',
          position: 'relative', overflow: 'hidden', marginBottom: 32,
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
            background: 'repeating-linear-gradient(45deg, #000 0px, #000 3px, var(--primary) 3px, var(--primary) 6px)',
          }} />
          <span style={{
            marginLeft: 8, fontFamily: "'Space Mono', monospace",
            fontSize: '0.75rem', letterSpacing: '0.05em',
            color: 'var(--primary)', textTransform: 'uppercase',
          }}>
            M.26 / INITIATED
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Anton', sans-serif", fontSize: 'clamp(4rem,10vw,8.75rem)',
          lineHeight: 0.85, textTransform: 'uppercase',
          color: 'var(--primary)', mixBlendMode: 'difference',
          position: 'relative', zIndex: 1,
        }}>
          THE GRIND<br />
          <span style={{
            color: 'var(--secondary)', display: 'inline-block',
            marginLeft: 'clamp(2rem,6vw,6rem)',
          }}>PROTOCOL</span>
        </h1>
        <p style={{
          fontFamily: "'Geist', sans-serif", fontSize: '1.25rem',
          lineHeight: '1.75rem', letterSpacing: '0.1em',
          color: 'var(--text-dim)', maxWidth: 600, marginTop: 48,
          borderLeft: '4px solid var(--secondary)', paddingLeft: 24,
        }}>
          WE DON'T BUILD WIREFRAMES. WE BUILD WAR MACHINES. THE GRIND PROTOCOL IS OUR
          UNCOMPROMISING METHODOLOGY FOR DELIVERING RAW, UNFILTERED DIGITAL EXPERIENCES
          AT SUB-ZERO SPEED.
        </p>
        <div className="process-actions" style={{ display: 'flex', gap: 16, marginTop: 48 }}>
          <a href="#process" className="process-btn primary" style={{
            padding: '16px clamp(24px,4vw,48px)', background: 'var(--primary)',
            color: 'var(--on-primary)', fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(1rem,2.5vw,1.25rem)', textTransform: 'uppercase',
            textDecoration: 'none', boxShadow: '4px 4px 0 var(--secondary)',
            display: 'inline-block',
          }}>ENGAGE</a>
          <a href="#showcase" className="process-btn outline" style={{
            padding: '16px clamp(24px,4vw,48px)', background: 'transparent',
            color: 'var(--text)', fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(1rem,2.5vw,1.25rem)', textTransform: 'uppercase',
            textDecoration: 'none', border: '2px solid var(--text)',
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
            gridColumn: 'span 2', background: 'rgba(20,19,21,0.6)',
            backdropFilter: 'blur(12px)', border: '1px solid var(--surface-highest)',
            padding: 32, position: 'relative',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48,
            }}>
              <span style={{
                fontFamily: "'Anton', sans-serif", fontSize: '3rem',
                color: 'var(--secondary)', lineHeight: 1, display: 'block',
              }}>PHASE.1</span>
              <span className="material-icons" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>target</span>
            </div>
            <h3 style={{
              fontFamily: "'Anton', sans-serif", fontSize: '2rem',
              textTransform: 'uppercase', color: 'var(--text)',
              marginBottom: 16, lineHeight: 1.1,
            }}>TACTICAL IDEATION</h3>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontSize: '0.95rem',
              lineHeight: 1.6, color: 'var(--text-dim)',
            }}>
              Strip away the corporate bloat. We define the core intent and aggressively
              discard the superfluous. Only the sharpest ideas survive the initial cull.
            </p>
          </div>
          <div className="bento-card card-in" style={{
            background: 'rgba(20,19,21,0.6)', backdropFilter: 'blur(12px)',
            border: '1px solid var(--surface-highest)', padding: 32, position: 'relative',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48,
            }}>
              <span style={{
                fontFamily: "'Anton', sans-serif", fontSize: '3rem',
                color: 'var(--secondary)', lineHeight: 1, display: 'block',
              }}>PHASE.2</span>
              <span className="material-icons" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>code</span>
            </div>
            <h3 style={{
              fontFamily: "'Anton', sans-serif", fontSize: '2rem',
              textTransform: 'uppercase', color: 'var(--text)',
              marginBottom: 16, lineHeight: 1.1,
            }}>VIBE CODING</h3>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontSize: '0.95rem',
              lineHeight: 1.6, color: 'var(--text-dim)',
            }}>
              Pure momentum. Bypassing standard design bottlenecks to code directly in
              the medium. It's raw, it's fast, and it feels right.
            </p>
          </div>
          <div className="bento-card full bento-full card-in" style={{
            gridColumn: 'span 3', background: 'var(--primary)',
            border: '1px solid var(--primary)', padding: 48, position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.1,
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)',
              backgroundSize: '20px 20px', mixBlendMode: 'overlay', pointerEvents: 'none',
            }} />
            <div style={{
              display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
              gap: 32, position: 'relative', zIndex: 1,
            }}>
              <div>
                <span style={{
                  fontFamily: "'Anton', sans-serif", fontSize: '2rem',
                  color: 'rgba(20,19,21,0.5)', lineHeight: 1, display: 'block', marginBottom: 16,
                }}>PHASE.3 // TERMINAL</span>
                <h3 style={{
                  fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
                  color: 'var(--bg)', textTransform: 'uppercase', lineHeight: 1.1,
                }}>IMPACT<br />LAUNCH</h3>
              </div>
              <div style={{ maxWidth: 400 }}>
                <p style={{
                  fontFamily: "'Geist', sans-serif", fontSize: '0.95rem',
                  lineHeight: 1.6, color: 'rgba(20,19,21,0.8)', fontWeight: 600,
                }}>
                  DEPLOYMENT IS NOT THE END. IT IS THE IGNITION. WE PUSH TO PRODUCTION
                  WITH THE FORCE OF A KINETIC STRIKE.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: 'var(--secondary)', padding: '24px 0', overflow: 'hidden',
        transform: 'rotate(-3deg) scale(1.05)', position: 'relative',
        zIndex: 3, marginTop: 48,
      }}>
        <div style={{
          display: 'flex', whiteSpace: 'nowrap', width: 'max-content',
          animation: 'marquee-h 20s linear infinite',
        }}>
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              <span style={{
                fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
                textTransform: 'uppercase', color: '#fff', padding: '0 32px',
              }}>SLASH THE RULES</span>
              <span style={{
                fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', padding: '0 32px',
              }}>///</span>
              <span style={{
                fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
                textTransform: 'uppercase', color: '#fff', padding: '0 32px',
              }}>PIXELS ARE A PROMISE</span>
              <span style={{
                fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', padding: '0 32px',
              }}>///</span>
              <span style={{
                fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
                textTransform: 'uppercase', color: '#fff', padding: '0 32px',
              }}>FRONTEND AS RITUAL</span>
              <span style={{
                fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', padding: '0 32px',
              }}>///</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
