export default function ManifestoSlide() {
  return (
    <section className="slide manifesto-slide" id="manifesto" style={{
      width: '100vw', flex: '0 0 100vw', height: '100vh',
      background: 'var(--surface-high)', overflow: 'hidden', position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '0 64px',
    }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
        background: 'rgba(255,211,0,0.12)',
        transform: 'skew(12deg) translateX(25%)', pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 900, width: '100%', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h2 style={{
          fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
          color: 'var(--text)', marginBottom: 32,
        }}>
          SPEED IS A <span style={{ color: 'var(--secondary)' }}>FEATURE.</span>
        </h2>
        <p style={{
          fontFamily: "'Geist', sans-serif", fontSize: 'clamp(1.1rem,2vw,1.5rem)',
          lineHeight: 1.6, color: 'var(--text)', textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          We reject the bureaucracy of modern software development. No endless meetings.
          No pixel-pushing committees. We code on instinct. We build for impact.{' '}
          <span style={{ background: 'var(--primary)', color: 'var(--bg)', padding: '2px 8px' }}>
            Vibe coding is the raw translation of thought to reality.
          </span>{' '}
          Slash the rules. Grind the raw.
        </p>
      </div>
    </section>
  );
}
