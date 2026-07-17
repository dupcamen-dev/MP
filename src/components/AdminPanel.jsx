import { useState, useEffect } from 'react';

function getBotConfig() {
  try {
    const raw = localStorage.getItem('mp_bot_config');
    return raw ? JSON.parse(raw) : { token: '', chatId: '' };
  } catch { return { token: '', chatId: '' }; }
}

function saveBotConfig(cfg) {
  localStorage.setItem('mp_bot_config', JSON.stringify(cfg));
}

function getOrders() {
  try {
    const raw = localStorage.getItem('mp_orders');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveOrders(orders) {
  localStorage.setItem('mp_orders', JSON.stringify(orders));
}

function getUser() {
  try {
    const raw = localStorage.getItem('mp_user');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function setUser(user) {
  if (user) localStorage.setItem('mp_user', JSON.stringify(user));
  else localStorage.removeItem('mp_user');
}

const s = {
  page: {
    minHeight: '100vh', background: 'var(--cream)',
    fontFamily: "'Geist', sans-serif",
    padding: 'clamp(24px, 5%, 80px)',
  },
  inner: { maxWidth: 960, margin: '0 auto' },
  h1: {
    fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)',
    color: 'var(--ink)', textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '-0.01em',
  },
  label: {
    fontFamily: "'Geist Mono', monospace", fontSize: 11,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'var(--sienna)', display: 'block', marginBottom: 6,
  },
  input: {
    width: '100%', padding: '12px 16px', background: '#fff',
    border: '1px solid var(--sienna)', borderRadius: 0,
    fontFamily: "'Geist Mono', monospace", fontSize: '0.95rem',
    color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
  },
  btn: {
    padding: '12px 28px', background: 'var(--terracotta)', color: 'var(--cream)',
    fontFamily: "'Anton', Impact, sans-serif", fontSize: '1rem',
    textTransform: 'uppercase', border: 'none', borderRadius: 0,
    cursor: 'pointer', letterSpacing: '0.04em',
  },
  btnSmall: {
    padding: '6px 14px', fontSize: '0.75rem',
    fontFamily: "'Geist Mono', monospace", letterSpacing: '0.06em',
    border: '1px solid var(--sienna)', background: 'transparent',
    color: 'var(--ink)', borderRadius: 0, cursor: 'pointer', textTransform: 'uppercase',
  },
  card: {
    background: '#fff', border: '1px solid var(--sienna)',
    padding: 20, marginBottom: 12,
  },
  statusNew: {
    display: 'inline-block', padding: '3px 10px',
    fontFamily: "'Geist Mono', monospace", fontSize: 10,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    background: 'var(--terracotta)', color: 'var(--cream)',
  },
  statusRead: {
    display: 'inline-block', padding: '3px 10px',
    fontFamily: "'Geist Mono', monospace", fontSize: 10,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    background: 'var(--sienna)', color: 'var(--cream)',
  },
  empty: {
    fontFamily: "'Geist', sans-serif", fontSize: '1.1rem',
    color: 'var(--text-dim)', padding: '60px 0', textAlign: 'center',
  },
  link: {
    fontFamily: "'Geist Mono', monospace", fontSize: 12,
    color: 'var(--terracotta)', textDecoration: 'none',
    letterSpacing: '0.06em', display: 'inline-block', marginTop: 24,
  },
};

export default function AdminPanel({ user, onSignOut }) {
  const [tab, setTab] = useState('orders');
  const [cfg, setCfg] = useState(getBotConfig);
  const [googleClientId, setGoogleClientId] = useState(() => {
    try { return localStorage.getItem('mp_google_client_id') || ''; } catch { return ''; }
  });
  const [saved, setSaved] = useState(false);
  const [googleSaved, setGoogleSaved] = useState(false);
  const [orders, setOrders] = useState(getOrders);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setOrders(getOrders()), 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveCfg = () => {
    saveBotConfig(cfg);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveGoogleId = () => {
    localStorage.setItem('mp_google_client_id', googleClientId.trim());
    setGoogleSaved(true);
    setTimeout(() => setGoogleSaved(false), 2000);
  };

  const handleTestBot = async () => {
    if (!cfg.token || !cfg.chatId) return;
    setTesting(true);
    try {
      const res = await fetch(`https://api.telegram.org/bot${cfg.token}/sendMessage`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: cfg.chatId,
          text: '✅ MillionPixels admin test — bot is connected!',
        }),
      });
      if (res.ok) alert('Bot connected! Check your Telegram.');
      else alert('Error: ' + (await res.json()).description);
    } catch (e) {
      alert('Connection failed: ' + e.message);
    } finally {
      setTesting(false);
    }
  };

  const markRead = (id) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: 'read' } : o);
    setOrders(updated);
    saveOrders(updated);
  };

  const deleteOrder = (id) => {
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    saveOrders(updated);
  };

  const clearAll = () => {
    if (!confirm('Delete ALL orders?')) return;
    setOrders([]);
    saveOrders([]);
  };

  const newCount = orders.filter(o => o.status === 'new').length;

  return (
    <div style={s.page}>
      <div style={s.inner}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={s.h1}>Admin Panel</h1>
            <p style={{ fontFamily: "'Geist', sans-serif", color: 'var(--text-dim)', margin: 0 }}>
              Manage your Telegram bot and orders.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {user.picture && <img src={user.picture} alt="" style={{ width: 32, height: 32, borderRadius: '50%' }} />}
                <span style={{ fontFamily: "'Geist', sans-serif", fontSize: '0.85rem', color: 'var(--ink)' }}>{user.name}</span>
              </div>
            )}
            <button onClick={onSignOut} style={{ ...s.btnSmall, color: '#994444', borderColor: '#994444' }}>Sign out</button>
            <a href="/#/" style={s.link}>&#8592; Back to site</a>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 40, borderBottom: '1px solid var(--sienna)' }}>
          {[
            { id: 'orders', label: 'Orders', badge: newCount || null },
            { id: 'bot', label: 'Bot Config' },
            { id: 'google', label: 'Google Auth' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '14px 24px', background: 'none', border: 'none', borderBottom: tab === t.id ? '2px solid var(--terracotta)' : '2px solid transparent',
              fontFamily: "'Anton', Impact, sans-serif", fontSize: '1rem', textTransform: 'uppercase',
              color: tab === t.id ? 'var(--terracotta)' : 'var(--text-dim)',
              cursor: 'pointer', letterSpacing: '0.04em', position: 'relative',
            }}>
              {t.label}
              {t.badge && <span style={{
                marginLeft: 8, padding: '2px 8px', background: 'var(--terracotta)',
                color: 'var(--cream)', fontSize: 11, fontFamily: "'Geist Mono', monospace",
              }}>{t.badge}</span>}
            </button>
          ))}
        </div>

        {/* ORDERS TAB */}
        {tab === 'orders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, letterSpacing: '0.1em', color: 'var(--sienna)', margin: 0 }}>
                {orders.length} TOTAL · {newCount} NEW
              </p>
              {orders.length > 0 && (
                <button onClick={clearAll} style={{ ...s.btnSmall, color: '#994444', borderColor: '#994444' }}>
                  Clear all
                </button>
              )}
            </div>

            {orders.length === 0 && (
              <div style={s.empty}>
                No orders yet. They will appear here when someone submits the booking form.
              </div>
            )}

            {orders.map(o => (
              <div key={o.id} style={{
                ...s.card, display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', gap: 16, flexWrap: 'wrap',
              }}>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <span style={o.status === 'new' ? s.statusNew : s.statusRead}>{o.status}</span>
                    <span style={{
                      fontFamily: "'Geist Mono', monospace", fontSize: 11, color: 'var(--text-dim)',
                    }}>{new Date(o.timestamp).toLocaleString()}</span>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ ...s.label, marginBottom: 4 }}>PROJECT</span>
                    <p style={{
                      fontFamily: "'Geist', sans-serif", fontSize: '1rem',
                      color: 'var(--ink)', margin: 0, lineHeight: 1.5,
                    }}>{o.project}</p>
                  </div>
                  <div>
                    <span style={{ ...s.label, marginBottom: 4 }}>CONTACT</span>
                    <p style={{
                      fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.1rem',
                      color: 'var(--terracotta)', margin: 0, textTransform: 'uppercase',
                    }}>{o.contact}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  {o.status === 'new' && (
                    <button onClick={() => markRead(o.id)} style={s.btnSmall}>Mark read</button>
                  )}
                  <button onClick={() => deleteOrder(o.id)} style={{ ...s.btnSmall, color: '#994444', borderColor: '#994444' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BOT CONFIG TAB */}
        {tab === 'bot' && (
          <div>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontSize: '1rem', color: 'var(--text-dim)',
              marginBottom: 32, maxWidth: 600, lineHeight: 1.6,
            }}>
              For production (Vercel): set <code style={{ fontFamily: "'Geist Mono', monospace", background: '#f0e9df', padding: '2px 6px' }}>TELEGRAM_BOT_TOKEN</code> and{' '}
              <code style={{ fontFamily: "'Geist Mono', monospace", background: '#f0e9df', padding: '2px 6px' }}>TELEGRAM_CHAT_ID</code> in{' '}
              <a href="https://vercel.com/dupcamen-dev/mp/settings/environment-variables" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terracotta)' }}>
                Vercel Environment Variables
              </a>.
              The local config below works for local development only.
            </p>

            <div style={{ display: 'grid', gap: 20, maxWidth: 520 }}>
              <div>
                <label style={s.label}>BOT TOKEN</label>
                <input
                  type="text" value={cfg.token}
                  onChange={e => setCfg({ ...cfg, token: e.target.value })}
                  placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                  style={s.input}
                />
              </div>
              <div>
                <label style={s.label}>CHAT ID</label>
                <input
                  type="text" value={cfg.chatId}
                  onChange={e => setCfg({ ...cfg, chatId: e.target.value })}
                  placeholder="-1001234567890 or your personal ID"
                  style={s.input}
                />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button onClick={handleSaveCfg} style={s.btn}>
                  {saved ? '✓ SAVED' : 'SAVE'}
                </button>
                <button onClick={handleTestBot} disabled={testing} style={{
                  ...s.btn, background: 'transparent', color: 'var(--terracotta)',
                  border: '1px solid var(--terracotta)',
                }}>
                  {testing ? 'TESTING…' : 'TEST CONNECTION'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GOOGLE AUTH TAB */}
        {tab === 'google' && (
          <div>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontSize: '1rem', color: 'var(--text-dim)',
              marginBottom: 32, maxWidth: 600, lineHeight: 1.6,
            }}>
              Configure Google Sign-In for admin access. Create an OAuth client ID at{' '}
              <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terracotta)' }}>
                Google Cloud Console
              </a>{' '}
              (OAuth 2.0 Client ID, Web Application type).
            </p>

            <div style={{ display: 'grid', gap: 20, maxWidth: 520 }}>
              <div>
                <label style={s.label}>GOOGLE CLIENT ID</label>
                <input
                  type="text" value={googleClientId}
                  onChange={e => setGoogleClientId(e.target.value)}
                  placeholder="123456789-abcdef.apps.googleusercontent.com"
                  style={s.input}
                />
              </div>
              <div>
                <button onClick={handleSaveGoogleId} style={s.btn}>
                  {googleSaved ? '✓ SAVED' : 'SAVE'}
                </button>
              </div>
            </div>

            <div style={{
              marginTop: 40, padding: 20, background: '#fff',
              border: '1px solid var(--sienna)',
            }}>
              <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sienna)', margin: '0 0 12px 0' }}>HOW TO GET A CLIENT ID</p>
              <ol style={{
                fontFamily: "'Geist', sans-serif", fontSize: '0.95rem', color: 'var(--ink)',
                margin: 0, paddingLeft: 20, lineHeight: 2,
              }}>
                <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terracotta)' }}>console.cloud.google.com</a></li>
                <li>Create a project (or use existing)</li>
                <li>Go to <strong>APIs & Services &gt; Credentials</strong></li>
                <li>Click <strong>Create Credentials &gt; OAuth Client ID</strong></li>
                <li>Type: <strong>Web Application</strong></li>
                <li>Add Authorized redirect URI: <code style={{ fontFamily: "'Geist Mono', monospace", background: '#f0e9df', padding: '2px 6px' }}>{window.location.origin}</code></li>
                <li>Copy the <strong>Client ID</strong> and paste above</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
