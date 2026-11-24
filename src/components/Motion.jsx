import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import { prefersReducedMotion } from '../utils';

// Button label that rolls up to a duplicate on hover (see .roll in App.css).
export function Roll({ children }) {
  return (
    <span className="roll">
      <span className="roll-a">{children}</span>
      <span className="roll-b" aria-hidden="true">{children}</span>
    </span>
  );
}

// Splits text into words that rise out of a mask. The animation runs when an ancestor
// gets [data-in] (any <Reveal>) or, inside the hero, when <html data-ready> is set.
// parts: [{ text, className }] — e.g. a dark phrase followed by an italic serif one.
export function SplitWords({ parts, start = 0, step = 42 }) {
  let i = 0;
  return parts.map((part, pi) => {
    const words = String(part.text ?? '').split(/\s+/).filter(Boolean);
    return (
      <span key={pi} className={part.className}>
        {words.map((w, wi) => {
          const idx = i++;
          return (
            <span key={wi}>
              <span className="w-mask"><span className="w-in" style={{ '--wd': `${start + idx * step}ms` }}>{w}</span></span>
              {wi < words.length - 1 || pi < parts.length - 1 ? ' ' : null}
            </span>
          );
        })}
        {part.br && <br />}
      </span>
    );
  });
}

// "24 год" → counts 0 → 24 and keeps the suffix. Starts once the splash has gone.
export function CountUp({ value, duration = 1400, delay = 0 }) {
  const match = /^(\D*)(\d+)(.*)$/.exec(String(value));
  const target = match ? Number(match[2]) : 0;
  const [n, setN] = useState(() => (match && !prefersReducedMotion() ? 0 : target));

  useEffect(() => {
    if (!match || prefersReducedMotion()) { setN(target); return; }
    let raf = 0;
    let timer = 0;
    const run = () => {
      timer = setTimeout(() => {
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / duration);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }, delay);
    };
    if ('ready' in document.documentElement.dataset) run();
    else window.addEventListener('mp:ready', run, { once: true });
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); window.removeEventListener('mp:ready', run); };
  }, [value]);

  if (!match) return value;
  return <>{match[1]}{n}{match[3]}</>;
}

const CLIENTS = [
  ['Cine Riccio', 'https://www.cinericcio.com/'],
  ['Angry Spanish', 'https://angry-spanish.vercel.app/'],
  ['Kadub', 'https://webdeploy-rouge.vercel.app/'],
  ['Nouri', 'https://nouri-normal.vercel.app/'],
  ['Zhyto', 'https://zhyto.london'],
  ['Raqt Fuel', 'https://www.raqtfuel.com'],
  ['Mebli Chortkiv', 'https://mebli-chortkiv.vercel.app/'],
  ['TopStatus', 'https://topstatus.space/'],
  ['Avvadon', 'https://dupcamen-dev.github.io/AVVADON/'],
];

// Quiet, slow strip of shipped clients — a "trusted by" line rather than a shouty banner.
export function Marquee() {
  const { t } = useI18n();
  const row = (hidden) => (
    <ul className="clients-row" aria-hidden={hidden || undefined}>
      {CLIENTS.map(([name, href]) => (
        <li key={name}>
          <a href={href} target="_blank" rel="noopener noreferrer" tabIndex={hidden ? -1 : undefined}>{name}</a>
          <i aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <section className="clients" aria-label={t('clientsLabel')}>
      <div className="container clients-inner">
        <span className="clients-label">{t('clientsLabel')}</span>
        <div className="clients-viewport">
          <div className="clients-track">
            {row(false)}
            {row(true)}
          </div>
        </div>
      </div>
    </section>
  );
}

// Pointer-following glow for cards with the .spot class (one listener for the whole page).
export function useSpotlight() {
  const raf = useRef(0);
  useEffect(() => {
    if (window.matchMedia?.('(hover: none)').matches) return;
    const onMove = (e) => {
      const el = e.target.closest?.('.spot');
      if (!el) return;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => { document.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf.current); };
  }, []);
}
