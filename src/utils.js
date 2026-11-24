// "BOOK A WEEK" → "Book a week". Dictionary strings are stored upper-case; the new design uses sentence case.
export function cap(s) {
  if (typeof s !== 'string' || !s) return s;
  const lower = s.toLocaleLowerCase();
  return lower.charAt(0).toLocaleUpperCase() + lower.slice(1);
}

// Strips the decorative arrow some dictionary strings carry ("Book a week →").
export function noArrow(s) {
  return typeof s === 'string' ? s.replace(/\s*[→↗]\s*$/, '') : s;
}

export function scrollToId(id) {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const NAV = [
  { key: 'navWork', id: 'showcase' },
  { key: 'navProcess', id: 'process' },
  { key: 'navReviews', id: 'reviews' },
  { key: 'navPricing', id: 'pricing' },
];
