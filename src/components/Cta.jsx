import Reveal from './Reveal';
import { ArrowRight } from './Icons';
import { useI18n } from '../i18n';
import { noArrow } from '../utils';

export default function Cta({ onBook }) {
  const { t } = useI18n();
  return (
    <section id="cta" className="section--dark cta">
      <div className="container">
        <Reveal>
          <h2 className="h-display">
            {t('ctaH1a')}<br />
            <span className="accent">{t('ctaH1b')}</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="lead">{t('ctaSub')}</p>
        </Reveal>
        <Reveal delay={220}>
          <button className="btn btn--light btn--lg" onClick={onBook}>
            {noArrow(t('bookWeek'))}
            <ArrowRight />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
