import { useEffect, useState } from 'react';
import MenuOverlay from './MenuOverlay';
import { PrimaryButton } from './Button';
import { useScrollTo } from '../hooks/useScrollProgress';

export default function Header({ onBook, user, onSignIn, onSignOut }) {
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
  const scrollTo = useScrollTo();

  return (
    <header
      style={{
        position: 'fixed', top: visible ? 0 : -100, left: 0, right: 0,
        zIndex: 70, height: 72,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingLeft: 'clamp(24px, 5%, 64px)', paddingRight: 'clamp(24px, 5%, 64px)',
        background: 'rgba(255, 255, 255, 0.92)',
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
          display: 'flex', alignItems: 'center', textDecoration: 'none',
        }}
      >
        <img
          src="/logo.webp"
          alt="MILLIONPIXELS — Your Website, Found in Google"
          width="1048"
          height="238"
          style={{ height: 40, width: 'auto', display: 'block' }}
        />
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <nav className="header-nav" style={{ display: 'flex', gap: 28 }}>
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(l.id);
              }}
              style={{
                fontFamily: "'Geist Mono', monospace", fontSize: 12,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--ink)', textDecoration: 'none',
              }}
            >{l.label}</a>
          ))}
        </nav>

        {/* Auth buttons */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="header-auth">
            <span className="header-auth-email" style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 11,
              letterSpacing: '0.04em', color: 'var(--text-dim)',
            }}>{user.email}</span>
            <a href="/#/admin" className="header-auth-admin" style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 11,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--sienna)', textDecoration: 'none', padding: '6px 12px',
              border: '1px solid var(--sienna)', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sienna)'; e.currentTarget.style.color = 'var(--cream)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--sienna)'; }}
            >Admin</a>
            <button onClick={onSignOut} className="header-auth-signout" style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 11,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--text-dim)', background: 'none', border: 'none',
              cursor: 'pointer', padding: '6px 0', transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ink)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dim)'; }}
            >Sign out</button>
          </div>
        ) : (
          <button onClick={onSignIn} className="header-auth" style={{
            fontFamily: "'Geist Mono', monospace", fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--sienna)', background: 'none',
            border: '1px solid var(--sienna)', cursor: 'pointer',
            padding: '6px 14px', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sienna)'; e.currentTarget.style.color = 'var(--cream)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--sienna)'; }}
          >Sign in</button>
        )}

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
