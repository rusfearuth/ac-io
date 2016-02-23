'use strict';

var fs = require('fs');

/**
 * Отправляет файл на загрузку
 * @param   {string} path  путь до файла
 * @param   {object} qs    дополнительне параметры
 * 
 * @returns {object} promise
 */
exports.file = function(path,qs){
	/* Возвращаем promise */
	return new this.promise((resolve,reject) => {
		/* Параметры */
		qs = qs || {};

		/* Метод загрузки */
		qs.method = 'post';
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
			formData: {
				/* Открываем стрим файла */
				file: fs.createReadStream(path)
			}
		})
		.then((resp) => {
			return this.upload(resp);
		})
		.then((id) => {
			return this.check(id);
		})
		.then(resolve)
		.catch((error) => {
			/* Проверяем если ошибка отправки */
			if (error.name === 'RequestError' || error.name === 'StatusCodeError') {
				/* Отправляем заново */
				this.file(path,qs)
				.then(resolve)
				.catch(reject);
			} else {
				/* Возвращаем ошибку */
				reject(error);
			}
		});
	});
};