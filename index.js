'use strict';

var
/* File Stream */
fs = require('fs'),
/* Utility */
util = require('util'),
/* Основа модуля */
io = function(){
	/* Добавляет методы в основу */
	var method = (name,methods) => {
		/* Алиас метода */
		this[name] = {};

		/* Проходимся по списку методов */
		methods.forEach((item) => {
			var
			/* Путь метода */
			path = item.path.split('.'),
			/* Последний элемент */
			end = path.length-1,
			/* Алиас */
			self = this[name];

			/* Проходимся по пути метода */
			path.forEach((key,i) => {
				/* Если последний элемент */
				if (end === i) {
					return self[key] = item.handler.bind(this);
				}

				/* Установка ссылки на элемент */
				self = self[key] = self[key] || {};
			});

			/* Ставим алиас */
			self = this[name];
		});
	};
};

/* Наследуем EventEmitter */
util.inherits(io,require('events').EventEmitter);

/* Папки с прототипами модуля */
['preload','include']
/* Наследование прототипов */
.forEach(function(dir){
	var
	/* Путь до папки */
	dir = __dirname+'/'+dir+'/',
	/* Считывание файлов директории */
	files = fs.readdirSync(dir),
	/* Кеш длины массива */
	length = files.length,
	/* Regex проверки что файл js расширения */
	regex = /.*\.js/,
	/* Остальные переменные */
	file,i;

	/* Проходимся по списку файлов */
	for (i = 0; i < length; ++i) {
		/* Текущий элемент */
		file = files[i];

		/* Проверка что файл js */
		if (regex.test(file)) {
			/* Наследуем */
			util._extend(io.prototype,require(dir+file));
		}
	}
});

/* Экспорт модуля */
module.exports = io;