export default function TrustBadges() {
  return (
    <section id="trust-badges" style={{
      background: 'var(--bg-alt)',
      padding: '48px 64px',
      borderBottom: '1px solid var(--surface-high)',
      position: 'relative', zIndex: 5,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 32,
        alignItems: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Anton', Impact, sans-serif",
            fontSize: '3rem', color: 'var(--primary)', fontWeight: 700,
            lineHeight: 1, margin: 0,
          }}>12+</div>
          <p style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: '0.95rem', color: 'var(--text-dim)',
            textTransform: 'uppercase', letterSpacing: '0.05em',
            margin: '8px 0 0 0', fontWeight: 500,
          }}>Live Projects</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Anton', Impact, sans-serif",
            fontSize: '3rem', color: 'var(--secondary)', fontWeight: 700,
            lineHeight: 1, margin: 0,
          }}>6.3</div>
          <p style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: '0.95rem', color: 'var(--text-dim)',
            textTransform: 'uppercase', letterSpacing: '0.05em',
            margin: '8px 0 0 0', fontWeight: 500,
          }}>Avg Days to Launch</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Anton', Impact, sans-serif",
            fontSize: '3rem', color: 'var(--primary)', fontWeight: 700,
            lineHeight: 1, margin: 0,
          }}>$X</div>
          <p style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: '0.95rem', color: 'var(--text-dim)',
            textTransform: 'uppercase', letterSpacing: '0.05em',
            margin: '8px 0 0 0', fontWeight: 500,
          }}>Fixed Price</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Anton', Impact, sans-serif",
            fontSize: '3rem', color: 'var(--secondary)', fontWeight: 700,
            lineHeight: 1, margin: 0,
          }}>100%</div>
          <p style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: '0.95rem', color: 'var(--text-dim)',
            textTransform: 'uppercase', letterSpacing: '0.05em',
            margin: '8px 0 0 0', fontWeight: 500,
          }}>Code Ownership</p>
        </div>
      </div>
    </section>
  );
}
