import { useEffect, useState } from 'react';
import MenuOverlay from './MenuOverlay';
import { PrimaryButton } from './Button';
import { useScrollTo } from '../hooks/useScrollProgress';
import { useI18n, LOCALES } from '../i18n';

export default function Header({ onBook, user, onSignIn, onSignOut }) {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, locale, setLanguage } = useI18n();

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    function onScroll() { setScrolled(window.scrollY > 40); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('navWork'), id: 'showcase' },
    { label: t('navProcess'), id: 'process' },
    { label: t('navPricing'), id: 'pricing' },
  ];
  const scrollTo = useScrollTo();

  return (
    <header
      style={{
        position: 'fixed', top: visible ? 0 : -100, left: 0, right: 0,
        zIndex: 70, height: 72,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingLeft: 'clamp(24px, 5%, 64px)', paddingRight: 'clamp(24px, 5%, 64px)',
        background: 'rgba(253, 253, 253, 0.95)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid #e8e8e8' : '1px solid transparent',
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

      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
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
              letterSpacing: '0.04em',               color: '#8a8a8a',
            }}>{user.email}</span>
            <a href="/#/admin" className="header-auth-admin" style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 11,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--ink)', textDecoration: 'none', padding: '6px 12px',
              border: '1px solid #e8e8e8', borderRadius: 999, transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--ink)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = '#e8e8e8'; }}
            >{t('admin')}</a>
            <button onClick={onSignOut} className="header-auth-signout" style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 11,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#8a8a8a', background: 'none', border: 'none',
              cursor: 'pointer', padding: '6px 0', transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ink)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#8a8a8a'; }}
            >{t('signOut')}</button>
          </div>
        ) : (
          <button onClick={onSignIn} className="header-auth" style={{
            fontFamily: "'Geist Mono', monospace", fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--ink)', background: 'none',
            border: '1px solid #e8e8e8', borderRadius: 999, cursor: 'pointer',
            padding: '6px 14px', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--ink)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = '#e8e8e8'; }}
          >{t('signIn')}</button>
        )}

        <div className="header-lang" style={{ display: 'flex', gap: 4, color: '#8a8a8a' }}>
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ink)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = l === locale ? 'var(--ink)' : '#8a8a8a'; }}
              style={{
                fontFamily: "'Geist Mono', monospace", fontSize: 11,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px',
                color: l === locale ? 'var(--ink)' : '#8a8a8a',
                fontWeight: l === locale ? 600 : 400,
              }}
            >{l === 'en' ? 'EN' : l === 'uk' ? 'UA' : 'PL'}</button>
          ))}
        </div>

        <div className="header-cta">
          <PrimaryButton onClick={onBook} style={{ padding: '10px 20px', fontSize: '0.85rem', background: 'var(--ink)', color: '#fff', boxShadow: '4px 4px 0 rgba(0,0,0,0.15)' }}>
            {t('bookWeek')}
          </PrimaryButton>
        </div>
        <MenuOverlay onBook={onBook} user={user} onSignIn={onSignIn} onSignOut={onSignOut} />
      </div>
    </header>
  );
}
