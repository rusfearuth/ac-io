'use strict';

/**
 * Отправка base64 изображения
 * @param   {string} hash хэш изображения
 * @param   {object} qs   дополнительные параметры
 * 
 * @returns {object} promise
 */
exports.base64 = function(hash,qs){
	/* Возвращаем promise */
	return new this.promise((resolve,reject) => {
		/* Параметры */
		qs = qs || {};

		/* Метод загрузки */
		qs.method = 'base64';
		/* Ключ аккаунта, 32 символа */
		qs.key = this.settings.key;

		/* Отправка запроса */
		this.request({
			/* URL вызова */
			uri: this.settings.url+'/in.php',
			/* Метод отправки */
			method: 'POST',
			/* Максимальное ожидание */
			timeout: 8000,
			/* Параметры */
			qs: qs,
			/* Тело файла закодированное в base64.  */
			form: {
				body: hash
			}
		})
		.then((data) => {
			return this.upload(data);
		})
		.then((id) => {
			this.check(id);
		})
		.then(resolve)
		.catch((error) => {
			/* Проверяем если ошибка отправки */
			if (error.name === 'RequestError' || error.name === 'StatusCodeError') {
				/* Отправляем заново */
				this.base64(hash,qs)
				.then(resolve)
				.catch(reject);
			} else {
				/* Возвращаем ошибку */
				reject(error);
			}
		});
	});
};