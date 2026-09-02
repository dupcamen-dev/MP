import { useMobile } from '../hooks/useMobile';
import Reveal from './Reveal';

const t = {
  font: "'Inter', sans-serif",
  bg: '#fdfdfd',
  ink: '#1a1a1a',
  inkSoft: '#555555',
  muted: '#8a8a8a',
  line: '#e8e8e8',
  lineSoft: '#f0f0f0',
  accent: '#3d4a5c',
  accentSoft: '#7a8798',
  gold: '#9a6c22',
};

export default function PriceList({ onBook }) {
  const mobile = useMobile();

  const sectionPad = 'clamp(24px, 6vw, 96px)';
  const maxW = 1240;

  const section = {
    maxWidth: maxW,
    margin: '0 auto',
    paddingLeft: sectionPad,
    paddingRight: sectionPad,
    fontFamily: t.font,
  };

  const sectionTitle = {
    fontFamily: t.font,
    fontSize: mobile ? 30 : 34,
    fontWeight: 400,
    letterSpacing: '-0.5px',
    color: t.ink,
    margin: '0 0 40px 0',
    paddingBottom: 20,
    borderBottom: `1px solid ${t.line}`,
  };

  const tableWrap = {
    overflowX: 'auto',
  };

  const table = {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: t.font,
  };

  const th = {
    fontFamily: t.font,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: t.muted,
    borderBottom: '1px solid #1a1a1a',
    textAlign: 'left',
    padding: '0 4px 10px 4px',
    whiteSpace: 'nowrap',
  };

  const thRight = { ...th, textAlign: 'right' };

  const td = {
    fontFamily: t.font,
    fontSize: 14,
    padding: '15px 4px',
    borderBottom: '1px solid #f0f0f0',
    color: t.inkSoft,
    verticalAlign: 'top',
    lineHeight: 1.5,
  };

  const tdFirst = { ...td, color: t.ink, fontWeight: 500, whiteSpace: 'nowrap' };

  const tdRight = { ...td, textAlign: 'right', color: t.ink, fontWeight: 500, whiteSpace: 'nowrap' };

  const infoBox = {
    marginTop: 20,
    padding: '18px 20px',
    border: `1px solid ${t.line}`,
    borderRadius: 4,
    background: t.bg,
    fontFamily: t.font,
    fontSize: 14,
    color: t.inkSoft,
    lineHeight: 1.6,
  };

  const listMarker = {
    color: t.accentSoft,
    fontWeight: 600,
  };

  const Products = (props) => (
    <div style={{ marginBottom: 96, ...section }}>
      <h3 style={sectionTitle}>{props.title}</h3>
      {mobile ? (
        <div style={{ borderTop: `1px solid #1a1a1a` }}>
          {props.rows.map((r, i) => (
            <div key={i} style={{
              padding: '18px 4px',
              borderBottom: `1px solid ${t.lineSoft}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <span style={{
                  fontFamily: t.font, fontSize: 14, fontWeight: 600, color: t.ink,
                  whiteSpace: 'normal',
                }}>{r.name}</span>
                <span style={{
                  fontFamily: t.font, fontSize: 13, fontWeight: 600, color: t.ink,
                  textAlign: 'right', whiteSpace: 'nowrap', flexShrink: 0,
                }}>{r.price}</span>
              </div>
              <div style={{
                fontFamily: t.font, fontSize: 14, color: t.inkSoft, lineHeight: 1.5,
                marginTop: 6,
              }}>{r.desc}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={{ ...th, minWidth: 140, textAlign: 'left' }}>{props.col1}</th>
                <th style={{ ...th, textAlign: 'left', minWidth: 300 }}>{props.col2}</th>
                <th style={{ ...thRight, minWidth: 170 }}>{props.col3}</th>
              </tr>
            </thead>
            <tbody>
              {props.rows.map((r, i) => (
                <tr key={i}>
                  <td style={tdFirst}>{r.name}</td>
                  <td style={td}>{r.desc}</td>
                  <td style={tdRight}>{r.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={infoBox}>{props.info}</div>
    </div>
  );

  const Features = (props) => (
    <div style={{ marginBottom: 96, ...section }}>
      <h3 style={sectionTitle}>{props.title}</h3>
      {mobile ? (
        <div style={{ borderTop: `1px solid #1a1a1a` }}>
          {props.rows.map((r, i) => (
            <div key={i} style={{
              padding: '18px 4px',
              borderBottom: `1px solid ${t.lineSoft}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <span style={{
                  fontFamily: t.font, fontSize: 14, fontWeight: 600, color: t.ink,
                  whiteSpace: 'normal',
                }}>{r.name}</span>
                <span style={{
                  fontFamily: t.font, fontSize: 13, fontWeight: 600, color: t.ink,
                  textAlign: 'right', whiteSpace: 'nowrap', flexShrink: 0,
                }}>{r.price}</span>
              </div>
              <div style={{
                fontFamily: t.font, fontSize: 14, color: t.inkSoft, lineHeight: 1.5,
                marginTop: 6,
              }}>{r.desc}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={{ ...th, minWidth: 220, textAlign: 'left' }}>{props.col1}</th>
                <th style={{ ...th, textAlign: 'left', minWidth: 300 }}>{props.col2}</th>
                <th style={{ ...thRight, minWidth: 170 }}>{props.col3}</th>
              </tr>
            </thead>
            <tbody>
              {props.rows.map((r, i) => (
                <tr key={i}>
                  <td style={tdFirst}>{r.name}</td>
                  <td style={td}>{r.desc}</td>
                  <td style={tdRight}>{r.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={infoBox}>{props.info}</div>
    </div>
  );

  const cardShell = {
    borderTop: `1px solid ${t.ink}`,
    paddingTop: 20,
  };

  const cardTitle = {
    fontFamily: t.font,
    fontSize: 16,
    fontWeight: 600,
    color: t.ink,
    letterSpacing: '0.5px',
    margin: '0 0 8px 0',
    textTransform: 'uppercase',
  };

  const cardRange = {
    fontFamily: t.font,
    fontSize: 20,
    fontWeight: 600,
    color: t.accent,
    margin: '0 0 20px 0',
  };

  const cardList = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  };

  const cardLi = {
    fontFamily: t.font,
    fontSize: 14,
    color: t.inkSoft,
    lineHeight: 1.5,
    display: 'flex',
    gap: 10,
  };

  const badge = {
    fontFamily: t.font,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '5px',
    textTransform: 'uppercase',
    color: t.accentSoft,
    margin: '0 0 24px 0',
  };

  return (
    <section id="pricing" style={{ position: 'relative', zIndex: 3, background: t.bg, paddingTop: 120, paddingBottom: 120, fontFamily: t.font }}>
      {/* COVER */}
      <Reveal>
      <div style={{ ...section, marginBottom: 90 }}>
        <p style={badge}>PRICE LIST</p>
        <h2 style={{
          fontFamily: t.font,
          fontSize: mobile ? 36 : 52,
          fontWeight: 300,
          letterSpacing: '-1px',
          color: t.ink,
          margin: '0 0 16px 0',
          lineHeight: 1.05,
        }}>Web Development</h2>
        <p style={{
          fontFamily: t.font,
          fontSize: 15,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: t.muted,
          margin: '0 0 40px 0',
        }}>Full-Stack · Custom · Production-Ready</p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 60 }}>
          {['Design', 'Frontend', 'Backend', 'Admin', 'E-commerce', 'SEO', 'Integrations', 'Production'].map((tag, i, arr) => (
            <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && <span style={{ fontSize: 11, color: t.muted }}>·</span>}
              <span style={{ fontFamily: t.font, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', color: t.inkSoft }}>{tag}</span>
            </span>
          ))}
        </div>

        {/* Price cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: 0,
        }}>
          {[
            { name: 'Landing', price: '$500', alt: '£400 · 2,000 PLN' },
            { name: 'Business', price: '$1,200', alt: '£950 · 4,750 PLN' },
            { name: 'E-commerce', price: '$2,500', alt: '£2,000 · 10,000 PLN' },
            { name: 'Web App', price: '$3,000+', alt: '£2,400+ · 12,000+ PLN' },
          ].map((c, i, arr) => (
            <div key={c.name} style={{
              padding: '24px 24px',
              borderRight: i !== arr.length - 1 ? `1px solid ${t.lineSoft}` : 'none',
              borderBottom: mobile && i < 2 ? (i === 0 ? `1px solid ${t.lineSoft}` : 'none') : 'none',
            }}>
              <div style={{
                fontFamily: t.font,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: t.muted,
                marginBottom: 10,
              }}>{c.name}</div>
              <div style={{
                fontFamily: t.font,
                fontSize: 28,
                fontWeight: 500,
                color: t.ink,
                letterSpacing: '-0.5px',
                marginBottom: 4,
              }}>{c.price}</div>
              <div style={{
                fontFamily: t.font,
                fontSize: 12,
                color: t.inkSoft,
              }}>{c.alt}</div>
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: t.font,
          fontSize: 14,
          color: t.inkSoft,
          lineHeight: 1.6,
          marginTop: 40,
          maxWidth: 720,
        }}>
          Bespoke development tailored to your business — quoted in{' '}
          <span style={{ fontWeight: 600, color: t.ink }}>USD</span>,{' '}
          <span style={{ fontWeight: 600, color: t.ink }}>GBP</span> and{' '}
          <span style={{ fontWeight: 600, color: t.ink }}>PLN</span>. Every build ships production-ready with
          SEO, security and performance baked in from day one.
        </p>
      </div>
      </Reveal>

      {/* 01 — Core Products / Website Development */}
      <Reveal>
      <Products
        title="01 — Core Products / Website Development"
        col1="Product"
        col2="What's Included"
        col3="From"
        rows={[
          { name: 'Landing Page', desc: '1 page, custom UI, responsive, contact form, basic SEO, analytics setup, production launch', price: '$500 / £400 · 2,000 PLN' },
          { name: 'Business Website', desc: '5–10 pages, custom UI, responsive, CMS/content management, forms, basic SEO, analytics, launch', price: '$1,200 / £950 · 4,750 PLN' },
          { name: 'E-commerce', desc: 'Catalog, categories, search/filters, cart, checkout, payment processing, order management, admin panel', price: '$2,500 / £2,000 · 10,000 PLN' },
          { name: 'Custom Web App', desc: 'Backend, database, authentication, user roles, API, admin/dashboard, and business logic', price: '$3,000+ / £2,400+ · 12,000+ PLN' },
        ]}
        info="From pricing reflects standard scope. Final quotes are confirmed after a short discovery call and full feature decomposition — so you never pay for what you don't need."
      />
      </Reveal>

      {/* 02 — Add-Ons / Additional Features */}
      <Reveal>
      <Features
        title="02 — Add-Ons / Additional Features"
        col1="Feature"
        col2="Typical Scope"
        col3="Range"
        rows={[
          { name: 'Additional Page', desc: 'Complex content or service page with custom layout', price: '$70–150' },
          { name: 'Authentication', desc: 'Login, registration, password reset, email verification', price: '$200–400' },
          { name: 'Roles & Permissions', desc: 'Admin / editor / manager roles with granular access control', price: '$200–450' },
          { name: 'Advanced Admin Panel', desc: 'Users, products, orders, filters, analytics, activity logs', price: '$600–1,200' },
          { name: 'Business Management', desc: 'CRM / ERP-lite, inventory, customer records, automated workflows', price: '$1,500–4,000+' },
          { name: 'Payment Integration', desc: 'Payment gateway, checkout flow, webhooks, status management', price: '$250–600+' },
          { name: 'External API Integration', desc: 'CRM, delivery, mapping, AI services, third-party APIs', price: '$200–600+' },
          { name: 'Multilingual', desc: 'i18n architecture + full additional language implementation', price: '$200–600+' },
          { name: 'Advanced Search / Filters', desc: 'Full-text search, sorting, faceted filters, indexed queries', price: '$200–500' },
          { name: 'Notifications', desc: 'Email, in-app, or push notifications depending on scope', price: '$150–400' },
          { name: 'File Storage', desc: 'Upload handling, cloud storage, access control', price: '$100–300' },
        ]}
        info="Every add-on is available on its own or bundled into a larger build. Send your request and I'll map the exact scope to the right range."
      />
      </Reveal>

      {/* 03 — Visibility / SEO & Analytics */}
      <Reveal>
      <Features
        title="03 — Visibility / SEO & Analytics"
        col1="Service"
        col2="What's Included"
        col3="Range"
        rows={[
          { name: 'Technical SEO', desc: 'Meta tags, heading structure, canonical URLs, sitemap, robots.txt, schema markup, indexing setup', price: '$250–500' },
          { name: 'On-page SEO', desc: 'Keyword research, page structure, internal linking, content hierarchy', price: '$350–800' },
          { name: 'SEO Campaign', desc: 'Ongoing optimisation, content strategy, monitoring, reports, Search Console management', price: '$300–1,500+ /mo' },
          { name: 'GA4 / Tag Manager', desc: 'Setup, event tracking, basic conversion tracking', price: '$100–250' },
          { name: 'Search Console', desc: 'Verification, sitemap submission, basic monitoring', price: '$50–150' },
        ]}
        info="Technical SEO preparation is part of every build at no extra cost. These services add deeper optimisation when your site is ready to rank and convert."
      />
      </Reveal>

      {/* 04 — Visual / Design & UX */}
      <Reveal>
      <Features
        title="04 — Visual / Design & UX"
        col1="Service"
        col2="What's Included"
        col3="Range"
        rows={[
          { name: 'Wireframe', desc: 'Page structure, content blocks, user flow mapping', price: '$100–300' },
          { name: 'Landing UI', desc: 'Custom visual design for a single landing page', price: '$250–600' },
          { name: 'Corporate UI', desc: '5–10 pages with responsive states', price: '$500–1,200' },
          { name: 'E-commerce UI', desc: 'Catalog, product pages, cart, checkout, account area', price: '$800–1,800' },
          { name: 'Design System', desc: 'Component library, typography scale, spacing tokens, states', price: '$300–900' },
          { name: 'UX / Prototype', desc: 'User flows + interactive clickable prototype', price: '$200–600' },
        ]}
        info="Good design isn't decoration — it's conversion. Every visual layer here is built mobile-first and performance-conscious."
      />
      </Reveal>

      {/* 05 — Infrastructure / Backend, API & Production */}
      <Reveal>
      <Features
        title="05 — Infrastructure / Backend, API & Production"
        col1="Service"
        col2="What's Included"
        col3="Range"
        rows={[
          { name: 'CRUD / Data Model', desc: 'Entity design, validation rules, basic API endpoints', price: '$150–300' },
          { name: 'REST / GraphQL API', desc: 'Endpoints, authentication, validation, error handling, basic documentation', price: '$350–900' },
          { name: 'Business Logic', desc: 'Rules, calculations, automated workflows, conditional processing', price: '$350–1,200+' },
          { name: 'Performance Optimisation', desc: 'Image optimisation, caching, API/DB tuning, Core Web Vitals', price: '$200–600' },
          { name: 'Basic Deployment', desc: 'Hosting/VPS setup, domain, SSL, environment config, production build', price: '$120–250' },
          { name: 'Production Setup', desc: 'Docker, CI/CD pipeline, backups, monitoring, logging', price: '$300–700' },
          { name: 'Migration / Redeploy', desc: 'Moving or reconfiguring an existing project to a new environment', price: '$150–500+' },
        ]}
        info="You own 100% of the code, infrastructure and access from day one. Nothing is locked behind proprietary tooling or ongoing license fees."
      />
      </Reveal>

      {/* 06 — E-commerce Depth */}
      <Reveal>
      <div style={{ marginBottom: 96, ...section, marginTop: 0 }}>
        <h3 style={sectionTitle}>06 — E-commerce Depth / What Determines Your E-commerce Budget</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
        }}>
          {[
            {
              tier: 'Tier 1', name: 'Starter', range: '$2,500–3,500', alt: '£2,000–2,800 · 10,000–14,000 PLN',
              items: ['Product catalog', 'Shopping cart & checkout', 'Payment processing', 'Order management', 'Admin panel'],
            },
            {
              tier: 'Tier 2', name: 'Standard', range: '$3,500–6,000', alt: '£2,800–4,750 · 14,000–24,000 PLN',
              items: ['Advanced filters & search', 'Wishlist & user accounts', 'Delivery options', 'Promotions & discounts', 'Analytics & reporting'],
            },
            {
              tier: 'Tier 3', name: 'Advanced', range: '$6,000–10,000+', alt: '£4,750–8,000+ · 24,000–40,000+ PLN',
              items: ['ERP / CRM integration', 'Inventory synchronisation', 'Multiple payment gateways', 'Complex business rules', 'Multi-vendor capabilities'],
            },
          ].map((c, i, arr) => (
            <div key={c.name} style={{
              padding: mobile ? '32px 8px' : '40px 36px',
              borderRight: !mobile && i !== arr.length - 1 ? `1px solid ${t.lineSoft}` : 'none',
              borderBottom: mobile && i !== arr.length - 1 ? `1px solid ${t.lineSoft}` : 'none',
            }}>
              <div style={{
                fontFamily: t.font,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: t.accentSoft,
                marginBottom: 8,
              }}>{c.tier} — {c.name}</div>
              <div style={{
                fontFamily: t.font,
                fontSize: 24,
                fontWeight: 600,
                color: t.accent,
                margin: '0 0 4px 0',
                letterSpacing: '-0.5px',
              }}>{c.range}</div>
              <div style={{
                fontFamily: t.font,
                fontSize: 12,
                color: t.muted,
                marginBottom: 24,
              }}>{c.alt}</div>
              <ul style={{ ...cardList }}>
                {c.items.map((item) => (
                  <li key={item} style={cardLi}>
                    <span style={listMarker}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={infoBox}>
          E-commerce budgets are shaped by catalogue size, payment needs, integrations and automation — the tier above shows how scope maps to investment step by step.
        </div>
      </div>
      </Reveal>

      {/* 07 — After Launch / Support */}
      <Reveal>
      <div style={{ marginBottom: 90, ...section }}>
        <h3 style={sectionTitle}>07 — After Launch / Support & Ongoing Development</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
        }}>
          {[
            {
              name: 'Basic', range: '$100/mo', alt: '£80 · 400 PLN',
              items: ['Bug fixes', 'Backup monitoring', 'Basic health checks', 'Minor content updates'],
            },
            {
              name: 'Standard', range: '$200–300/mo', alt: '£160–240 · 800–1,200 PLN',
              items: ['Regular updates & patches', 'Performance monitoring', 'Minor feature additions', 'Security maintenance'],
            },
            {
              name: 'Premium', range: '$500–1,000+/mo', alt: '£400–800+ · 2,000–4,000+ PLN',
              items: ['Priority support', 'Continuous development', 'Security & compliance', 'Analytics & reporting'],
            },
          ].map((c, i, arr) => (
            <div key={c.name} style={{
              padding: mobile ? '32px 8px' : '40px 36px',
              borderRight: !mobile && i !== arr.length - 1 ? `1px solid ${t.lineSoft}` : 'none',
              borderBottom: mobile && i !== arr.length - 1 ? `1px solid ${t.lineSoft}` : 'none',
            }}>
              <div style={{
                fontFamily: t.font,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: t.accentSoft,
                marginBottom: 8,
              }}>Support</div>
              <div style={{
                fontFamily: t.font,
                fontSize: 24,
                fontWeight: 600,
                color: t.accent,
                letterSpacing: '-0.5px',
                margin: '0 0 4px 0',
              }}>{c.name} — {c.range}</div>
              <div style={{
                fontFamily: t.font,
                fontSize: 12,
                color: t.muted,
                marginBottom: 24,
              }}>{c.alt}</div>
              <ul style={{ ...cardList }}>
                {c.items.map((item) => (
                  <li key={item} style={cardLi}>
                    <span style={listMarker}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={infoBox}>
          Major new features fall outside the support scope and are scoped independently — so your monthly plan stays predictable and you only pay for genuinely new work.
        </div>
      </div>
      </Reveal>

      {/* 08 — Reference / Sample Commercial Proposal */}
      <Reveal>
      <div style={{ marginBottom: 90, ...section }}>
        <h3 style={sectionTitle}>08 — Reference / Sample Commercial Proposal</h3>
        {mobile ? (
          <div style={{ borderTop: `1px solid #1a1a1a` }}>
            {[
              { name: 'Custom UI / Design', price: '$500 / £400 · 2,000 PLN' },
              { name: 'Frontend Development', price: '$700 / £555 · 2,775 PLN' },
              { name: 'Backend / API', price: '$600 / £475 · 2,375 PLN' },
              { name: 'Admin Panel', price: '$700 / £555 · 2,775 PLN' },
              { name: 'Authentication + Roles', price: '$400 / £320 · 1,600 PLN' },
              { name: 'Technical SEO + Analytics', price: '$300 / £240 · 1,200 PLN' },
              { name: 'Deployment / Production', price: '$200 / £160 · 800 PLN' },
            ].map((r, i) => (
              <div key={i} style={{
                padding: '14px 4px',
                borderBottom: `1px solid ${t.lineSoft}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12,
              }}>
                <span style={{
                  fontFamily: t.font, fontSize: 14, fontWeight: 600, color: t.ink, whiteSpace: 'normal',
                }}>{r.name}</span>
                <span style={{
                  fontFamily: t.font, fontSize: 13, fontWeight: 600, color: t.ink,
                  textAlign: 'right', whiteSpace: 'nowrap', flexShrink: 0,
                }}>{r.price}</span>
              </div>
            ))}
            <div style={{
              padding: '14px 4px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12,
              borderBottom: '1px solid #1a1a1a',
            }}>
              <span style={{
                fontFamily: t.font, fontSize: 13, fontWeight: 600, color: t.ink,
              }}>Total</span>
              <span style={{
                fontFamily: t.font, fontSize: 13, fontWeight: 600, color: t.gold,
                textAlign: 'right', whiteSpace: 'nowrap',
              }}>$3,400 · £2,700 · 13,450 PLN</span>
            </div>
          </div>
        ) : (
          <div style={tableWrap}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={{ ...th, textAlign: 'left', minWidth: 300 }}>Component</th>
                  <th style={{ ...thRight, minWidth: 220 }}>Cost</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Custom UI / Design', price: '$500 / £400 · 2,000 PLN' },
                  { name: 'Frontend Development', price: '$700 / £555 · 2,775 PLN' },
                  { name: 'Backend / API', price: '$600 / £475 · 2,375 PLN' },
                  { name: 'Admin Panel', price: '$700 / £555 · 2,775 PLN' },
                  { name: 'Authentication + Roles', price: '$400 / £320 · 1,600 PLN' },
                  { name: 'Technical SEO + Analytics', price: '$300 / £240 · 1,200 PLN' },
                  { name: 'Deployment / Production', price: '$200 / £160 · 800 PLN' },
                ].map((r, i) => (
                  <tr key={i}>
                    <td style={tdFirst}>{r.name}</td>
                    <td style={tdRight}>{r.price}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ ...td, color: t.ink, fontWeight: 600, fontSize: 14, borderBottom: '1px solid #1a1a1a' }}>Total</td>
                  <td style={{
                    ...td,
                    textAlign: 'right',
                    borderBottom: '1px solid #1a1a1a',
                    color: t.gold,
                    fontWeight: 600,
                    fontSize: 14,
                    whiteSpace: 'nowrap',
                  }}>$3,400 · £2,700 · 13,450 PLN</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <div style={infoBox}>
          This example illustrates the logic behind fixed-price assembly — every requirement is decomposed, priced and summed with no surprise invoices along the way.
        </div>
      </div>
      </Reveal>

      {/* 09 — Working Terms / How We Work */}
      <Reveal>
      <div style={{ marginBottom: 90, ...section }}>
        <h3 style={sectionTitle}>09 — Working Terms / How We Work</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
          borderTop: `1px solid ${t.ink}`,
        }}>
          {[
            { label: 'Estimation', value: 'Free preliminary scope assessment. Final pricing confirmed after full decomposition.' },
            { label: 'Deposit', value: '30–50% upfront before work begins. Remaining balance paid against agreed milestones.' },
            { label: 'Process', value: 'Discovery → Design → Development → QA → Launch' },
            { label: 'Revisions', value: '1–2 revision rounds within the agreed scope. New requirements are estimated separately.' },
            { label: 'Bug Warranty', value: '7–30 days post-launch bug-fix warranty, depending on project scope.' },
            { label: 'Third-party Costs', value: 'Hosting, domain, paid APIs, plugins, and SaaS tools are not included unless explicitly stated.' },
            { label: 'Urgent Work', value: '+20–50% surcharge depending on deadline severity and project complexity.' },
            { label: 'Final Agreement', value: 'Pricing, timelines, and deliverables are fixed in a formal proposal / contract after scope sign-off.' },
          ].map((term, i) => (
            <div key={term.label} style={{
              padding: '24px 24px',
              borderBottom: `1px solid ${t.ink}`,
              borderRight: !mobile && i % 2 === 0 ? `1px solid ${t.ink}` : 'none',
            }}>
              <div style={{
                fontFamily: t.font,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: t.accentSoft,
                marginBottom: 10,
              }}>{term.label}</div>
              <div style={{
                fontFamily: t.font,
                fontSize: 13,
                color: t.inkSoft,
                lineHeight: 1.6,
              }}>{term.value}</div>
            </div>
          ))}
        </div>
      </div>
      </Reveal>

      {/* Philosophy */}
      <Reveal>
      <div style={{ ...section, maxWidth: 760 }}>
        <p style={badge}>Pricing Philosophy</p>
        <p style={{
          fontFamily: t.font,
          fontSize: 16,
          lineHeight: 1.7,
          color: t.inkSoft,
          margin: 0,
        }}>
          These prices are positioned as competitive benchmarks for custom web development in 2026. Solo
          full-stack development sits above budget freelance rates, while remaining below typical premium
          agency pricing — delivering enterprise-quality output at accessible investment levels.
        </p>
      </div>
      </Reveal>
    </section>
  );
}
