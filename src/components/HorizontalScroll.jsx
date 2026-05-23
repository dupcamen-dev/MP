import { useEffect, useRef, useState } from 'react';
import ShowcaseSlide from './ShowcaseSlide';
import ReviewsSlide from './ReviewsSlide';
import ManifestoSlide from './ManifestoSlide';

const MAX_STEP = 8;

export default function HorizontalScroll({ progress }) {
  const wrapRef = useRef(null);
  const [step, setStep] = useState(0);
  const accRef = useRef(0);
  const enteredRef = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !enteredRef.current) {
        enteredRef.current = true;
        setStep(0);
        accRef.current = 0;
      }
    }, { threshold: 0 });
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    function onWheel(e) {
      accRef.current += e.deltaY;
      if (Math.abs(accRef.current) >= 80) {
        const dir = accRef.current > 0 ? 1 : -1;
        accRef.current = 0;
        setStep(s => Math.max(0, Math.min(MAX_STEP, s + dir)));
      }
    }
    wrap.addEventListener('wheel', onWheel, { passive: true });
    return () => wrap.removeEventListener('wheel', onWheel);
  }, []);

  const getSlideX = (i) => {
    if (i === 0) return step < 6 ? 0 : -100;
    if (i === 1) return step === 6 ? 0 : step > 6 ? -100 : 100;
    if (i === 2) return step >= 7 ? 0 : 100;
    return 100;
  };

  const cardIndex = Math.min(5, step);

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
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${getSlideX(0)}%)` }}>
          <ShowcaseSlide cardIndex={cardIndex} />
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${getSlideX(1)}%)` }}>
          <ReviewsSlide />
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${getSlideX(2)}%)` }}>
          <ManifestoSlide />
        </div>
      </div>
    </div>
  );
}
