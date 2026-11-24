import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from '../i18n';
import { Check, Close } from './Icons';
import { cap } from '../utils';

// NOTE: submission logic is unchanged from the previous version on purpose —
// its known bugs are tracked in REVIEW.md (#1, #3) and will be fixed separately.

function getBotConfig() {
  try {
    const raw = localStorage.getItem('mp_bot_config');
    return raw ? JSON.parse(raw) : { token: '', chatId: '' };
  } catch { return { token: '', chatId: '' }; }
}

function saveOrder(order) {
  try {
    const raw = localStorage.getItem('mp_orders');
    const orders = raw ? JSON.parse(raw) : [];
    orders.unshift(order);
    localStorage.setItem('mp_orders', JSON.stringify(orders));
  } catch {}
}

export default function OrderModal({ onClose }) {
  const [form, setForm] = useState({ project: '', contact: '' });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const { t } = useI18n();
  const uid = useId();
  const dialogRef = useRef(null);

  // Escape to close, lock page scroll, keep focus inside the dialog.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement;
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
    if (!form.contact.trim()) { setError(t('orderContactError')); return; }
    setError('');
    setSending(true);
    const now = new Date().toISOString();
    const display = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' });
    const order = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      project: form.project.trim() || '(not specified)',
      contact: form.contact.trim(),
      timestamp: now,
      displayTime: display,
      status: 'new',
    };

    try {
      // Try Vercel serverless API first (works for all users in production)
      const apiRes = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: order.project,
          contact: order.contact,
          displayTime: order.displayTime,
        }),
      });
      if (!apiRes.ok) throw new Error('API failed');
    } catch {
      // Fallback: try localStorage config (admin's own browser)
      const { token, chatId } = getBotConfig();
      if (token && chatId) {
        const msg = [
          `📦 *NEW REQUEST — MVP BUILD*`,
          `🕒 ${display}`,
          `━━━━━━━━━━━━━━━━━`,
          `*PROJECT:*`,
          order.project,
          ``,
          `*CONTACT:* ${order.contact}`,
        ].join('\n');
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'Markdown' }),
        });
      }
    }

    saveOrder(order);
    setDone(true);
    setSending(false);
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
                value={form.contact}
                onChange={update('contact')}
                placeholder={t('orderContactPlaceholder')}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${uid}-err` : undefined}
              />
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
