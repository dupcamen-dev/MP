import { useEffect, useRef, useState } from 'react';
import { useMobile } from '../hooks/useMobile';
import { useI18n } from '../i18n';
import { PrimaryButton, GhostButton } from './Button';

function usePixelGrid(canvasRef, cols, rows, radius, fadeSpeed) {
  const gridRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    if (!gridRef.current) {
      gridRef.current = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0)
      );
    }
    const grid = gridRef.current;

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const onTouch = (e) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: t.clientX - rect.left,
        y: t.clientY - rect.top,
      };
    };
    const onLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
    };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('touchstart', onTouch, { passive: true });
    canvas.addEventListener('touchmove', onTouch, { passive: true });
    canvas.addEventListener('touchend', onLeave, { passive: true });
    canvas.addEventListener('touchcancel', onLeave, { passive: true });

    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;
    const gap = Math.max(0.3, Math.min(cellW, cellH) * 0.12);

    const draw = () => {
      const { x: mx, y: my } = mouseRef.current;
      const cw = canvas.width;
      const ch = canvas.height;

      ctx.clearRect(0, 0, cw, ch);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * cw / cols + cellW / 2;
          const cy = r * ch / rows + cellH / 2;
          const dx = cx - mx;
          const dy = cy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius * cellW) {
            const influence = 1 - dist / (radius * cellW);
            grid[r][c] = Math.min(1, grid[r][c] + influence * 0.5);
          }

          const alpha = grid[r][c];
          if (alpha > 0.01) {
            ctx.fillStyle = `rgba(249, 115, 22, ${alpha * 0.5})`;
            ctx.fillRect(
              c * cw / cols + gap,
              r * ch / rows + gap,
              cellW - gap * 2,
              cellH - gap * 2
            );
          }

          grid[r][c] = Math.max(0, grid[r][c] - fadeSpeed);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('touchstart', onTouch);
      canvas.removeEventListener('touchmove', onTouch);
      canvas.removeEventListener('touchend', onLeave);
      canvas.removeEventListener('touchcancel', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [canvasRef]);
}

const LOG_LINES = [
  '$ npm run build',
  '$ npm run deploy',
  '✓ BUILD PASSED',
  '✓ DEPLOYED → production',
  'git commit -m "ship"',
  'commit 8f31c2a → production',
  'feature/seo → main',
  'PR #12 merged',
  'GET / 200 23ms',
  'GET /pricing 200 41ms',
  'POST /book 201 87ms',
  '200 OK · millionpixels.dev',
  'server listening on :3000',
  '├── src/',
  '│   ├── components/',
  '│   ├── hooks/',
  '│   └── seo.js',
  '> 15 tests passed',
  '> bundle 271 KB · gzip 79 KB',
  'TLS handshake ok',
  'curl -I https://millionpixels.dev',
  'SEO: titles · meta · sitemap',
  'schema.org: ProfessionalService',
  'day 7: ship it',
  'done. live in 7 days.',
];

