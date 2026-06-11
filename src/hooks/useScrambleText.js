import { useEffect, useRef, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function useScrambleText(text, { delay = 0, cascade = 80, speed = 80 } = {}) {
  const [display, setDisplay] = useState('');
  const frameRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const len = text.length;
    startRef.current = null;

    function step(timestamp) {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;

      if (elapsed < delay) {
        frameRef.current = requestAnimationFrame(step);
        return;
      }

      const t = Math.max(0, elapsed - delay);
      let out = '';
      for (let i = 0; i < len; i++) {
        const charStart = i * cascade;
        const charEnd = charStart + speed;
        if (t >= charEnd) {
          out += text[i];
        } else if (t >= charStart) {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          out += ' ';
        }
      }
      setDisplay(out);

      if (t < len * cascade) {
        frameRef.current = requestAnimationFrame(step);
      }
    }

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, cascade, speed]);

  return display;
}
