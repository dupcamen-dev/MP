import { useState } from 'react';
import PixelSeam from './PixelSeam';
import { PrimaryButton } from './Button';

export default function PricingFAQ({ onBook }) {
  const [openIdx, setOpenIdx] = useState(0);
  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches;

  const faqs = [
    { q: 'How does a week work?', a: 'One call to scope it. Five days to build it. Day seven it goes live — documented, tested, yours.' },
    { q: 'What if I need more after?', a: 'Keep us on retainer, or take the repo and run. Your code, your call.' },
    { q: 'Do I own everything?', a: 'Yes. Full repo access from day one. No licenses, no lock-in.' },
    { q: 'What can you build in seven days?', a: 'Production MVPs: web apps, dashboards, marketplaces, booking platforms. Real users, real payments, live URL.' },
  ];

  const includes = ['Full build', 'Your repo, day one', '30 days support', 'Live URL'];

  return (
    <>
      <PixelSeam top="var(--terracotta)" bottom="var(--cream)" height={40} />
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
            }}>PRICING</p>
            <h2 style={{
              fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 0.9, textTransform: 'uppercase', color: 'var(--ink)', margin: '0 0 24px 0',
            }}>
              Fixed price.<br />Fixed timeline.
            </h2>

            {/* Price card with pixel-seam top edge */}
            <div style={{ position: 'relative', background: 'var(--bg-alt)', border: '1px solid var(--sienna)' }}>
              <div style={{ height: 6, background: 'var(--terracotta)' }} />
              <div style={{ padding: '40px 36px' }}>
                <div style={{
                  fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  color: 'var(--terracotta)', lineHeight: 0.9, marginBottom: 4,
                }}>CUSTOM</div>
                <p style={{
                  fontFamily: "'Geist Mono', monospace", fontSize: 13, letterSpacing: '0.08em',
                  color: 'var(--sienna)', margin: '0 0 28px 0',
                }}>ONE WEEK · ONE LIVE PRODUCT</p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {includes.map((item) => (
                    <li key={item} style={{
                      fontFamily: "'Geist', sans-serif", fontWeight: 300, fontSize: '1.05rem',
                      color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 12,
                    }}>
                      <span style={{ color: 'var(--terracotta)', fontWeight: 600 }}>—</span>{item}
                    </li>
                  ))}
                </ul>

                <PrimaryButton onClick={onBook} style={{ width: '100%', justifyContent: 'center' }}>
                  Book a week →
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
            }}>QUESTIONS</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                  style={{
                    borderTop: '1px solid var(--sienna)',
                    borderBottom: i === faqs.length - 1 ? '1px solid var(--sienna)' : 'none',
                    padding: '24px 4px', cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <h3 style={{
                      fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
                      color: 'var(--ink)', textTransform: 'uppercase', margin: 0, lineHeight: 1.2,
                    }}>{faq.q}</h3>
                    <span style={{
                      fontWeight: 400, fontSize: '1.75rem', color: 'var(--terracotta)',
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
