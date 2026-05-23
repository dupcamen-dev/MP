import { useEffect, useRef, useMemo } from 'react';

export default function Hero({ progress }) {
  const shardsRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 900) return;
    const shards = shardsRef.current?.querySelectorAll('.shard');
    if (!shards) return;
    function onMove(e) {
      const mx = (e.clientX / window.innerWidth - 0.5) * 2;
      const my = (e.clientY / window.innerHeight - 0.5) * 2;
      shards.forEach((s) => {
        const speed = parseFloat(s.dataset.speed) || 0.2;
        const x = mx * 40 * speed;
        const y = my * 40 * Math.abs(speed);
        s.style.transform = `translate(${x}px, ${y}px)`;
      });
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const p = progress;
  const skew = p * 12;
  const r = Math.round(33 + (255 - 33) * p);
  const g = Math.round(32 + (255 - 32) * p);
  const b = Math.round(34 + (255 - 34) * p);
  const color = `rgb(${r},${g},${b})`;
  const shadowPct = 1 - p;
  const shadow = `${Math.round(8 * shadowPct)}px ${Math.round(8 * shadowPct)}px 0 var(--secondary)`;

  return (
    <section id="hero" style={{
      height: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '120px 64px 80px',
      position: 'sticky', top: 0, zIndex: 1, overflow: 'hidden',
      background: 'var(--primary)', color: 'var(--bg)',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(to right, rgba(20,19,21,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,19,21,0.08) 1px, transparent 1px)',
        backgroundSize: '40px 40px', zIndex: 0, pointerEvents: 'none',
      }} />
      <div className="coord-label" style={{
        position: 'absolute', fontFamily: "'Space Mono', monospace",
        fontSize: '0.7rem', letterSpacing: '0.1em',
        color: 'rgba(20,19,21,0.4)', zIndex: 1, pointerEvents: 'none',
        top: 120, left: 64, transformOrigin: 'left',
        transform: 'rotate(90deg) translateX(-50%)',
      }}>
        COORD: 45.92 / -12.44 // SEC_01
      </div>
      <div className="sys-ver" style={{
        position: 'absolute', fontFamily: "'Space Mono', monospace",
        fontSize: '0.7rem', letterSpacing: '0.1em',
        color: 'rgba(20,19,21,0.4)', zIndex: 1, pointerEvents: 'none',
        bottom: 48, right: 64,
      }}>
        SYS.VER_9.0.4 [ACTIVE]
      </div>
      <div ref={shardsRef} style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
      }}>
        {[
          { className: 'shard shard-1', speed: 0.2, clipPath: 'polygon(0 0, 100% 20%, 80% 100%, 10% 80%)', w: '40vw', h: '40vh', t: '40px', l: '-10vw', bg: 'rgba(20,19,21,0.9)' },
          { className: 'shard shard-2', speed: -0.3, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', w: '30vw', h: '50vh', t: '', l: '', b: '80px', r: '-5vw', bg: 'rgba(20,19,21,0.9)', border: '4px solid var(--secondary)' },
          { className: 'shard shard-3', speed: 0.5, clipPath: 'polygon(20% 0%, 100% 0, 80% 100%, 0% 100%)', w: '50vw', h: '20vh', t: '50%', l: '25%', bg: 'rgba(54,52,54,0.6)', mixBlend: 'multiply' },
          { className: 'shard shard-4', speed: -0.1, clipPath: 'polygon(0 50%, 100% 0, 100% 50%, 0 100%)', w: '20vw', h: '30vh', t: '20%', r2: '10%', bg: 'rgba(255,255,255,0.08)', backdrop: 'blur(4px)', border2: '1px solid rgba(20,19,21,0.15)' },
          { className: 'shard shard-5', speed: 0.4, clipPath: 'polygon(10% 10%, 90% 0, 100% 90%, 0 100%)', w: '15vw', h: '15vw', b2: '10%', l2: '20%', bg2: 'var(--secondary)', mixBlend2: 'multiply', opacity: 0.8 },
        ].map((s, i) => (
          <div key={i} className={s.className} data-speed={s.speed} style={{
            position: 'absolute', transition: 'transform 0.2s ease-out',
            willChange: 'transform', clipPath: s.clipPath,
            width: s.w, height: s.h,
            top: s.t || s.t2, left: s.l || s.l2,
            bottom: s.b, right: s.r || s.r2,
            background: s.bg2 || s.bg,
            mixBlendMode: s.mixBlend2 || s.mixBlend,
            opacity: s.opacity,
            backdropFilter: s.backdrop,
            border: s.border || s.border2,
          }} />
        ))}
      </div>
      <div style={{
        position: 'relative', zIndex: 2, maxWidth: 1200, width: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: 48,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: "'Space Mono', monospace", fontSize: '0.75rem',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--bg)', padding: '8px 24px 8px 32px',
          border: '1px solid rgba(20,19,21,0.15)',
          background: 'var(--primary)', boxShadow: '4px 4px 0 var(--bg)',
          position: 'relative', overflow: 'hidden',
        }}>
          <span style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 16,
            background: 'repeating-linear-gradient(-45deg, var(--bg) 0px, var(--bg) 4px, var(--primary) 4px, var(--primary) 8px)',
          }} />
          <span style={{ marginLeft: 8 }}>SYSTEM OVERRIDE ACTIVE</span>
        </div>
        <h1 className="hero-title" style={{
          fontFamily: "'Anton', sans-serif", fontSize: 'clamp(4rem,15vw,12.5rem)',
          lineHeight: 0.85, textTransform: 'uppercase', color: 'var(--bg)',
          width: '100%', textShadow: '8px 8px 0 var(--secondary)',
        }}>
          <span className="line" style={{ display: 'block' }}>
            MILLION
          </span>
          <span className="line" style={{
            display: 'block', color,
            transform: `translateY(-8px) skewX(${-skew}deg)`,
          }}>
            PIXELS
          </span>
        </h1>
          <div className="hero-sub" style={{
          maxWidth: 700, width: '100%', background: 'var(--bg)',
          padding: '24px 32px', transform: 'rotate(1deg)',
          transition: 'transform 0.3s', position: 'relative',
          boxShadow: '8px 8px 0 var(--secondary)',
        }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(1deg)'}>
          <div style={{
            position: 'absolute', top: -12, left: -12,
            width: 24, height: 24,
            borderTop: '4px solid var(--primary)',
            borderLeft: '4px solid var(--primary)',
          }} />
          <p style={{
            fontFamily: "'Geist', sans-serif", fontSize: 'clamp(1rem,2vw,1.5rem)',
            lineHeight: 1.5, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--text)', textAlign: 'left',
          }}>
            YOUR MVP IN 7 DAYS.<br />
            <span style={{ color: 'var(--primary)' }}>BUILT WITH VIBE CODING.</span>
          </p>
          <div style={{
            position: 'absolute', bottom: -12, right: -12,
            width: 24, height: 24,
            borderBottom: '4px solid var(--primary)',
            borderRight: '4px solid var(--primary)',
          }} />
        </div>
      </div>
    </section>
  );
}
