import { useI18n, LOCALES } from '../i18n';

const LABEL = { en: 'EN', uk: 'UA', pl: 'PL' };
const NAME = { en: 'English', uk: 'Українська', pl: 'Polski' };

export default function LangSwitch({ dark = false }) {
  const { locale, setLanguage } = useI18n();
  return (
    <div className={`lang${dark ? ' lang--dark' : ''}`} role="group" aria-label="Language">
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={l === locale}
          aria-label={NAME[l]}
          onClick={() => setLanguage(l)}
        >{LABEL[l]}</button>
      ))}
    </div>
  );
}
