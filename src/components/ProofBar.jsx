// Proof Bar — real client marks only. No vanity metrics, no $X.
export default function ProofBar() {
  const clients = ['ZHYTO', 'RAQT FUEL'];

  return (
    <section id="proof" style={{
      background: 'var(--cream)',
      borderTop: '1px solid var(--sienna)',
      borderBottom: '1px solid var(--sienna)',
      paddingTop: 40, paddingBottom: 40,
      paddingLeft: 'clamp(24px, 5%, 80px)', paddingRight: 'clamp(24px, 5%, 80px)',
      position: 'relative', zIndex: 5,
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        gap: 'clamp(24px, 5vw, 72px)',
      }}>
        <span style={{
          fontFamily: "'Geist Mono', monospace", fontSize: 11,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--sienna)', flexShrink: 0,
        }}>Recent work</span>

        {clients.map((c) => (
          <span key={c} style={{
            fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            textTransform: 'uppercase', color: 'var(--ink)', opacity: 0.75,
            letterSpacing: '0.01em',
          }}>{c}</span>
        ))}

        <span style={{
          fontFamily: "'Geist Mono', monospace", fontSize: 11,
          letterSpacing: '0.1em', color: 'var(--text-dim)',
          marginLeft: 'auto', flexShrink: 0,
        }}>Both shipped in 7 days · London</span>
      </div>
    </section>
  );
}
