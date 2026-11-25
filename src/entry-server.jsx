// Build-time renderer: turns the React app into static HTML per page (see scripts/prerender.mjs).
import { renderToString } from 'react-dom/server';
import App from './App';

export { seoFor, SITE_URL } from './seo';

export function render({ locale, route }) {
  return renderToString(<App initialLocale={locale} initialRoute={route} />);
}
