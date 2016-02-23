'use strict';

/**
 * Получает баланс аккаунта пользователя
 * 
 * @returns {object} promise
 */
exports.balance = function(){
	/* Возвращаем promise */
	return new this.promise((resolve,reject) => {
		/* Запрашиваем баланс */
		this.request({
			/* URL получения баланса */
			uri: this.settings.url+'/res.php',
			/* Метод отправки */
			method: 'GET',
			/* Время ожидания */
			timeout: 5000,
			/* Параметры */
			qs: {
				/* Ключ доступа */
				key: this.settings.key,
				/* Тип действия */
				action: 'getbalance'
			}
		})
		.then(resolve)
		.catch((error) => {
			/* Проверяем если ошибка отправки */
			if (error.name === 'RequestError' || error.name === 'StatusCodeError') {
				/* Повторяем попытку */
				this.balance()
				.then(resolve)
				.catch(reject);
			} else {
				/* Возвращаем ошибку */
				reject(error);
			}
		});
	});
};