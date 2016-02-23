'use strict';

/**
 * Отправляет жалобу на неправильную капчу
 * @param   {number} id идентификатор капчи
 * 
 * @returns {object} promise
 */
exports.report = function(id){
	/* Возвращаем promise */
	return new this.promise((resolve,reject) => {
		/* Отправляем репорт на капчу */
		this.request({
			/* URL репорта капчи */
			uri: this.settings.url+'/res.php',
			/* Метод отправки */
			method: 'POST',
			/* Время ожидания */
			timeout: 5000,
			/* Параметры */
			qs: {
				/* ID капчи */
				id: id,
				/* Тип действия */
				action: 'reportbad',
				/* Ключ доступа */
				key: this.settings.key
			}
		})
		.then(resolve)
		.catch((error) => {
			/* Проверяем если ошибка отправки */
			if (error.name === 'RequestError' || error.name === 'StatusCodeError') {
				/* Повторяем попытку */
				this.report(id)
				.then(resolve)
				.catch(reject);
			} else {
				/* Возвращаем ошибку */
				reject(error);
			}
		});
	});
};