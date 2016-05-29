'use strict';

/* Работа с путями */
var path = require('path');

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
