import { useEffect, useRef } from 'react';

export default function ShowcaseSlide({ cardIndex }) {
  const carouselRef = useRef(null);
  const radiusRef = useRef(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cells = carousel.querySelectorAll('.carousel-cell');
    const cellCount = cells.length;
    const cardW = 500;
    const radius = Math.round((cardW / 2) / Math.tan(Math.PI / cellCount)) + 100;
    radiusRef.current = radius;
    const theta = 360 / cellCount;
    cells.forEach((cell, i) => {
      const angle = theta * i;
      cell.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });
    carousel.style.transform = `translateZ(${-radius}px) rotateY(0deg)`;
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const rot = (cardIndex / 6) * -360;
    carousel.style.transform = `translateZ(${-radiusRef.current}px) rotateY(${rot}deg)`;
  }, [cardIndex]);

  const projects = [
    { tag: 'FINTECH / WEB3', title: 'NEO-BANK', subtitle: 'ALPHA', color: 'var(--primary)', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop' },
    { tag: 'AI / DATA', title: 'DATA', subtitle: 'SHARD', color: 'var(--secondary)', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop' },
    { tag: 'DEFI / WEB3', title: 'PROTOCOL', subtitle: 'ZERO', color: 'var(--primary)', img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop' },
    { tag: 'SAAS / AI', title: 'AGENT', subtitle: 'SMITH', color: 'var(--secondary)', img: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1974&auto=format&fit=crop' },
    { tag: 'GAMING / WEB3', title: 'DUNGEON', subtitle: 'DEEP', color: 'var(--primary)', img: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=1931&auto=format&fit=crop' },
    { tag: 'HEALTH / AI', title: 'MED', subtitle: 'PULSE', color: 'var(--secondary)', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <section className="slide showcase-slide" id="showcase" style={{
      width: '100vw', flex: '0 0 100vw', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--primary)', overflow: 'hidden', position: 'relative',
    }}>
      <div className="carousel-scene" style={{
        position: 'relative', width: '100%', height: '100%',
        perspective: 1500, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div ref={carouselRef} className="carousel-3d" style={{
          width: '100%', height: '100%', position: 'absolute',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}>
          {projects.map((p, i) => (
            <div key={i} className="carousel-cell" style={{
              position: 'absolute', left: 'calc(50% - 250px)',
              top: 'calc(50% - 350px)', width: 500, height: 700,
              backfaceVisibility: 'hidden',
            }}>
              <div className="carousel-card" style={{
                width: '100%', height: '100%', background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(24px)', border: '1px solid rgba(0,0,0,0.04)',
                position: 'relative', overflow: 'hidden', display: 'flex',
                flexDirection: 'column',
              }}>
                <div className="card-img" style={{
                  height: '55%', width: '100%', overflow: 'hidden', position: 'relative', flexShrink: 0,
                }}>
                  <img src={p.img} alt={p.title} loading="lazy" style={{
                    width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.4) contrast(1.1)',
                  }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: p.tag.includes('AI') ? 'rgba(225,0,0,0.15)' : 'rgba(255,211,0,0.15)',
                    mixBlendMode: 'soft-light', pointerEvents: 'none',
                  }} />
                </div>
                <div className="card-body" style={{
                  flex: 1, padding: '20px 24px 24px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)',
                }}>
                  <div style={{
                    fontFamily: "'Space Mono', monospace", fontSize: '0.65rem',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '3px 10px 3px 24px', marginBottom: 6, width: 'fit-content',
                    background: 'repeating-linear-gradient(-45deg, var(--primary) 0px, var(--primary) 4px, #000 4px, #000 8px)',
                    backgroundSize: '16px 100%', backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left center', color: 'rgba(0,0,0,0.5)',
                  }}>
                    {p.tag}
                  </div>
                  <h2 style={{
                    fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.3rem,2.5vw,2rem)',
                    textTransform: 'uppercase', color: '#000', lineHeight: 1.05,
                    marginBottom: 14, letterSpacing: '0.01em',
                  }}>
                    {p.title} <span style={{ color: p.color }}>{p.subtitle}</span>
                  </h2>
                  <button style={{
                    width: '100%', padding: 10, background: '#000', color: '#fff',
                    fontFamily: "'Anton', sans-serif", fontSize: '0.9rem',
                    textTransform: 'uppercase', border: 'none', cursor: 'pointer',
                    letterSpacing: '0.05em',
                  }}>VIEW PROJECT</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 6, opacity: 0.4, pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
          letterSpacing: '0.1em', color: '#000', textTransform: 'uppercase',
        }}>SCROLL TO EXPLORE</span>
        <div style={{
          width: 20, height: 32, border: '2px solid #000', borderRadius: 10,
          position: 'relative', opacity: 0.4,
        }}>
          <div style={{
            position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
            width: 2, height: 8, background: '#000',
            animation: 'scroll-wheel 2s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  );
}
