import Reveal from './Reveal';
import { ArrowRight } from './Icons';
import { useI18n } from '../i18n';
import { cap, noArrow } from '../utils';
import { useInView } from '../hooks/useInView';
import { Roll, SplitWords } from './Motion';

const DAY_KIND = ['is-scope', 'is-build', 'is-build', 'is-build', 'is-build', 'is-build', 'is-ship'];
const PHASE_CLASS = ['phase--scope', 'phase--build', 'phase--ship'];

export default function Process({ onBook }) {
  const { t } = useI18n();
  const [timelineRef, timelineIn] = useInView({ threshold: 0.4 });
  const titles = t('phaseTitle') || [];
  const days = t('phaseDays') || [];
  const descs = t('phaseDesc') || [];
  const stack = (t('stackLine') || '').split('·').map((s) => s.trim()).filter(Boolean);
  const dayWord = (days[0] || 'Day 1').replace(/\s*\d+.*$/, '');

  return (
    <section id="process" className="section section--dark">
      <div className="container">
        <Reveal className="section-head section-head--split">
          <div>
            <p className="eyebrow">{cap(t('processLabel'))}</p>
            <h2 className="h-section">
              <SplitWords parts={[{ text: t('processH1a') }, { text: t('processH1b'), className: 'muted serif' }]} />
            </h2>
          </div>
          <p className="lead">{t('processSub')}</p>
        </Reveal>

        <div className="timeline" ref={timelineRef} data-in={timelineIn ? '' : undefined} aria-hidden="true">
          {DAY_KIND.map((kind, i) => (
            <div key={i} className={`timeline-day ${kind}`} style={{ '--i': i }}>
              <i />
              <span>
                {(i === 0 || i === 6) && <span className="tl-word">{dayWord} </span>}
                {i === 0 || i === 6 ? i + 1 : String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>

        <div className="phase-grid">
          {titles.map((title, i) => (
            <Reveal key={i} delay={i * 110}>
              <article className={`phase spot ${PHASE_CLASS[i]}`}>
                <div className="phase-top">
                  <span className="phase-num">0{i + 1}</span>
                  <span className="phase-days">{days[i]}</span>
                </div>
                <h3 className="h-card">{cap(title)}</h3>
                <p>{descs[i]}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="process-foot">
          <div className="stack">
            {stack.map((s) => <span key={s}>{s}</span>)}
          </div>
          <button className="btn btn--light" onClick={onBook}>
            <Roll>{noArrow(t('startWeek'))}</Roll>
            <ArrowRight />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
