import { useState } from 'react';

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
  width: '100%', padding: '14px 16px', background: 'rgba(15,15,18,0.08)',
  border: '2px solid rgba(15,15,18,0.2)', borderRadius: 0,
  fontFamily: "'Geist', sans-serif", fontSize: '1.05rem', color: 'var(--surface-low)',
  outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box',
  resize: 'vertical',
};

const labelStyle = {
  fontFamily: "'Geist Mono', monospace", fontSize: 11, letterSpacing: '0.12em',
  textTransform: 'uppercase', color: 'var(--surface-low)', display: 'block', marginBottom: 8,
};

export default function OrderModal({ onClose }) {
  const [form, setForm] = useState({ project: '', contact: '' });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.contact.trim()) { setError('Please enter your contact.'); return; }
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

    const { token, chatId } = getBotConfig();
    const msg = [
      `📦 *NEW REQUEST — $300 MVP*`,
      `🕒 ${display}`,
      `━━━━━━━━━━━━━━━━━`,
      `*PROJECT:*`,
      order.project,
      ``,
      `*CONTACT:* ${order.contact}`,
    ].join('\n');

    try {
      if (token && chatId) {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'Markdown' }),
        });
      }
      saveOrder(order);
      setDone(true);
    } catch {
      saveOrder(order);
      setDone(true);
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'rgba(15,15,18,0.85)', backdropFilter: 'blur(8px)',
      }} onClick={onClose} role="dialog" aria-modal="true">
        <div onClick={e => e.stopPropagation()} style={{
          background: 'var(--surface-low)', padding: '60px 48px', maxWidth: 420, width: '90%',
          textAlign: 'center', border: '2px solid var(--primary)',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>&#9889;</div>
          <h3 style={{
            fontFamily: "'Anton', Impact, sans-serif", fontSize: '2.25rem', color: 'var(--primary)',
            textTransform: 'uppercase', margin: '0 0 12px', letterSpacing: '0.05em',
          }}>REQUEST SENT</h3>
          <p style={{
            fontFamily: "'Geist', sans-serif", fontSize: '1.1rem', color: 'var(--on-surface)',
            marginBottom: 32, lineHeight: 1.5,
          }}>
            We&apos;ll review your project and reply within 24 hours.
          </p>
          <button onClick={onClose} style={{
            padding: '16px 48px', background: 'var(--primary)', color: 'var(--surface-low)',
            fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.25rem', textTransform: 'uppercase',
            border: '2px solid var(--primary)', cursor: 'pointer', letterSpacing: '0.05em',
          }}>CLOSE</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'rgba(15,15,18,0.85)', backdropFilter: 'blur(8px)',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--primary)', padding: '48px 40px', maxWidth: 520, width: '90%',
        border: '4px solid var(--surface-low)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28,
        }}>
          <div>
            <h3 style={{
              fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.75rem', color: 'var(--surface-low)',
              textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0,
            }}>BOOK A WEEK</h3>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)',
              margin: '6px 0 0 0',
            }}>$300 · Live product in 7 days</p>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: '2rem', color: 'var(--surface-low)',
            cursor: 'pointer', padding: '4px 12px', lineHeight: 1,
          }}>&#10005;</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
          <div>
            <label style={labelStyle}>WHAT DO YOU WANT TO BUILD? *</label>
            <textarea
              rows={3}
              value={form.project}
              onChange={update('project')}
              placeholder="Web app, marketplace, booking platform, AI tool..."
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--surface-low)'}
              onBlur={e => e.target.style.borderColor = 'rgba(20,19,21,0.2)'}
              autoFocus
            />
          </div>
          <div>
            <label style={labelStyle}>CONTACT (EMAIL OR TELEGRAM) *</label>
            <input
              type="text"
              value={form.contact}
              onChange={update('contact')}
              placeholder="email@company.com or @telegram"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--surface-low)'}
              onBlur={e => e.target.style.borderColor = 'rgba(20,19,21,0.2)'}
            />
          </div>
        </div>

        {error && <p style={{ fontFamily: "'Geist', sans-serif", fontSize: '0.85rem', color: '#ffcccc', margin: '0 0 16px 0' }}>{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={sending}
          style={{
            width: '100%', padding: '18px', background: 'var(--surface-low)', color: 'var(--primary)',
            fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.35rem', textTransform: 'uppercase',
            border: '3px solid var(--surface-low)', cursor: sending ? 'wait' : 'pointer',
            opacity: sending ? 0.6 : 1, letterSpacing: '0.05em', fontWeight: 700,
          }}
        >
          {sending ? 'SENDING…' : 'SEND REQUEST'}
        </button>
      </div>
    </div>
  );
}
