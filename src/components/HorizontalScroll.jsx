import { useRef, useCallback, useState } from 'react';
import ShowcaseSlide from './ShowcaseSlide';
import ReviewsSlide from './ReviewsSlide';
import ManifestoSlide from './ManifestoSlide';

export default function HorizontalScroll({ progress }) {
  const wrapRef = useRef(null);
  const mobile = window.innerWidth < 900;
  const [carouselDone, setCarouselDone] = useState(!mobile);
  const slideP = mobile ? (carouselDone ? Math.min(1, Math.max(0, (progress - 0.8) / 0.2)) : 0) : progress;

  const handleCardEnd = useCallback(() => {
    setCarouselDone(true);
    const trigger = document.getElementById('process');
    const spacer = document.querySelector('.h-scroll-spacer');
    if (!trigger || !spacer) return;
    const tp = trigger.offsetTop + trigger.offsetHeight;
    const sh = spacer.offsetHeight;
    window.scrollTo({ top: tp + 0.85 * sh, behavior: 'smooth' });
  }, []);

  const carouselRot = -360 * Math.min(1, progress / (mobile ? 0.35 : 0.15));
  const cardPhase = Math.min(1, Math.max(0, (slideP - 0.26) / 0.14));
  const manifestoPhase = Math.min(1, Math.max(0, (slideP - 0.44) / 0.10));

  const getX = (i) => {
    if (i === 0) return 0;
    if (i === 1)
      return slideP < 0.22 ? 100
        : slideP > 0.36 ? 0
        : 100 - ((slideP - 0.22) / 0.14) * 100;
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
        <ReviewsSlide cardPhase={1} />
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
          <ShowcaseSlide carouselRot={carouselRot} progress={progress} onCardEnd={handleCardEnd} />
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${getX(1)}%)`, willChange: 'transform' }}>
          <ReviewsSlide cardPhase={cardPhase} />
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${getX(2)}%)`, willChange: 'transform' }}>
          <ManifestoSlide progress={slideP} />
        </div>
      </div>
    </div>
  );
}
