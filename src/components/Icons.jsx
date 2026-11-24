const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const ArrowRight = ({ size = 16, className = 'btn-arrow' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export const ArrowUpRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
);

export const ArrowUp = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2} aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
);

export const Close = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
);

export const Check = ({ size = 16, className = 'tick' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2.2} aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

export const Search = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>
);

export const Quote = ({ className = 'review-quote-mark' }) => (
  <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M13.5 8C8.3 9.6 5 13.6 5 19.2V24h8v-8H9.3c.4-3 2.3-5 5.2-6.1L13.5 8Zm13 0c-5.2 1.6-8.5 5.6-8.5 11.2V24h8v-8h-3.7c.4-3 2.3-5 5.2-6.1L26.5 8Z" />
  </svg>
);
