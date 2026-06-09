import { useEffect, useRef } from 'react';
import { useMobile } from '../hooks/useMobile';

export default function Particles() {
  const containerRef = useRef(null);
  const mobile = useMobile();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const count = mobile ? 6 : 20;
    const colors = ['#363436', '#454747', '#ffd300', '#e20000'];
    const elements = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'particle';
      const size = 8 + Math.random() * 16;
      Object.assign(el.style, {
        width: size + 'px', height: size + 'px',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        background: colors[Math.floor(Math.random() * colors.length)],
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        opacity: 0.15 + Math.random() * 0.25,
        position: 'absolute',
        transition: `transform ${8 + Math.random() * 12}s linear`,
      });
      container.appendChild(el);
      elements.push(el);
    }

    let animId;
    function animate() {
      elements.forEach((el) => {
        const tx = (Math.random() - 0.5) * 60;
        const ty = (Math.random() - 0.5) * 60;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      });
      animId = setTimeout(animate, 3000 + Math.random() * 2000);
    }
    animate();

    return () => {
      elements.forEach((el) => el.remove());
      clearTimeout(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        zIndex: 0, overflow: 'hidden',
      }}
    />
  );
}
