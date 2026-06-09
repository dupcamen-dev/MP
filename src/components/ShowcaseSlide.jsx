import { useEffect, useRef, useState } from 'react';

const projects = [
  { tag: 'FINTECH / WEB3', title: 'NEO-BANK', subtitle: 'ALPHA', color: 'var(--primary)', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop' },
  { tag: 'AI / DATA', title: 'DATA', subtitle: 'SHARD', color: 'var(--secondary)', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop' },
  { tag: 'DEFI / WEB3', title: 'PROTOCOL', subtitle: 'ZERO', color: 'var(--primary)', img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop' },
  { tag: 'SAAS / AI', title: 'AGENT', subtitle: 'SMITH', color: 'var(--secondary)', img: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1974&auto=format&fit=crop' },
  { tag: 'GAMING / WEB3', title: 'DUNGEON', subtitle: 'DEEP', color: 'var(--primary)', img: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=1931&auto=format&fit=crop' },
  { tag: 'HEALTH / AI', title: 'MED', subtitle: 'PULSE', color: 'var(--secondary)', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop' },
];

function ProjectCard({ p, colored, onToggle }) {
  return (
    <div className="carousel-card" style={{
      width: '100%', height: '100%', background: 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.04)',
      position: 'relative', overflow: 'hidden', display: 'flex',
      flexDirection: 'column',
    }}>
      <div className="card-img" style={{
        height: '55%', width: '100%', overflow: 'hidden', position: 'relative', flexShrink: 0,
      }}>
        <img src={p.img} alt={p.title} loading="lazy" style={{
          width: '100%', height: '100%', objectFit: 'cover',
          filter: colored ? 'grayscale(0) contrast(1.1)' : 'grayscale(1) contrast(1.1)',
          transition: 'transform 0.5s, filter 0.3s',
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
        background: 'rgba(255,255,255,0.85)',
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
        <button onClick={onToggle} style={{
          width: '100%', padding: 10, background: '#000', color: '#fff',
          fontFamily: "'Anton', sans-serif", fontSize: '0.9rem',
          textTransform: 'uppercase', border: 'none', cursor: 'pointer',
          letterSpacing: '0.05em',
        }}>VIEW PROJECT</button>
      </div>
    </div>
  );
}

function MobileProjectList() {
  const [colored, setColored] = useState({});
  const toggle = (i) => setColored(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <section id="showcase" style={{
      width: '100%', position: 'relative', zIndex: 10,
    }}>
      {projects.map((p, i) => (
        <div
          key={i}
          className="carousel-cell"
          style={{
            width: '100%', height: '100dvh',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--primary)', overflow: 'hidden', position: 'relative',
            padding: '24px',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.06,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.6) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            width: '100%', maxWidth: 360, height: '80dvh', maxHeight: 560,
            position: 'relative', zIndex: 2,
          }}>
            <ProjectCard
              p={p}
              colored={colored[i]}
              onToggle={() => toggle(i)}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default function ShowcaseSlide({ carouselRot, progress, onCardEnd }) {
  const mobile = window.innerWidth < 900;
  const CARD_W = mobile ? 320 : 600;
  const CARD_H = mobile ? 480 : 840;
  const carouselRef = useRef(null);
  const radiusRef = useRef(0);
  const cardEndedRef = useRef(false);
  const [colored, setColored] = useState({});
  const [swipeIdx, setSwipeIdx] = useState(0);

  useEffect(() => {
    if (!mobile) return;
    const el = carouselRef.current;
    if (!el) return;
    let startY = null;
    function onTouchStart(e) { startY = e.touches[0].clientY; }
    function onTouchEnd(e) {
      if (startY === null) return;
      const dy = e.changedTouches[0].clientY - startY;
      startY = null;
      if (Math.abs(dy) < 40) return;
      if (dy < -40) {
        setSwipeIdx(prev => {
          if (prev < 5) return prev + 1;
          el.style.touchAction = 'auto';
          onCardEnd?.();
          return prev;
        });
      } else {
        setSwipeIdx(prev => Math.max(0, prev - 1));
      }
    }
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [mobile, onCardEnd]);

  useEffect(() => {
    if (!mobile) return;
    const totalCards = 6;
    const cardFromProgress = Math.min(totalCards - 1, Math.floor(progress / 0.35 * totalCards));
    setSwipeIdx(prev => Math.max(prev, cardFromProgress));
  }, [progress, mobile]);

  useEffect(() => {
    if (!mobile || cardEndedRef.current) return;
    if (swipeIdx < 5) return;
    cardEndedRef.current = true;
    const el = carouselRef.current;
    if (el) el.style.touchAction = 'auto';
    onCardEnd?.();
  }, [swipeIdx, mobile, onCardEnd]);

  useEffect(() => {
    const el = document.getElementById('showcase');
    if (!el) return;
    const process = document.getElementById('process');
    if (!process) return;
    const tp = process.offsetTop + process.offsetHeight;
    function update() {
      const sy = window.scrollY;
      const vh = window.innerHeight;
      const t = Math.max(0, Math.min(1, (sy - (tp - 1.5 * vh)) / (1.5 * vh)));
      el.style.transform = `translateY(${-50 * (1 - t)}vh)`;
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (mobile) return;
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cells = carousel.querySelectorAll('.carousel-cell');
    const cellCount = cells.length;
    const radius = Math.round((CARD_W / 2) / Math.tan(Math.PI / cellCount)) + 100;
    radiusRef.current = radius;
    const theta = 360 / cellCount;
    cells.forEach((cell, i) => {
      const angle = theta * i;
      cell.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });
    carousel.style.transform = `translateZ(${-radius}px) rotateY(0deg)`;
  }, []);

  useEffect(() => {
    if (mobile) return;
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    carousel.style.transform = `translateZ(${-radiusRef.current}px) rotateY(${carouselRot}deg)`;
  }, [carouselRot]);

  const totalCards = 6;
  const cardIndex = mobile ? swipeIdx : 0;

  if (mobile) {
    return <MobileProjectList />;
  }

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
      <div className="carousel-scene" style={{
        position: 'relative', width: '100%', height: '100%',
        perspective: 1800, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div ref={carouselRef} className="carousel-3d" style={{
          width: '100%', height: '100%', position: 'absolute',
          transformStyle: 'preserve-3d', willChange: 'transform',
        }}>
          {projects.map((p, i) => (
            <div
              key={i}
              className="carousel-cell"
              onClick={() => setColored(prev => ({ ...prev, [i]: !prev[i] }))}
              style={{
                position: 'absolute', left: `calc(50% - ${CARD_W / 2}px)`,
                top: `calc(50% - ${CARD_H / 2}px)`, width: CARD_W, height: CARD_H,
                backfaceVisibility: 'hidden', willChange: 'transform',
              }}
            >
              <ProjectCard
                p={p}
                colored={colored[i]}
                onToggle={() => setColored(prev => ({ ...prev, [i]: !prev[i] }))}
              />
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
