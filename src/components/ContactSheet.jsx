// The Contact Sheet — signature image treatment.
// Clean duotone wash, thin border, corner registration marks, hand caption.
export default function ContactSheet({ src, alt, caption, tag, tilt = 0, onError }) {
  return (
    <figure style={{
      position: 'relative', margin: 0,
      background: 'var(--cream, #ffffff)',
      border: '1px solid var(--sienna, #555555)',
      padding: 12,
      transform: tilt ? `rotate(${tilt}deg)` : 'none',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
    }}>
      {/* Registration marks — corners */}
      {[
        { top: 4, left: 4 }, { top: 4, right: 4 },
        { bottom: 4, left: 4 }, { bottom: 4, right: 4 },
      ].map((pos, i) => (
        <span key={i} aria-hidden="true" style={{
          position: 'absolute', width: 10, height: 10, ...pos,
          borderTop: pos.top !== undefined ? '1px solid var(--sienna, #555555)' : 'none',
          borderBottom: pos.bottom !== undefined ? '1px solid var(--sienna, #555555)' : 'none',
          borderLeft: pos.left !== undefined ? '1px solid var(--sienna, #555555)' : 'none',
          borderRight: pos.right !== undefined ? '1px solid var(--sienna, #555555)' : 'none',
          opacity: 0.6,
        }} />
      ))}

      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--sienna, #555555)' }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={onError}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            filter: 'grayscale(0.3) contrast(1.05)',
            mixBlendMode: 'normal',
          }}
        />
        {/* Graphite duotone wash */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(45,45,45,0.12), rgba(26,26,26,0.08))',
          mixBlendMode: 'multiply', pointerEvents: 'none',
        }} />
        {tag && (
          <span style={{
            position: 'absolute', top: 12, left: 12,
            fontFamily: "'Geist Mono', 'Geist', monospace", fontSize: 10,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--cream, #ffffff)', background: 'rgba(26,26,26,0.8)',
            padding: '5px 10px',
          }}>{tag}</span>
        )}
      </div>

      {caption && (
        <figcaption style={{
          fontFamily: "'Geist Mono', 'Geist', monospace", fontSize: 11,
          letterSpacing: '0.08em', color: 'var(--sienna, #555555)',
          marginTop: 8, paddingLeft: 2,
        }}>{caption}</figcaption>
      )}
    </figure>
  );
}
