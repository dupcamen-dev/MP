import { useRef, useCallback } from 'react';
import { useMobile } from '../hooks/useMobile';
import ShowcaseSlide from './ShowcaseSlide';
import ReviewsSlide from './ReviewsSlide';
import ManifestoSlide from './ManifestoSlide';

export default function HorizontalScroll({ progress }) {
  const wrapRef = useRef(null);
  const mobile = useMobile();
  const slideP = mobile ? 0 : progress;

  const handleCardEnd = useCallback((j) => {
    const trigger = document.getElementById('process');
    const spacer = document.querySelector('.h-scroll-spacer');
    if (!trigger || !spacer) return;
    const tp = trigger.offsetTop + trigger.offsetHeight;
    const sh = spacer.offsetHeight;
    const p = j * (0.26 / 4);
    window.scrollTo({ top: tp + p * sh, behavior: 'smooth' });
  }, []);

  const manifestoPhase = Math.min(1, Math.max(0, (slideP - 0.52) / 0.08));

  const getX = (i) => {
    if (i === 0) return 0;
    if (i === 1)
      return slideP < 0.26 ? 100
        : slideP > 0.32 ? 0
        : 100 - ((slideP - 0.26) / 0.06) * 100;
    if (i === 2)
      return manifestoPhase < 0 ? 100
        : manifestoPhase > 1 ? 0
        : 100 - manifestoPhase * 100;
  };

  if (mobile) {
    return (
      <div
        ref={wrapRef}
        className="h-scroll-wrap"
        style={{
          position: 'relative', width: '100%', zIndex: 1,
        }}
      >
        <ReviewsSlide />
        <ManifestoSlide progress={1} />
      </div>
    );
  }

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
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${getX(0)}%)`, willChange: 'transform' }}>
          <ShowcaseSlide progress={progress} onCardEnd={handleCardEnd} />
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${getX(1)}%)`, willChange: 'transform' }}>
          <ReviewsSlide progress={slideP} />
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${getX(2)}%)`, willChange: 'transform' }}>
          <ManifestoSlide progress={slideP} />
        </div>
      </div>
    </div>
  );
}