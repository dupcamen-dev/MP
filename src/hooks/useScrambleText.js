import { useEffect, useRef, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function useScrambleText(text, { delay = 0, cascade = 80, speed = 80 } = {}) {
  const [display, setDisplay] = useState('');
  const intervalRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    startRef.current = Date.now();
    const len = text.length;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      if (elapsed < delay) return;

      const t = elapsed - delay;
      let out = '';
      let running = false;

      for (let i = 0; i < len; i++) {
        const charStart = i * cascade;
        const charEnd = charStart + speed;
        if (t >= charEnd) {
          out += text[i];
        } else if (t >= charStart) {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
          running = true;
        } else {
          out += ' ';
          running = true;
        }
      }

      setDisplay(out);

      if (!running) {
        clearInterval(intervalRef.current);
      }
    }, 50);

    return () => clearInterval(intervalRef.current);
  }, [text, delay, cascade, speed]);

  return display;
}
