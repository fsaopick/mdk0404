# MyProj Guestbook

Собственное приложение в Docker из 4 компонентов:

- `frontend` - форма для ввода имени и сообщения
- `api` - сервер на Express
- `mysql` - база данных MySQL
- `adminer` - просмотр базы через браузер

## Что делает приложение

Пользователь открывает сайт, вводит свое имя и сообщение, нажимает кнопку отправки и запись сохраняется в базе данных. Ниже на странице отображается список всех сообщений.

## Запуск

```bash
cd /Users/andrey/Desktop/time-app-praktika/myproj
docker compose up --build -d
```

После запуска:

- сайт: `http://localhost:8090`
- API: `http://localhost:5560`
- Adminer: `http://localhost:8091`
- MySQL: порт `3310`

## Проверка

1. Открыть `http://localhost:8090`
2. Ввести имя и сообщение
3. Нажать кнопку отправки
4. Убедиться, что сообщение появилось в списке
5. Открыть `http://localhost:8091`
6. Войти в Adminer:
   - система: `MySQL`
   - сервер: `mysql`
   - пользователь: `root`
   - пароль: `password`
   - база: `guestbook_db`
7. Проверить таблицу `messages`

## Полезные команды

```bash
docker compose ps
docker compose logs -f
docker compose down
```
