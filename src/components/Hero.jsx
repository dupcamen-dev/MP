import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n';
import { ArrowRight, Check, Search } from './Icons';
import { cap, noArrow, prefersReducedMotion, scrollToId } from '../utils';

const CELL = 24; // px — matches the dot pattern of the canvas background

// Interactive pixel field: cells light up around the pointer and fade out.
// Idle cost is zero — the rAF loop runs only while some cell is still lit.
function usePixelField(sectionRef, canvasRef) {
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReducedMotion();
    const cells = new Map(); // "c,r" -> intensity 0..1
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, sparkleTimer = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const light = (c, r, v) => {
      const key = `${c},${r}`;
      cells.set(key, Math.min(1, Math.max(cells.get(key) || 0, v)));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const [key, v] of cells) {
        const [c, r] = key.split(',').map(Number);
        const size = CELL - 6;
        ctx.fillStyle = `rgba(255, 90, 31, ${v * 0.75})`;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(c * CELL + 3, r * CELL + 3, size, size, 4);
        else ctx.rect(c * CELL + 3, r * CELL + 3, size, size);
        ctx.fill();
      }
    };

    const tick = () => {
      for (const [key, v] of cells) {
        const next = v - 0.028;
        if (next <= 0) cells.delete(key); else cells.set(key, next);
      }
      draw();
      raf = cells.size && visible ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf && visible) raf = requestAnimationFrame(tick); };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cc = Math.floor(x / CELL);
      const cr = Math.floor(y / CELL);
      const R = 2;
      for (let dr = -R; dr <= R; dr++) {
        for (let dc = -R; dc <= R; dc++) {
          const d = Math.hypot(dc, dr);
          if (d <= R) light(cc + dc, cr + dr, 1 - d / (R + 0.6));
        }
      }
      kick();
    };

    const sparkle = () => {
      if (!visible || w === 0) return;
      const cols = Math.ceil(w / CELL), rows = Math.ceil(h / CELL);
      for (let i = 0; i < 2; i++) {
        light(Math.floor(cols * (0.35 + Math.random() * 0.65)), Math.floor(rows * Math.random() * 0.8), 0.55 + Math.random() * 0.35);
      }
      kick();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(section);

    resize();
    window.addEventListener('resize', resize);
    if (!reduced) {
      section.addEventListener('pointermove', onMove, { passive: true });
      sparkleTimer = window.setInterval(sparkle, 700);
    }

    return () => {
      io.disconnect();
      window.removeEventListener('resize', resize);
      section.removeEventListener('pointermove', onMove);
      clearInterval(sparkleTimer);
      cancelAnimationFrame(raf);
    };
  }, [sectionRef, canvasRef]);
}

function SearchVisual() {
  const { t } = useI18n();
  return (
    <div className="serp" aria-hidden="true">
      <div className="serp-bar">
        <Search />
        <span>{t('serpQuery')}</span>
        <span className="serp-caret" />
      </div>

      <div className="serp-result serp-result--top">
        <span className="serp-rank">#1</span>
        <div className="serp-site">
          <span className="serp-fav">Z</span>
          <span className="serp-url">zhyto.london<small>https://zhyto.london › menu</small></span>
        </div>
        <div className="serp-title">ZHYTO — Homemade Varenyky in London</div>
        <p className="serp-desc">Handmade Ukrainian varenyky, cooked fresh and delivered across London. Order online in two minutes.</p>
      </div>
      <div className="serp-skel"><i /><i /><i /></div>
      <div className="serp-skel"><i /><i /><i /></div>

      <div className="float-chip float-chip--index">
        <span className="check-dot"><Check size={15} className="" /></span>
        <span>
          <span className="chip-label" style={{ display: 'block' }}>Google</span>
          <span className="chip-value">{t('serpIndexed')}</span>
        </span>
      </div>

      <div className="float-chip float-chip--days">
        <span>
          <span className="chip-label" style={{ display: 'block' }}>{t('phaseDays')[2]}</span>
          <span className="chip-value">{cap(t('manifestoShipped'))}</span>
          <span className="day-cells">{Array.from({ length: 7 }, (_, i) => <i key={i} />)}</span>
        </span>
      </div>
    </div>
  );
}

export default function Hero({ onBook }) {
  const { t } = useI18n();
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  usePixelField(sectionRef, canvasRef);

  const stats = t('stats') || [];

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <canvas
        ref={canvasRef}
        className="hero-canvas"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 12px 12px, rgba(17,17,19,0.13) 1.2px, transparent 1.6px)',
          backgroundSize: `${CELL}px ${CELL}px`,
        }}
      />

      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-badge" data-hero="" style={{ '--d': '0ms' }}>
              <span className="pulse-dot" />
              {t('heroBadge')}
            </div>
            <h1 className="h-display" data-hero="" style={{ '--d': '80ms' }}>
              <span className="line">{t('heroH1a')}</span>
              <span className="line">{t('heroH1b')}</span>
              <span className="line accent">{t('heroH1c')}</span>
            </h1>
            <p className="lead" data-hero="" style={{ '--d': '180ms' }}>{t('heroSub')}</p>
            <div className="hero-actions" data-hero="" style={{ '--d': '260ms' }}>
              <button className="btn btn--primary btn--lg" onClick={onBook}>
                {noArrow(t('bookWeek'))}
                <ArrowRight />
              </button>
              <a
                href="#showcase"
                className="btn btn--ghost btn--lg"
                onClick={(e) => { e.preventDefault(); scrollToId('showcase'); }}
              >{t('seeWork')}</a>
            </div>
          </div>

          <div data-hero="" style={{ '--d': '380ms' }}>
            <SearchVisual />
          </div>
        </div>

        <dl className="stats">
          {stats.map(([value, label], i) => (
            <div className="stat" key={i} data-hero="" style={{ '--d': `${480 + i * 70}ms` }}>
              <dt className="stat-value">{value}</dt>
              <dd className="stat-label">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
