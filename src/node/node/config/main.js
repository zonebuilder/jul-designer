/* jshint browser: true, curly: true, eqeqeq: true, evil: true, expr: true, funcscope: true, immed: true, latedef: true, loopfunc: true,  
	onevar: true, newcap: true, noarg: true, node: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals JUL, DOCROOT */
'use strict';
require('jul');
var oApp = JUL.ns('JUL.Designer');

JUL.apply(exports, {
	title: 'JUL Designer',
	version: '2.1.3',
	zb_link: 'http://www.google.com/search?hl=en&num=50&start=0&safe=0&filter=0&nfpr=1&q=The+Zonebuilder+web+development+programming+IT+society+philosophy+politics',
	work_dir: DOCROOT + 'assets',
	ample_root: oApp.uri + '/amplesdk-mainta-0.9.4/ample/',
	jul_root: ''
});
