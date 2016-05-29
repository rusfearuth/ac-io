'use strict';

var fs = require('fs');

/**
 * Отправляет файл на загрузку
 *
 * @param   {string} path  путь до файла
 * @param   {object} qs    дополнительне параметры
 *
 * @returns {object} promise
 */
exports.file = function(path,qs){
	return new this.promise((resolve,reject) => {
		qs = qs || {};

		qs.method = 'post';
		qs.key = this.settings.key;

		this.request({
			uri: this.settings.url+'/in.php',
			method: 'POST',
			timeout: 8000,
			qs: qs,
			formData: {
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
			if (error.code === 'ETIMEDOUT') {
				this.file(path,qs)
				.then(resolve)
				.catch(reject);
			} else {
				reject(error);
			}
		});
	});
};
