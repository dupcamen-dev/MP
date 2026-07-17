import { useEffect, useState } from 'react';
import MenuOverlay from './MenuOverlay';
import { PrimaryButton } from './Button';

export default function Header({ onBook }) {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    function onScroll() { setScrolled(window.scrollY > 40); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', id: 'showcase' },
    { label: 'PROCESS', id: 'process' },
    { label: 'PRICING', id: 'pricing' },
  ];

  return (
    <header
      style={{
        position: 'fixed', top: visible ? 0 : -100, left: 0, right: 0,
        zIndex: 70, height: 72,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingLeft: 'clamp(24px, 5%, 64px)', paddingRight: 'clamp(24px, 5%, 64px)',
        background: 'rgba(250, 246, 240, 0.9)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid var(--sienna)' : '1px solid transparent',
        transition: 'top 0.6s cubic-bezier(0.16,1,0.3,1), border-color 0.3s',
      }}
    >
      <a
        href="#hero"
        className="header-logo"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.15rem, 2.2vw, 1.6rem)',
          color: 'var(--terracotta)', textDecoration: 'none', letterSpacing: '-0.01em',
        }}
      >
        MILLIONPIXELS
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <nav className="header-nav" style={{ display: 'flex', gap: 28 }}>
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontFamily: "'Geist Mono', monospace", fontSize: 12,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--ink)', textDecoration: 'none',
              }}
            >{l.label}</a>
          ))}
        </nav>
        <div className="header-cta">
          <PrimaryButton onClick={onBook} style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
            Book a week →
          </PrimaryButton>
        </div>
        <MenuOverlay onBook={onBook} />
      </div>
    </header>
  );
}
