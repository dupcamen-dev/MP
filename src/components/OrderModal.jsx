import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from '../i18n';
import { Check, Close } from './Icons';
import { cap } from '../utils';

export default function OrderModal({ onClose }) {
  const [form, setForm] = useState({ project: '', contact: '', website: '' });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const { t, locale } = useI18n();
  const uid = useId();
  const dialogRef = useRef(null);

  // Escape to close, lock page scroll, keep focus inside the dialog.
  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll('button, input, textarea, a[href]');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
  }, [onClose]);

  const update = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (sending) return;
    if (!form.contact.trim()) { setError(t('orderContactError')); return; }
    setError('');
    setSending(true);
    try {
      const res = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: form.project.trim(),
          contact: form.contact.trim(),
          locale,
          website: form.website,
        }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      // Never claim success unless the server confirmed delivery.
      setError(t('orderSendError'));
    } finally {
      setSending(false);
    }
  };

  return createPortal(
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-title`}
      >
        <button className="icon-btn modal-close" onClick={onClose} aria-label={cap(t('orderClose'))}>
          <Close />
        </button>

        {done ? (
          <div className="modal-done">
            <div className="done-icon"><Check size={28} className="" /></div>
            <h2 id={`${uid}-title`}>{cap(t('orderDoneTitle'))}</h2>
            <p>{t('orderDoneBody')}</p>
            <button className="btn btn--primary btn--block" onClick={onClose} autoFocus>{cap(t('orderClose'))}</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <h2 id={`${uid}-title`}>
              {cap(t('orderBookTitle'))} <span className="accent">{t('orderBookWeek').toLocaleLowerCase()}</span>
            </h2>
            <p className="modal-sub">{t('orderBookSub')}</p>

            <div className="field">
              <label htmlFor={`${uid}-project`}>{cap(t('orderBuildLabel'))}</label>
              <textarea
                id={`${uid}-project`}
                rows={3}
                maxLength={2000}
                value={form.project}
                onChange={update('project')}
                placeholder={t('orderBuildPlaceholder')}
                autoFocus
              />
            </div>
            <div className="field">
              <label htmlFor={`${uid}-contact`}>{cap(t('orderContactLabel'))}</label>
              <input
                id={`${uid}-contact`}
                type="text"
                autoComplete="email"
                maxLength={200}
                value={form.contact}
                onChange={update('contact')}
                placeholder={t('orderContactPlaceholder')}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${uid}-err` : undefined}
              />
            </div>

            {/* Honeypot for bots — hidden from people and assistive tech. */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
              <label htmlFor={`${uid}-website`}>Website</label>
              <input id={`${uid}-website`} type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} />
            </div>

            {error && <p className="field-error" id={`${uid}-err`} role="alert">{error}</p>}

            <button type="submit" className="btn btn--accent btn--lg btn--block" disabled={sending}>
              {sending ? cap(t('orderSending')) : cap(t('orderSend'))}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
