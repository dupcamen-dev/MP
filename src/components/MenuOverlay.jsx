import { useState } from 'react';
import { useScrollTo } from '../hooks/useScrollProgress';

export default function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const scrollTo = useScrollTo();

  const links = [
    { label: 'PROCESS', id: 'process' },
    { label: 'WORK', id: 'showcase' },
    { label: 'REQUEST', id: 'cta', highlight: true },
  ];

  function handleClick(id) {
    setOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => scrollTo(id), 300);
  }

  function toggle() {
    const next = !open;
    setOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  }

  return (
    <>
      <div
        id="menu-overlay"
        className={open ? 'open' : ''}
        style={{
          position: 'fixed', inset: 0, background: 'var(--secondary)', zIndex: 100,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
          paddingLeft: 'clamp(24px, 8%, 140px)', paddingRight: 'clamp(24px, 5%, 120px)', paddingTop: '80px', paddingBottom: '80px',
          transition: 'opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)',
          opacity: open ? 1 : 0,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          pointerEvents: open ? 'auto' : 'none',
          visibility: open ? 'visible' : 'hidden',
          overflowY: 'auto',
        }}
      >
        <nav id="main-nav" style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative', zIndex: 1, width: '100%' }}>
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); handleClick(l.id); }}
              className={l.highlight ? 'menu-link highlight' : 'menu-link'}
              style={{
                fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(4rem, 12vw, 8.5rem)',
                lineHeight: 0.85, textTransform: 'uppercase', color: l.highlight ? 'var(--primary)' : 'var(--bg-alt)',
                textDecoration: 'none', transition: 'all 0.3s', position: 'relative',
                display: 'block', width: '100%', cursor: 'pointer', marginBottom: '16px',
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <button
        onClick={toggle}
        className={open ? 'menu-btn open' : 'menu-btn'}
        aria-expanded={open}
        aria-controls="main-nav"
        style={{
          position: 'relative', zIndex: 61, mixBlendMode: 'initial',
          display: 'flex', flexDirection: 'column', gap: 6,
          width: 48, height: 48, justifyContent: 'center', alignItems: 'flex-end',
          cursor: 'pointer', background: 'none', border: 'none', outline: 'none',
        }}
      >
        <span className="l1" style={{
          display: 'block', height: 3, background: 'var(--surface-low)', transition: 'all 0.3s', borderRadius: 0,
          boxShadow: '0 0 0 2px var(--primary)',
          width: 36,
          transform: open ? 'rotate(45deg) translate(6px,6px)' : 'none',
        }}></span>
        <span className="l2" style={{
          display: 'block', height: 3, background: 'var(--surface-low)', transition: 'all 0.3s', borderRadius: 0,
          boxShadow: open ? 'none' : '0 0 0 2px var(--primary)',
          width: open ? 0 : 28, opacity: open ? 0 : 1,
        }}></span>
        <span className="l3" style={{
          display: 'block', height: 3, background: 'var(--surface-low)', transition: 'all 0.3s', borderRadius: 0,
          boxShadow: '0 0 0 2px var(--primary)',
          width: open ? 36 : 40,
          transform: open ? 'rotate(-45deg) translate(6px,-6px)' : 'none',
        }}></span>
      </button>
    </>
  );
}
