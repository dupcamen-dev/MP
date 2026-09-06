import { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinish }) {
  const [p, setP] = useState(0);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    let cancelled = false;

    const wait = (ms) => new Promise(r => setTimeout(r, ms));

    async function load() {
      const timeout = new Promise((r) => setTimeout(r, 900));
      await Promise.all([
        document.fonts.ready,
        wait(450),
        timeout,
      ]);
      if (cancelled) return;

      const DUR = 1400;
      const start = performance.now();
      await new Promise((resolve) => {
        const tick = (now) => {
          const t = Math.min(1, (now - start) / DUR);
          setP(t);
          if (t < 1) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });
      if (cancelled) return;

      await wait(250);
      if (cancelled) return;

      document.documentElement.style.overflow = '';
      onFinish();
    }

    load();
    return () => { cancelled = true; document.documentElement.style.overflow = ''; };
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#fdfdfd',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.5s',
      opacity: p >= 1 ? 0 : 1,
      pointerEvents: p >= 1 ? 'none' : 'auto',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        <img src="/logo.webp" alt="MILLIONPIXELS" style={{ height: 'clamp(40px, 6vw, 56px)', width: 'auto', display: 'block' }} />
        <div style={{
          width: 'clamp(120px, 24vw, 220px)', height: 2,
          background: '#ececec', borderRadius: 2, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: `${Math.round(p * 100)}%`,
            background: 'var(--ink)', borderRadius: 2,
            transition: 'width 0.1s linear',
          }} />
        </div>
      </div>
    </div>
  );
}