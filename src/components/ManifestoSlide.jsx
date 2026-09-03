import { useEffect, useMemo, useRef, useState } from 'react';
import { useMobile } from '../hooks/useMobile';
import { useI18n } from '../i18n';

const TYPE_START = 0.68;
const TYPE_LEN = 0.12;
const HOLD_START = 0.80;

function buildWords(t) {
  const LINES = [
    [{ t: t('mfL1'), c: 'var(--ink)' }],
    [
      { t: t('mfL2a'), c: 'var(--ink)' },
      { t: t('mfL2b'), c: '#3d4a5c' },
      { t: ',', c: 'var(--ink)' },
    ],
    [
      { t: t('mfL3a'), c: 'var(--ink)' },
      { t: t('mfL3b'), c: '#3d4a5c' },
      { t: '.', c: 'var(--ink)' },
    ],
  ];
  const WORDS = LINES.map((line) =>
    line.flatMap((tok) => (tok.t.match(/\S+/g) || []).map((p) => ({ text: p, color: tok.c })))
  );
  const TOTAL = WORDS.reduce((n, l) => n + l.length, 0);
  return { WORDS, TOTAL };
}

export default function ManifestoSlide({ progress }) {
  const sectionRef = useRef(null);
  const startedRef = useRef(false);
  const mobile = useMobile();
  const { t } = useI18n();
  const [bgVisible, setBgVisible] = useState(false);
  const [mWords, setMWords] = useState(0);
  const { WORDS, TOTAL } = useMemo(() => buildWords(t), [t]);

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
    return (
      <span style={{ display: 'block' }}>
        {line.map((w, k) => {
          const idx = i++;
          const on = idx < visibleWords;
          return (
            <span
              key={k}
              className="mf-word"
              style={{
                display: 'inline-block',
                color: w.color,
                marginRight: '0.32em',
                opacity: on ? 1 : 0,
                transform: on ? 'none' : 'translateY(14px)',
                transition: 'opacity 0.22s ease, transform 0.22s ease',
              }}
            >{w.text}</span>
          );
        })}
      </span>
    );
  };

  const line = (
    <div className={`mf-wrap${done ? ' mf-done' : ''}`} style={{
      width: '100%', maxWidth: 1240, textAlign: 'left', position: 'relative', zIndex: 2,
    }}>
      <h2 style={{
        fontFamily: "'Anton', Impact, sans-serif",
        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
        lineHeight: 0.95, textTransform: 'uppercase',
        color: 'var(--ink)', margin: 0, letterSpacing: '0.005em',
      }}>
        {WORDS.map((l, i) => {
          const startIdx = WORDS.slice(0, i).reduce((n, x) => n + x.length, 0);
          return <span key={i}>{renderLine(l, startIdx, i === WORDS.length - 1)}</span>;
        })}
      </h2>

      {!mobile && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: -48,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 14,
          fontFamily: "'Inter', monospace", fontSize: 11,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(26, 26, 26, 0.5)',
          opacity: holdP, transition: 'opacity 0.3s ease',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ color: done ? 'var(--ink)' : 'rgba(26,26,26,0.5)' }}>
            {done ? t('manifestoCompiled') : t('manifestoCompiling')}
          </span>
          <span style={{ color: done ? 'var(--ink)' : 'rgba(26,26,26,0.5)' }}>
            {done ? t('manifestoShipped') : `${Math.round(holdP * 100)}%`}
          </span>
        </div>
      )}
    </div>
  );

  if (mobile) {
    return (
      <>
        <div aria-hidden="true" className="mf-bg" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
          backgroundImage: 'linear-gradient(rgba(253,253,253,0.72), rgba(253,253,253,0.72)), url(/manifesto-bg.webp)',
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
    <section className="slide manifesto-slide mf-bg" id="manifesto" style={{
      width: '100vw', flex: '0 0 100vw', height: '100vh',
      backgroundImage: 'linear-gradient(rgba(253,253,253,0.72), rgba(253,253,253,0.72)), url(/manifesto-bg.webp)',
      backgroundSize: 'cover', backgroundPosition: 'center',
      overflow: 'hidden', position: 'relative',
      display: 'flex', alignItems: 'center',
      paddingLeft: 'clamp(24px, 5%, 80px)', paddingRight: 'clamp(24px, 5%, 80px)',
    }}>
      {line}
    </section>
  );
}
