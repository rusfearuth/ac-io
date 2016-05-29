'use strict';

/* File Stream */
var fs = require('fs');

/**
 * Загружает файл
 *
 * @param   {string} url  ссылка на файл
 * @param   {string} save путь сохранения
 *
 * @returns {object} promise
 */
exports.download = function(url,save){
	return new this.promise((resolve,reject) => {
		this.request.get(url)
		.pipe(fs.createWriteStream(save))
		.on('finish',() => {
			resolve(save);
		})
		.on('error',(error) => {
			if (error.code === 'ETIMEDOUT') {
				this.download(url,save)
				.then(resolve)
				.catch(reject);
			} else {
				reject(error);
			}
		});
	});
};
