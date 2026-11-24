import { useEffect, useState } from 'react';
import MenuOverlay from './MenuOverlay';
import Logo from './Logo';
import LangSwitch from './LangSwitch';
import { ArrowRight } from './Icons';
import { useI18n } from '../i18n';
import { NAV, cap, noArrow, scrollToId } from '../utils';

export default function Header({ onBook, user, onSignIn, onSignOut }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container">
          <Logo onClick={(e) => { e.preventDefault(); scrollToId('top'); }} />

          <nav className="header-nav" aria-label="Main">
            {NAV.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="nav-link"
                onClick={(e) => { e.preventDefault(); scrollToId(l.id); }}
              >{cap(t(l.key))}</a>
            ))}
          </nav>

          <div className="header-right">
            {user && <a href="/#/admin" className="header-admin">{t('admin')}</a>}
            <LangSwitch />
            <button className="btn btn--primary btn--sm header-cta" onClick={onBook}>
              {noArrow(t('bookWeek'))}
              <ArrowRight size={15} />
            </button>
            <button
              className="icon-btn burger"
              onClick={() => setMenuOpen(true)}
              aria-label={t('openMenu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="burger-lines" aria-hidden="true"><span /><span /></span>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onBook={onBook}
        user={user}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />
    </>
  );
}
