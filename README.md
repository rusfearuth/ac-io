# ac-io
###Russian
Модуль для удобного управления anti-captcha.com

## npm зависимости
* bluebird
* request-promise

## Использование
Инициализация
```javascript
'use strict';

var ac = new (require('ac-io'));
```
Конфигурация
```javascript
ac.setting({
  key: 'Ключ anti-captcha, 32 символа',
  dir: 'Своя директория для скачивания капчи, можно не ставить',
  url: 'http://anti-captcha.com' // Если использовать другой сервис
});
```
Загрузка капчи по ссылке.
```javascript
ac.url('https://api.vk.com/captcha.php?sid=123456')
.then((captcha) => {
  // captcha.id - Id капчи
  // captcha.code - Код с капчи
})
```
Загрузка капчи в base64.
```javascript
ac.base64('...')
.then((captcha) => {
  // captcha.id - Id капчи
  // captcha.code - Код с капчи
})
```
Пожаловаться на капчу.
```javascript
ac.report(id)
.then(() => {
  // Жалоба отправлена
})
```
Получить баланс пользователя.
```javascript
ac.balance()
.then((balance) => {
  // Ваш баланс
})
```
