'use strict';

/* File Stream */
var fs = require('fs');

/**
 * Загружает файл
 * @param   {string} url  ссылка на файл
 * @param   {string} save путь сохранения
 * 
 * @returns {object} promise
 */
exports.download = function(url,save){
	/* Возвращаем promise */
	return new this.promise((resolve,reject) => {
		this.request.get(url)
		.pipe(fs.createWriteStream(save))
		.on('finish',() => {
			/* Возвращает путь */
			resolve(save);
		})
		.on('error',(error) => {
			/* Проверяем если ошибка отправки */
			if (error.name === 'RequestError' || error.name === 'StatusCodeError') {
				/* Отправляем заново */
				this.download(url,save)
				.then(resolve)
				.catch(reject);
			} else {
				/* Возвращаем ошибку */
				reject(error);
			}
		});
	});
};