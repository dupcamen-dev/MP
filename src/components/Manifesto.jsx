import { useEffect, useMemo, useRef } from 'react';
import { useI18n } from '../i18n';
import { prefersReducedMotion } from '../utils';

// Splits the manifesto into words; accent phrases keep their colour, trailing punctuation sticks to the previous word.
function buildLines(t) {
  const lines = [
    [{ text: t('mfL1') }],
    [{ text: t('mfL2a') }, { text: t('mfL2b'), accent: true }, { text: ',' }],
    [{ text: t('mfL3a') }, { text: t('mfL3b'), accent: true }, { text: '.' }],
  ];
  return lines.map((line) => {
    const words = [];
    for (const tok of line) {
      if (/^[,.]$/.test(tok.text) && words.length) {
        words[words.length - 1].text += tok.text;
        continue;
      }
      for (const w of tok.text.split(/\s+/).filter(Boolean)) words.push({ text: w, accent: !!tok.accent });
    }
    return words;
  });
}

export default function Manifesto() {
  const { t } = useI18n();
  const ref = useRef(null);
  const lines = useMemo(() => buildLines(t), [t]);

  // Words light up as the paragraph scrolls through the viewport. Classes are toggled directly
  // on the DOM so scrolling never re-renders React.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll('.w'));
    if (prefersReducedMotion()) {
      words.forEach((w) => w.classList.add('is-lit'));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.82 - rect.top) / (rect.height + vh * 0.25)));
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) window.addEventListener('scroll', onScroll, { passive: true });
      else window.removeEventListener('scroll', onScroll);
      update();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [lines]);

  return (
    <section id="manifesto" className="section manifesto">
      <div className="container">
        <p className="eyebrow">{t('manifestoLabel')}</p>
        <p className="manifesto-text" ref={ref}>
          {lines.map((words, li) => (
            <span key={li} style={{ display: 'block' }}>
              {words.map((w, wi) => (
                <span key={wi} className={`w${w.accent ? ' is-accent' : ''}`}>{w.text}{' '}</span>
              ))}
            </span>
          ))}
        </p>
        <div className="manifesto-sign">
          <span className="rule" />
          <span className="mono">millionpixels.dev</span>
        </div>
      </div>
    </section>
  );
}
