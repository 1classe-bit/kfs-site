# KFS — сайт

Статический сайт: можно открыть `index.html` в браузере, ничего устанавливать не нужно.

Локальный просмотр через сервер:

```bash
cd ~/Documents/kfs-site
python3 -m http.server 8000
# открыть http://localhost:8000
```

## Публикация

- Хостинг: GitHub Pages, репозиторий `1classe-bit/kfs-site` (ветка `main`, корень).
- Домен: `kfs-vtc.fr`, куплен на GoDaddy. Файл `CNAME` в корне привязывает его к Pages — не удалять.
- Обновить сайт = закоммитить и `git push` в `main`. Через 1–2 минуты изменения на сайте.

## DNS в GoDaddy (My Products → Domains → kfs-vtc.fr → DNS)

| Тип   | Имя   | Значение                 |
|-------|-------|--------------------------|
| A     | `@`   | `185.199.108.153`        |
| A     | `@`   | `185.199.109.153`        |
| A     | `@`   | `185.199.110.153`        |
| A     | `@`   | `185.199.111.153`        |
| CNAME | `www` | `1classe-bit.github.io`  |

Старые записи A для `@` (GoDaddy «Parked») и CNAME `www` → `@` удалить.
После обновления DNS: Settings → Pages репозитория → «Enforce HTTPS».
