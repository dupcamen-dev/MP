import { useState } from 'react';

export default function PricingFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How much does an MVP cost?',
      a: 'Our 7-day MVP package starts at $X depending on complexity. You get a fully functional product, source code, and 30 days of support. All-in, no hidden fees.',
    },
    {
      q: 'What tech stack will you use?',
      a: 'We specialize in Next.js, React, Node.js, PostgreSQL, and TypeScript. If you need something different (Vue, Python, Rails), we can discuss. We pick the best tool for your problem.',
    },
    {
      q: 'Do I own the code?',
      a: '100% yes. From day 1, you get full access to the repository and all code ownership. No licensing restrictions, no ongoing fees.',
    },
    {
      q: 'What if I need more features?',
      a: 'We launch an MVP in 7 days. After that, you can either hire us for extensions, use our extended team, or hire your own developers—your code is yours to modify.',
    },
    {
      q: 'How do you guarantee quality?',
      a: 'Senior engineers + AI pair programming. Daily builds mean issues are caught early. We ship production-ready code with tests and documentation from day 1.',
    },
  ];

  return (
    <section id="pricing" style={{
      background: 'var(--surface-low)', padding: '120px 64px',
      position: 'relative', zIndex: 3,
    }}>
      <div style={{
        maxWidth: 1000, margin: '0 auto',
      }}>
        <h2 style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(3rem, 8vw, 5rem)',
          lineHeight: 0.9, textTransform: 'uppercase',
          color: 'var(--primary)', marginBottom: 16, margin: 0,
        }}>
          PRICING &<br />
          <span style={{ color: 'var(--secondary)' }}>FAQ</span>
        </h2>
        <p style={{
          fontFamily: "'Geist', sans-serif", fontSize: 'clamp(1.1rem, 2vw, 1.375rem)',
          color: 'var(--text-dim)', marginBottom: 64, lineHeight: 1.5,
        }}>
          Fixed price. Fixed timeline. No surprises.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              style={{
                background: 'var(--bg-alt)', border: '2px solid var(--surface-high)',
                padding: '24px 32px', cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                borderColor: openIdx === i ? 'var(--primary)' : 'var(--surface-high)',
                background: openIdx === i ? 'rgba(201, 123, 92, 0.05)' : 'var(--bg-alt)',
              }}
            >
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                gap: 16,
              }}>
                <h3 style={{
                  fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.25rem',
                  color: 'var(--primary)', textTransform: 'uppercase', margin: 0,
                  lineHeight: 1.3,
                }}>
                  {faq.q}
                </h3>
                <div style={{
                  fontWeight: 700, fontSize: '1.5rem', color: 'var(--primary)',
                  transition: 'transform 0.3s',
                  transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)',
                }}>+</div>
              </div>
              {openIdx === i && (
                <p style={{
                  fontFamily: "'Geist', sans-serif", fontSize: '1.125rem',
                  color: 'var(--text)', marginTop: 16, marginBottom: 0,
                  lineHeight: 1.6,
                }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 80, padding: '48px', background: 'var(--primary)',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Geist', sans-serif", fontSize: '1.125rem',
            color: 'var(--surface-low)', margin: 0, lineHeight: 1.6,
          }}>
            💬 Have other questions? <strong>Let&apos;s chat.</strong> Book a 15-min call.
          </p>
        </div>
      </div>
    </section>
  );
}
