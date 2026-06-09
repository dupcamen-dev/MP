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
          const pr = Math.min(1, sc / sh);
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
    if (targetId === 'cta') {
      const isMobile = window.matchMedia('(max-width: 900px)').matches;
      if (isMobile) {
        const cta = document.getElementById('cta');
        if (cta) cta.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      const trigger = document.getElementById('process');
      const tp = trigger ? trigger.offsetTop + trigger.offsetHeight : 0;
      const spacer = document.querySelector('.h-scroll-spacer');
      const sh = spacer ? spacer.offsetHeight : 0;
      window.scrollTo({ top: tp + 0.95 * sh, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
  };
}