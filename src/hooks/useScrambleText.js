import { useEffect, useRef, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function useScrambleText(text, { delay = 0, cascade = 50, speed = 50 } = {}) {
  const [display, setDisplay] = useState('');
  const frameRef = useRef(null);
  const startRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const totalLen = text.length;
    let started = false;

    function step(timestamp) {
      if (!mountedRef.current) return;
      if (!started) {
        startRef.current = timestamp;
        started = true;
      }
      const elapsed = timestamp - startRef.current;
      if (elapsed < delay) {
        frameRef.current = requestAnimationFrame(step);
        return;
      }
      const localElapsed = elapsed - delay;
      const progress = Math.min(1, localElapsed / (totalLen * speed + cascade));
      let result = '';
      for (let i = 0; i < totalLen; i++) {
        const charTime = i * cascade;
        if (localElapsed >= delay + charTime + speed) {
          result += text[i];
        } else if (localElapsed >= delay + charTime) {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          result += ' ';
        }
      }
      setDisplay(result);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    }

    frameRef.current = requestAnimationFrame(step);
    return () => {
      mountedRef.current = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, cascade, speed]);

  return display || text;
}
