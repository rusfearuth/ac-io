'use strict';

/**
 * Обрабатывает данные отправки капчи
 * @param   {string} resp ответ сервера
 *                      
 * @returns {object} promise
 */
exports.upload = function(resp){
	/* Возвращаем promise */
	return new this.promise((resolve,reject) => {
		/* Получаем код капчи если есть */
		var id = resp.split('|');

		/* Проверяем код на существование */
		if (id[0] === 'OK') {
			/* Возвращаем код капчи */
			resolve(id[1]);
		} else {
			/* Объект для возвращения ошибки */
			var error = {
				/* Если нету определения */
				name: 'unknown.error',
				/* Возвращаем */
				body: resp
			};

			/* Обрабатываем остальные сообщения */
			switch (resp) {
				case 'ERROR_WRONG_USER_KEY':
					error.name = 'wrong.user.key';
					break;
				case 'ERROR_KEY_DOES_NOT_EXIST':
					error.name = 'key.not.exist';
					break;
				case 'ERROR_ZERO_BALANCE':
					error.name = 'no.money';
					break;
				case 'ERROR_NO_SLOT_AVAILABLE':
					break;
					error.name = 'nope.workers';
				case 'ERROR_ZERO_CAPTCHA_FILESIZE':
					error.name = 'small.size.captcha';
					break;
				case 'ERROR_IMAGE_TYPE_NOT_SUPPORTED':
					error.name = 'file.not.supported';
					break;
				case 'ERROR_IP_NOT_ALLOWED':
					error.name = 'ip.not.allowed';
					break;
			}

			reject(error);
		}
	});
};