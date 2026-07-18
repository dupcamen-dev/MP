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
import ScrollToTop from './components/ScrollToTop';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import CookieConsent from './components/CookieConsent';
import PrivacyTerms from './components/PrivacyTerms';

function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/');
  useEffect(() => {
    const handler = () => setRoute(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return route;
}

function Site({ showModal, setShowModal, onBook }) {
  const progress = useScrollProgress('process');
  const mobile = useMobile();
  const openModal = () => setShowModal(true);

  return (
    <>
      <Hero onBook={onBook} />
      <Process progress={progress} onBook={onBook} />
      {mobile && <ShowcaseSlide />}
      <HorizontalScroll progress={progress} />
      {!mobile && <div className="h-scroll-spacer" style={{ height: '500vh', pointerEvents: 'none' }} />}
      {!mobile && <div style={{ height: '100vh', pointerEvents: 'none' }} />}
      <PricingFAQ onBook={onBook} />
      <CtaOverlay showModal={showModal} setShowModal={setShowModal} onBook={onBook} />
      <footer style={{
        background: '#000000',
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
                color: 'var(--ink)', textDecoration: 'none', letterSpacing: '-0.01em',
                display: 'block', marginBottom: 24,
              }}>MILLIONPIXELS</a>
            <nav style={{ display: 'flex', gap: 24 }}>
              {[{ label: 'WORK', id: 'showcase' }, { label: 'PROCESS', id: 'process' }, { label: 'PRICING', id: 'pricing' }].map(l => (
                <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{
                    fontFamily: "'Geist Mono', monospace", fontSize: 12,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                  }}>{l.label}</a>
              ))}
            </nav>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
            <span style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 11,
              letterSpacing: '0.08em',               color: 'rgba(255,255,255,0.4)',
            }}>&copy; 2026 MILLIONPIXELS.DEV. ALL RIGHTS RESERVED.</span>
            <div style={{ display: 'flex', gap: 20 }}>
              <a href="#/privacy" style={{
                fontFamily: "'Geist Mono', monospace", fontSize: 11,
                letterSpacing: '0.06em', color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
              }}>Privacy Policy</a>
              <a href="#/terms" style={{
                fontFamily: "'Geist Mono', monospace", fontSize: 11,
                letterSpacing: '0.06em', color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
              }}>Terms of Service</a>
            </div>

          </div>
        </div>
      </footer>
      <ScrollToTop />
    </>
  );
}

export default function App() {
  const route = useHashRoute();
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    if (!auth.isAuthenticated) {
      window.location.hash = '/login';
      return;
    }
    setShowModal(true);
  };

  const handleLogin = (response) => {
    const u = auth.signIn(response);
    if (u && window.location.hash === '#/login') window.location.hash = '/';
  };

  const handleSignOut = () => {
    auth.signOut();
    window.location.hash = '/';
  };

  if (route === '/login' || (route === '/admin' && !auth.isAuthenticated)) {
    return <LoginPage clientId={auth.clientId} onSignIn={handleLogin} />;
  }

  if (route === '/privacy' || route === '/terms') {
    return <PrivacyTerms />;
  }

  if (route === '/admin' && auth.isAuthenticated) {
    if (auth.user?.email !== 'ringoosamsungj710@gmail.com') {
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
            }}>Access Denied</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: 32 }}>
              This account does not have admin access.
            </p>
            <button onClick={handleSignOut} style={{
              padding: '12px 28px', background: 'var(--ink)', color: 'var(--cream)',
              fontFamily: "'Anton', Impact, sans-serif", fontSize: '1rem',
              textTransform: 'uppercase', border: 'none', cursor: 'pointer',
              letterSpacing: '0.04em',
            }}>Sign out</button>
          </div>
        </div>
      );
    }
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
      <Site showModal={showModal} setShowModal={setShowModal} onBook={openModal} />
      <CookieConsent />
    </>
  );
}
