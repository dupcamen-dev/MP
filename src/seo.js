// Single source of truth for per-page SEO metadata.
// Used by the build-time prerender (scripts/prerender.mjs) and by the client after navigation.

export const SITE_URL = 'https://www.millionpixels.dev';

export const LOCALE_PATH = { en: '/', uk: '/uk', pl: '/pl' };
export const OG_LOCALE = { en: 'en_US', uk: 'uk_UA', pl: 'pl_PL' };

const HOME = {
  en: {
    title: 'Millionpixels — Website + SEO in 7 Days | Web Studio',
    description: 'Millionpixels is a web studio that builds a working website and sets up its SEO — not just a pretty page. Live and found on Google in 7 days.',
  },
  uk: {
    title: 'Millionpixels — сайт під ключ із SEO за 7 днів | Веб-студія',
    description: 'Створюємо робочий сайт під ключ і налаштовуємо SEO — не просто гарну сторінку. За 7 днів ви отримуєте живий сайт, який знаходять у Google.',
  },
  pl: {
    title: 'Millionpixels — strona pod klucz z SEO w 7 dni | Web studio',
    description: 'Budujemy działającą stronę pod klucz i konfigurujemy SEO — nie tylko ładną stronę. W 7 dni masz stronę na żywo, widoczną w Google.',
  },
};

const PAGES = {
  '/privacy': {
    title: 'Privacy Policy | Millionpixels',
    description: 'How Millionpixels collects and handles your data when you submit a booking request.',
  },
  '/terms': {
    title: 'Terms of Service | Millionpixels',
    description: 'The terms that govern 7-day website builds delivered by Millionpixels.',
  },
  '/login': {
    title: 'Sign In | Millionpixels',
    description: 'Admin sign-in.',
    noindex: true,
  },
  '/admin': {
    title: 'Admin Panel | Millionpixels',
    description: 'Admin panel.',
    noindex: true,
  },
};

// route: '/', '/privacy', '/terms', '/login', '/admin'
export function seoFor({ locale = 'en', route = '/' }) {
  const page = PAGES[route];
  if (page) {
    const path = route === '/login' || route === '/admin' ? '/' : route;
    return {
      lang: 'en',
      title: page.title,
      description: page.description,
      canonical: SITE_URL + path,
      ogLocale: OG_LOCALE.en,
      robots: page.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
      alternates: null,
    };
  }
  const home = HOME[locale] || HOME.en;
  return {
    lang: locale,
    title: home.title,
    description: home.description,
    canonical: SITE_URL + (LOCALE_PATH[locale] || '/'),
    ogLocale: OG_LOCALE[locale] || OG_LOCALE.en,
    robots: 'index, follow, max-image-preview:large',
    alternates: [
      ['x-default', SITE_URL + '/'],
      ['en', SITE_URL + '/'],
      ['uk', SITE_URL + '/uk'],
      ['pl', SITE_URL + '/pl'],
    ],
  };
}

// Applies metadata to the live document (client-side navigation, language switch).
export function applySeo(meta) {
  if (typeof document === 'undefined') return;
  const set = (selector, attr, value) => { const el = document.querySelector(selector); if (el) el.setAttribute(attr, value); };
  document.documentElement.lang = meta.lang;
  document.title = meta.title;
  set('meta[name="description"]', 'content', meta.description);
  set('meta[name="robots"]', 'content', meta.robots);
  set('link[rel="canonical"]', 'href', meta.canonical);
  set('meta[property="og:url"]', 'content', meta.canonical);
  set('meta[property="og:title"]', 'content', meta.title);
  set('meta[property="og:description"]', 'content', meta.description);
  set('meta[property="og:locale"]', 'content', meta.ogLocale);
  set('meta[name="twitter:title"]', 'content', meta.title);
  set('meta[name="twitter:description"]', 'content', meta.description);
}
