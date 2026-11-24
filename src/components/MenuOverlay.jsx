import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Logo from './Logo';
import LangSwitch from './LangSwitch';
import { ArrowRight, Close } from './Icons';
import { useI18n } from '../i18n';
import { NAV, cap, noArrow, scrollToId } from '../utils';

export default function MenuOverlay({ open, onClose, onBook, user, onSignOut }) {
  const { t } = useI18n();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const go = (id) => {
    onClose();
    setTimeout(() => scrollToId(id), 280);
  };

  return createPortal(
    <div
      id="mobile-menu"
      className={`menu${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label="Menu"
    >
      <div className="menu-top">
        <Logo onClick={(e) => { e.preventDefault(); go('top'); }} />
        <button ref={closeRef} className="icon-btn" onClick={onClose} aria-label={t('closeMenu')} tabIndex={open ? 0 : -1}>
          <Close />
        </button>
      </div>

      <nav className="menu-links" aria-label="Main">
        {NAV.map((l, i) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className="menu-link"
            tabIndex={open ? 0 : -1}
            onClick={(e) => { e.preventDefault(); go(l.id); }}
          >
            <small>0{i + 1}</small>
            {cap(t(l.key))}
          </a>
        ))}
      </nav>

      <div className="menu-bottom">
        <button
          className="btn btn--primary btn--lg btn--block"
          tabIndex={open ? 0 : -1}
          onClick={() => { onClose(); setTimeout(() => onBook?.(), 250); }}
        >
          {noArrow(t('bookWeek'))}
          <ArrowRight />
        </button>
        <div className="menu-meta">
          <LangSwitch />
          {user ? (
            <span style={{ display: 'flex', gap: 16 }}>
              <a href="/#/admin" tabIndex={open ? 0 : -1}>{t('admin')}</a>
              <button className="text-btn" tabIndex={open ? 0 : -1} onClick={() => { onClose(); onSignOut?.(); }}>{t('signOut')}</button>
            </span>
          ) : (
            <a href="mailto:hello@millionpixels.dev" tabIndex={open ? 0 : -1}>hello@millionpixels.dev</a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
