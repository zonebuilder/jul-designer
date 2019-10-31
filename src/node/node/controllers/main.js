/*
	JUL Designer version 2.6.8
	Copyright (c) 2014 - 2019 The Zonebuilder <zone.builder@gmx.com>
	http://sourceforge.net/projects/jul-designer/
	Licenses: GNU GPLv2 or later; GNU LGPLv3 or later (http://sourceforge.net/p/jul-designer/wiki/License/)
*/
/* jshint browser: true, curly: true, eqeqeq: true, evil: true, expr: true, funcscope: true, immed: true, latedef: true, loopfunc: true,  
	onevar: true, newcap: true, noarg: true, node: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals JUL, DIRECTORY_SEPARATOR, DOCROOT */
'use strict';
require('jul');
var oApp = JUL.ns('JUL.Designer');
var oFS = require('fs-extra');
var oPath = require('path');
var oHtmlSpecialChars = require('htmlspecialchars');
var oGulp = require('gulp');
var oPlugins = require('gulp-load-plugins')();
require('zip-stream');
require('pump');

/**
 * A REST server for JUL.Designer
 */
JUL.apply(exports, {
	/**
	 * Delivers Designer's main page
	 */
	index: function(oRequest, oResponse) {
		var oReady = {set: function(sKey, oValue) {
			this[sKey] = oValue || true;
			if (this.updated && this.body) { oResponse.send(this.body); }
		}};
		var oConfig = oApp.Config('main');
		oResponse.render('main', JUL.apply({
			assets: oApp.Helper('assets'),
			app: {
				version: oConfig.version,
				title: oConfig.title,
				config: {
					defaultTemplate: oApp.View('default-template.html'),
					defaultAppTemplate: oApp.View('default-app-template.html'),
					zb_link: oConfig.zb_link
				}
			},
			updated: function() { oReady.set('updated'); }
		}, oConfig), function(oError, sRendered) { oReady.set('body', sRendered); });
		if (oRequest.url.indexOf('?') > -1) { return; }
		var aZip = ['_apps', '_projects', '_frameworks', '_examples'];
		for (var i = 0; i < aZip.length; i++) {
			var sFrom = DOCROOT + 'application' + DIRECTORY_SEPARATOR + aZip[i] + '.zip';
			if (oFS.existsSync(sFrom)) {
				this._unzip(sFrom, oConfig.work_dir, false, (function(sItem) {
					return function() { /* try { oFS.unlinkSync(sItem); } catch (e) {} */ };
				})(sFrom));
			}
		}
	},
	/**
	 * Manages the HTTP REST requests. PUT and DELETE are implemented via POST.
	 */
	manage: function(oRequest, oResponse) {
		var oResult = {};
		var sRequestType, sConfigFolder, sPath, sDir, sType;
		sRequestType = oRequest.method.toUpperCase();
		if (sRequestType === 'POST') {
			if (!this._validNS(oRequest.body.ns) || ['app', 'project', 'framework'].indexOf(oRequest.body.type) < 0) {
				oResponse.send('{"error":"Invalid operation"}');
				return;
			}
			sConfigFolder = oRequest.body.type + 's';
			sPath = oApp.Config('main').work_dir + DIRECTORY_SEPARATOR + sConfigFolder + DIRECTORY_SEPARATOR +
				oRequest.body.ns.replace(/\./g, DIRECTORY_SEPARATOR);
			sDir = oPath.dirname(sPath);
			sType = oRequest.body.type;
			var bReturn = false;
			switch (oRequest.body.operation) {
			case 'delete':
			if (oFS.existsSync(sPath + '.json') && oFS.statSync(sPath + '.json').isFile()) {
				try {
					oFS.unlinkSync(sPath + '.json');
					bReturn = true;
				}
				catch (e11) {}
				if (!bReturn) {
					oResult.error = 'Access denied';
					break;
				}
				if (sType === 'project') {
					try { oFS.unlinkSync(sPath + '.tpl.json'); } catch (e12) {}
					try { oFS.unlinkSync(sPath + '.js'); } catch (e13) {}
				}
				if (sType === 'app') {
					 try { oFS.unlinkSync(sPath + '.js'); } catch (e14) {}
				}
				try { oFS.rmdirSync(sDir); } catch (e15) {}
				oResult.result = this._ucwords(sType) + ' deleted';
			}
			else {
				oResult.error = 'File not found';
			}
			break;
			case 'new':
			case 'edit':
			if (oFS.existsSync(sPath + '.json') && oFS.statSync(sPath + '.json').isFile() &&
				(oRequest.body.operation === 'new' || oRequest.body.old_ns !== oRequest.body.ns)) {
				oResult.error = ('A ' + sType + ' with the same namespace already exists').replace('A app ', 'An application ');
				break;
			}
			/* falls through */
			case 'save':
			case 'save_js':
				if (!oFS.existsSync(sDir) || !oFS.statSync(sDir).isDirectory()) {
					try { oFS.ensureDirSync(sDir); } catch (e17) {}
				}
				if (oRequest.body.json) {
					try {
						oFS.writeFileSync(sPath + '.json', oRequest.body.json);
						bReturn = true;
					}
					catch (e18) {}
					if (!bReturn) {
						oResult.error = 'Access denied';
						break;
					}
				}
				if (oRequest.body.js) {
					try { oFS.writeFileSync(sPath + '.js', oRequest.body.js); } catch (e19) {}
				}
				if (sType === 'project' && oRequest.body.template) {
					try { oFS.writeFileSync(sPath + '.tpl.json', oRequest.body.template); } catch (e20) {}
				}
				oResult.result = 'New file saved';
			break;
			default:
				oResult.error = 'Invalid operation.';
			}
		}
		if (sRequestType === 'GET') {
			if ((oRequest.query.operation !== 'browse' && !this._validNS(oRequest.query.ns)) ||
				['app', 'project', 'framework'].indexOf(oRequest.query.type) < 0) {
				oResponse.send('{"error":"Invalid operation"}');
				return;
			}
			sConfigFolder = oRequest.query.type + 's';
			sPath = oApp.Config('main').work_dir + DIRECTORY_SEPARATOR + sConfigFolder;
			sType = oRequest.query.type;
			var sTemplate = false;
			switch (oRequest.query.operation) {
			case 'browse':
				oResult.result = [];
				var aList = this._scanDir(sPath, 'json');
				aList.sort(function(a, b) { return a.toLowerCase() > b.toLowerCase() ? 1 : -1; });
				var oReady = {count: 0, items: {}, set: function(sFile, sData) {
					if (sFile) { this.items[sFile] = (this.items[sFile] || '') + sData; }
					if (!sFile || typeof sData === 'undefined') { this.count++; }
					if (this.count < aList.length) { return; }
					for (var i = 0; i < aList.length; i++) {
						if (typeof this.items[aList[i]] !== 'undefined') {
							var sTitle = this.items[aList[i]].split('title":"')[1].split('"')[0];
							var sFileName = aList[i].substr(sPath.length + 1).replace(/(\/|\\)/g, '.');
							oResult.result.push([
								sFileName.substr(0, sFileName.lastIndexOf('.')),
								JSON.parse('"' + sTitle + '"')
							]);
						}
					}
					oResponse.send(JSON.stringify(oResult));
				}};
				for (var i = 0; i < aList.length; i++) {
					var sFile = aList[i];
					try {
						oFS.createReadStream(sFile, {encoding: 'utf8', start: 0, end: 511}).on('data', (function(sItem) {
							return function(sData) { oReady.set(sItem, sData); };
						})(sFile)).on('end', (function(sItem) {
							return function() { oReady.set(sItem); };
						})(sFile));
					}
					catch (e21) {
						oReady.set();
					}
				}
			return;
			case 'open':
				sPath = sPath + DIRECTORY_SEPARATOR + oRequest.query.ns.replace(/\./g, DIRECTORY_SEPARATOR);
				if (oFS.existsSync(sPath + '.json')) {
					try {
						oResponse.send('{"result":' + oFS.readFileSync(sPath + '.json', 'utf8') + '}');
					}
					catch (e22) {
						oResponse.send('{"error":"Access denied"}');
					}
					return;
				}
				else {
					oResult.error = this._ucwords(sType) + ' not found';
				}
			break;
			case 'test':
				sPath = sPath + DIRECTORY_SEPARATOR + oRequest.query.ns.replace(/\./g, DIRECTORY_SEPARATOR);
				sTemplate = sType === 'project' ? sPath + '.tpl.json' : sPath + '.json';
				if (['app', 'project'].indexOf(sType) > -1 && oFS.existsSync(sTemplate)) {
					try {
						sTemplate = oFS.readFileSync(sTemplate, 'utf8');
						oResponse.header('Cache-Control', 'public; max-age=3600')
						.send(this._generateTestPage(sTemplate, oRequest.query.version, sType, oRequest.query.current));
					}
					catch (e23) {
						oResponse.send('Access denied');
					}
				}
				else {
					oResponse.send('Template ' + oRequest.query.ns + ' not found.');
				}
			return;
			case 'download':
				sPath = sPath + DIRECTORY_SEPARATOR + oRequest.query.ns.replace(/\./g, DIRECTORY_SEPARATOR);
				sTemplate = sType === 'project' ? sPath + '.tpl.json' : sPath + '.json';
				if (!oFS.existsSync(sTemplate)) {
					oResponse.status(404).send('Not found');
					return;
				}
				var aEntries = {};
				try {
					aEntries['index.html'] = this._generateTestPage(oFS.readFileSync(sTemplate), oRequest.query.version, sType, false, true);
				}
				catch (e24) {}
				aEntries.js = 'dir://';
				aEntries['js/' + oRequest.query.ns + '.js'] = 'file://' + sPath + '.js';
				var sAssets = oApp.Config('main').work_dir;
				if (sType === 'app') {
					var aInfo = false;
					try { aInfo = JSON.parse(oFS.readFileSync(sPath + '.json')); } catch (e25) {}
					var aModules = {};
					if (typeof aInfo === 'object') { aModules = aInfo.modules; }
					if (Object.keys(aModules).length) {
						sDir = sAssets + DIRECTORY_SEPARATOR + 'projects';
						aEntries['js/projects'] = 'dir://';
						for (var sKey in aModules) {
							if (aModules.hasOwnProperty(sKey)) {
								var aItem = aModules[sKey];
								if (aItem.ns.substr(0, 1) === '.') { aItem.ns = aInfo.ns + aItem.ns; }
								aEntries['js/projects/' + aItem.ns + '.js'] = 'file://' + sDir + DIRECTORY_SEPARATOR + aItem.ns.replace(/\./g, DIRECTORY_SEPARATOR) + '.js';
							}
						}
					}
				}
				sPath = sAssets + DIRECTORY_SEPARATOR + Math.random().toString().substr(2);
				var sName = oRequest.query.ns.toLowerCase().replace(/\./g, '-');
				this._zip(sPath, aEntries, function() {
					var sData = oFS.readFileSync(sPath + '.zip');
					oResponse.header('Content-Length', oFS.statSync(sPath + '.zip').size)
					.header('Content-Type', 'application/octet-stream')
					.header('Content-Disposition', 'attachment; filename="' + sName + '.zip"')
					.header('Cache-Control', 'max-age=28800, must-revalidate')
					.send(sData);
					try { oFS.unlinkSync(sPath + '.zip'); } catch (e) {}
				});
			return;
			default:
				oResult.error = 'Invalid operation.';
			}
		}
		oResponse.send(JSON.stringify(oResult));
	},
	/**
	 * Retrieves a list of files starting from a folder and matching a search file extension
	 * @private
	 * @param	{String}	sPath	Start folder
	 * @param	{String}	[sExt]	Fie extension glob
	 * @returns	{Array}	The list of matching file paths
	 */
	_scanDir: function (sPath, sExt) {
		sExt = sExt || '*';
		var aScan = [];
		var aList = [];
		try { aList = oFS.walkSync(sPath); } catch (e) {}
		if (!aList.length) { return aScan; }
		for (var i = 0; i < aList.length; i++) { 
			var sFile = aList[i];
			var sItem = oPath.basename(sFile);
			if (sItem !== '.' && sItem !== '..' && !oFS.statSync(sFile).isDirectory()) {
				sItem = sItem.split('.');
				sItem.shift();
				if (sExt === '*' || sItem.join('.') === sExt) { aScan.push(sFile); }
			}
		}
		return aScan;
	},
	/**
	 * Generates the project test page or the app test page
	 * @private
	 * @param	{String}	sJson	The JSON page template
	 * @param	{String}	[sVersion]	Version number. It will also be appended as a query string.
	 * @param	{sType}	[sType]	The type of page: project or app
	 * @param	{String}	[sCurrent]	The namespace of the current project
	 * @param	{Boolean}	[bExport]	True to generate the page for downloading
	 * @returns	The HTML test page
	 */
	_generateTestPage: function(sJson, sVersion, sType, sCurrent, bExport) {
		sType = sType || 'project';
		var aInfo = false;
		try { aInfo = JSON.parse(sJson); } catch (e1) {}
		if (typeof aInfo !== 'object') { return 'Invalid template'; }
		var aModules = typeof aInfo.modules === 'object' ? aInfo.modules : null;
		var sKey, oValue;
		for (sKey in aInfo) {
			if (aInfo.hasOwnProperty(sKey)) {
				if (typeof aInfo[sKey] === 'object') { delete aInfo[sKey]; }
			}
		}
		if (sVersion) { aInfo.version = sVersion; }
		var sTemplate = aInfo.template;
		delete aInfo.template;
		for (sKey in aInfo) {
			if (aInfo.hasOwnProperty(sKey)) {
				aInfo[sKey] = oHtmlSpecialChars(aInfo[sKey]);
			}
		}
		if (sType === 'project' && !bExport) {
			aInfo.project_script = oApp.View('project-script.html');
		}
		else {
			var sPrefix = bExport ? 'js/' : (oApp.Config('main')._prefix || (oApp.Config('main').work_dir + DIRECTORY_SEPARATOR).substr(DOCROOT.length - 1).replace(/\\/g, '/')) + sType + 's/';
			aInfo[sType + '_script'] = '<' + 'script type="text/javascript" src="'+ oHtmlSpecialChars(sPrefix) + (bExport ? aInfo.ns : aInfo.ns.replace(/\./g, '/')) + '.js?v=' + aInfo.version + '"><' + '/script>';
		}
		aInfo.jul_script = oApp.Helper('assets')('jul.min').js(oApp.Config('main').jul_root + 'jul.js').toString();
		if (aModules) {
			var aScripts = [];
			var sDir = oApp.Config('main').work_dir + DIRECTORY_SEPARATOR + 'projects';
			sPrefix = bExport ? 'js/projects/' : (oApp.Config('main')._prefix || (oApp.Config('main').work_dir + DIRECTORY_SEPARATOR).substr(DOCROOT.length - 1).replace(/\\/g, '/')) + 'projects/';
			for (sKey in aModules) {
				if (aModules.hasOwnProperty(sKey)) {
					var aItem = aModules[sKey];
					if (aItem.ns.substr(0, 1) === '.') { aItem.ns = aInfo.ns + aItem.ns; }
					if (aItem.ns === sCurrent) {
						aScripts.push(oApp.View('project-script.html'));
					}
					else {
						var sPath = sDir + DIRECTORY_SEPARATOR + aItem.ns.replace(/\./g, DIRECTORY_SEPARATOR);
						var sItemVersion = aInfo.version;
						if (oFS.existsSync(sPath + '.tpl.json')) {
							try {
								sItemVersion = oFS.readFileSync(sPath + '.tpl.json', 'utf8').substr(0, 512);
								sItemVersion = oHtmlSpecialChars(sItemVersion.split('version":"')[1].split('"')[0]);
							}
							catch (e2) {}
						}
						aItem.ns = oHtmlSpecialChars(aItem.ns);
						aScripts.push('<' + 'script type="text/javascript" src="' + oHtmlSpecialChars(sPrefix) + (bExport ? aItem.ns : aItem.ns.replace(/\./g, '/')) + '.js?v=' + sItemVersion + '"><' + '/script>');
					}
				}
			}
			aInfo.modules_scripts = aScripts.join('\t\n');
		}
		aInfo.ts = (new Date()).getTime();
		var aKeys = {};
		for (sKey in aInfo) {
			if (aInfo.hasOwnProperty(sKey)) {
				oValue = aInfo[sKey];
				sKey = sKey !== 'ts' && sKey.indexOf('_') < 0 ? '{' + sType + '_' + sKey + '}' : '{' + sKey + '}';
				aKeys[sKey] = oValue;
			}
		}
		return sTemplate.replace(/\{(\w|\.)+\}/gm, function(sMatch) {
			if (typeof aKeys[sMatch] === 'undefined') { return sMatch; }
			else { return aKeys[sMatch]; }
		});
	},
	/**
	 * Unpacks a ZIP file
	 * @private
	 * @param	{String}	File path
	 * @param	{String}	sWhere	Destination folder
	 * @param	{Boolean}	[bOverwrite]	True to overwrite files
	 */
	_unzip: function(sFrom, sTo, bOverwrite, fDone) {
		var fExclude = function(oFile) {
			var sItem = sTo + DIRECTORY_SEPARATOR + oFile.path.replace(/\//g, DIRECTORY_SEPARATOR);
			var bDir = oFile.path.substr(-1) === '/';
			if (bDir) { oFS.ensureDirSync(sItem.substr(0 , -1)); }
			return bDir || (!bOverwrite && oFS.existsSync(sItem));
		};
		oGulp.src(sFrom)
		.pipe(oPlugins.unzip())
		.pipe(oPlugins.ignore.exclude(fExclude))
		.pipe(oGulp.dest(sTo))
		.on('end', function() {
			if (fDone) { setTimeout(fDone, 0); }
		});
	},
	/** 
	 *	Creates a ZIP file from a list of paths
	 *p@private
	 * @param	{String}	sName	File path without extension
	 * @param	{Array}	aEntries	List of file paths
	 */
	_zip: function(sName, aEntries, fDone) {
		if (typeof aEntries !== 'object') { return false; }
		var aKeys = Object.keys(aEntries);
		var oZip = new (require('zip-stream'))();
		var oReady = {count: 0, set: function() {
			if (this.count >= aKeys.length) {
				oZip.finish();
				return;
			}
			var sPath = aKeys[this.count];
			var sContent = aEntries[sPath];
			this.count++;
			if (sContent.substr(0, 7) === 'file://') {
				var sFile = sContent.substr(7);
				if (oFS.existsSync(sFile)) {
					try {
						oZip.entry(oFS.createReadStream(sFile, {encoding: 'utf8'}), {name: sPath}, function() { oReady.set(); });
					}
					catch (e) {}
				}
			}
			else if (sContent.substr(0, 6) === 'dir://') {
				oZip.entry(null, {name: sPath + '/'}, function() { oReady.set(); });
			}
			else {
				oZip.entry(sContent, {name: sPath}, function() { oReady.set(); });
			}
		}};
		var oDest = oZip.pipe(typeof sName === 'object' ? sName : oFS.createWriteStream(sName + '.zip'))
		.on('close', function() {
			if (fDone) { setTimeout(fDone, 0); }
		 });
		oReady.set();
		return oDest;
	},
	/**
	 * Checks if a NS is valid
	 * @private
	 */
	_validNS: function(sNS) {
		var aNS = (sNS || '').split('.');
		for (var i = 0; i < aNS.length; i++) {
			if (!JUL.UI._regExps.variable.test(aNS[i])) { return false; }
		}
		return true;
	},
	/**
	 * Converts a string to upper case words
	 */	 	
	_ucwords: function(sText) {
		return sText.replace(/\w+/g, function(sItem) {
			return sItem[0].toUpperCase() + sItem.substr(1);
		});
	}
});
