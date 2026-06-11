import { useEffect, useRef, useState } from 'react';

export function useCountUp(end, { duration = 2000, delay = 0, startOnView = false, inView = true } = {}) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (startOnView && !inView) return;

    const step = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp + delay;
      const elapsed = timestamp - startRef.current;
      if (elapsed < 0) {
        frameRef.current = requestAnimationFrame(step);
        return;
      }
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    frameRef.current = requestAnimationFrame(step);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [end, duration, delay, startOnView, inView]);

  return value;
}
