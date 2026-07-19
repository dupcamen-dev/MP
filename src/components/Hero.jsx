import { useEffect, useRef, useState } from 'react';
import { useMobile } from '../hooks/useMobile';
import { PrimaryButton, GhostButton } from './Button';

const PIXEL_COLS = 120;
const PIXEL_ROWS = 70;
const RADIUS = 8;
const FADE_SPEED = 0.5;

function usePixelGrid(canvasRef) {
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
      gridRef.current = Array.from({ length: PIXEL_ROWS }, () =>
        Array.from({ length: PIXEL_COLS }, () => 0)
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
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', () => {
      mouseRef.current = { x: -999, y: -999 };
    });

    const cellW = canvas.width / PIXEL_COLS;
    const cellH = canvas.height / PIXEL_ROWS;
    const gap = Math.max(0.3, Math.min(cellW, cellH) * 0.12);

    const draw = () => {
      const { x: mx, y: my } = mouseRef.current;
      const cw = canvas.width;
      const ch = canvas.height;

      ctx.clearRect(0, 0, cw, ch);

      for (let r = 0; r < PIXEL_ROWS; r++) {
        for (let c = 0; c < PIXEL_COLS; c++) {
          const cx = c * cw / PIXEL_COLS + cellW / 2;
          const cy = r * ch / PIXEL_ROWS + cellH / 2;
          const dx = cx - mx;
          const dy = cy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < RADIUS * cellW) {
            const influence = 1 - dist / (RADIUS * cellW);
            grid[r][c] = Math.min(1, grid[r][c] + influence * 0.5);
          }

          const alpha = grid[r][c];
          if (alpha > 0.01) {
            ctx.fillStyle = `rgba(240, 224, 96, ${alpha})`;
            ctx.fillRect(
              c * cw / PIXEL_COLS + gap,
              r * ch / PIXEL_ROWS + gap,
              cellW - gap * 2,
              cellH - gap * 2
            );
          }

          grid[r][c] = Math.max(0, grid[r][c] - FADE_SPEED);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', null);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [canvasRef]);
}

export default function Hero({ onBook }) {
  const [visible, setVisible] = useState(false);
  const mobile = useMobile();
  const canvasRef = useRef(null);
  usePixelGrid(canvasRef);

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
    background: '#000',
    color: 'var(--cream)',
    position: 'relative', overflow: 'hidden',
  };

  const canvasStyle = {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    pointerEvents: mobile ? 'none' : 'auto',
    zIndex: 0,
  };

  const contentStyle = {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', maxWidth: 900, width: '100%', margin: '0 auto',
    position: 'relative', zIndex: 1, pointerEvents: 'none',
  };

  const inner = (
    <>
      <canvas ref={canvasRef} style={canvasStyle} />
      <div style={contentStyle}>
        <p style={{
          fontFamily: "'Geist Mono', monospace", fontSize: 12,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--cream)', opacity: 0.7, margin: '0 0 24px 0',
          ...reveal(0),
        }}>SHIPPED IN 7</p>

        <h1 style={{
          fontFamily: "'Anton', Impact, sans-serif",
          fontSize: 'clamp(3.5rem, 9vw, 8rem)', lineHeight: 0.88,
          textTransform: 'uppercase', color: 'var(--cream)',
          letterSpacing: '-0.02em', margin: '0 0 32px 0',
          ...reveal(0.08),
        }}>
          Idea to live<br />software.<br />
          <span style={{ color: 'var(--primary)' }}>Seven days.</span>
        </h1>

        <p style={{
          fontFamily: "'Geist', sans-serif", fontWeight: 300,
          fontSize: 'clamp(1.15rem, 2vw, 1.5rem)', lineHeight: 1.4,
          color: 'var(--cream)', opacity: 0.9, maxWidth: 600, margin: '0 0 40px 0',
          ...reveal(0.16),
        }}>
          Senior engineers who ship production-grade products in a week.
          Real code. Real users. Your repo — by day seven.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', pointerEvents: 'auto', ...reveal(0.24) }}>
          <PrimaryButton onClick={onBook} style={{ background: 'var(--cream)', color: 'var(--deep)' }}>
            Book a week →
          </PrimaryButton>
          <GhostButton href="#showcase" style={{ color: 'var(--cream)', borderColor: 'var(--cream)' }}>
            See the work
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
