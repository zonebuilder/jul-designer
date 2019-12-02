#!/usr/bin/env node
/*
	JUL Designer version 3.0.1
	Copyright (c) 2014 - 2019 The Zonebuilder <zone.builder@gmx.com>
	http://sourceforge.net/projects/jul-designer/
	Licenses: GNU GPLv2 or later; GNU LGPLv3 or later (http://sourceforge.net/p/jul-designer/wiki/License/)
*/
/* jshint browser: true, curly: true, eqeqeq: true, evil: true, expr: true, funcscope: true, immed: true, latedef: true, loopfunc: true,  
	onevar: true, newcap: true, noarg: true, node: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals JUL */
'use strict';
require('jul');
var oApp = JUL.ns('JUL.Designer');

var oElectron = require('electron');
JUL.apply(oApp, {
	electron: true,
	loaded: false,
	mainWindow: null,
	draw: function() {
		this.mainWindow = new (oElectron.BrowserWindow)({
			width: 1024,
			height: 730,
			backgroundColor: '#f3f3f3',
			title: 'JUL Designer',
			webPreferences: {
				nativeWindowOpen: true,
				nodeIntegration: false
			}
		});
		this.mainWindow.loadURL(oApp.loaded ? oApp.uri + '/' : 'file://' + __dirname.replace(/\\/g, '/') + '/index.html');
		this.mainWindow.on('closed', function() { oApp.mainWindow = null; });
		}
	});
oElectron.app.on('ready', JUL.makeCaller(oApp, 'draw'));
oElectron.app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') { oElectron.app.quit(); }
});
oElectron.app.on('activate', function() {
  if (oApp.mainWindow === null) { oApp.draw(); }
});
require('./server.js');
console.log('This app is powered by Electron v' + process.versions.electron + ' :)' );

