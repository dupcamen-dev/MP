import { useState, useEffect } from 'react';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useMobile } from './hooks/useMobile';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
import Hero from './components/Hero';
import Process from './components/Process';
import HorizontalScroll from './components/HorizontalScroll';
import ShowcaseSlide from './components/ShowcaseSlide';
import PricingFAQ from './components/PricingFAQ';
import CtaOverlay from './components/CtaOverlay';
import FloatingCTA from './components/FloatingCTA';
import ScrollToTop from './components/ScrollToTop';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';

function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/');
  useEffect(() => {
    const handler = () => setRoute(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return route;
}

function Site({ showModal, setShowModal }) {
  const progress = useScrollProgress('process');
  const mobile = useMobile();
  const openModal = () => setShowModal(true);

  return (
    <>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Hero onBook={openModal} />
        <div className="hero-spacer" style={{ height: '100vh', pointerEvents: 'none' }} />
      </div>
      <Process progress={progress} onBook={openModal} />
      {mobile && <ShowcaseSlide />}
      <HorizontalScroll progress={progress} />
      {!mobile && <div className="h-scroll-spacer" style={{ height: '500vh', pointerEvents: 'none' }} />}
      {!mobile && <div style={{ height: '100vh', pointerEvents: 'none' }} />}
      <PricingFAQ onBook={openModal} />
      <footer style={{
        background: 'var(--cream)',
        borderTop: '1px solid var(--sienna)',
        paddingTop: 80, paddingBottom: 48,
        paddingLeft: 'clamp(24px, 5%, 80px)', paddingRight: 'clamp(24px, 5%, 80px)',
        position: 'relative', zIndex: 3,
      }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          flexWrap: 'wrap', gap: 48,
        }}>
          <div>
            <a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{
                fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                color: 'var(--terracotta)', textDecoration: 'none', letterSpacing: '-0.01em',
                display: 'block', marginBottom: 24,
              }}>MILLIONPIXELS</a>
            <nav style={{ display: 'flex', gap: 24 }}>
              {[{ label: 'WORK', id: 'showcase' }, { label: 'PROCESS', id: 'process' }, { label: 'PRICING', id: 'pricing' }].map(l => (
                <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{
                    fontFamily: "'Geist Mono', monospace", fontSize: 12,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'var(--ink)', textDecoration: 'none',
                  }}>{l.label}</a>
              ))}
            </nav>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
            <span style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 11,
              letterSpacing: '0.1em', color: 'var(--sienna)',
            }}>EST. 2024</span>
            <span style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 12,
              letterSpacing: '0.08em', color: 'var(--text-dim)',
            }}>&copy; 2026 MILLIONPIXELS.DEV</span>
          </div>
        </div>
      </footer>
      <CtaOverlay progress={progress} showModal={showModal} setShowModal={setShowModal} />
      <FloatingCTA onOpen={openModal} />
      <ScrollToTop />
    </>
  );
}

export default function App() {
  const route = useHashRoute();
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);

  const handleLogin = (response) => {
    const u = auth.signIn(response);
    if (u) window.location.hash = '/admin';
  };

  const handleSignOut = () => {
    auth.signOut();
    window.location.hash = '/';
  };

  if (route === '/login' || (route === '/admin' && !auth.isAuthenticated)) {
    return <LoginPage clientId={auth.clientId} onSignIn={handleLogin} />;
  }

  if (route === '/admin' && auth.isAuthenticated) {
    return <AdminPanel user={auth.user} onSignOut={handleSignOut} />;
  }

  return (
    <>
      <Header
        onBook={openModal}
        user={auth.user}
        onSignIn={() => { window.location.hash = '/login'; }}
        onSignOut={handleSignOut}
      />
      <Site showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
