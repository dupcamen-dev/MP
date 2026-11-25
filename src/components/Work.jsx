import Reveal from './Reveal';
import { ArrowUpRight } from './Icons';
import { useI18n } from '../i18n';
import { cap } from '../utils';
import { SplitWords } from './Motion';

const projects = [
  { tag: 'Film studio · London', title: 'Cine Riccio', color: '#1d1d1f', desc: 'Independent film studio in London. Short films, brand films and portraits shot with natural light and finished by hand.', img: '/cinericcio-hero.webp', link: 'https://www.cinericcio.com/', caption: 'cinericcio.com' },
  { tag: 'Restaurant · Brick Lane', title: 'Angry Spanish', color: '#9e2a22', desc: 'Spanish attitude, Mexican soul, Brick Lane energy. Menu, hours, gallery and table booking for a London kitchen residency.', img: '/angry-spanish-hero.webp', link: 'https://angry-spanish.vercel.app/', caption: 'angry-spanish.vercel.app' },
  { tag: 'Browser game · Strategy', title: 'Kadub', color: '#db1729', desc: 'A strategy game about an island town rebuilt from scratch, 1992. Online 1v1 matches, free-build mode and a tutorial — playable right in the browser.', img: '/kadub-hero.webp', link: 'https://webdeploy-rouge.vercel.app/', caption: 'webdeploy-rouge.vercel.app' },
  { tag: 'Meal planning · Web app', title: 'Nouri', color: '#2e7d4f', desc: 'Simple meal planning — tell us what is in your fridge and your daily calories, and get a week menu in seconds.', img: '/nouri-hero.png', link: 'https://nouri-normal.vercel.app/', caption: 'nouri-normal.vercel.app' },
  { tag: 'Restaurant · London', title: 'Zhyto', color: '#ff5a1f', desc: 'Artisan homemade varenyky. Tradition on a plate, delivered.', img: '/zhyto-hero.png', link: 'https://zhyto.london', caption: 'zhyto.london' },
  { tag: 'Catering · UK', title: 'Raqt Fuel', color: '#3a3a40', desc: 'We cook anything you crave. Any cuisine, cooked flawlessly.', img: '/raqt-hero.png', link: 'https://www.raqtfuel.com', caption: 'raqtfuel.com' },
  { tag: 'Custom furniture · Chortkiv', title: 'Mebli Chortkiv', color: '#8b6914', desc: 'Bespoke furniture workshop. Kitchens, bedrooms, living rooms — built to order.', img: '/mebli-hero.webp', link: 'https://mebli-chortkiv.vercel.app/', caption: 'mebli-chortkiv.vercel.app' },
  { tag: 'Monitoring SaaS', title: 'TopStatus', color: '#1a56c4', desc: 'Uptime monitoring and public status pages in one product. Instant alerts, incident history, crypto payments.', img: '/topstatus-hero.webp', link: 'https://topstatus.space/', caption: 'topstatus.space' },
  { tag: 'Perfume · Concept', title: 'Avvadon', color: '#c9a227', desc: 'Luxury fragrance concept store with dark ritual-style UX. Design + frontend only.', img: '/avvadon-hero.webp', link: 'https://dupcamen-dev.github.io/AVVADON/', caption: 'design + frontend' },
];

export default function Work() {
  const { t } = useI18n();

  return (
    <section id="showcase" className="section">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">{cap(t('showcaseLabel'))}</p>
            <h2 className="h-section">
              <SplitWords parts={[{ text: t('showcaseH1') }, { text: t('showcaseH2'), className: 'muted' }]} />
            </h2>
          </div>
        </Reveal>

        <div className="work-grid">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 90}>
              <a className="work-card spot" href={p.link} target="_blank" rel="noopener noreferrer">
                <div className="work-media">
                  <img src={p.img} alt={`${p.title} — website`} loading="lazy" decoding="async" width="1200" height="750" />
                  <span className="work-tag">{p.tag}</span>
                </div>
                <div className="work-body">
                  <div className="work-title-row">
                    <h3 className="h-card">
                      <span className="work-dot" style={{ background: p.color }} aria-hidden="true" />
                      {p.title}
                    </h3>
                    <span className="work-visit" aria-hidden="true"><ArrowUpRight /></span>
                  </div>
                  <p className="work-desc">{p.desc}</p>
                  <span className="mono work-caption">{p.caption} · 2026</span>
                </div>
                <span className="sr-only">{t('visit')} {p.title}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
