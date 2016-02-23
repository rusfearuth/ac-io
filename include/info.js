'use strict';

/**
 * Получает детальную информацию о капчи по id
 * @param   {number} id идентификатор капчи
 * 
 * @returns {object} promise
 */
exports.info = function(id){
	/* Возвращаем promise */
	return new this.promise((resolve,reject) => {
		this.request({
			/* URL репорта капчи */
			uri: this.settings.url+'/api/tools/getCaptchaInfo',
			/* Метод отправки */
			method: 'GET',
			/* Время ожидания */
			timeout: 5000,
			/* Декодировать json */
			json: true,
			/* Параметры */
			qs: {
				/* ID капчи */
				id: id,
				/* Ключ доступа */
				key: this.settings.key
			}
		})
		.then(resolve)
		.catch((error) => {
			/* Проверяем если ошибка отправки */
			if (error.name === 'RequestError' || error.name === 'StatusCodeError') {
				/* Повторяем попытку */
				this.info(id)
				.then(resolve)
				.catch(reject);
			} else {
				/* Возвращаем ошибку */
				reject(error);
			}
		});
	});
};