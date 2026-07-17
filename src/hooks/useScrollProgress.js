import { useState, useEffect, useRef } from 'react';

export function useScrollProgress(triggerId = 'process') {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);
  const last = useRef(0);

  useEffect(() => {
    function handleScroll() {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const trigger = document.getElementById(triggerId);
          if (!trigger) { ticking.current = false; return; }
          const tp = trigger.offsetTop + trigger.offsetHeight;
          const sc = Math.max(0, window.scrollY - tp);
          const spacer = document.querySelector('.h-scroll-spacer');
          const sh = spacer ? spacer.offsetHeight : 1;
          const pr = Math.min(1, Math.max(0, sc / sh)); // Ensure 0-1 range
          if (Math.abs(pr - last.current) > 0.003) {
            last.current = pr;
            setProgress(pr);
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerId]);

  return progress;
}

export function useScrollTo() {
  return (targetId) => {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;

    // On mobile, all sections exist in DOM — use scrollIntoView directly
    if (isMobile) {
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // On desktop, showcase/reviews/manifesto are inside the horizontal scroll (sticky)
    // We need to compute scroll position within the h-scroll-spacer
    const trigger = document.getElementById('process');
    const tp = trigger ? trigger.offsetTop + trigger.offsetHeight : 0;
    const spacer = document.querySelector('.h-scroll-spacer');
    const sh = spacer ? spacer.offsetHeight : 0;

    // Map each horizontal-scroll section to a progress fraction
    const scrollMap = {
      showcase: 0.15,
      reviews: 0.60,
      manifesto: 0.80,
    };

    if (targetId in scrollMap) {
      window.scrollTo({ top: tp + scrollMap[targetId] * sh, behavior: 'smooth' });
      return;
    }

    // For sections before/after the horizontal scroll (hero, process, pricing)
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };
}
