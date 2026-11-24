import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../utils';

// 5×5 pixel pattern echoing the logo mark. 1 = ink, 2 = accent, 3 = faint, 0 = empty.
const PATTERN = [
  [0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0],
  [1, 3, 0, 0, 0],
  [1, 1, 2, 0, 0],
  [1, 1, 1, 1, 0],
];

const SESSION_KEY = 'mp_splash_seen';
const MIN_MS = 950;
const MAX_MS = 1800;
const EXIT_MS = 750;

export function splashAlreadySeen() {
  try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch { return false; }
}

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0.15);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const reduced = prefersReducedMotion();
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const root = document.documentElement;
    root.style.overflow = 'hidden';

    requestAnimationFrame(() => !cancelled && setProgress(0.7));

    (async () => {
      const fonts = document.fonts?.ready ?? Promise.resolve();
      await Promise.all([
        Promise.race([fonts, wait(MAX_MS)]),
        wait(reduced ? 200 : MIN_MS),
      ]);
      if (cancelled) return;
      setProgress(1);
      await wait(reduced ? 0 : 220);
      if (cancelled) return;
      root.dataset.ready = '';
      root.style.overflow = '';
      setLeaving(true);
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch {}
      await wait(reduced ? 0 : EXIT_MS);
      if (!cancelled) onFinish();
    })();

    return () => { cancelled = true; root.style.overflow = ''; };
  }, []);

  return (
    <div className={`splash${leaving ? ' is-leaving' : ''}`} role="status" aria-label="Loading">
      <div className="splash-inner">
        <div className="splash-grid" aria-hidden="true">
          {PATTERN.flatMap((row, r) =>
            row.map((v, c) => (
              <i
                key={`${r}-${c}`}
                className={v === 2 ? 'is-accent' : v === 0 ? 'is-off' : undefined}
                style={{
                  '--d': `${(4 - r + c) * 55 + (v === 2 ? 120 : 0)}ms`,
                  ...(v === 3 ? { opacity: undefined, background: 'var(--line-strong)' } : null),
                }}
              />
            ))
          )}
        </div>
        <div className="splash-word">million<span>pixels</span></div>
        <div className="splash-bar"><span style={{ '--p': progress }} /></div>
      </div>
    </div>
  );
}
