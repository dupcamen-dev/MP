import { useState } from 'react';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useMobile } from './hooks/useMobile';
import Header from './components/Header';
import Hero from './components/Hero';
import ProofBar from './components/ProofBar';
import Process from './components/Process';
import HorizontalScroll from './components/HorizontalScroll';
import ShowcaseSlide from './components/ShowcaseSlide';
import PricingFAQ from './components/PricingFAQ';
import CtaOverlay from './components/CtaOverlay';
import FloatingCTA from './components/FloatingCTA';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  const progress = useScrollProgress('process');
  const mobile = useMobile();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);

  return (
    <>
      <Header onBook={openModal} />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Hero onBook={openModal} />
        <ProofBar />
        <div className="hero-spacer" style={{ height: '100vh', pointerEvents: 'none' }} />
      </div>
      <Process progress={progress} onBook={openModal} />
      {mobile && <ShowcaseSlide />}
      <HorizontalScroll progress={progress} />
      {!mobile && <div className="h-scroll-spacer" style={{ height: '700vh', pointerEvents: 'none' }} />}
      {!mobile && <div style={{ height: '100vh', pointerEvents: 'none' }} />}
      <PricingFAQ onBook={openModal} />
      <CtaOverlay progress={progress} showModal={showModal} setShowModal={setShowModal} />
      <FloatingCTA onOpen={openModal} />
      <ScrollToTop />
    </>
  );
}