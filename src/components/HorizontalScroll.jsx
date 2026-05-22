import { useEffect, useRef } from 'react';
import ShowcaseSlide from './ShowcaseSlide';
import ReviewsSlide from './ReviewsSlide';
import ManifestoSlide from './ManifestoSlide';

export default function HorizontalScroll({ progress }) {
  const wrapRef = useRef(null);
  const trackPhase = Math.min(1, Math.max(0, (progress - 0.25) / 0.5));
  const n = 3;

  const getX = (i) => {
    const enter = i / n;
    const leave = (i + 1) / n;
    if (trackPhase <= enter) return 100;
    if (trackPhase >= leave) return 0;
    return 100 - ((trackPhase - enter) / (leave - enter)) * 100;
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const containers = wrap.querySelector(':scope > div')?.children;
    if (!containers) return;
    for (let i = 0; i < containers.length; i++) {
      const slide = containers[i].querySelector('.slide');
      if (!slide) continue;
      const reveals = slide.querySelectorAll('.reveal');
      const visible = trackPhase > i / n + 0.04;
      reveals.forEach((r) => r.classList.toggle('active', visible));
    }
  }, [trackPhase]);

  return (
    <div
      ref={wrapRef}
      className="h-scroll-wrap"
      style={{
        position: 'sticky', top: 0, height: '100vh', width: '100%',
        overflow: 'hidden', zIndex: 2,
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${getX(0)}%)` }}>
          <ShowcaseSlide progress={progress} />
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${getX(1)}%)` }}>
          <ReviewsSlide />
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${getX(2)}%)` }}>
          <ManifestoSlide />
        </div>
      </div>
    </div>
  );
}
