import { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinish }) {
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    let cancelled = false;

    const wait = (ms) => new Promise(r => setTimeout(r, ms));

    async function load() {
      const timeout = new Promise((r) => setTimeout(r, 2000));
      await Promise.all([
        document.fonts.ready,
        wait(800),
        timeout,
      ]);
      if (cancelled) return;
      setPhase('done');
      await wait(500);
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
      background: 'var(--surface-low)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 48,
      transition: 'opacity 0.6s',
      opacity: phase === 'done' ? 0 : 1,
      pointerEvents: phase === 'done' ? 'none' : 'auto',
    }}>
      <img src="/logo.webp" alt="MILLIONPIXELS" style={{ height: 'clamp(48px, 8vw, 80px)', width: 'auto', display: 'block' }} />
      <div style={{
        width: 160, height: 3, background: 'var(--surface-highest)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '100%', width: '40%',
          background: 'var(--primary)',
          animation: 'loading-bar 1.2s ease-in-out infinite',
        }} />
      </div>
    </div>
  );
}
