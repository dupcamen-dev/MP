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
import LoginModal from './components/LoginModal';

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
  const [showLogin, setShowLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);

  useEffect(() => {
    if (auth.isAuthenticated) setShowLogin(false);
  }, [auth.isAuthenticated]);

  if (route === '/admin') {
    if (!auth.isAuthenticated) {
      return (
        <div style={{
          minHeight: '100vh', background: 'var(--cream)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Geist', sans-serif",
        }}>
          <div style={{ textAlign: 'center', padding: 40 }}>
            <h2 style={{
              fontFamily: "'Anton', Impact, sans-serif", fontSize: '2rem',
              color: 'var(--ink)', textTransform: 'uppercase', margin: '0 0 12px 0',
            }}>Admin Access</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: 32 }}>
              Sign in with Google to access the admin panel.
            </p>
            <button onClick={() => setShowLogin(true)} style={{
              padding: '14px 32px', background: 'var(--terracotta)', color: 'var(--cream)',
              fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.1rem',
              textTransform: 'uppercase', border: 'none', cursor: 'pointer',
              letterSpacing: '0.04em',
            }}>Sign in with Google</button>
            <br />
            <a href="/" style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 12,
              color: 'var(--text-dim)', textDecoration: 'none',
              display: 'inline-block', marginTop: 20,
            }}>&#8592; Back to site</a>
          </div>
          {showLogin && (
            <LoginModal
              onGoogleSignIn={auth.signInWithGoogle}
              onClose={() => setShowLogin(false)}
              loading={auth.loading}
            />
          )}
        </div>
      );
    }
    return <AdminPanel user={auth.user} onSignOut={auth.signOut} />;
  }

  return (
    <>
      <Header onBook={openModal} user={auth.user} onSignIn={() => setShowLogin(true)} onSignOut={auth.signOut} />
      <Site showModal={showModal} setShowModal={setShowModal} />
      {showLogin && (
        <LoginModal
          onGoogleSignIn={auth.signInWithGoogle}
          onClose={() => setShowLogin(false)}
          loading={auth.loading}
        />
      )}
    </>
  );
}
