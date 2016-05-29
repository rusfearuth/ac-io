'use strict';

/**
 * Получает баланс аккаунта пользователя
 *
 * @returns object
 */
exports.balance = function(){
	return new this.promise((resolve,reject) => {
		this.request({
			uri: this.settings.url+'/res.php',
			method: 'GET',
			timeout: 5000,
			qs: {
				key: this.settings.key,
				action: 'getbalance'
			}
		})
		.then(resolve)
		.catch((error) => {
			if (error.code === 'ETIMEDOUT') {
				this.balance()
				.then(resolve)
				.catch(reject);
			} else {
				reject(error);
			}
		});
	});
};
