import { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinish }) {
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    let cancelled = false;

    const wait = (ms) => new Promise(r => setTimeout(r, ms));

    async function load() {
      await Promise.all([
        document.fonts.ready,
        wait(800),
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
      background: '#141315',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 48,
      transition: 'opacity 0.6s',
      opacity: phase === 'done' ? 0 : 1,
      pointerEvents: phase === 'done' ? 'none' : 'auto',
    }}>
      <h1 style={{
        fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3rem,10vw,6rem)',
        color: '#ffd300', textTransform: 'uppercase', lineHeight: 0.85,
        textAlign: 'center',
      }}>
        MILLION<span style={{ color: '#e20000' }}>PIXELS</span>
      </h1>
      <div style={{
        width: 160, height: 3, background: 'rgba(255,255,255,0.1)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '100%', width: '40%',
          background: '#ffd300',
          animation: 'loading-bar 1.2s ease-in-out infinite',
        }} />
      </div>
      <span style={{
        fontFamily: "'Space Mono', monospace", fontSize: '0.7rem',
        letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase',
      }}>INITIALIZING SYSTEM…</span>
    </div>
  );
}
