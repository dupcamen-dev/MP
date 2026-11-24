import { useId, useState } from 'react';
import Reveal from './Reveal';
import { useI18n } from '../i18n';
import { cap } from '../utils';
import { SplitWords } from './Motion';

export default function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState(0);
  const uid = useId();
  const items = [0, 1, 2, 3, 4].map((i) => ({ q: t(`faqQ${i}`), a: t(`faqA${i}`) }));

  return (
    <section id="faq" className="section section--tint">
      <div className="container faq-grid">
        <Reveal>
          <p className="eyebrow">{cap(t('faqQuestionsLabel'))}</p>
          <h2 className="h-section"><SplitWords parts={[{ text: t('faqH') }]} /></h2>
        </Reveal>

        <Reveal className="faq-list" delay={100}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div className="faq-item" key={i}>
                <h3>
                  <button
                    className="faq-q"
                    id={`${uid}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-a${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {it.q}
                    <span className="plus" aria-hidden="true" />
                  </button>
                </h3>
                <div className={`collapse${isOpen ? ' is-open' : ''}`} id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`}>
                  <div><p className="faq-a">{it.a}</p></div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
