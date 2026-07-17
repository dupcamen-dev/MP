// The Stamp — letterpress-style circular maker's mark.
// "SHIPPED IN 7 · MILLIONPIXELS · LONDON"
export default function Stamp({ size = 120, color = 'var(--primary)' }) {
  const id = 'stamp-circle-path';
  return (
    <div style={{ width: size, height: size, position: 'relative', flexShrink: 0 }} aria-label="Shipped in 7 — MillionPixels — London">
      <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: 'block' }}>
        <defs>
          <path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke={color} strokeWidth="1.5" opacity="0.9" />
        <circle cx="60" cy="60" r="30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
        <text fill={color} style={{ fontFamily: "'Geist Mono', 'Geist', monospace", fontSize: 9, letterSpacing: '2.5px', fontWeight: 600 }}>
          <textPath href={`#${id}`} startOffset="0%">
            SHIPPED IN 7 · MILLIONPIXELS · LONDON ·
          </textPath>
        </text>
        <text x="60" y="65" textAnchor="middle" fill={color} style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: 22, letterSpacing: '1px' }}>7</text>
      </svg>
    </div>
  );
}
