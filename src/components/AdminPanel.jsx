import { useCallback, useEffect, useState } from 'react';
import Logo from './Logo';

const ENV_URL = 'https://vercel.com/noname26/mp/settings/environment-variables';

async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: 'same-origin',
    headers: options.body ? { 'Content-Type': 'application/json' } : undefined,
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

const card = {
  background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 20,
};

function StatusPill({ ok, label }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999,
      fontSize: 13, fontWeight: 500,
      background: ok ? '#e8f6ec' : '#fdecea', color: ok ? '#1f6b3d' : '#a3271b',
    }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'currentColor' }} />
      {label}
    </span>
  );
}

export default function AdminPanel({ user, onSignOut }) {
  const [orders, setOrders] = useState([]);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    try {
      const data = await api('/api/orders');
      setOrders(data.orders || []);
      setHealth(data.health || null);
      setError('');
    } catch (e) {
      if (e.status === 401) { onSignOut(); return; }
      setError('Could not load orders.');
    } finally {
      setLoading(false);
    }
  }, [onSignOut]);

  useEffect(() => {
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, [load]);

  const act = async (fn, okMsg) => {
    setNotice('');
    try { await fn(); if (okMsg) setNotice(okMsg); await load(); }
    catch (e) { setError(e.message === 'telegram_not_configured' ? 'Telegram is not configured on the server.' : `Action failed (${e.message}).`); }
  };

  const markRead = (id) => act(() => api('/api/orders', { method: 'PATCH', body: { id, status: 'read' } }));
  const remove = (id) => { if (confirm('Delete this order?')) act(() => api(`/api/orders?id=${encodeURIComponent(id)}`, { method: 'DELETE' })); };
  const clearAll = () => { if (confirm('Delete ALL orders? This cannot be undone.')) act(() => api('/api/orders?all=1', { method: 'DELETE' })); };
  const testTelegram = () => act(() => api('/api/orders', { method: 'POST', body: { action: 'test' } }), 'Test message sent — check Telegram.');

  const newCount = orders.filter((o) => o.status === 'new').length;

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(20px, 4vw, 48px)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
          <Logo href="#/" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user?.picture && <img src={user.picture} alt="" width="32" height="32" style={{ borderRadius: '50%' }} referrerPolicy="no-referrer" />}
            <span style={{ fontSize: 14, color: 'var(--ink)' }}>{user?.name || user?.email}</span>
            <button className="btn btn--ghost btn--sm" onClick={onSignOut}>Sign out</button>
          </div>
        </header>

        <h1 className="h-section" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: 8 }}>Orders</h1>
        <p className="muted" style={{ marginBottom: 28 }}>{orders.length} total · {newCount} new · refreshes every 30 s</p>

        {health && (
          <div style={{ ...card, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <StatusPill ok={health.storage} label={health.storage ? 'Storage connected' : 'Storage not connected'} />
            <StatusPill ok={health.telegram} label={health.telegram ? 'Telegram connected' : 'Telegram not configured'} />
            <span style={{ flex: 1 }} />
            <button className="btn btn--ghost btn--sm" onClick={testTelegram} disabled={!health.telegram}>Send test to Telegram</button>
            <button className="btn btn--ghost btn--sm" onClick={load}>Refresh</button>
            {(!health.storage || !health.telegram) && (
              <p className="muted" style={{ width: '100%', fontSize: 13.5, marginTop: 4 }}>
                Configure it in <a href={ENV_URL} target="_blank" rel="noopener noreferrer">Vercel → Environment Variables</a>
                {!health.storage && ' — connect Upstash Redis (Storage tab) so orders are saved here'}
                {!health.telegram && ' — set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID'}.
              </p>
            )}
          </div>
        )}

        {error && <p className="field-error" role="alert" style={{ marginBottom: 16 }}>{error}</p>}
        {notice && <p role="status" style={{ marginBottom: 16, color: '#1f6b3d', fontSize: 14 }}>{notice}</p>}

        {loading ? (
          <p className="muted">Loading…</p>
        ) : orders.length === 0 ? (
          <div style={{ ...card, textAlign: 'center', padding: 56 }}>
            <p className="muted">No orders yet. They appear here as soon as someone submits the booking form.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {orders.map((o) => (
              <article key={o.id} style={{ ...card, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', borderColor: o.status === 'new' ? 'var(--accent)' : 'var(--line)' }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span className="chip" style={o.status === 'new' ? { background: 'var(--accent)', color: '#fff' } : undefined}>{o.status}</span>
                    <span className="mono muted">{new Date(o.timestamp).toLocaleString()}</span>
                    {o.locale && <span className="mono muted">· {o.locale.toUpperCase()}</span>}
                  </div>
                  <p style={{ color: 'var(--ink)', fontWeight: 600, marginBottom: 6, wordBreak: 'break-word' }}>{o.contact}</p>
                  <p style={{ color: 'var(--ink-2)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{o.project}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  {o.status === 'new' && <button className="btn btn--ghost btn--sm" onClick={() => markRead(o.id)}>Mark read</button>}
                  <button className="btn btn--ghost btn--sm" style={{ color: '#a3271b' }} onClick={() => remove(o.id)}>Delete</button>
                </div>
              </article>
            ))}
            <div style={{ textAlign: 'right', marginTop: 8 }}>
              <button className="btn btn--ghost btn--sm" style={{ color: '#a3271b' }} onClick={clearAll}>Delete all</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
