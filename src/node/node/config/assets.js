/* jshint browser: true, curly: true, eqeqeq: true, evil: true, expr: true, funcscope: true, immed: true, latedef: true, loopfunc: true,  
	onevar: true, newcap: true, noarg: true, node: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals JUL, DIRECTORY_SEPARATOR, DOCROOT */
'use strict';
require('jul');

JUL.apply(exports, {
	merge: ['production', 'staging'],
	folder: 'assets',
	load_paths: {
		css: DOCROOT + 'source' + DIRECTORY_SEPARATOR + 'css' + DIRECTORY_SEPARATOR,
		js: DOCROOT + 'source' + DIRECTORY_SEPARATOR + 'js' + DIRECTORY_SEPARATOR
	},
	processor: {
		css: {name: 'cleanCss', options: {advanced: false, compatibility: 'ie8'}},
		js: {name: 'uglify', options: {compress: false, mangle: false}}
	} 
});
