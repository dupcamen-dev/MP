import { useEffect, useRef, useState } from 'react';
import { useMobile, useTablet } from '../hooks/useMobile';

const highlightWords = 'Vibe coding is the raw translation of thought to reality.'.split(' ');

export default function ManifestoSlide({ progress }) {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const mobile = useMobile();
  const tablet = useTablet();
  const [scrollProgress, setScrollProgress] = useState(0);

  const hlPct = mobile
    ? Math.min(100, Math.max(0, scrollProgress * 100))
    : Math.min(100, Math.max(0, ((progress - 0.78) / 0.16) * 100));

  useEffect(() => {
    if (!mobile) return;
    const container = containerRef.current;
    if (!container) return;

    function update() {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const containerHeight = container.offsetHeight;
      const scrollableDistance = containerHeight - vh;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / scrollableDistance));
      setScrollProgress(p);
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [mobile]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('active'); observer.unobserve(el); }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const wordsRevealed = Math.min(highlightWords.length, Math.floor((hlPct / 100) * highlightWords.length));
  const isComplete = hlPct >= 99;
  const textRevealed = hlPct > 5;

  const renderHighlightedText = () => (
    <span style={{ position: 'relative', display: 'inline' }}>
      {highlightWords.map((word, i) => {
        const isRevealed = i < wordsRevealed;
        const isCurrentWord = i === wordsRevealed - 1;
        return (
          <span key={i} style={{
            display: 'inline-block',
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed ? 'translateY(0)' : 'translateY(8px)',
            transition: `opacity 0.3s ease ${i * 0.04}s, transform 0.3s ease ${i * 0.04}s`,
            marginRight: 5,
            background: isRevealed
              ? `linear-gradient(90deg, var(--primary) ${isCurrentWord ? '0%' : '100%'}, var(--primary) ${isCurrentWord ? '0%' : '100%'}%, transparent ${isCurrentWord ? '0%' : '100%'})`
              : 'none',
            padding: '2px 4px',
            color: isRevealed ? 'var(--text)' : 'transparent',
            fontWeight: isRevealed ? 700 : 400,
          }}>
            {word}
          </span>
        );
      })}
      {!isComplete && (
        <span style={{
          display: 'inline-block',
          width: 2, height: '1.1em', background: 'var(--primary)',
          marginLeft: 2, verticalAlign: 'text-bottom',
          animation: 'blink 0.6s step-end infinite',
        }} />
      )}
    </span>
  );

  const renderGradientText = () => (
    <span style={{
      background: `linear-gradient(90deg, var(--primary) ${hlPct}%, rgba(255,255,255,0.15) ${hlPct}%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      padding: '2px 8px',
      willChange: 'background',
    }}>
      Vibe coding is the raw translation of thought to reality.
    </span>
  );

  const mobileSection = (
    <>
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
        background: 'rgba(255,211,0,0.08)',
        transform: 'skew(12deg) translateX(25%)', pointerEvents: 'none',
      }} />
      <div ref={ref} className="card-in" style={{ maxWidth: 900, width: '100%', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h2 style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2.5rem,8vw,4rem)',
          color: 'var(--text)', marginBottom: 32, lineHeight: 0.9,
        }}>
          SPEED IS A <span style={{ color: 'var(--secondary)' }}>FEATURE.</span>
        </h2>
        <p style={{
          fontFamily: "'Geist', sans-serif", fontSize: 'clamp(0.95rem,3.5vw,1.5rem)',
          lineHeight: 1.7, color: 'var(--text)', textTransform: 'uppercase',
          letterSpacing: '0.05em', textAlign: 'center',
        }}>
          We reject the bureaucracy of modern software development. No endless meetings.
          No pixel-pushing committees. We code on instinct. We build for impact.{' '}
          {renderGradientText()}{' '}
          Slash the rules. Grind the raw.
        </p>
      </div>
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 6, opacity: mobile ? (scrollProgress < 0.9 ? 0.4 : 0) : 0.4,
        transition: 'opacity 0.3s', pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
          letterSpacing: '0.1em', color: 'var(--text)', textTransform: 'uppercase',
        }}>SCROLL TO EXPLORE</span>
        <div style={{
          width: 20, height: 32, border: '2px solid var(--text)', borderRadius: 10,
          position: 'relative', opacity: 0.4,
        }}>
          <div style={{
            position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
            width: 2, height: 8, background: 'var(--text)',
            animation: 'scroll-wheel-alt 2s ease-in-out infinite alternate',
          }} />
        </div>
      </div>
    </>
  );

  if (mobile) {
    return (
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '200vh',
          zIndex: 1,
        }}
      >
        <section
          className="slide manifesto-slide"
          id="manifesto"
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            height: '100dvh',
            background: 'var(--surface-low)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: tablet ? '80px 40px' : '60px 24px',
          }}
        >
          {mobileSection}
        </section>
      </div>
    );
  }

  return (
    <section className="slide manifesto-slide" id="manifesto" style={{
      width: '100vw', flex: '0 0 100vw', height: '100vh',
      background: 'var(--surface-low)', overflow: 'hidden', position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '0 64px',
    }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
        background: 'rgba(255,211,0,0.08)',
        transform: 'skew(12deg) translateX(25%)', pointerEvents: 'none',
      }} />
      <div ref={ref} className="card-in" style={{ maxWidth: 900, width: '100%', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h2 style={{
          fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)',
          color: 'var(--text)', marginBottom: 32, lineHeight: 0.9,
        }}>
          SPEED IS A <span style={{ color: 'var(--secondary)' }}>FEATURE.</span>
        </h2>
        <p style={{
          fontFamily: "'Geist', sans-serif", fontSize: 'clamp(1.1rem,2vw,1.5rem)',
          lineHeight: 1.7, color: 'var(--text)', textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          We reject the bureaucracy of modern software development. No endless meetings.
          No pixel-pushing committees. We code on instinct. We build for impact.{' '}
          {renderHighlightedText()}{' '}
          <span style={{
            display: 'inline-block',
            opacity: textRevealed ? 1 : 0,
            transition: 'opacity 0.5s ease 0.8s',
          }}>Slash the rules. Grind the raw.</span>
        </p>
      </div>
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 6, opacity: isComplete ? 0 : 0.4, pointerEvents: 'none',
        transition: 'opacity 0.5s ease',
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
          letterSpacing: '0.1em', color: 'var(--text)', textTransform: 'uppercase',
        }}>SCROLL TO EXPLORE</span>
        <div style={{
          width: 20, height: 32, border: '2px solid var(--text)', borderRadius: 10,
          position: 'relative', opacity: 0.4,
        }}>
          <div style={{
            position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
            width: 2, height: 8, background: 'var(--text)',
            animation: 'scroll-wheel-alt 2s ease-in-out infinite alternate',
          }} />
        </div>
      </div>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}