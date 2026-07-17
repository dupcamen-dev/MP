import { useEffect, useRef, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function ScrambleText({ text, delay = 0, cascade = 80, speed = 80, ...props }) {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // On mobile, just show the text without animation
    if (isMobile) {
      el.textContent = text;
      return;
    }

    const len = text.length;
    const start = performance.now();
    let frame;

    function tick(now) {
      const elapsed = now - start;
      const t = Math.max(0, elapsed - delay);
      let out = '';
      let running = false;

      for (let i = 0; i < len; i++) {
        const cs = i * cascade;
        const ce = cs + speed;
        if (t >= ce) {
          out += text[i];
        } else if (t >= cs) {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
          running = true;
        } else {
          out += ' ';
          running = true;
        }
      }

      el.textContent = out;

      if (running) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, delay, cascade, speed, isMobile]);

  return <span ref={ref} {...props} style={{ whiteSpace: 'pre', ...(props.style || {}) }} />;
}
