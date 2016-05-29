'use strict';

/**
 * Получает детальную информацию о капчи по id
 *
 * @param   {number} id идентификатор капчи
 *
 * @returns {object} promise
 */
exports.info = function(id){
	return new this.promise((resolve,reject) => {
		this.request({
			uri: this.settings.url+'/api/tools/getCaptchaInfo',
			method: 'GET',
			timeout: 5000,
			json: true,
			qs: {
				id: id,
				key: this.settings.key
			}
		})
		.then(resolve)
		.catch((error) => {
			if (error.code === 'ETIMEDOUT') {
				this.info(id)
				.then(resolve)
				.catch(reject);
			} else {
				reject(error);
			}
		});
	});
};
