import { useEffect, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function ScrambleText({ text, delay = 0, cascade = 80, speed = 80, ...props }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 50);
    return () => clearInterval(id);
  }, []);

  const t = Math.max(0, tick * 50 - delay);
  const len = text.length;
  let out = '';
  for (let i = 0; i < len; i++) {
    const cs = i * cascade;
    const ce = cs + speed;
    if (t >= ce) {
      out += text[i];
    } else if (t >= cs) {
      out += CHARS[Math.floor(Math.random() * CHARS.length)];
    } else {
      out += ' ';
    }
  }

  return (
    <span {...props} style={{ whiteSpace: 'pre', ...(props.style || {}) }}>
      {out}
    </span>
  );
}
