import { useId, useState } from 'react';
import Reveal from './Reveal';
import { ArrowRight, Check } from './Icons';
import { useI18n } from '../i18n';
import { cap, noArrow } from '../utils';
import { Roll, SplitWords } from './Motion';

// "01 — Core Products / Website Development" → { num: '01', label: 'Core Products', title: 'Website Development' }
function splitTitle(s) {
  const m = /^(\d+)\s*—\s*(.+?)\s*\/\s*(.+)$/.exec(s || '');
  return m ? { num: m[1], label: m[2], title: m[3] } : { num: '', label: '', title: s };
}

function Rows({ rows }) {
  return (
    <div className="rows">
      {rows.map((r, i) => (
        <div className={`row${r.total ? ' row--total' : ''}`} key={i}>
          <span className="row-name">{r.name}</span>
          {r.desc !== undefined ? <span className="row-desc">{r.desc}</span> : <span />}
          <span className="row-price">{r.price}</span>
        </div>
      ))}
    </div>
  );
}

function Tiers({ tiers, chip }) {
  return (
    <div className="tiers">
      {tiers.map((tier, i) => (
        <div className="tier" key={i}>
          <div className="tier-top">
            <span className="tier-name">{tier.name}</span>
            <span className="chip">{tier.tier ?? chip}</span>
          </div>
          <span className="tier-range">{tier.range}</span>
          <span className="tier-alt">{tier.alt}</span>
          <ul>
            {tier.items.map((it) => <li key={it}><Check size={14} />{it}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

function usePriceData(tp) {
  const packages = [
    { name: tp('Landing'), price: '$250', alt: '£200 · 1,000 PLN', desc: tp('1 page, custom UI, responsive, contact form, basic SEO, analytics setup, production launch') },
    { name: tp('Business'), price: '$600', alt: '£475 · 2,375 PLN', desc: tp('5–10 pages, custom UI, responsive, CMS/content management, forms, basic SEO, analytics, launch') },
    { name: tp('E-commerce'), price: '$1,250', alt: '£1,000 · 5,000 PLN', desc: tp('Catalog, categories, search/filters, cart, checkout, payment processing, order management, admin panel') },
    { name: tp('Web App'), price: '$1,500+', alt: '£1,200+ · 6,000+ PLN', desc: tp('Backend, database, authentication, user roles, API, admin/dashboard, and business logic'), dark: true },
  ];

  const sections = [
    {
      title: tp('02 — Add-Ons / Additional Features'),
      info: tp("Every add-on is available on its own or bundled into a larger build. Send your request and I'll map the exact scope to the right range."),
      rows: [
        { name: tp('Additional Page'), desc: tp('Complex content or service page with custom layout'), price: '$35–75' },
        { name: tp('Authentication'), desc: tp('Login, registration, password reset, email verification'), price: '$100–200' },
        { name: tp('Roles & Permissions'), desc: tp('Admin / editor / manager roles with granular access control'), price: '$100–225' },
        { name: tp('Advanced Admin Panel'), desc: tp('Users, products, orders, filters, analytics, activity logs'), price: '$300–600' },
        { name: tp('Business Management'), desc: tp('CRM / ERP-lite, inventory, customer records, automated workflows'), price: '$750–2,000+' },
        { name: tp('Payment Integration'), desc: tp('Payment gateway, checkout flow, webhooks, status management'), price: '$125–300+' },
        { name: tp('External API Integration'), desc: tp('CRM, delivery, mapping, AI services, third-party APIs'), price: '$100–300+' },
        { name: tp('Multilingual'), desc: tp('i18n architecture + full additional language implementation'), price: '$100–300+' },
        { name: tp('Advanced Search / Filters'), desc: tp('Full-text search, sorting, faceted filters, indexed queries'), price: '$100–250' },
        { name: tp('Notifications'), desc: tp('Email, in-app, or push notifications depending on scope'), price: '$75–200' },
        { name: tp('File Storage'), desc: tp('Upload handling, cloud storage, access control'), price: '$50–150' },
      ],
    },
    {
      title: tp('03 — Visibility / SEO & Analytics'),
      info: tp('Technical SEO preparation is part of every build at no extra cost. These services add deeper optimisation when your site is ready to rank and convert.'),
      rows: [
        { name: tp('Technical SEO'), desc: tp('Meta tags, heading structure, canonical URLs, sitemap, robots.txt, schema markup, indexing setup'), price: '$125–250' },
        { name: tp('On-page SEO'), desc: tp('Keyword research, page structure, internal linking, content hierarchy'), price: '$175–400' },
        { name: tp('SEO Campaign'), desc: tp('Ongoing optimisation, content strategy, monitoring, reports, Search Console management'), price: '$150–750+ /mo' },
        { name: tp('GA4 / Tag Manager'), desc: tp('Setup, event tracking, basic conversion tracking'), price: '$50–125' },
        { name: tp('Search Console'), desc: tp('Verification, sitemap submission, basic monitoring'), price: '$25–75' },
      ],
    },
    {
      title: tp('04 — Visual / Design & UX'),
      info: tp("Good design isn't decoration — it's conversion. Every visual layer here is built mobile-first and performance-conscious."),
      rows: [
        { name: tp('Wireframe'), desc: tp('Page structure, content blocks, user flow mapping'), price: '$50–150' },
        { name: tp('Landing UI'), desc: tp('Custom visual design for a single landing page'), price: '$125–300' },
        { name: tp('Corporate UI'), desc: tp('5–10 pages with responsive states'), price: '$250–600' },
        { name: tp('E-commerce UI'), desc: tp('Catalog, product pages, cart, checkout, account area'), price: '$400–900' },
        { name: tp('Design System'), desc: tp('Component library, typography scale, spacing tokens, states'), price: '$150–450' },
        { name: tp('UX / Prototype'), desc: tp('User flows + interactive clickable prototype'), price: '$100–300' },
      ],
    },
    {
      title: tp('05 — Infrastructure / Backend, API & Production'),
      info: tp('You own 100% of the code, infrastructure and access from day one. Nothing is locked behind proprietary tooling or ongoing license fees.'),
      rows: [
        { name: tp('CRUD / Data Model'), desc: tp('Entity design, validation rules, basic API endpoints'), price: '$75–150' },
        { name: tp('REST / GraphQL API'), desc: tp('Endpoints, authentication, validation, error handling, basic documentation'), price: '$175–450' },
        { name: tp('Business Logic'), desc: tp('Rules, calculations, automated workflows, conditional processing'), price: '$175–600+' },
        { name: tp('Performance Optimisation'), desc: tp('Image optimisation, caching, API/DB tuning, Core Web Vitals'), price: '$100–300' },
        { name: tp('Basic Deployment'), desc: tp('Hosting/VPS setup, domain, SSL, environment config, production build'), price: '$60–125' },
        { name: tp('Production Setup'), desc: tp('Docker, CI/CD pipeline, backups, monitoring, logging'), price: '$150–350' },
        { name: tp('Migration / Redeploy'), desc: tp('Moving or reconfiguring an existing project to a new environment'), price: '$75–250+' },
      ],
    },
    {
      title: tp('06 — E-commerce Depth / What Determines Your E-commerce Budget'),
      info: tp('E-commerce budgets are shaped by catalogue size, payment needs, integrations and automation — the tier above shows how scope maps to investment step by step.'),
      tiers: [
        { tier: tp('Tier 1'), name: tp('Starter'), range: '$1,250–1,750', alt: '£1,000–1,400 · 5,000–7,000 PLN', items: [tp('Product catalog'), tp('Shopping cart & checkout'), tp('Payment processing'), tp('Order management'), tp('Admin panel')] },
        { tier: tp('Tier 2'), name: tp('Standard'), range: '$1,750–3,000', alt: '£1,400–2,375 · 7,000–12,000 PLN', items: [tp('Advanced filters & search'), tp('Wishlist & user accounts'), tp('Delivery options'), tp('Promotions & discounts'), tp('Analytics & reporting')] },
        { tier: tp('Tier 3'), name: tp('Advanced'), range: '$3,000–5,000+', alt: '£2,375–4,000+ · 12,000–20,000+ PLN', items: [tp('ERP / CRM integration'), tp('Inventory synchronisation'), tp('Multiple payment gateways'), tp('Complex business rules'), tp('Multi-vendor capabilities')] },
      ],
    },
    {
      title: tp('07 — After Launch / Support & Ongoing Development'),
      info: tp('Major new features fall outside the support scope and are scoped independently — so your monthly plan stays predictable and you only pay for genuinely new work.'),
      chip: tp('Support'),
      tiers: [
        { name: tp('Basic'), range: '$50/mo', alt: '£40 · 200 PLN', items: [tp('Bug fixes'), tp('Backup monitoring'), tp('Basic health checks'), tp('Minor content updates')] },
        { name: tp('Standard'), range: '$100–150/mo', alt: '£80–120 · 400–600 PLN', items: [tp('Regular updates & patches'), tp('Performance monitoring'), tp('Minor feature additions'), tp('Security maintenance')] },
        { name: tp('Premium'), range: '$250–500+/mo', alt: '£200–400+ · 1,000–2,000+ PLN', items: [tp('Priority support'), tp('Continuous development'), tp('Security & compliance'), tp('Analytics & reporting')] },
      ],
    },
    {
      title: tp('08 — Reference / Sample Commercial Proposal'),
      info: tp('This example illustrates the logic behind fixed-price assembly — every requirement is decomposed, priced and summed with no surprise invoices along the way.'),
      rows: [
        { name: tp('Custom UI / Design'), price: '$250 / £200 · 1,000 PLN' },
        { name: tp('Frontend Development'), price: '$350 / £280 · 1,390 PLN' },
        { name: tp('Backend / API'), price: '$300 / £240 · 1,190 PLN' },
        { name: tp('Admin Panel'), price: '$350 / £280 · 1,390 PLN' },
        { name: tp('Authentication + Roles'), price: '$200 / £160 · 800 PLN' },
        { name: tp('Technical SEO + Analytics'), price: '$150 / £120 · 600 PLN' },
        { name: tp('Deployment / Production'), price: '$100 / £80 · 400 PLN' },
        { name: tp('Total'), price: '$1,700 · £1,360 · 6,770 PLN', total: true },
      ],
    },
    {
      title: tp('09 — Working Terms / How We Work'),
      terms: [
        { label: tp('Estimation'), value: tp('Free preliminary scope assessment. Final pricing confirmed after full decomposition.') },
        { label: tp('Deposit'), value: tp('30–50% upfront before work begins. Remaining balance paid against agreed milestones.') },
        { label: tp('Process'), value: tp('Discovery → Design → Development → QA → Launch') },
        { label: tp('Revisions'), value: tp('1–2 revision rounds within the agreed scope. New requirements are estimated separately.') },
        { label: tp('Bug Warranty'), value: tp('7–30 days post-launch bug-fix warranty, depending on project scope.') },
        { label: tp('Third-party Costs'), value: tp('Hosting, domain, paid APIs, plugins, and SaaS tools are not included unless explicitly stated.') },
        { label: tp('Urgent Work'), value: tp('+20–50% surcharge depending on deadline severity and project complexity.') },
        { label: tp('Final Agreement'), value: tp('Pricing, timelines, and deliverables are fixed in a formal proposal / contract after scope sign-off.') },
      ],
    },
  ];

  return { packages, sections };
}

export default function Pricing({ onBook }) {
  const { t, tp } = useI18n();
  const { packages, sections } = usePriceData(tp);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const uid = useId();
  const active = sections[tab];
  const head = splitTitle(active.title);

  return (
    <section id="pricing" className="section">
      <div className="container">
        <Reveal className="section-head section-head--split">
          <div>
            <p className="eyebrow">{cap(t('faqLabel'))}</p>
            <h2 className="h-section">
              <SplitWords parts={[{ text: t('faqH1') }, { text: t('faqH2'), className: 'muted' }]} />
            </h2>
          </div>
          <p className="lead">
            {tp('Bespoke development tailored to your business — quoted in')} USD, GBP {tp('and')} PLN.{' '}
            {tp('Every build ships production-ready with')} {tp('SEO, security and performance baked in from day one.')}
          </p>
        </Reveal>

        <div className="packages">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <article className={`package spot${p.dark ? ' package--dark' : ''}`} style={{ height: '100%' }}>
                <div className="package-name">
                  <span>{p.name}</span>
                  <span className="mono">0{i + 1}</span>
                </div>
                <span className="package-from">{tp('From')}</span>
                <div className="package-price">{p.price}</div>
                <div className="package-alt">{p.alt}</div>
                <p className="package-desc">{p.desc}</p>
                <button className={`btn btn--block ${p.dark ? 'btn--light' : 'btn--ghost'}`} onClick={onBook}>
                  <Roll>{noArrow(t('faqQuoteBtn'))}</Roll>
                  <ArrowRight />
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="included">
          <span className="included-title">{t('includedLabel')}</span>
          <ul>
            {(t('faqIncludes') || []).map((it) => <li key={it}><Check />{it}</li>)}
          </ul>
        </Reveal>

        <p className="price-note">
          {tp("From pricing reflects standard scope. Final quotes are confirmed after a short discovery call and full feature decomposition — so you never pay for what you don't need.")}
        </p>

        <button
          className="price-toggle"
          aria-expanded={open}
          aria-controls={`${uid}-full`}
          onClick={() => setOpen((o) => !o)}
        >
          <span>{t('priceFull')}</span>
          <span className="plus" aria-hidden="true" />
        </button>

        <div className={`collapse${open ? ' is-open' : ''}`} id={`${uid}-full`}>
          <div>
            <div className="price-full" inert={!open}>
              <div className="tabs" role="tablist" aria-label={t('priceFull')}>
                {sections.map((s, i) => {
                  const { num, label } = splitTitle(s.title);
                  return (
                    <button
                      key={s.title}
                      role="tab"
                      id={`${uid}-tab-${i}`}
                      className="tab"
                      aria-selected={tab === i}
                      aria-controls={`${uid}-panel`}
                      tabIndex={tab === i ? 0 : -1}
                      onClick={() => setTab(i)}
                      onKeyDown={(e) => {
                        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
                        const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + sections.length) % sections.length;
                        setTab(next);
                        document.getElementById(`${uid}-tab-${next}`)?.focus();
                      }}
                    >{num} · {label}</button>
                  );
                })}
              </div>

              <div className="tab-panel" role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${tab}`} key={tab}>
                <div className="tab-panel-head">
                  <p className="eyebrow">{head.num} — {head.label}</p>
                  <h3 className="h-card">{head.title}</h3>
                </div>
                {active.rows && <Rows rows={active.rows} />}
                {active.tiers && <Tiers tiers={active.tiers} chip={active.chip} />}
                {active.terms && (
                  <dl className="terms">
                    {active.terms.map((term) => (
                      <div className="term" key={term.label}>
                        <dt>{term.label}</dt>
                        <dd>{term.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {active.info && <p className="panel-info">{active.info}</p>}
              </div>

              <p className="price-note">
                <strong>{tp('Pricing Philosophy')}.</strong>{' '}
                {tp('These prices are positioned as competitive benchmarks for custom web development in 2026. Solo')}{' '}
                {tp('full-stack development sits above budget freelance rates, while remaining below typical premium')}{' '}
                {tp('agency pricing — delivering enterprise-quality output at accessible investment levels.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
