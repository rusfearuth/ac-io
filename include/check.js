'use strict';

/**
 * Обрабатывает результат отправки капчи
 * @param   {number} id идентификатор капчи
 * 
 * @returns {object} promise
 */
exports.check = function(id){
	/* Возвращаем promise */
	return new this.promise((resolve,reject) => {
		/* Отправляет на сервер запрос */
		var check = () => {
			this.request({
				/* URL вызова */
				uri: this.settings.url+'/res.php',
				/* Метод отправки */
				method: 'POST',
				/* Максимальное ожидание */
				timeout: 3000,
				/* Параметры */
				qs: {
					/* Уникальный идентификатор капчи */
					id: id,
					/* Тип действия */
					action: 'get',
					/* Ключ аккаунта, 32 символа */
					key: this.settings.key
				}
			})
			.then((resp) => {
				/* Пытаемся получить код капчи */
				var code = resp.split('|');

				/* Проверяем что код удалось получить */
				if (code[0] === 'OK') {
					/* Возвращаем информацию капчи */
					resolve({
						/* Id капчи */
						id: id,
						/* Код капчи */
						code: code[1]
					});
				} else {
					var error = {
						name: 'unknown.error',
						body: resp
					};

					/* Обрабатываем остальные данные */
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
						/* Если капча ещё не готова */
						case 'CAPCHA_NOT_READY':
							/* Ставим на повтор */
							return setTimeout(check,500);
					}

					/* Возвращаем ошибку */
					reject(error);
				}
			})
			.catch((error) => {
				/* Проверяем если ошибка отправки */
				if (error.name === 'RequestError' || error.name === 'StatusCodeError') {
					/* Повторяем попытку */
					check();
				} else {
					/* Возвращаем ошибку */
					reject(error);
				}
			});
		};

		/* Отправляем первый запрос */
		check();
	});
};