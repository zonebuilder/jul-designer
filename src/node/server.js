/*
	JUL Designer version 1.9.5
	Copyright (c) 2014 - 2017 The Zonebuilder <zone.builder@gmx.com>
	http://sourceforge.net/projects/jul-designer/
	Licenses: GNU GPLv2 or later; GNU LGPLv3 or later (http://sourceforge.net/p/jul-designer/wiki/License/)
*/
/* jshint browser: true, curly: true, eqeqeq: true, evil: true, expr: true, funcscope: true, immed: true, latedef: true, loopfunc: true,  
	onevar: true, newcap: true, noarg: true, node: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals JUL, DIRECTORY_SEPARATOR, DOCROOT, APPPATH */
'use strict';
require('jul');
var oApp = JUL.ns('JUL.Designer');
var oExpress = require('express');

/**
 * A Node server application for JUL.Designer
 */
JUL.ns('DIRECTORY_SEPARATOR', require('path').sep);
JUL.ns('DOCROOT', __dirname + DIRECTORY_SEPARATOR);
JUL.ns('APPPATH', DOCROOT + 'node' + DIRECTORY_SEPARATOR);
JUL.apply(oApp, {
	data: {},
	Config: function(sName) { return require(APPPATH + 'config' + DIRECTORY_SEPARATOR + sName); },
	Controller: function(sName) { return require(APPPATH + 'controllers' + DIRECTORY_SEPARATOR + sName); },
	Model: function(sName) { return require(APPPATH + 'models' + DIRECTORY_SEPARATOR + sName); },
	View: function(sName) { return require('fs').readFileSync(APPPATH + 'views' + DIRECTORY_SEPARATOR + sName, 'utf8'); },
	Helper: function(sName) { return require(APPPATH + 'helpers' + DIRECTORY_SEPARATOR + sName); },
});

oApp.server = oExpress();
oApp.server.use(require('body-parser').urlencoded({ extended: false}));
var oEjs = require('ejs');
oApp.server.engine('html', oEjs.renderFile);
oEjs.delimiter = '?';
oApp.server.set('views', APPPATH + 'views');
oApp.server.set('view engine', 'html');
var aStatic = ['amplesdk-mainta-0.9.4', 'assets', 'docs', 'media'];
for (var i = 0; i < aStatic.length; i++) {
	oApp.server.use('/' + aStatic[i], oExpress.static(DOCROOT + aStatic[i]));
}
oApp.server.get('/', JUL.makeCaller(oApp.Controller('main'), 'index'));
oApp.server.all('/index.php/main/manage', JUL.makeCaller(oApp.Controller('main'), 'manage'));
var oConnection = {
	host: 'localhost',
	port: 7770
};
oApp.uri = 'http://' + oConnection.host + ':' + oConnection.port;
oApp.server.listen(oConnection.port, oConnection.host, function() {
	var oConfig = oApp.Config('main');
	console.log('Running ' + oConfig.title + ' version ' + oConfig.version);
	console.log('available at: ' + oApp.uri + '/');
});
