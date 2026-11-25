import Reveal from './Reveal';
import { ArrowRight } from './Icons';
import { useI18n } from '../i18n';
import { CONTACT, noArrow } from '../utils';
import { Roll, SplitWords } from './Motion';

export default function Cta({ onBook }) {
  const { t } = useI18n();
  return (
    <section id="cta" className="section--dark cta">
      <div className="container">
        <Reveal>
          <h2 className="h-display">
            <SplitWords parts={[{ text: t('ctaH1a'), br: true }, { text: t('ctaH1b'), className: 'accent' }]} />
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="lead">{t('ctaSub')}</p>
        </Reveal>
        <Reveal delay={220} className="cta-actions">
          <button className="btn btn--light btn--lg" onClick={onBook}>
            <Roll>{noArrow(t('bookWeek'))}</Roll>
            <ArrowRight />
          </button>
          <a className="btn btn--ghost-dark btn--lg" href={CONTACT.telegram} target="_blank" rel="noopener noreferrer">
            <Roll>{t('ctaTelegram')}</Roll>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
