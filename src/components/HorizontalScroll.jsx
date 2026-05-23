import { useEffect, useRef, useState } from 'react';
import ShowcaseSlide from './ShowcaseSlide';
import ReviewsSlide from './ReviewsSlide';
import ManifestoSlide from './ManifestoSlide';

export default function HorizontalScroll({ progress }) {
  const wrapRef = useRef(null);
  const trackPhase = Math.min(1, Math.max(0, (progress - 0.25) / 0.5));
  const [cardIndex, setCardIndex] = useState(0);
  const accRef = useRef(0);
  const enteredRef = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !enteredRef.current) {
        enteredRef.current = true;
        setCardIndex(0);
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
      if (Math.abs(accRef.current) >= 200) {
        const dir = accRef.current > 0 ? 1 : -1;
        accRef.current = 0;
        setCardIndex(prev => Math.max(0, Math.min(5, prev + dir)));
      }
    }
    wrap.addEventListener('wheel', onWheel, { passive: true });
    return () => wrap.removeEventListener('wheel', onWheel);
  }, []);

  const getX = (i) => {
    if (i === 0) return 0;
    const phase = i === 1 ? 0.5 : 0.75;
    const end = i === 1 ? 0.75 : 1;
    if (trackPhase < phase) return 100;
    if (trackPhase > end) return 0;
    return 100 - ((trackPhase - phase) / (end - phase)) * 100;
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
          <ShowcaseSlide cardIndex={cardIndex} />
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
