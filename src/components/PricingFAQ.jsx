import { useState } from 'react';
import { useMobile } from '../hooks/useMobile';
import { PrimaryButton } from './Button';
import { useI18n } from '../i18n';

export default function PricingFAQ({ onBook }) {
  const [openIdx, setOpenIdx] = useState(0);
  const mobile = useMobile();
  const { t } = useI18n();

  const faqs = [
    { q: t('faqQ0'), a: t('faqA0') },
    { q: t('faqQ1'), a: t('faqA1') },
    { q: t('faqQ2'), a: t('faqA2') },
    { q: t('faqQ3'), a: t('faqA3') },
    { q: t('faqQ4'), a: t('faqA4') },
  ];

  const includes = t('faqIncludes');

  return (
    <>
      <section id="pricing" style={{
        background: 'var(--cream)', paddingTop: '120px', paddingBottom: '120px',
        paddingLeft: 'clamp(24px, 5%, 80px)', paddingRight: 'clamp(24px, 5%, 80px)',
        position: 'relative', zIndex: 3,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : '0.85fr 1.15fr',
          gap: mobile ? 48 : 72, alignItems: 'start',
          maxWidth: 1240, margin: '0 auto',
        }}>
          {/* LEFT — Pricing */}
          <div>
            <p style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 12,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--sienna)', margin: '0 0 16px 0',
            }}>{t('faqLabel')}</p>
            <h2 style={{
              fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 0.9, textTransform: 'uppercase', color: 'var(--ink)', margin: '0 0 24px 0',
            }}>
              {t('faqH1')}<br />{t('faqH2')}
            </h2>

            {/* Price card */}
            <div style={{ position: 'relative', background: 'var(--bg-alt)', border: '1px solid var(--sienna)',
              borderRadius: 'var(--radius)', overflow: 'hidden',
              boxShadow: '5px 5px 0 rgba(0,0,0,0.1)' }}>
              <div style={{ height: 6, background: 'var(--ink)' }} />
              <div style={{ padding: '40px 36px' }}>
                <div style={{
                  fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--ink)', lineHeight: 0.9, marginBottom: 8,
                }}>{t('faqQuote')}</div>
                <p style={{
                  fontFamily: "'Geist Mono', monospace", fontSize: 13, letterSpacing: '0.08em',
                  color: 'var(--sienna)', margin: '0 0 28px 0',
                }}>{t('faqQuoteSub')}</p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {includes.map((item) => (
                    <li key={item} style={{
                      fontFamily: "'Geist', sans-serif", fontWeight: 300, fontSize: '1.05rem',
                      color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 12,
                    }}>
                      <span style={{ color: 'var(--ink)', fontWeight: 600 }}>—</span>{item}
                    </li>
                  ))}
                </ul>

                <PrimaryButton onClick={onBook} style={{ width: '100%', justifyContent: 'center' }}>
                  {t('faqQuoteBtn')}
                </PrimaryButton>
              </div>
            </div>
          </div>

          {/* RIGHT — FAQ */}
          <div>
            <p style={{
              fontFamily: "'Geist Mono', monospace", fontSize: 12,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--sienna)', margin: '0 0 24px 0',
            }}>{t('faqQuestionsLabel')}</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                  style={{
                    borderTop: '1px solid var(--sienna)',
                    borderBottom: i === faqs.length - 1 ? '1px solid var(--sienna)' : 'none',
                    padding: '24px 8px', cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-high)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <h3 style={{
                      fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
                      color: 'var(--ink)', textTransform: 'uppercase', margin: 0, lineHeight: 1.2,
                    }}>{faq.q}</h3>
                    <span style={{
                      fontWeight: 400, fontSize: '1.75rem', color: 'var(--ink)',
                      transition: 'transform 0.3s', transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0)',
                      lineHeight: 1, flexShrink: 0,
                    }}>+</span>
                  </div>
                  {openIdx === i && (
                    <p style={{
                      fontFamily: "'Geist', sans-serif", fontWeight: 300, fontSize: '1.1rem',
                      color: 'var(--text-dim)', margin: '16px 0 0 0', lineHeight: 1.6, maxWidth: 560,
                    }}>{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
