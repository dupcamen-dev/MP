import { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinish }) {
  const [day, setDay] = useState(0);
  const [shipped, setShipped] = useState(false);
  const [phase, setPhase] = useState('loading');

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

      for (let d = 1; d <= 7; d++) {
        if (cancelled) return;
        setDay(d);
        await wait(d === 7 ? 300 : 90);
      }
      if (cancelled) return;

      setShipped(true);
      await wait(500);
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
      background: '#000',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.5s',
      opacity: phase === 'done' ? 0 : 1,
      pointerEvents: phase === 'done' ? 'none' : 'auto',
    }}>
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <img src="/logo.webp" alt="MILLIONPIXELS" style={{ height: 'clamp(40px, 7vw, 64px)', width: 'auto', display: 'block' }} />

        <div key={shipped ? 'shipped' : day} style={{
          fontFamily: "'Anton', Impact, sans-serif",
          fontSize: 'clamp(2.6rem, 8vw, 5rem)',
          lineHeight: 1,
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          color: shipped ? 'var(--primary)' : 'var(--cream)',
          animation: shipped ? 'ship-flash 0.6s ease-out' : 'day-pop 0.4s ease-out',
        }}>
          {shipped ? 'Shipped.' : `Day ${String(day).padStart(2, '0')}`}
        </div>

        <div style={{
          fontFamily: "'Geist Mono', monospace", fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.55)',
        }}>
          {shipped ? 'Your website is live. Found on Google.' : 'Building your website · 7 days'}
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} style={{
              width: 10, height: 10,
              background: shipped ? 'var(--primary)' : (i <= day ? 'var(--primary)' : 'rgba(255, 255, 255, 0.18)'),
              transition: 'background 0.15s',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
