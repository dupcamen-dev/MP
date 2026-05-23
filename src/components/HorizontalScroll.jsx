import { useRef } from 'react';
import ShowcaseSlide from './ShowcaseSlide';
import ReviewsSlide from './ReviewsSlide';
import ManifestoSlide from './ManifestoSlide';

export default function HorizontalScroll({ progress }) {
  const wrapRef = useRef(null);
  const trackPhase = Math.min(1, Math.max(0, (progress - 0.25) / 0.5));

  const mobile = window.innerWidth < 900;
  const carouselRot = -360 * Math.min(1, progress / (mobile ? 0.35 : 0.15));
  const cardPhase = Math.min(1, Math.max(0, (progress - 0.26) / 0.14));
  const manifestoPhase = Math.min(1, Math.max(0, (progress - 0.44) / 0.10));

  const getX = (i) => {
    if (i === 0) return 0;
    if (i === 1)
      return progress < 0.22 ? 100
        : progress > 0.36 ? 0
        : 100 - ((progress - 0.22) / 0.14) * 100;
    if (i === 2)
      return manifestoPhase < 0 ? 100
        : manifestoPhase > 1 ? 0
        : 100 - manifestoPhase * 100;
  };

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
          <ShowcaseSlide carouselRot={carouselRot} />
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${getX(1)}%)` }}>
          <ReviewsSlide cardPhase={cardPhase} />
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${getX(2)}%)` }}>
          <ManifestoSlide progress={progress} />
        </div>
      </div>
    </div>
  );
}
