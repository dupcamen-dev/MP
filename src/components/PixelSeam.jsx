// The Pixel Seam — signature stepped/pixelated edge where two color fields meet.
// One per page. Sharp 90° stair-steps. Never rounded, never gradient.
export default function PixelSeam({ top = 'var(--primary)', bottom = 'var(--bg)', flip = false, height = 48 }) {
  // Build a stepped path — pixel staircase
  const steps = 12;
  const stepW = 100 / steps;
  let d = `M0,${height} `;
  for (let i = 0; i < steps; i++) {
    const x = i * stepW;
    const y = (i % 2 === 0) ? 0 : height * 0.5;
    d += `L${x},${y} L${x + stepW},${y} `;
  }
  d += `L100,${height} Z`;

  return (
    <div style={{ position: 'relative', width: '100%', height, background: bottom, overflow: 'hidden', transform: flip ? 'scaleY(-1)' : 'none' }} aria-hidden="true">
      <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        <path d={d} fill={top} />
      </svg>
    </div>
  );
}
