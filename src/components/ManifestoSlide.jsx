import { useEffect, useRef, useState } from 'react';
import { useMobile } from '../hooks/useMobile';

const LINES = [
  [{ t: "We don't do meetings about meetings.", c: 'var(--sienna)' }],
  [
    { t: 'We make your website ', c: 'var(--sienna)' },
    { t: 'work', c: 'var(--cream)' },
    { t: ',', c: 'var(--sienna)' },
  ],
  [
    { t: 'found in Google, in ', c: 'var(--sienna)' },
    { t: 'seven days', c: 'var(--cream)' },
    { t: '.', c: 'var(--sienna)' },
  ],
];

const WORDS = LINES.map((line) =>
  line.flatMap((tok) => (tok.t.match(/\S+\s*/g) || []).map((p) => ({ text: p, color: tok.c })))
);
const TOTAL = WORDS.reduce((n, l) => n + l.length, 0);

const TYPE_START = 0.66;
const TYPE_LEN = 0.12;
const HOLD_START = 0.78;

export default function ManifestoSlide({ progress }) {
  const sectionRef = useRef(null);
  const startedRef = useRef(false);
  const mobile = useMobile();
  const [bgVisible, setBgVisible] = useState(false);
  const [mWords, setMWords] = useState(0);

  useEffect(() => {
    if (!mobile) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setBgVisible(entry.isIntersecting);
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true;
        let n = 0;
        const id = setInterval(() => {
          n += 1;
          setMWords(n);
          if (n >= TOTAL) clearInterval(id);
        }, 45);
      }
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [mobile]);

  const typeP = mobile
    ? TOTAL > 0 ? mWords / TOTAL : 1
    : Math.min(1, Math.max(0, (progress - TYPE_START) / TYPE_LEN));
  const visibleWords = mobile ? mWords : Math.round(typeP * TOTAL);
  const holdP = mobile
    ? 1
    : Math.min(1, Math.max(0, (progress - HOLD_START) / (1 - HOLD_START)));
  const done = visibleWords >= TOTAL;

  const renderLine = (line, startIdx, isLastLine) => {
    let i = startIdx;
    const caretVisible = done ? isLastLine : startIdx + line.length > visibleWords;
    return (
      <span style={{ display: 'block' }}>
        {line.map((w, k) => {
          const idx = i++;
          const on = idx < visibleWords;
          return (
            <span
              key={k}
              style={{
                display: 'inline-block',
                color: w.color,
                opacity: on ? 1 : 0,
                transform: on ? 'none' : 'translateY(14px)',
                transition: 'opacity 0.22s ease, transform 0.22s ease',
              }}
            >{w.text}</span>
          );
        })}
        {caretVisible && (
          <span
            className="manifesto-caret"
            style={{
              display: 'inline-block', width: '0.55ch', height: '0.95em',
              background: 'var(--primary)', verticalAlign: 'text-bottom',
              marginLeft: 2, animation: 'caret-blink 1s step-end infinite',
            }}
          />
        )}
      </span>
    );
  };

  const line = (
    <div style={{
      width: '100%', maxWidth: 1240, textAlign: 'left', position: 'relative', zIndex: 2,
    }}>
      <h2 style={{
        fontFamily: "'Anton', Impact, sans-serif",
        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
        lineHeight: 0.95, textTransform: 'uppercase',
        color: 'var(--cream)', margin: 0, letterSpacing: '0.005em',
      }}>
        {WORDS.map((l, i) => {
          const startIdx = WORDS.slice(0, i).reduce((n, x) => n + x.length, 0);
          return <span key={i}>{renderLine(l, startIdx, i === WORDS.length - 1)}</span>;
        })}
      </h2>

      {!mobile && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: -48,
          display: 'flex', alignItems: 'center', gap: 14,
          fontFamily: "'Geist Mono', monospace", fontSize: 11,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.5)',
          opacity: holdP, transition: 'opacity 0.3s ease',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ color: done ? 'var(--primary)' : 'rgba(255,255,255,0.5)' }}>
            {done ? '// MANIFESTO COMPILED ✓' : '// COMPILING'}
          </span>
          <span style={{ flex: 1, height: 1, background: 'rgba(255, 255, 255, 0.15)', position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', inset: 0, width: `${Math.round(holdP * 100)}%`, background: 'var(--primary)', transition: 'width 0.15s linear' }} />
          </span>
          <span style={{ color: done ? 'var(--primary)' : 'rgba(255,255,255,0.5)' }}>
            {done ? 'SHIPPED' : `${Math.round(holdP * 100)}%`}
          </span>
        </div>
      )}
    </div>
  );

  if (mobile) {
    return (
      <>
        <div aria-hidden="true" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/manifesto-bg.webp)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          zIndex: 0, opacity: bgVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }} />
        <section className="slide manifesto-slide" id="manifesto" ref={sectionRef} style={{
          width: '100%', minHeight: '80vh',
          overflow: 'hidden', position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'center',
          paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: 'clamp(80px, 12vh, 140px)',
          paddingLeft: 'clamp(24px, 5%, 80px)', paddingRight: 'clamp(24px, 5%, 80px)',
        }}>
          {line}
        </section>
      </>
    );
  }

  return (
    <section className="slide manifesto-slide" id="manifesto" style={{
      width: '100vw', flex: '0 0 100vw', height: '100vh',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/manifesto-bg.webp)',
      backgroundSize: 'cover', backgroundPosition: 'center',
      overflow: 'hidden', position: 'relative',
      display: 'flex', alignItems: 'center',
      paddingLeft: 'clamp(24px, 5%, 80px)', paddingRight: 'clamp(24px, 5%, 80px)',
    }}>
      {line}
    </section>
  );
}
