'use strict';

var
base = new (require('base-io')),
path = require('path');

base
.import(function(){
	this.settings = {
		dir: path.normalize(__dirname+'/temp/'),
		key: null,
		url: 'http://anti-captcha.com'
	};
})
.scan([
	'preload',
	'include'
]);

module.exports = base.export();
