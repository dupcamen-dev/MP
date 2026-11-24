import Logo from './Logo';
import LangSwitch from './LangSwitch';
import { useI18n } from '../i18n';
import { NAV, cap, scrollToId } from '../utils';

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo light onClick={(e) => { e.preventDefault(); scrollToId('top'); }} />
            <p className="footer-tagline">{t('ctaSub')}</p>
          </div>

          <div className="footer-col">
            <h3>{t('footerNav')}</h3>
            <ul>
              {NAV.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollToId(l.id); }}>{cap(t(l.key))}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>{t('footerContact')}</h3>
            <ul>
              <li><a href="mailto:hello@millionpixels.dev">hello@millionpixels.dev</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>{t('footerLang')}</h3>
            <LangSwitch dark />
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Millionpixels</span>
          <nav aria-label="Legal">
            <a href="#/privacy">{t('privacyLink')}</a>
            <a href="#/terms">{t('termsLink')}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
