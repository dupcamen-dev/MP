// Pixel mark: a 3×3 grid that "dissolves" toward the top-right — a million pixels, one at a time.
export function LogoMark({ className = 'logo-mark' }) {
  return (
    <svg className={className} viewBox="0 0 26 26" aria-hidden="true">
      <rect x="0" y="8" width="5" height="5" rx="1.2" fill="currentColor" />
      <rect x="0" y="14" width="5" height="5" rx="1.2" fill="currentColor" />
      <rect x="0" y="20" width="5" height="5" rx="1.2" fill="currentColor" />
      <rect x="6" y="14" width="5" height="5" rx="1.2" fill="currentColor" />
      <rect x="6" y="20" width="5" height="5" rx="1.2" fill="currentColor" />
      <rect x="12" y="20" width="5" height="5" rx="1.2" fill="currentColor" />
      <rect x="6" y="8" width="5" height="5" rx="1.2" fill="currentColor" opacity="0.35" />
      <rect x="12" y="14" width="5" height="5" rx="1.2" fill="#ff5a1f" />
      <rect className="px px-fly-1" x="15" y="6" width="4" height="4" rx="1" fill="currentColor" opacity="0.55" />
      <rect className="px px-fly-2" x="21" y="1" width="3" height="3" rx="0.8" fill="#ff5a1f" />
    </svg>
  );
}

export default function Logo({ light = false, onClick, href = '/' }) {
  return (
    <a href={href} onClick={onClick} className={`logo${light ? ' logo--light' : ''}`} aria-label="Millionpixels — home">
      <LogoMark />
      <span className="logo-word">million<span>pixels</span></span>
    </a>
  );
}
