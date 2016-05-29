'use strict';

/**
 * Обрабатывает результат отправки капчи
 *
 * @param   {number} id идентификатор капчи
 *
 * @returns {object} promise
 */
exports.check = function(id){
	return new this.promise((resolve,reject) => {
		var check = () => {
			this.request({
				uri: this.settings.url+'/res.php',
				method: 'POST',
				timeout: 3000,
				qs: {
					id: id,
					action: 'get',
					key: this.settings.key
				}
			})
			.then((resp) => {
				var code = resp.split('|');

				if (code[0] === 'OK') {
					resolve({
						id: id,
						code: code[1]
					});
				} else {
					var error = {
						name: 'unknown.error',
						body: resp
					};

					switch (resp) {
						case 'ERROR_KEY_DOES_NOT_EXIST':
							error.name = 'key.not.exist';
							break;
						case 'ERROR_WRONG_ID_FORMAT':
							error.name = 'id.wrong';
							break;
						case 'ERROR_NO_SUCH_CAPCHA_ID':
							error.name = 'id.not.exist';
							break;
						case 'ERROR_CAPTCHA_UNSOLVABLE':
							error.name = 'worker.not.solved';
							break;
						case 'CAPCHA_NOT_READY':
							return setTimeout(check,500);
					}

					reject(error);
				}
			})
			.catch((error) => {
				if (error.code === 'ETIMEDOUT') {
					check();
				} else {
					reject(error);
				}
			});
		};

		check();
	});
};
