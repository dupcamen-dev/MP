import { useState } from 'react';
import { useScrollTo } from '../hooks/useScrollProgress';

export default function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const scrollTo = useScrollTo();

  const links = [
    { label: 'PROCESS', id: 'process' },
    { label: 'SHOWCASE', id: 'showcase' },
    { label: 'MANIFESTO', id: 'manifesto' },
    { label: 'REVIEWS', id: 'reviews' },
    { label: 'START PROJECT', id: 'cta', highlight: true },
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
          position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 60,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 64px',
          transition: 'clip-path 0.5s cubic-bezier(0.77,0,0.175,1)',
          clipPath: open ? 'circle(150% at top right)' : 'circle(0% at top right)',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', zIndex: 1 }}>
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); handleClick(l.id); }}
              className={l.highlight ? 'menu-link highlight' : 'menu-link'}
              style={{
                fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3rem,8vw,7.5rem)',
                lineHeight: 1, textTransform: 'uppercase', color: l.highlight ? 'var(--primary)' : 'var(--text)',
                textDecoration: 'none', transition: 'all 0.3s', position: 'relative',
                display: 'inline-block', width: 'fit-content', cursor: 'pointer',
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="sys-footer" style={{
          position: 'absolute', bottom: 48, left: 64,
          fontFamily: "'Space Mono', monospace", fontSize: '0.75rem',
          letterSpacing: '0.1em', color: 'var(--secondary)', textTransform: 'uppercase',
        }}>
          SYSTEM.NAV_ONLINE // GRIND_THE_RAW
        </div>
      </div>
      <button
        onClick={toggle}
        className={open ? 'menu-btn open' : 'menu-btn'}
        style={{
          position: 'relative', zIndex: 61, mixBlendMode: 'initial',
          display: 'flex', flexDirection: 'column', gap: 6,
          width: 48, height: 48, justifyContent: 'center', alignItems: 'flex-end',
          cursor: 'pointer', background: 'none', border: 'none', outline: 'none',
        }}
      >
        <span className="l1" style={{
          display: 'block', height: 3, background: '#0d0d0f', transition: 'all 0.3s', borderRadius: 0,
          boxShadow: '0 0 0 2px var(--primary)',
          width: 36,
          transform: open ? 'rotate(45deg) translate(6px,6px)' : 'none',
        }}></span>
        <span className="l2" style={{
          display: 'block', height: 3, background: '#0d0d0f', transition: 'all 0.3s', borderRadius: 0,
          boxShadow: open ? 'none' : '0 0 0 2px var(--primary)',
          width: open ? 0 : 28, opacity: open ? 0 : 1,
        }}></span>
        <span className="l3" style={{
          display: 'block', height: 3, background: '#0d0d0f', transition: 'all 0.3s', borderRadius: 0,
          boxShadow: '0 0 0 2px var(--primary)',
          width: open ? 36 : 40,
          transform: open ? 'rotate(-45deg) translate(6px,-6px)' : 'none',
        }}></span>
      </button>
    </>
  );
}
