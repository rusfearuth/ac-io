'use strict';

/**
 * Отправка base64 изображения
 *
 * @param   {string} hash хэш изображения
 * @param   {object} qs   дополнительные параметры
 *
 * @returns {object} promise
 */
exports.base64 = function(hash,qs){
	return new this.promise((resolve,reject) => {
		qs = qs || {};

		qs.method = 'base64';
		qs.key = this.settings.key;

		this.request({
			uri: this.settings.url+'/in.php',
			method: 'POST',
			timeout: 8000,
			qs: qs,
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
			if (error.code === 'ETIMEDOUT') {
				this.base64(hash,qs)
				.then(resolve)
				.catch(reject);
			} else {
				reject(error);
			}
		});
	});
};
