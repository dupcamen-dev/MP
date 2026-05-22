import { useEffect, useRef } from 'react';
import ShowcaseSlide from './ShowcaseSlide';
import ReviewsSlide from './ReviewsSlide';
import ManifestoSlide from './ManifestoSlide';

export default function HorizontalScroll({ progress }) {
  const trackRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;
    const slides = track.children;
    if (!slides.length) return;
    const sw = slides[0].offsetWidth || window.innerWidth;
    track.style.width = slides.length * sw + 'px';
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;
    const sw = track.children[0]?.offsetWidth || window.innerWidth;
    const mw = track.children.length * sw - wrap.clientWidth;
    const trackPhase = progress > 0.25 ? Math.min(1, (progress - 0.25) / 0.5) : 0;
    const tx = trackPhase * mw;
    track.style.transform = `translateX(${-tx}px)`;

    const vw = window.innerWidth;
    wrap.querySelectorAll('.reveal').forEach((r) => {
      const slide = r.closest('.slide');
      if (slide) {
        const slideOffset = slide.offsetLeft;
        const slideProgress = (tx - slideOffset + vw) / vw;
        if (slideProgress > 0.3) r.classList.add('active');
      }
    });
  }, [progress]);

  return (
    <div
      ref={wrapRef}
      className="h-scroll-wrap"
      style={{
        position: 'sticky', top: 0, height: '100vh', width: '100%',
        overflow: 'hidden', zIndex: 2,
      }}
    >
      <div
        style={{
          position: 'relative', width: '100%', height: '100%',
        }}
      >
        <div className="h-scroll" style={{
          display: 'flex', height: '100vh', width: '100%', overflow: 'hidden',
        }}>
          <div ref={trackRef} className="h-scroll-track" style={{
            display: 'flex', height: '100%', flex: 'none', willChange: 'transform',
          }}>
            <ShowcaseSlide progress={progress} />
            <ReviewsSlide />
            <ManifestoSlide />
          </div>
        </div>
      </div>
    </div>
  );
}
