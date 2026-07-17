import { useState } from 'react';
import { useScrollTo } from '../hooks/useScrollProgress';

export default function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const scrollTo = useScrollTo();

  const links = [
    { label: 'PROCESS', id: 'process' },
    { label: 'WORK', id: 'showcase' },
    { label: 'REVIEWS', id: 'reviews' },
    { label: 'PRICING', id: 'pricing' },
    { label: 'REQUEST', id: 'cta', highlight: true },
  ];

  function handleClick(id) {
    setOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => scrollTo(id), 400);
  }

  function toggle() {
    const next = !open;
    setOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  }

  return (
    <>
      {/* Fullscreen overlay */}
      <div
        id="menu-overlay"
        className={open ? 'open' : ''}
        style={{
          position: 'fixed', inset: 0, background: 'var(--secondary)', zIndex: 90,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
          paddingLeft: 'clamp(24px, 8%, 140px)', paddingRight: 'clamp(24px, 5%, 120px)',
          transition: 'opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)',
          opacity: open ? 1 : 0,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          pointerEvents: open ? 'auto' : 'none',
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        {/* Close button inside overlay */}
        <button
          onClick={toggle}
          aria-label="Close menu"
          style={{
            position: 'absolute', top: 'clamp(24px, 4vh, 48px)', right: 'clamp(24px, 5%, 64px)',
            width: 56, height: 56, zIndex: 5,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '2.5rem', color: 'var(--bg-alt)', lineHeight: 1,
            transition: 'transform 0.3s, color 0.3s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(90deg)'; e.currentTarget.style.color = 'var(--primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(0deg)'; e.currentTarget.style.color = 'var(--bg-alt)'; }}
        >
          ✕
        </button>

        <nav id="main-nav" style={{
          display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 2vh, 20px)',
          position: 'relative', zIndex: 1, width: '100%',
        }}>
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); handleClick(l.id); }}
              className={l.highlight ? 'menu-link highlight' : 'menu-link'}
              style={{
                fontFamily: "'Anton', Impact, sans-serif",
                fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                lineHeight: 0.95, textTransform: 'uppercase',
                color: l.highlight ? 'var(--primary)' : 'var(--bg-alt)',
                textDecoration: 'none', transition: 'all 0.3s', position: 'relative',
                display: 'block', width: 'fit-content', cursor: 'pointer',
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Hamburger button (only visible when menu closed) */}
      <button
        onClick={toggle}
        className={open ? 'menu-btn open' : 'menu-btn'}
        aria-expanded={open}
        aria-controls="main-nav"
        aria-label="Open menu"
        style={{
          position: 'relative', zIndex: 95,
          display: open ? 'none' : 'flex', flexDirection: 'column', gap: 5,
          width: 52, height: 52, justifyContent: 'center', alignItems: 'center',
          cursor: 'pointer', background: 'var(--primary)', border: 'none', outline: 'none',
          borderRadius: 12, padding: 14,
          boxShadow: '0 4px 12px rgba(201, 123, 92, 0.25)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(201, 123, 92, 0.35)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 123, 92, 0.25)'; }}
      >
        <span style={{
          display: 'block', height: 2.5, background: 'var(--surface-low)',
          transition: 'all 0.3s', borderRadius: 2, width: '100%',
        }}></span>
        <span style={{
          display: 'block', height: 2.5, background: 'var(--surface-low)',
          transition: 'all 0.3s', borderRadius: 2, width: '100%',
        }}></span>
        <span style={{
          display: 'block', height: 2.5, background: 'var(--surface-low)',
          transition: 'all 0.3s', borderRadius: 2, width: '100%',
        }}></span>
      </button>
    </>
  );
}
