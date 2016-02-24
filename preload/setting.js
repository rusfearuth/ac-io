'use strict';

/* Работа с путями */
var path = require('path');

/* Основные настройки */
exports.settings = {
	/* Директория для сохранения капчи */
	dir: path.normalize(__dirname+'/../temp/'),
	/* Ключ от сервиса anti-captcha */
	key: null,
	/* URL сайта для работы */
	url: 'http://anti-captcha.com'
};

/**
 * Устанавливает настройки модуля
 * @param {object} object настройки
 * @returns {object} текущий объект
 */
exports.setting = function(object){
	/* Наследуем конфиг */
	this.settings = this.extend({},this.settings,object);

	return this;
};