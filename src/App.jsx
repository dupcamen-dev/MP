import { useState } from 'react';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useMobile } from './hooks/useMobile';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import Process from './components/Process';
import HorizontalScroll from './components/HorizontalScroll';
import ShowcaseSlide from './components/ShowcaseSlide';
import PricingFAQ from './components/PricingFAQ';
import CtaOverlay from './components/CtaOverlay';
import FloatingCTA from './components/FloatingCTA';

export default function App() {
  const progress = useScrollProgress('process');
  const mobile = useMobile();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Hero progress={progress} />
        <TrustBadges />
        <div className="hero-spacer" style={{ height: '100vh', pointerEvents: 'none' }} />
      </div>
      <Process progress={progress} />
      {mobile && <ShowcaseSlide />}
      <HorizontalScroll progress={progress} />
      {!mobile && <div className="h-scroll-spacer" style={{ height: '1400vh', pointerEvents: 'none' }} />}
      {!mobile && <div style={{ height: '100vh', pointerEvents: 'none' }} />}
      <PricingFAQ />
      <CtaOverlay progress={progress} showModal={showModal} setShowModal={setShowModal} />
      <FloatingCTA onOpen={() => setShowModal(true)} />
    </>
  );
}