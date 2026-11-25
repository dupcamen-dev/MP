import { useState, useEffect, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useAuth } from './hooks/useAuth';
import { I18nProvider } from './i18n';
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

function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/');
  useEffect(() => {
    const handler = () => setRoute(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return route;
}

const routeMeta = {
  '/': {
    title: 'Millionpixels — Your Website, Found in Google. Live in 7 Days',
    description: 'We build a working website and set up its SEO — not just a pretty page. In 7 days you get a live site with SEO in place, so clients can find you on Google.',
  },
  '/privacy': {
    title: 'Privacy Policy | Millionpixels',
    description: 'How Millionpixels collects and handles your data when you submit a booking request or sign in to the admin panel.',
  },
  '/terms': {
    title: 'Terms of Service | Millionpixels',
    description: 'The terms that govern 7-day MVP builds delivered by Millionpixels.',
  },
  '/login': {
    title: 'Sign In | Millionpixels',
    description: 'Sign in to access the Millionpixels admin panel.',
  },
  '/admin': {
    title: 'Admin Panel | Millionpixels',
    description: 'Millionpixels admin panel — manage booking requests and bot settings.',
  },
};

const localeMeta = {
  en: {
    homeTitle: 'Millionpixels — Your Website, Found in Google. Live in 7 Days',
    homeDesc: 'We build a working website and set up its SEO — not just a pretty page. In 7 days you get a live site with SEO in place, so clients can find you on Google.',
  },
  uk: {
    homeTitle: 'Millionpixels — ваш сайт під ключ, знайдений у Google. За 7 днів',
    homeDesc: 'Ми створюємо робочий сайт під ключ і налаштовуємо SEO — не просто гарну сторінку. За 7 днів ви отримуєте живий сайт із SEO, щоб клієнти знаходили вас у Google.',
  },
  pl: {
    homeTitle: 'Millionpixels — Twoja strona, znaleziona w Google. Za 7 dni',
    homeDesc: 'Budujemy działającą stronę i konfigurujemy SEO — nie tylko ładną stronę. W 7 dni otrzymujesz żywą witrynę z SEO, aby klienci znaleźli Cię w Google.',
  },
};

function useRouteMeta(route) {
  useEffect(() => {
    const p = window.location.pathname;
    const loc = p.startsWith('/uk') ? 'uk' : p.startsWith('/pl') ? 'pl' : 'en';
    const lm = localeMeta[loc];
    const meta = routeMeta[route] || {
      title: loc === 'en' ? routeMeta['/'].title : lm.homeTitle,
      description: loc === 'en' ? routeMeta['/'].description : lm.homeDesc,
    };
    document.title = meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', meta.description);
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.setAttribute('content', route === '/admin' || route === '/login' ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  }, [route]);
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

function AppRoot() {
  const route = useHashRoute();
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
    window.location.hash = '/';
  };

  if (route === '/privacy' || route === '/terms') {
    return <PrivacyTerms />;
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

export default function App() {
  return (
    <I18nProvider>
      <AppRoot />
    </I18nProvider>
  );
}
