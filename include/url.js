'use strict';

/* File Stream */
var fs = require('fs');

/**
 * Загружает капчу через ссылку
 * @param   {string} url      url загрузки изображения
 * @param   {string} extesion расширение файла
 * @param   {object} qs       дополнительные параметры
 * 
 * @returns {object} promise
 */
exports.url = function(url,extesion,qs){
	/* Возвращаем promise */
	return new this.promise((resolve,reject) => {
		/* Если расширение не указано */
		extesion = extesion || 'png';

		/* Путь загрузки */
		var path = this.settings.dir+Date.now()+'_captha.'+extesion;

		/* Загружаем изображение */
		this.download(url,path)
		.then((file) => {
			return this.file(file,qs);
		})
		.then((code) => {
			/* Удаляем файл */
			fs.unlink(path);

			/* Возвращаем код */
			resolve(code);
		})
		.catch(reject);
	});
};