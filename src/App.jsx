import { useState, useEffect, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useAuth } from './hooks/useAuth';
import { I18nProvider, useI18n } from './i18n';
import { applySeo, seoFor } from './seo';
import Header from './components/Header';
import Hero from './components/Hero';
import Work from './components/Work';
import Process from './components/Process';
import Reviews from './components/Reviews';
import Manifesto from './components/Manifesto';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import Cta from './components/Cta';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';
import ScrollToTop from './components/ScrollToTop';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import CookieConsent from './components/CookieConsent';
import PrivacyTerms from './components/PrivacyTerms';
import { initSmoothScroll } from './smoothScroll';
import { Marquee, useSpotlight } from './components/Motion';

// Public pages live on real paths (/privacy, /terms) so search engines can index them;
// the admin area stays on hash routes (#/login, #/admin).
const PATH_ROUTES = ['/privacy', '/terms'];

function currentRoute() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (PATH_ROUTES.includes(path)) return path;
  const hash = window.location.hash.slice(1) || '/';
  // Old links like /#/privacy → move to the real path.
  if (PATH_ROUTES.includes(hash)) {
    window.history.replaceState(null, '', hash);
    return hash;
  }
  return hash;
}

function useRoute(initialRoute) {
  const [route, setRoute] = useState(() => initialRoute ?? (typeof window === 'undefined' ? '/' : currentRoute()));
  useEffect(() => {
    const handler = () => setRoute(currentRoute());
    window.addEventListener('hashchange', handler);
    window.addEventListener('popstate', handler);
    return () => {
      window.removeEventListener('hashchange', handler);
      window.removeEventListener('popstate', handler);
    };
  }, []);
  return route;
}

function useRouteMeta(route) {
  const { locale } = useI18n();
  useEffect(() => {
    applySeo(seoFor({ locale, route }));
  }, [route, locale]);
}

function Site({ onBook }) {
  useEffect(() => initSmoothScroll(), []);
  useSpotlight();
  return (
    <>
      <main>
        <Hero onBook={onBook} />
        <Marquee />
        <div className="scroll-progress" aria-hidden="true" />
        <Work />
        <Process onBook={onBook} />
        <Reviews />
        <Manifesto />
        <Pricing onBook={onBook} />
        <Faq />
        <Cta onBook={onBook} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

function AppRoot({ initialRoute }) {
  const route = useRoute(initialRoute);
  useRouteMeta(route);
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);
  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);

  // Sessions are issued only to allow-listed admins (checked on the server), so a signed-in user is an admin.
  const handleLogin = async (response) => {
    const result = await auth.signIn(response);
    if (result.user) window.location.hash = '/admin';
    return result;
  };

  const handleSignOut = async () => {
    await auth.signOut();
    window.location.href = '/';
  };

  if (route === '/privacy' || route === '/terms') {
    return <PrivacyTerms page={route === '/terms' ? 'terms' : 'privacy'} />;
  }

  if (route === '/login' || route === '/admin') {
    if (auth.loading) return null;
    if (!auth.isAuthenticated) return <LoginPage clientId={auth.clientId} onSignIn={handleLogin} />;
    if (route === '/login') { window.location.hash = '/admin'; return null; }
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
      <Site onBook={openModal} />
      {showModal && <OrderModal onClose={closeModal} />}
      <CookieConsent />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default function App({ initialLocale, initialRoute } = {}) {
  return (
    <I18nProvider initialLocale={initialLocale}>
      <AppRoot initialRoute={initialRoute} />
    </I18nProvider>
  );
}
