'use strict';

/**
 * Отправляет жалобу на неправильную капчу
 *
 * @param   {number} id идентификатор капчи
 *
 * @returns {object} promise
 */
exports.report = function(id){
	return new this.promise((resolve,reject) => {
		this.request({
			uri: this.settings.url+'/res.php',
			method: 'POST',
			timeout: 5000,
			qs: {
				id: id,
				action: 'reportbad',
				key: this.settings.key
			}
		})
		.then(resolve)
		.catch((error) => {
			if (error.code === 'ETIMEDOUT') {
				this.report(id)
				.then(resolve)
				.catch(reject);
			} else {
				reject(error);
			}
		});
	});
};
