# KFS — Klimes Filip Services · сайт

Лендинг-визитка компании по аренде машин для водителей VTC и такси (Париж).
Язык сайта — французский. Общение с владельцем — по-русски.

## Стек
Статический сайт без сборки: `index.html` + `css/style.css` + `js/fleet.js` + `js/main.js`.
Никаких фреймворков и npm. Открывается двойным кликом по `index.html` или любым статическим сервером
(`python3 -m http.server 8000`).

## Где что править
- **Машины, цены, фото, контакты** → `js/fleet.js` (единственный источник данных).
  Цена за день и месяц считается автоматически: день = ceil(неделя / 7), месяц = round(неделя × 52 / 12).
  Минимальная цена «dès … / semaine» в hero и плашке берётся автоматически из автопарка.
- **Тексты** → `index.html`.
- **Стили** → `css/style.css`. Брейкпоинты: ≤1000px (планшет), ≤640px (мобайл).
- **Фото машин** → `img/cars/*.webp` (квадрат 1024×1024).

## Дизайн
- Палитра: кремовый `#F5EFE1`, чёрный `#15130F`, жёлтый `#FFC700` (+ `#EDE4CF`, `#FBF7EC`).
- Шрифты (Google Fonts): Archivo (широкий, 850) — заголовки; Instrument Sans — текст; IBM Plex Mono — подписи.
- Фирменные элементы: шашечная полоса (`.chk`), логотип-«фонарь такси» `.logo`, наклейка-цена `.sticker`.
- Не копировать стиль DRIVIO (тёмная тема, лаймовый #D4FF3A) — сайты не должны быть похожи.

## Структура страницы
1. Header (лого, меню, телефон, WhatsApp)
2. Hero: «Prenez le volant. On s’occupe du reste.» + кнопки «Voir la flotte», WhatsApp, Appeler
3. Плашка преимуществ: 0 € caution · dès X €/semaine · 24/7
4. «Comment ça marche»: 3 шага + документы (ID/passeport, carte VTC, permis)
5. Автопарк: фильтры по типу, карточки, модалка (фото, цены неделя/день/месяц, 4 поля: Consommation, Autonomie, Énergie, Usage), стрелки ←/→, свайп, Esc
6. Footer: контакты, адрес, Mentions légales (модалка)

KFS занимается **только арендой** — блоков про набор водителей, кооператив и выкуп нет и не должно быть.

## Данные компании (Pappers)
KLIMES FILIP SERVICES, SASU, capital 100 €, 10 boulevard Sérurier, 75019 Paris.
SIREN 934 572 041 · SIRET 934 572 041 00010 · RCS Paris · TVA FR05934572041 · Président : Filip Klimes.
Тел./WhatsApp: +33 7 59 60 25 60 · e-mail: k.filipservices@gmail.com

## Публикация
GitHub Pages, репозиторий `1classe-bit/kfs-site` (отдельный аккаунт GitHub для KFS, не личный `dkxr512-oss`).
Домен `kfs-vtc.fr` (GoDaddy) — файл `CNAME` в корне, DNS-записи в README.md. Выкатить = `git push` в `main`.
В gh подключены оба аккаунта; remote указан с логином `1classe-bit@`, поэтому push идёт от нужного аккаунта
независимо от того, какой активен в gh.

## Открытые вопросы
- [ ] Новая картинка для hero (сейчас временно `img/cars/tesla-model-y.webp`).
