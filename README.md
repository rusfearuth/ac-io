# ac-io
###Russian
Модуль для удобного управления anti-captcha.com

## npm зависимости
* bluebird
* merge-util
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
Загрузка капчи по ссылке
```javascript
ac.url('https://api.vk.com/captcha.php?sid=123456')
.then((captcha) => {
  // captcha.id - Id капчи
  // captcha.code - Код с капчи
})
```
Загрузка капчи в base64
```javascript
ac.base64('...')
.then((captcha) => {
  // captcha.id - Id капчи
  // captcha.code - Код с капчи
})
```
Пожаловаться на капчу
```javascript
ac.report(id)
.then(() => {
  // Жалоба отправлена
})
```
Получить баланс пользователя
```javascript
ac.balance()
.then((balance) => {
  // Ваш баланс
})
```
###English
Module for easy management anti-captcha.com

## npm depending
* bluebird
* request-promise

## Using
Initialization
```javascript
'use strict';

var ac = new (require('ac-io'));
```
Configuration
```javascript
ac.setting({
  key: 'Key anti-captcha, 32 characters',
  dir: 'Its directory for downloads captcha, you can not put',
  url: 'http://anti-captcha.com' // If you use another service
});
```
Loading captcha here.
```javascript
ac.url('https://api.vk.com/captcha.php?sid=123456')
.then((captcha) => {
  // captcha.id - Id captcha
  // captcha.code - Code with captcha
})
```
Loading captcha to base64
```javascript
ac.base64('...')
.then((captcha) => {
  // captcha.id - Id captcha
  // captcha.code - Code with captcha
})
```
Report captcha
```javascript
ac.report(id)
.then(() => {
  // Complaint submitted
})
```
Get the user's balance
```javascript
ac.balance()
.then((balance) => {
  // Your balance
})
```
