import { useState, useEffect } from 'react';
import { useI18n } from '../i18n';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    try {
      if (!localStorage.getItem('mp_cookies')) setShow(true);
    } catch {}
  }, []);

  const accept = () => {
    try { localStorage.setItem('mp_cookies', '1'); } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie" role="region" aria-label="Cookies">
      <p>{t('cookieText')}</p>
      <button className="btn btn--light btn--sm" onClick={accept}>{t('cookieAccept')}</button>
    </div>
  );
}
