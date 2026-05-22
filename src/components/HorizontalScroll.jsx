import { useEffect, useRef } from 'react';
import ShowcaseSlide from './ShowcaseSlide';
import ReviewsSlide from './ReviewsSlide';
import ManifestoSlide from './ManifestoSlide';

export default function HorizontalScroll({ progress }) {
  const wrapRef = useRef(null);

  const trackPhase = Math.min(1, Math.max(0, (progress - 0.25) / 0.5));

  const getX = (index) => {
    const n = 3;
    const enter = index / n;
    const leave = (index + 1) / n;
    if (trackPhase <= enter) return 100;
    if (trackPhase >= leave) return -100;
    const t = (trackPhase - enter) / (leave - enter);
    return 100 - t * 200;
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const sliders = wrap.querySelectorAll('.slide-wrapper');
    sliders.forEach((sw, i) => {
      const reveal = sw.querySelectorAll('.reveal');
      const fp = trackPhase - i / 3;
      reveal.forEach((r) => {
        if (fp > 1 / 9) r.classList.add('active');
        else r.classList.remove('active');
      });
    });
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
      <div style={{ position: 'absolute', inset: 0 }}>
        <div className="slide-wrapper" style={{ position: 'absolute', inset: 0, transform: `translateX(${getX(0)}%)` }}>
          <ShowcaseSlide progress={progress} />
        </div>
        <div className="slide-wrapper" style={{ position: 'absolute', inset: 0, transform: `translateX(${getX(1)}%)` }}>
          <ReviewsSlide />
        </div>
        <div className="slide-wrapper" style={{ position: 'absolute', inset: 0, transform: `translateX(${getX(2)}%)` }}>
          <ManifestoSlide />
        </div>
      </div>
    </div>
  );
}
