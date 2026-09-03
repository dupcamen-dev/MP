import { useState } from 'react';
import { useI18n } from '../i18n';

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

const inputStyle = {
  width: '100%', padding: '14px 16px', background: '#ffffff',
  border: '2px solid #e0e0e0', borderRadius: 'var(--radius-sm)',
  fontFamily: "'Geist', sans-serif", fontSize: '1.05rem', color: '#1a1a1a',
  outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box',
  resize: 'vertical',
};

const labelStyle = {
  fontFamily: "'Geist Mono', monospace", fontSize: 11, letterSpacing: '0.12em',
  textTransform: 'uppercase', color: '#555555', display: 'block', marginBottom: 8,
};

export default function OrderModal({ onClose }) {
  const [form, setForm] = useState({ project: '', contact: '' });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const { t } = useI18n();

  const update = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async () => {
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

  if (done) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'rgba(15,15,18,0.55)', backdropFilter: 'blur(8px)',
      }} onClick={onClose} role="dialog" aria-modal="true">
        <div onClick={e => e.stopPropagation()} style={{
          background: 'var(--surface-low)', padding: '60px 48px', maxWidth: 420, width: '90%',
          textAlign: 'center',           border: '2px solid var(--ink)', borderRadius: 'var(--radius-lg)',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>&#9889;</div>
          <h3 style={{
            fontFamily: "'Anton', Impact, sans-serif", fontSize: '2.25rem', color: 'var(--ink)',
            textTransform: 'uppercase', margin: '0 0 12px', letterSpacing: '0.05em',
          }}>{t('orderDoneTitle')}</h3>
          <p style={{
            fontFamily: "'Geist', sans-serif", fontSize: '1.1rem', color: 'var(--on-surface)',
            marginBottom: 32, lineHeight: 1.5,
          }}>
            {t('orderDoneBody')}
          </p>
          <button onClick={onClose} style={{
            padding: '16px 48px', background: '#f97316', color: '#ffffff',
            fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.25rem', textTransform: 'uppercase',
            border: '2px solid #f97316', borderRadius: 'var(--radius-pill)', cursor: 'pointer', letterSpacing: '0.05em',
          }}>{t('orderClose')}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'rgba(15,15,18,0.55)', backdropFilter: 'blur(8px)',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fdfdfd', padding: '48px 40px', maxWidth: 520, width: '90%',
        border: '1px solid #e8e8e8', borderRadius: 'var(--radius-lg)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28,
        }}>
          <div>
            <h3 style={{
              fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.75rem', color: 'var(--ink)',
              textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0,
            }}>{t('orderBookTitle')} <span style={{ color: '#f97316' }}>{t('orderBookWeek')}</span></h3>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontSize: '0.9rem', color: '#8a8a8a',
              margin: '6px 0 0 0',
            }}>{t('orderBookSub')}</p>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: '2rem', color: 'var(--ink)',
            cursor: 'pointer', padding: '4px 12px', lineHeight: 1, opacity: 0.75,
          }}>&#10005;</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
          <div>
            <label style={labelStyle}>{t('orderBuildLabel')}</label>
            <textarea
              rows={3}
              value={form.project}
              onChange={update('project')}
              placeholder={t('orderBuildPlaceholder')}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              autoFocus
            />
          </div>
          <div>
            <label style={labelStyle}>{t('orderContactLabel')}</label>
            <input
              type="text"
              value={form.contact}
              onChange={update('contact')}
              placeholder={t('orderContactPlaceholder')}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>
        </div>

        {error && <p style={{ fontFamily: "'Geist', sans-serif", fontSize: '0.85rem', color: '#ff6b6b', margin: '0 0 16px 0' }}>{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={sending}
          style={{
            width: '100%', padding: '18px', background: '#f97316', color: '#ffffff',
            fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.35rem', textTransform: 'uppercase',
            border: '2px solid #f97316', borderRadius: 'var(--radius-pill)', cursor: sending ? 'wait' : 'pointer',
            opacity: sending ? 0.6 : 1, letterSpacing: '0.05em',
            boxShadow: '0 8px 20px rgba(249,115,22,0.35)',
          }}
          onMouseEnter={!sending ? (e) => { e.currentTarget.style.background = '#ef5d08'; e.currentTarget.style.borderColor = '#ef5d08'; } : undefined}
          onMouseLeave={!sending ? (e) => { e.currentTarget.style.background = '#f97316'; e.currentTarget.style.borderColor = '#f97316'; } : undefined}
        >
          {sending ? t('orderSending') : t('orderSend')}
        </button>
      </div>
    </div>
  );
}
