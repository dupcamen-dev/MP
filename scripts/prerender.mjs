// Writes static HTML for every public page so search engines get real content, the right
// language, title, description and canonical without running JavaScript.
// Runs after `vite build` and `vite build --ssr src/entry-server.jsx` (see package.json).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const { render, seoFor } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.mjs')).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const PAGES = [
  { out: 'index.html', locale: 'en', route: '/' },
  { out: 'uk/index.html', locale: 'uk', route: '/' },
  { out: 'pl/index.html', locale: 'pl', route: '/' },
  { out: 'privacy/index.html', locale: 'en', route: '/privacy' },
  { out: 'terms/index.html', locale: 'en', route: '/terms' },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function replaceOrFail(html, re, value, label) {
  const found = typeof re === 'string' ? html.includes(re) : re.test(html);
  if (!found) throw new Error(`prerender: ${label} not found in index.html`);
  return html.replace(re, value);
}

for (const page of PAGES) {
  const meta = seoFor(page);
  const app = render(page);
  let html = template;

  html = replaceOrFail(html, /<html lang="[^"]*"/, `<html lang="${meta.lang}"`, 'html lang');
  html = replaceOrFail(html, /<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`, 'title');
  html = replaceOrFail(html, /(<meta name="description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`, 'description');
  html = replaceOrFail(html, /(<meta name="robots" content=")[^"]*(")/, `$1${meta.robots}$2`, 'robots');
  html = replaceOrFail(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${meta.canonical}$2`, 'canonical');
  html = replaceOrFail(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${meta.canonical}$2`, 'og:url');
  html = replaceOrFail(html, /(<meta property="og:locale" content=")[^"]*(")/, `$1${meta.ogLocale}$2`, 'og:locale');
  html = replaceOrFail(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`, 'og:title');
  html = replaceOrFail(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`, 'og:description');
  html = replaceOrFail(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`, 'twitter:title');
  html = replaceOrFail(html, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`, 'twitter:description');

  const alternates = meta.alternates
    ? meta.alternates.map(([lang, href]) => `<link rel="alternate" hreflang="${lang}" href="${href}" />`).join('\n    ')
    : '';
  html = replaceOrFail(html, /<!-- hreflang:start -->[\s\S]*?<!-- hreflang:end -->/, `<!-- hreflang:start -->\n    ${alternates}\n    <!-- hreflang:end -->`, 'hreflang block');

  html = replaceOrFail(html, '<div id="root"></div>', `<div id="root">${app}</div>`, 'root');

  const file = path.join(dist, page.out);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  const h1 = (app.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ''])[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  console.log(`prerendered ${page.out.padEnd(20)} lang=${meta.lang} ${(app.length / 1024).toFixed(0)} KB  h1="${h1.slice(0, 50)}"`);
}
