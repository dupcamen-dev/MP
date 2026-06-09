import { useEffect, useRef, useState, useCallback } from 'react';
import { useMobile } from '../hooks/useMobile';

const projects = [
  { tag: 'RESTAURANT / LONDON', title: 'ZHYTO', subtitle: 'LONDON', color: 'var(--primary)', desc: 'Authentic Ukrainian varenyky & syrnyky — from Kyiv to London.', img: '/zhyto.png', link: 'https://zhyto.london' },
  { tag: 'AI / DATA', title: 'DATA', subtitle: 'SHARD', color: 'var(--secondary)', desc: 'Real-time data visualization and AI-powered analytics.', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', link: '#' },
  { tag: 'DEFI / WEB3', title: 'PROTOCOL', subtitle: 'ZERO', color: 'var(--primary)', desc: 'Zero-knowledge DeFi protocol with instant settlements.', img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop', link: '#' },
  { tag: 'SAAS / AI', title: 'AGENT', subtitle: 'SMITH', color: 'var(--secondary)', desc: 'Autonomous AI agent orchestration platform.', img: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1974&auto=format&fit=crop', link: '#' },
  { tag: 'GAMING / WEB3', title: 'DUNGEON', subtitle: 'DEEP', color: 'var(--primary)', desc: 'Immersive on-chain gaming experience.', img: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=1931&auto=format&fit=crop', link: '#' },
  { tag: 'HEALTH / AI', title: 'MED', subtitle: 'PULSE', color: 'var(--secondary)', desc: 'AI-driven health monitoring and diagnostics.', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop', link: '#' },
];

function ProjectCard({ p }) {
  return (
    <div className="carousel-card" style={{
      width: '100%', height: '100%',
      background: 'rgba(15,15,18,0.92)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(107,110,115,0.2)',
      position: 'relative', overflow: 'hidden', display: 'flex',
      flexDirection: 'column', transition: 'border-color 0.4s',
    }}>
      <div className="card-img" style={{
        height: '55%', width: '100%', overflow: 'hidden', position: 'relative', flexShrink: 0,
      }}>
        <img src={p.img} alt={p.title} loading="lazy" style={{
          width: '100%', height: '100%', objectFit: 'cover',
          filter: 'contrast(1.1)',
          transition: 'transform 0.5s',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: p.tag.includes('AI') ? 'rgba(212,0,26,0.12)' : 'rgba(255,211,0,0.12)',
          mixBlendMode: 'soft-light', pointerEvents: 'none',
        }} />
      </div>
      <div className="card-body" style={{
        flex: 1, padding: '20px 24px 24px',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        background: 'transparent',
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: '0.65rem',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '3px 10px 3px 24px', marginBottom: 8, width: 'fit-content',
          background: 'repeating-linear-gradient(-45deg, var(--primary) 0px, var(--primary) 4px, #0d0d0f 4px, #0d0d0f 8px)',
          backgroundSize: '16px 100%', backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left center', color: 'rgba(230,225,228,0.5)',
        }}>
          {p.tag}
        </div>
        <h2 style={{
          fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.3rem,2.5vw,2rem)',
          textTransform: 'uppercase', color: 'var(--text)', lineHeight: 1.05,
          marginBottom: 8, letterSpacing: '0.01em',
        }}>
          {p.title} <span style={{ color: p.color }}>{p.subtitle}</span>
        </h2>
        <p style={{
          fontFamily: "'Geist', sans-serif", fontSize: '0.8rem',
          lineHeight: 1.5, color: 'var(--text-dim)', marginBottom: 16,
          letterSpacing: '0.02em',
        }}>
          {p.desc}
        </p>
        <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
          width: '100%', padding: '12px 0', background: 'var(--surface-high)',
          color: 'var(--text)',
          fontFamily: "'Anton', sans-serif", fontSize: '0.85rem',
          textTransform: 'uppercase', border: 'none', cursor: 'pointer',
          letterSpacing: '0.08em', transition: 'background 0.3s, color 0.3s',
          textDecoration: 'none', display: 'block', textAlign: 'center',
        }}>VISIT</a>
      </div>
    </div>
  );
}

function MobileProjectList() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const sections = container.querySelectorAll('.mobile-project-slide');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Array.from(sections).indexOf(entry.target);
          if (idx >= 0) setActiveIdx(idx);
        }
      });
    }, { threshold: 0.5 });
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="showcase" style={{
      width: '100%', position: 'relative', zIndex: 4,
    }}>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          scrollSnapType: 'y mandatory',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {projects.map((p, i) => (
          <div
            key={i}
            className="mobile-project-slide"
            style={{
              width: '100%', height: '100vh',
              minHeight: '100dvh',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--primary)', overflow: 'hidden', position: 'relative',
              padding: '24px',
              scrollSnapAlign: 'center',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.06,
              background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.6) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              width: '100%', maxWidth: 360, height: '75dvh', maxHeight: 560,
              position: 'relative', zIndex: 2,
            }}>
              <ProjectCard
                p={p}
              />
            </div>
            <nav style={{
              position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: 8, zIndex: 10,
            }}>
              {projects.map((_, j) => (
                <span key={j} style={{
                  width: activeIdx === j ? 20 : 8, height: 8, borderRadius: 4,
                  background: activeIdx === j ? '#0d0d0f' : 'rgba(13,13,15,0.25)',
                  transition: 'all 0.3s ease',
                }} />
              ))}
            </nav>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ShowcaseSlide({ carouselRot, progress, onCardEnd }) {
  const mobile = useMobile();
  const carouselRef = useRef(null);
  const radiusRef = useRef(0);
  const cardSizeRef = useRef({ w: 600, h: 840 });
  const [activeIdx, setActiveIdx] = useState(0);

  const CARD_W = 600;
  const CARD_H = 840;
  const CELL_COUNT = projects.length;

  const getActiveIndex = useCallback((rot) => {
    const norm = ((-rot % 360) + 360) % 360;
    return Math.round(norm / (360 / CELL_COUNT)) % CELL_COUNT;
  }, [CELL_COUNT]);

  useEffect(() => {
    setActiveIdx(getActiveIndex(carouselRot));
  }, [carouselRot, getActiveIndex]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    function computeSize() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = Math.min(600, Math.max(320, vw * 0.38));
      const h = Math.min(840, Math.max(480, vh * 0.72));
      cardSizeRef.current = { w, h };
      const radius = Math.round((w / 2) / Math.tan(Math.PI / CELL_COUNT)) + 100;
      radiusRef.current = radius;
      const theta = 360 / CELL_COUNT;
      const cells = carousel.querySelectorAll('.carousel-cell');
      cells.forEach((cell, i) => {
        const angle = theta * i;
        cell.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        cell.style.width = `${w}px`;
        cell.style.height = `${h}px`;
        cell.style.left = `calc(50% - ${w / 2}px)`;
        cell.style.top = `calc(50% - ${h / 2}px)`;
      });
      carousel.style.transform = `translateZ(${-radius}px) rotateY(0deg)`;
    }

    computeSize();
    window.addEventListener('resize', computeSize);
    return () => window.removeEventListener('resize', computeSize);
  }, [CELL_COUNT]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    carousel.style.transform = `translateZ(${-radiusRef.current}px) rotateY(${carouselRot}deg)`;
  }, [carouselRot]);

  useEffect(() => {
    const cells = carouselRef.current?.querySelectorAll('.carousel-cell');
    if (!cells) return;
    const theta = 360 / CELL_COUNT;
    cells.forEach((cell, i) => {
      const normRot = ((-carouselRot % 360) + 360) % 360;
      let angleDiff = (theta * i - normRot + 540) % 360 - 180;
      const absAngle = Math.abs(angleDiff);
      const opacity = absAngle < 60 ? 1 : absAngle < 120 ? 0.55 : 0.15;
      cell.style.opacity = opacity;
    });
  }, [carouselRot, CELL_COUNT]);

  if (mobile) {
    return <MobileProjectList />;
  }

  const currentProject = projects[activeIdx];

  return (
    <section className="slide showcase-slide" id="showcase" style={{
      width: '100vw', flex: '0 0 100vw', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--primary)', overflow: 'hidden', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.06,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.6) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 40, left: 64, zIndex: 10,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'rgba(13,13,15,0.7)', backdropFilter: 'blur(8px)',
        padding: '6px 14px 6px 20px', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
          background: 'repeating-linear-gradient(45deg, #0d0d0f 0px, #0d0d0f 3px, var(--primary) 3px, var(--primary) 6px)',
        }} />
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: '0.7rem',
          letterSpacing: '0.12em', color: 'var(--primary)', textTransform: 'uppercase',
          marginLeft: 4,
        }}>
          SELECTED WORK // {activeIdx + 1}/{projects.length}
        </span>
      </div>

      <div className="carousel-scene" style={{
        position: 'relative', width: '100%', height: '100%',
        perspective: 1300, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div ref={carouselRef} className="carousel-3d" style={{
          width: '100%', height: '100%', position: 'absolute',
          transformStyle: 'preserve-3d', willChange: 'transform',
        }}>
          {projects.map((p, i) => (
            <div
              key={i}
              className="carousel-cell"
              style={{
                position: 'absolute',
                backfaceVisibility: 'hidden', willChange: 'transform, opacity',
                transition: 'opacity 0.5s ease',
              }}
            >
              <ProjectCard
                p={p}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 8,
      }}>
        <div style={{
          display: 'flex', gap: 6, marginBottom: 4,
        }}>
          {projects.map((_, j) => (
            <span key={j} style={{
              width: activeIdx === j ? 24 : 8, height: 8, borderRadius: 4,
              background: activeIdx === j ? '#0d0d0f' : 'rgba(13,13,15,0.3)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
        <span style={{
          fontFamily: "'Anton', sans-serif", fontSize: '0.85rem',
          letterSpacing: '0.1em', color: '#0d0d0f', textTransform: 'uppercase',
          opacity: 0.7,
        }}>
          {currentProject?.title} {currentProject?.subtitle}
        </span>
      </div>
    </section>
  );
}