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
      <div style={{ position: 'relative', marginBottom: '-50vh' }}>
        <Hero />
        <div className="hero-spacer" style={{ height: '100vh', pointerEvents: 'none' }} />
      </div>
      <Process />
      <HorizontalScroll progress={progress} />
      <div className="h-scroll-spacer" style={{ height: '500vh', pointerEvents: 'none' }} />
      <div style={{ height: '100vh', pointerEvents: 'none' }} />
      <CtaOverlay progress={progress} />
    </>
  );
}
