import { useState } from 'react';

const TG_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TG_CHAT_ID = 'YOUR_CHAT_ID';

const inputStyle = {
  width: '100%', padding: '14px 16px', background: 'rgba(15,15,18,0.08)',
  border: '2px solid rgba(15,15,18,0.2)', borderRadius: 0,
  fontFamily: "'Geist', sans-serif", fontSize: '1rem', color: 'var(--surface-low)',
  outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box',
};

export default function OrderModal({ onClose }) {
  const [form, setForm] = useState({ idea: '', deadline: '', budget: '', contact: '' });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const update = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.idea.trim() || !form.deadline.trim() || !form.budget.trim() || !form.contact.trim()) return;
    setSending(true);
    const now = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' });
    const msg = [
      `📦 *NEW ORDER*`,
      `🕒 ${now}`,
      `━━━━━━━━━━━━━━━`,
      `*IDEA:* ${form.idea}`,
      `*DEADLINE:* ${form.deadline}`,
      `*BUDGET:* $${form.budget}`,
      `*CONTACT:* ${form.contact}`,
    ].join('\n');

    try {
      await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT_ID, text: msg, parse_mode: 'Markdown' }),
      });
      setDone(true);
    } catch {
      alert('Помилка відправки. Спробуйте ще раз.');
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'rgba(15,15,18,0.85)', backdropFilter: 'blur(8px)',
      }} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div onClick={e => e.stopPropagation()} style={{
          background: 'var(--surface-low)', padding: '60px 48px', maxWidth: 420, width: '90%',
          textAlign: 'center', border: '2px solid var(--primary)',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>⚡</div>
          <h3 style={{
            fontFamily: "'Anton', Impact, sans-serif", fontSize: '2rem', color: 'var(--primary)',
            textTransform: 'uppercase', margin: '0 0 12px', letterSpacing: '0.05em',
          }}>ORDER RECEIVED</h3>
          <p style={{
            fontFamily: "'Geist', sans-serif", fontSize: '1rem', color: 'var(--on-surface)',
            marginBottom: 32, lineHeight: 1.5,
          }}>
            Your signal has been intercepted. We'll reach out within 24h.
          </p>
          <button onClick={onClose} style={{
            padding: '16px 48px', background: 'var(--primary)', color: 'var(--surface-low)',
            fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.1rem', textTransform: 'uppercase',
            border: '2px solid var(--primary)', cursor: 'pointer',
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
        background: 'var(--primary)', padding: '48px 40px', maxWidth: 480, width: '90%',
        border: '4px solid var(--surface-low)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32,
        }}>
          <h3 id="modal-title" style={{
            fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.8rem', color: 'var(--surface-low)',
            textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0,
          }}>INITIATE</h3>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: '2rem', color: 'var(--surface-low)',
            cursor: 'pointer', padding: '4px 12px', lineHeight: 1,
          }}>✕</button>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', textTransform: 'uppercase',
            color: 'var(--surface-low)', letterSpacing: '0.1em', display: 'block', marginBottom: 6,
          }}>WHAT DO YOU WANT TO BUILD?</label>
          <textarea
            value={form.idea}
            onChange={update('idea')}
            rows={3}
            placeholder="Describe your idea…"
            style={{ ...inputStyle, resize: 'vertical' }}
            onFocus={e => e.target.style.borderColor = 'var(--surface-low)'}
            onBlur={e => e.target.style.borderColor = 'rgba(20,19,21,0.2)'}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', textTransform: 'uppercase',
            color: 'var(--surface-low)', letterSpacing: '0.1em', display: 'block', marginBottom: 6,
          }}>DEADLINE</label>
          <input
            type="text"
            value={form.deadline}
            onChange={update('deadline')}
            placeholder="e.g. 2 weeks, June 15, ASAP"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--surface-low)'}
            onBlur={e => e.target.style.borderColor = 'rgba(20,19,21,0.2)'}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', textTransform: 'uppercase',
            color: 'var(--surface-low)', letterSpacing: '0.1em', display: 'block', marginBottom: 6,
          }}>BUDGET (USD)</label>
          <input
            type="number"
            value={form.budget}
            onChange={update('budget')}
            placeholder="1000"
            min="0"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--surface-low)'}
            onBlur={e => e.target.style.borderColor = 'rgba(20,19,21,0.2)'}
          />
        </div>

        <div style={{ marginBottom: 32 }}>
          <label style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', textTransform: 'uppercase',
            color: 'var(--surface-low)', letterSpacing: '0.1em', display: 'block', marginBottom: 6,
          }}>CONTACT (EMAIL / TG / PHONE)</label>
          <input
            type="text"
            value={form.contact}
            onChange={update('contact')}
            placeholder="@username or email@example.com"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--surface-low)'}
            onBlur={e => e.target.style.borderColor = 'rgba(20,19,21,0.2)'}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={sending}
          style={{
            width: '100%', padding: '18px', background: 'var(--surface-low)', color: 'var(--primary)',
            fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.25rem', textTransform: 'uppercase',
            border: '3px solid var(--surface-low)', cursor: sending ? 'wait' : 'pointer',
            opacity: sending ? 0.6 : 1,
          }}
        >
          {sending ? 'SENDING…' : 'SEND SIGNAL'}
        </button>
      </div>
    </div>
  );
}
