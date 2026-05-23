import { useScrollProgress } from './hooks/useScrollProgress';
import Particles from './components/Particles';
import Header from './components/Header';
import Hero from './components/Hero';
import Process from './components/Process';
import HorizontalScroll from './components/HorizontalScroll';
import CtaOverlay from './components/CtaOverlay';

export default function App() {
  const progress = useScrollProgress('process');

  return (
    <>
      <Particles />
      <Header />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <div className="hero-spacer" style={{ height: '100vh', pointerEvents: 'none' }} />
      </div>
      <Process />
      <HorizontalScroll progress={progress} />
      <div className="h-scroll-spacer" style={{ height: '1000vh', pointerEvents: 'none' }} />
      <div style={{ height: '200vh', pointerEvents: 'none' }} />
      <CtaOverlay progress={progress} />
    </>
  );
}
