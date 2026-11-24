import Reveal from './Reveal';
import { Quote } from './Icons';
import { useI18n } from '../i18n';
import { cap } from '../utils';
import { SplitWords } from './Motion';

export default function Reviews() {
  const { t } = useI18n();
  const reviews = [
    { text: t('reviewText0'), author: 'Zhyto', role: t('reviewRole0') },
    { text: t('reviewText1'), author: 'Raqt Fuel', role: t('reviewRole1') },
    { text: t('reviewText2'), author: 'Mebli Chortkiv', role: t('reviewRole2') },
    { text: t('reviewText3'), author: 'TopStatus', role: t('reviewRole3') },
  ];
  const words = t('headWords') || [];

  return (
    <section id="reviews" className="section section--tint">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">{cap(t('foundersSay'))}</p>
            <h2 className="h-section">
              <SplitWords parts={words.map((w, i) => ({ text: w, className: i === words.length - 1 ? 'accent serif' : undefined }))} />
            </h2>
          </div>
        </Reveal>

        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <Reveal as="figure" key={r.author} delay={(i % 2) * 100} className="review spot">
              <Quote />
              <blockquote>{r.text}</blockquote>
              <figcaption>
                <span className="avatar" aria-hidden="true">{r.author.charAt(0)}</span>
                <span>
                  <span className="review-author" style={{ display: 'block' }}>{r.author}</span>
                  <span className="review-role">{r.role}</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
