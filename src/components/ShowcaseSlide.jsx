import { useEffect, useRef, useState, useCallback } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';

const projects = [
  { tag: 'RESTAURANT · LONDON', title: 'ZHYTO', subtitle: '', color: 'var(--primary)', desc: 'Artisian homemade varenyky. Tradition on a plate, delivered.', img: '/zhyto-hero.png', link: 'https://zhyto.london', caption: 'zhyto.london — shipped 2024' },
  { tag: 'CATERING · UK', title: 'RAQT', subtitle: 'FUEL', color: 'var(--secondary)', desc: 'We Cook Anything You Crave. Any cuisine, cooked flawlessly.', img: '/raqt-hero.png', link: 'https://www.raqtfuel.com', caption: 'raqtfuel.com — shipped 2024' },
  { tag: 'CUSTOM FURNITURE · CHORTKIV', title: 'MEBLI', subtitle: 'CHORTKIV', color: '#8B6914', desc: 'Bespoke furniture workshop. Kitchens, bedrooms, living rooms — built to order.', img: '/mebli-hero.webp', link: 'https://mebli-chortkiv.vercel.app/', caption: 'mebli-chortkiv.vercel.app — shipped 2026' },
  { tag: 'MONITORING SAAS · STATUS PAGE', title: 'TOPSTATUS', subtitle: '', color: '#1A56C4', desc: 'Uptime monitoring and public status pages in one product. Instant alerts, incident history, crypto payments.', img: '/topstatus-hero.webp', link: 'https://topstatus.space/', caption: 'topstatus.space — shipped 2026' },
];

function ProjectCard({ p }) {
  return (
    <div className="carousel-card" style={{
      width: '100%', height: '100%',
      background: 'var(--cream)',
      border: '1px solid var(--sienna)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
      position: 'relative', overflow: 'hidden', display: 'flex',
      flexDirection: 'column', padding: 14,
      transition: 'border-color 0.4s, box-shadow 0.4s',
    }}>
      {/* Registration marks */}
      {[
        { top: 6, left: 6 }, { top: 6, right: 6 },
        { bottom: 6, left: 6 }, { bottom: 6, right: 6 },
      ].map((pos, i) => (
        <span key={i} aria-hidden="true" style={{
          position: 'absolute', width: 10, height: 10, ...pos, zIndex: 3,
          borderTop: pos.top !== undefined ? '1px solid var(--sienna)' : 'none',
          borderBottom: pos.bottom !== undefined ? '1px solid var(--sienna)' : 'none',
          borderLeft: pos.left !== undefined ? '1px solid var(--sienna)' : 'none',
          borderRight: pos.right !== undefined ? '1px solid var(--sienna)' : 'none',
          opacity: 0.5,
        }} />
      ))}

      <div className="card-img" style={{
        height: '52%', width: '100%', overflow: 'hidden', position: 'relative', flexShrink: 0,
        background: 'var(--sienna)',
      }}>
        <img src={p.img} alt={p.title + ' — live product'} loading="lazy"
          onError={e => { e.target.style.display = 'none'; e.target.parentNode.style.background = p.color + '33'; }}
          style={{
          width: '100%', height: '100%', objectFit: 'cover',
          filter: 'grayscale(0.2) contrast(1.05)',
          transition: 'transform 0.5s',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(45,45,45,0.15), rgba(26,26,26,0.10))',
          mixBlendMode: 'multiply', pointerEvents: 'none',
        }} />
        <span style={{
          position: 'absolute', top: 12, left: 12,
          fontFamily: "'Geist Mono', monospace", fontSize: 10,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--cream)', background: 'rgba(26,26,26,0.8)', padding: '5px 10px',
        }}>{p.tag}</span>
      </div>
      <div className="card-body" style={{
        flex: 1, padding: '24px 20px 12px',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        background: 'transparent',
      }}>
        <h2 style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          textTransform: 'uppercase', color: 'var(--ink)', lineHeight: 1,
          marginBottom: 12, letterSpacing: '0.01em',
        }}>
          {p.title} <span style={{ color: p.color }}>{p.subtitle}</span>
        </h2>
        <p style={{
          fontFamily: "'Geist', sans-serif", fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
          lineHeight: 1.5, color: 'var(--text-dim)', marginBottom: 16,
          letterSpacing: '0.01em',
        }}>
          {p.desc}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontFamily: "'Geist Mono', monospace", fontSize: 11,
            letterSpacing: '0.06em', color: 'var(--sienna)',
          }}>{p.caption}</span>
          <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'Anton', Impact, sans-serif", fontSize: '1rem',
            color: 'var(--ink)', textTransform: 'uppercase',
            letterSpacing: '0.06em', textDecoration: 'none', whiteSpace: 'nowrap',
          }}>Visit →</a>
        </div>
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
              background: 'var(--ink)', overflow: 'hidden', position: 'relative',
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
      // Guard against degenerate rings (2 cells → tan(90°)=∞). Use a fixed
      // depth for small counts so two cards sit front/back cleanly.
      const radius = CELL_COUNT <= 2
        ? Math.round(w * 0.85) + 100
        : Math.round((w / 2) / Math.tan(Math.PI / CELL_COUNT)) + 100;
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
      background: 'var(--ink)', overflow: 'hidden', position: 'relative',
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute', top: 'clamp(32px, 6vh, 64px)', left: 'clamp(24px, 5%, 80px)',
        zIndex: 20,
      }}>
        <p style={{
          fontFamily: "'Geist Mono', monospace", fontSize: 12,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--cream)', opacity: 0.7, margin: '0 0 8px 0',
        }}>SELECTED WORK</p>
        <h2 style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
          lineHeight: 1, color: 'var(--cream)', margin: 0, letterSpacing: '-0.01em',
        }}>Real products. Real users.<br />Shipped in seven.</h2>
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
            <button key={j} onClick={() => onCardEnd && onCardEnd(j)} style={{
              width: activeIdx === j ? 24 : 8, height: 8, minWidth: 44, minHeight: 44,
              borderRadius: 4, border: 'none', padding: 0,
                  background: activeIdx === j ? 'var(--surface)' : 'rgba(26, 26, 26, 0.35)',
              transition: 'all 0.3s ease', cursor: 'pointer',
            }} aria-label={`Go to project ${j + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}