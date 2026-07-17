import { useEffect, useRef, useState, useCallback } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';

const projects = [
  { tag: 'RESTAURANT / LONDON', title: 'ZHYTO', subtitle: 'LONDON', color: 'var(--primary)', desc: 'Authentic Ukrainian varenyky & syrnyky — from Kyiv to London. Flawless execution, heritage cuisine.', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070&auto=format&fit=crop', link: 'https://zhyto.london' },
  { tag: 'CATERING / LONDON', title: 'RAQT', subtitle: 'FUEL', color: 'var(--secondary)', desc: 'London\'s premium catering service. Any cuisine, any culture, any dietary request — cooked flawlessly.', img: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2070&auto=format&fit=crop', link: 'https://www.raqtfuel.com' },
  { tag: 'DEFI / WEB3', title: 'PROTOCOL', subtitle: 'ZERO', color: 'var(--primary)', desc: 'Zero-knowledge DeFi protocol with instant settlements.', img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop', link: '#' },
  { tag: 'SAAS / AI', title: 'AGENT', subtitle: 'SMITH', color: 'var(--secondary)', desc: 'Autonomous AI agent orchestration platform.', img: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1974&auto=format&fit=crop', link: '#' },
];

function ProjectCard({ p }) {
  return (
    <div className="carousel-card" style={{
      width: '100%', height: '100%',
      background: 'var(--surface)',
      border: '1px solid rgba(135, 70, 38, 0.15)',
      boxShadow: '0 8px 32px rgba(135, 70, 38, 0.12)',
      position: 'relative', overflow: 'hidden', display: 'flex',
      flexDirection: 'column', transition: 'border-color 0.4s, box-shadow 0.4s',
    }}>
      <div className="card-img" style={{
        height: '55%', width: '100%', overflow: 'hidden', position: 'relative', flexShrink: 0,
      }}>
        <img src={p.img} alt={p.title} loading="lazy"
          onError={e => { e.target.style.display = 'none'; e.target.parentNode.style.background = p.color + '33'; }}
          style={{
          width: '100%', height: '100%', objectFit: 'cover',
          filter: 'contrast(1.05) saturate(0.95)',
          transition: 'transform 0.5s',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(135, 70, 38, 0.06)',
          mixBlendMode: 'multiply', pointerEvents: 'none',
        }} />
      </div>
      <div className="card-body" style={{
        flex: 1, padding: '24px 28px 28px',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        background: 'transparent',
      }}>
        <h2 style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          textTransform: 'uppercase', color: 'var(--text)', lineHeight: 1,
          marginBottom: 12, letterSpacing: '0.01em',
        }}>
          {p.title} <span style={{ color: p.color }}>{p.subtitle}</span>
        </h2>
        <p style={{
          fontFamily: "'Geist', sans-serif", fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
          lineHeight: 1.5, color: 'var(--text-dim)', marginBottom: 20,
          letterSpacing: '0.01em',
        }}>
          {p.desc}
        </p>
        <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
          width: '100%', padding: '14px 0', background: 'var(--secondary)',
          color: '#fff',
          fontFamily: "'Anton', Impact, sans-serif", fontSize: '1rem',
          textTransform: 'uppercase', border: 'none', cursor: 'pointer',
          letterSpacing: '0.08em', transition: 'background 0.3s',
          textDecoration: 'none', display: 'block', textAlign: 'center',
        }}>VISIT</a>
      </div>
    </div>
  );
}

function MobileProjectList() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);
  const tablet = useTablet();
  const cardMaxW = tablet ? 460 : 360;
  const cardMaxH = tablet ? 680 : 560;

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
              width: '100%', maxWidth: cardMaxW, height: '75dvh', maxHeight: cardMaxH,
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
                <button key={j} onClick={() => onCardEnd && onCardEnd(j)} style={{
                  width: activeIdx === j ? 20 : 8, height: 8, minWidth: 44, minHeight: 44,
                  borderRadius: 4, border: 'none', padding: 0,
                  background: activeIdx === j ? 'var(--surface)' : 'rgba(42, 37, 32, 0.25)',
                  transition: 'all 0.3s ease', cursor: 'pointer',
                }} aria-label={`Go to project ${j + 1}`} />
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

  return (
    <section className="slide showcase-slide" id="showcase" style={{
      width: '100vw', flex: '0 0 100vw', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--primary)', overflow: 'hidden', position: 'relative',
    }}>
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
            <button key={j} onClick={() => onCardEnd && onCardEnd(j)} style={{
              width: activeIdx === j ? 24 : 8, height: 8, minWidth: 44, minHeight: 44,
              borderRadius: 4, border: 'none', padding: 0,
              background: activeIdx === j ? 'var(--surface)' : 'rgba(42, 37, 32, 0.35)',
              transition: 'all 0.3s ease', cursor: 'pointer',
            }} aria-label={`Go to project ${j + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}