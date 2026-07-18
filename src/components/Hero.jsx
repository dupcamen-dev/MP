import { useEffect, useState } from 'react';
import { PrimaryButton, GhostButton } from './Button';

export default function Hero({ onBook }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const reveal = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(12px)',
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(80px, 12vh, 140px) clamp(24px, 8%, 140px)',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/hero-bg.png)',
      backgroundSize: 'cover', backgroundPosition: 'center',
      color: 'var(--cream)',
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', maxWidth: 900, width: '100%', margin: '0 auto',
      }}>
        <p style={{
          fontFamily: "'Geist Mono', monospace", fontSize: 12,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--cream)', opacity: 0.7, margin: '0 0 24px 0',
          ...reveal(0),
        }}>SHIPPED IN 7</p>

        <h1 style={{
          fontFamily: "'Anton', Impact, sans-serif",
          fontSize: 'clamp(3.5rem, 9vw, 8rem)', lineHeight: 0.88,
          textTransform: 'uppercase', color: 'var(--cream)',
          letterSpacing: '-0.02em', margin: '0 0 32px 0',
          ...reveal(0.08),
        }}>
          Idea to live<br />software.<br />
          <span style={{ color: 'var(--primary)' }}>Seven days.</span>
        </h1>

        <p style={{
          fontFamily: "'Geist', sans-serif", fontWeight: 300,
          fontSize: 'clamp(1.15rem, 2vw, 1.5rem)', lineHeight: 1.4,
          color: 'var(--cream)', opacity: 0.9, maxWidth: 600, margin: '0 0 40px 0',
          ...reveal(0.16),
        }}>
          Senior engineers who ship production-grade products in a week.
          Real code. Real users. Your repo — by day seven.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', ...reveal(0.24) }}>
          <PrimaryButton onClick={onBook} style={{ background: 'var(--cream)', color: 'var(--deep)' }}>
            Book a week →
          </PrimaryButton>
          <GhostButton href="#showcase" style={{ color: 'var(--cream)', borderColor: 'var(--cream)' }}>
            See the work
          </GhostButton>
        </div>
      </div>
    </section>
  );
}
