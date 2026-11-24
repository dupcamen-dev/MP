# Code review — millionpixels.dev

Дата ревю: 2026-11-24. Стан: коміт `3c35368` (master).
Порядок роботи: спершу редизайн (див. окремий коміт), потім — виправлення пунктів нижче.

Позначки: `[ ]` — не виправлено, `[x]` — виправлено.

## Стек

| Шар | Що використовується |
|---|---|
| Фронтенд | React 19 + Vite 8, JS без TypeScript, SPA |
| Стилі | inline `style={{…}}` + `src/App.css` |
| Роутинг | hash-роути (`#/admin`, `#/privacy`) + шляхи `/uk`, `/pl` через rewrite у `vercel.json` |
| i18n | власний контекст `src/i18n/index.jsx`, EN/UK/PL |
| Бекенд | одна serverless-функція `api/send-order.js` → Telegram Bot API |
| Авторизація | Google Identity Services, тільки на клієнті |
| Хостинг | Vercel + Analytics + Speed Insights |
| Якість | немає тестів, лінтера, CI |

---

## 🔴 Критичне

- [ ] **1. Заявки губляться мовчки.** `api/send-order.js` надсилає текст клієнта з `parse_mode: 'Markdown'`. Один символ `_` або `*` у контакті (напр. `@ivan_petrenko`) → Telegram повертає 400 «can't parse entities» → API віддає 500 → фолбек у `OrderModal.jsx` бере бот-конфіг з `localStorage` (у відвідувача порожній) → нічого не відправлено, але користувач бачить «Успіх».
  **Фікс:** прибрати `parse_mode` або екранувати ввід (чи перейти на `HTML` + escape `<>&`); прибрати клієнтський фолбек; показувати помилку, якщо `/api/send-order` не повернув `ok`.

- [ ] **2. Адмінка без реальної авторизації.** `src/hooks/useAuth.js` лише декодує JWT від Google без перевірки підпису і кладе користувача в `localStorage`. Будь-хто може вручну записати `localStorage.mp_user` з потрібним email і відкрити `#/admin`.
  **Фікс:** перевіряти Google ID token на сервері (serverless-функція, `google-auth-library` або tokeninfo), видавати httpOnly-cookie сесії; всі адмін-дані — тільки через API з перевіркою сесії.

- [ ] **3. Адмінка не бачить замовлень.** Замовлення пишуться в `localStorage` браузера відправника (`OrderModal.jsx` → `saveOrder`). Адмін бачить лише свої тестові заявки. Бот-токен вводиться в браузері і використовується з клієнта (`AdminPanel.jsx` → `handleTestBot`, `OrderModal.jsx` фолбек).
  **Фікс:** зберігати заявки на сервері (Vercel KV / Postgres / Supabase), адмінка читає їх через захищений API. Прибрати вкладки «Bot Config» і «Google Auth» з клієнта — це env-змінні.

- [ ] **4. Особистий email адміна в публічному бандлі** — `src/App.jsx` (перевірка доступу) і `src/hooks/useAuth.js` (`ALLOWED_EMAILS`). Перенести в env на сервері.

## 🟠 SEO

- [ ] **5. `/uk` і `/pl` — дублікати головної.** Rewrite віддає один `index.html` з `canonical="https://millionpixels.dev/"`, `<html lang="en">`, англійськими title/description/OG. Google не індексуватиме мовні версії, hreflang не працює.
  **Фікс:** пререндер/SSG на кожну мову (напр. `vite-plugin-prerender`, або генерація `dist/uk/index.html`, `dist/pl/index.html` у build-скрипті) зі своїм `lang`, `canonical`, title, description, `og:locale`. На клієнті також оновлювати `document.documentElement.lang`.

- [ ] **6. Hash-URL у sitemap та robots.** `sitemap.xml` містить `/#/privacy`, `/#/terms`; `robots.txt` — `Disallow: /#/login`, `/#/admin`. Все після `#` Google ігнорує. Перевести privacy/terms на шляхи `/privacy`, `/terms` (rewrite вже є), адмінку — `noindex` meta.

- [ ] **7. Миготіння мови.** `I18nProvider` стартує з `'en'` і перемикає локаль у `useEffect` → на `/uk` на мить видно англійський. Обчислювати локаль в ініціалізаторі `useState(detectLocale)`.

- [ ] **7a.** У `sitemap.xml` для `/uk` і `/pl` відсутній `x-default` hreflang; `lastmod` застарів.

## 🟡 Продуктивність

- [x] **8. Сплеш-екран штучно тримає сайт ~2.5 с.** ✅ Редизайн: сплеш ~1 с, показується раз за сесію (`sessionStorage`), сайт рендериться під ним одразу (раніше був `opacity: 0`). Варто ще поміряти LCP на проді — можливо, прибрати сплеш зовсім.
- [ ] **9. Важкі картинки:** `raqt-hero.png` 3.7 MB, `zhyto-hero.png` 1.5 MB, `nouri-hero.png` — конвертувати у WebP/AVIF з потрібною шириною, додати `width`/`height`. Не використовуються: `public/zhyto.png`, `public/reviews-bg.jpg` — видалити.
- [x] **10. Canvas у Hero.** ✅ Редизайн: rAF працює лише поки є підсвічені клітинки, пауза поза екраном, DPR, коректний resize, `prefers-reduced-motion`. Code rain прибрано.
- [x] **11. Ререндер усього сайту на скрол.** ✅ Редизайн: `useScrollProgress`/горизонтальний скрол видалено; маніфест перемикає класи напряму в DOM без state. Було: `useScrollProgress` у `Site` → `setProgress` на кожен кадр → ререндер Hero, Process, PriceList (737 рядків) тощо. Винести стан скролу нижче по дереву / `memo` / CSS-змінна замість state.
- [ ] **12. Google Sign-In скрипт** (`accounts.google.com/gsi/client`) вантажиться для всіх у `index.html`, хоча потрібен лише на `/login`. Підвантажувати динамічно на сторінці логіну.

## 🔵 Інше

- [~] **13. Доступність:** частково ✅ у редизайні — модалка (Escape, focus trap, `role=dialog`, `htmlFor`, `aria-label` на ✕), меню (Escape, scroll lock), FAQ/прайс — `aria-expanded`, таби зі стрілками. Лишилось: перевірити адмінку й логін. Було: модалка й меню не закриваються по `Escape`, немає focus-trap, `label` без `htmlFor`, у формі замовлення немає `role="dialog"`/`aria-modal`, кнопка «✕» без `aria-label`.
- [ ] **14. Cookie-банер** — лише «Accept», без «Decline»; для EU/PL аудиторії недостатньо. Vercel Analytics cookieless — можливо, банер не потрібен зовсім; якщо лишати — додати відмову і реально гейтити аналітику.
- [ ] **15. API без захисту від спаму:** немає валідації довжини `project`/`contact`, rate-limit, honeypot. `req.body` може бути `undefined` → 500.
- [ ] **16. `npm audit`:** 5 high у Vite (dev-server only) → `npm audit fix`.
- [ ] **17. `.gitignore`:** дивний запис `tor-browser-windows-x86_64-portable-15.0.14.exe`, відсутній `.env*`.
- [x] **18. Опечатка** ✅ «Artisian» у `ShowcaseSlide.jsx` (ZHYTO).
- [ ] **19. Нема тестів, лінтера (ESLint), CI.** Мінімум — ESLint + `vite build` у GitHub Actions.
