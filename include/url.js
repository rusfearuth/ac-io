'use strict';

/* File Stream */
var fs = require('fs');

/**
 * Загружает капчу через ссылку
 *
 * @param   {string} url      url загрузки изображения
 * @param   {string} extesion расширение файла
 * @param   {object} qs       дополнительные параметры
 *
 * @returns {object} promise
 */
exports.url = function(url,extesion,qs){
	return new this.promise((resolve,reject) => {
		extesion = extesion || 'png';

		var path = this.settings.dir+Date.now()+'_captha.'+extesion;

		this.download(url,path)
		.then((file) => {
			return this.file(file,qs);
		})
		.then((code) => {
			fs.unlink(path);

			resolve(code);
		})
		.catch(reject);
	});
};
