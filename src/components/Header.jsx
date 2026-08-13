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
        background: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid transparent',
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
          width="1000"
          height="333"
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
                color: 'var(--cream)', textDecoration: 'none',
              }}
            >{l.label}</a>
          ))}
        </nav>

        {/* Auth buttons */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="header-auth">
            <span className="header-auth-email" style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 11,
              letterSpacing: '0.04em', color: 'rgba(255, 255, 255, 0.55)',
            }}>{user.email}</span>
            <a href="/#/admin" className="header-auth-admin" style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 11,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--cream)', textDecoration: 'none', padding: '6px 12px',
              border: '1px solid rgba(255, 255, 255, 0.6)', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--cream)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)'; }}
            >Admin</a>
            <button onClick={onSignOut} className="header-auth-signout" style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 11,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)', background: 'none', border: 'none',
              cursor: 'pointer', padding: '6px 0', transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'; }}
            >Sign out</button>
          </div>
        ) : (
          <button onClick={onSignIn} className="header-auth" style={{
            fontFamily: "'Geist Mono', monospace", fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--cream)', background: 'none',
            border: '1px solid rgba(255, 255, 255, 0.6)', cursor: 'pointer',
            padding: '6px 14px', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--cream)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)'; }}
          >Sign in</button>
        )}

        <div className="header-cta">
          <PrimaryButton onClick={onBook} style={{ padding: '10px 20px', fontSize: '0.85rem', background: 'var(--primary)', color: 'var(--ink)', boxShadow: '4px 4px 0 rgba(0,0,0,0.4)' }}>
            Book a week →
          </PrimaryButton>
        </div>
        <MenuOverlay onBook={onBook} />
      </div>
    </header>
  );
}