function useCodeRain(canvasRef) {
  const rafRef = useRef(null);
  const linesRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = (initial) => ({
      text: LOG_LINES[Math.floor(Math.random() * LOG_LINES.length)],
      x: Math.random() * canvas.width,
      y: initial ? Math.random() * canvas.height : canvas.height + 24,
      speed: 0.12 + Math.random() * 0.35,
      alpha: 0.45 + Math.random() * 0.35,
      yellow: Math.random() < 0.1,
    });

    if (!linesRef.current) {
      const count = canvas.width < 768 ? 16 : 40;
      linesRef.current = Array.from({ length: count }, () => spawn(true));
    }
    const lines = linesRef.current;

    let last = 0;
    const draw = (t) => {
      const dt = last ? (t - last) / 1000 : 0;
      last = t;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "11px 'Inter', monospace";
      ctx.textBaseline = 'top';

      for (const ln of lines) {
        ln.y -= ln.speed * 60 * dt;
        if (ln.y < -24) Object.assign(ln, spawn(false));
        ctx.fillStyle = ln.yellow
          ? `rgba(249, 115, 22, ${Math.min(1, ln.alpha + 0.2)})`
          : `rgba(26, 26, 26, ${ln.alpha * 0.5})`;
        ctx.fillText(ln.text, ln.x, ln.y);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [canvasRef]);
}

function useTimer() {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(Math.floor(sec / 3600)).padStart(2, '0');
  const mm = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const ss = String(sec % 60).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

export default function Hero({ onBook }) {
  const [visible, setVisible] = useState(false);
  const mobile = useMobile();
  const { t } = useI18n();
  const canvasRef = useRef(null);
  const rainRef = useRef(null);
  usePixelGrid(canvasRef, mobile ? 40 : 120, mobile ? 40 : 70, mobile ? 5 : 8, mobile ? 0.03 : 0.06);
  useCodeRain(rainRef);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const reveal = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(12px)',
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  const sectionStyle = {
    minHeight: '100vh',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 'clamp(80px, 12vh, 140px) clamp(24px, 8%, 140px)',
    background: '#fdfdfd',
    color: 'var(--ink)',
    position: 'relative', overflow: 'hidden',
  };

  const canvasStyle = {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    zIndex: 0,
  };

  const contentStyle = {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', maxWidth: 900, width: '100%', margin: '0 auto',
    position: 'relative', zIndex: 1, pointerEvents: 'none',
  };

  const cornerStyle = {
    fontFamily: "'Geist Mono', monospace", fontSize: 11,
    letterSpacing: '0.14em', color: 'rgba(26, 26, 26, 0.2)',
    position: 'absolute', zIndex: 1, pointerEvents: 'none',
    userSelect: 'none',
  };
  const markers = !mobile && (
    <>
      <div style={{ ...cornerStyle, top: 88, left: 'clamp(24px, 4%, 48px)' }}>01</div>
      <div style={{ ...cornerStyle, top: 'calc(100vh - 120px)', left: 'clamp(24px, 4%, 48px)' }}>07</div>
      <div style={{
        ...cornerStyle, bottom: 14, left: 'clamp(24px, 4%, 48px)', right: 'clamp(24px, 4%, 48px)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span>00:00</span>
        <span style={{ flex: 1, height: 1, background: 'rgba(26, 26, 26, 0.12)' }} />
        <span>23:59</span>
      </div>
    </>
  );

  const inner = (
    <>
      <canvas ref={rainRef} style={canvasStyle} />
      <canvas ref={canvasRef} style={canvasStyle} />
      {markers}
      <div style={contentStyle}>
        <p style={{
          fontFamily: "'Geist Mono', monospace", fontSize: 12,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--ink)', opacity: 0.7, margin: '0 0 24px 0',
          ...reveal(0),
        }}>{t('heroBadge')}</p>

        <h1 style={{
          fontFamily: "'Anton', Impact, sans-serif",
          fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 0.95,
          textTransform: 'uppercase', color: 'var(--ink)',
          letterSpacing: '-0.01em', margin: '0 0 32px 0',
          ...reveal(0.08),
        }}>
          {t('heroH1a')}<br />{t('heroH1b')}<br />
          <span className={visible ? 'ship-flash' : ''} style={{ color: '#f97316' }}>{t('heroH1c')}</span>
        </h1>

        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300,
          fontSize: 'clamp(1.15rem, 2vw, 1.5rem)', lineHeight: 1.4,
          color: 'var(--ink)', opacity: 0.9, maxWidth: 600, margin: '0 0 40px 0',
          ...reveal(0.16),
        }}>
          {t('heroSub')}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', pointerEvents: 'auto', ...reveal(0.24) }}>
          <PrimaryButton onClick={onBook} style={{ background: 'var(--ink)', color: '#fff' }}>
            {t('bookWeek')}
          </PrimaryButton>
          <GhostButton href="#showcase" style={{ color: 'var(--ink)', borderColor: 'var(--ink)' }}>
            {t('seeWork')}
          </GhostButton>
        </div>
      </div>
    </>
  );

  if (mobile) {
    return <section id="hero" style={sectionStyle}>{inner}</section>;
  }

  return (
    <section id="hero" style={{
      ...sectionStyle,
      ...(mobile ? {} : { backgroundAttachment: 'fixed' }),
    }}>
      {inner}
    </section>
  );
}
