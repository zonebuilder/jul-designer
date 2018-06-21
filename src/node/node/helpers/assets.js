/*
	JUL Designer version 2.1.4
	Copyright (c) 2014 - 2018 The Zonebuilder <zone.builder@gmx.com>
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
var oGulp = require('gulp');
var oPlugins = require('gulp-load-plugins')();
require('pump');

/**
 * Partial implementation of Kohana asset merger (https://github.com/OpenBuildings/asset-merger.git)
 */ 
var Assets = function(sGroup) {
	if (!(this instanceof Assets)) {
		return new Assets(sGroup);
	}
	this._group = sGroup;
	this._items = [];
	this._interns = {css: [], js: []};
	this._merge = [].concat(this._config.merge).indexOf((process.env.NODE_ENV || 'development').toLowerCase()) > -1;
	this._ts = (new Date()).getTime();
};

JUL.apply(Assets.prototype, {
	/**
	 * Adds an external CSS link
	 */	 	
	css: function(sUrl, oOptions) {
		return this._add('css', sUrl, oOptions);
	},
	/**
	 * Adds an external JS script
	 */	 	
	js: function(sUrl, oOptions) {
		return this._add('js', sUrl, oOptions);
	},
	/**
	 * Adds an inline CSS block
	 */	 	
	css_block: function(sData, oOptions) {
		return this._add('css', sData, oOptions, true);
	},
	/**
	 * Adds an inline JS block
	 */	 	
	js_block: function(sData, oOptions) {
		return this._add('js', sData, oOptions, true);
	},
	/**
	 * Renders the chain of styles and scripts
	 */	 	
	render: function() {
		var sDir = this._config._path || DOCROOT + this._config.folder + DIRECTORY_SEPARATOR;
		oFS.ensureDirSync(sDir + 'css' );
		oFS.ensureDirSync(sDir + 'js' );
		var aItems = [];
		var oInline = {css: 0, js: 0};
		for (var i = 0; i < this._items.length; i++) {
			var oAsset = this._items[i];
			if (!this._merge || oAsset.extern) {
				aItems.push(this._renderItem(oAsset));
			}
			if (this._merge && oAsset.isCode) {
				oInline[oAsset.type]++;
				var sFile = sDir + oAsset.type + DIRECTORY_SEPARATOR + this._group + '-inline-' +
					oInline[oAsset.type] + '.' + oAsset.type;
				var sContent = '';
				try { sContent = oFS.readFileSync(sFile, 'utf8'); } catch (e04) {}
				if (sContent !== oAsset.url) { oFS.writeFileSync(sFile, oAsset.url); }
				oAsset.file = sFile;
			}
		}
		var bCss = false;
		var bJs = false;
		if (this._merge) {
			sDir = this._config.load_paths.css + DIRECTORY_SEPARATOR;
			var sUrl = '/' + this._config.folder + '/css/' + this._group + '.css';
			var n, nTS = 0;
			for (i = 0; i < this._interns.css.length; i++) {
				oAsset = this._interns.css[i];
				try {
					n = oFS.statSync(oAsset.isCode ? oAsset.file : sDir + oAsset.url).mtime.getTime();
					if (n > nTS) { nTS = n; }
				}
				catch (e1) {}
			}
			if (!nTS) { nTS = this._ts; }
			sUrl += '?' + parseInt(nTS / 1000);
			if (this._interns.css.length) {
				aItems.push(this._renderItem({type: 'css', url: sUrl, extern: true, options: {}}));
				bCss = true;
				sDir = (this._config._path || DOCROOT + this._config.folder + DIRECTORY_SEPARATOR) + 'css' + DIRECTORY_SEPARATOR;
				try {
					n = oFS.statSync(sDir + this._group + '.css').mtime.getTime();
					bCss = n < nTS;
				}
				catch (e2) {}
			}
			sDir = this._config.load_paths.js + DIRECTORY_SEPARATOR;
			sUrl = '/' + this._config.folder + '/js/' + this._group + '.js';
			nTS = 0;
			for (i = 0; i < this._interns.js.length; i++) {
				oAsset = this._interns.js[i];
				try {
					n = oFS.statSync(oAsset.isCode ? oAsset.file : sDir + oAsset.url).mtime.getTime();
					if (n > nTS) { nTS = n; }
				}
				catch (e3) {}
			}
			if (!nTS) { nTS = this._ts; }
			sUrl += '?' + parseInt(nTS / 1000);
			if (this._interns.js.length) {
				aItems.push(this._renderItem({type: 'js', url: sUrl, extern: true, options: {}}));
				bJs = true;
				sDir = (this._config._path || DOCROOT + this._config.folder + DIRECTORY_SEPARATOR) + 'js' + DIRECTORY_SEPARATOR;
				try {
					n = oFS.statSync(sDir + this._group + '.js').mtime.getTime();
					bJs = n < nTS;
				}
				catch (e4) {}
			}
		}
		this.update(bCss, bJs);
		return aItems.join('\n');
	},
	/**
	 * Calls render() to get the string representation
	 */	
	toString: function() {
		return this.render();
	},
	/**
	 * Updates the asset files
	 */	 	
	update: function(bCss, bJs) {
		var fUpdate = this._onUpdate;
		var oReady = {set: function(sKey, oValue) {
			this[sKey] = oValue || true;
			if (fUpdate && this.css && this.js) {
				setTimeout(fUpdate, 0);
			}
		}};
		var oItems = {css: 0, js: 0};
		var oSkip = {};
		var aCss = [];
		for (var i = 0; i < this._interns.css.length; i++) {
			var oAsset = this._interns.css[i];
			if (!this._merge && oAsset.isCode) { continue; }
			aCss.push(oAsset.isCode ? oAsset.file : this._config.load_paths.css + oAsset.url);
			if (!oAsset.isCode) { oItems.css++; }
			if (oAsset.options.processor === false) { oSkip[aCss[aCss.length - 1]] = true;  }
		}
		var aJs = [];
		for (i = 0; i < this._interns.js.length; i++) {
			oAsset = this._interns.js[i];
			if (!this._merge && oAsset.isCode) { continue; }
			aJs.push(oAsset.isCode ? oAsset.file : this._config.load_paths.js + oAsset.url);
			if (!oAsset.isCode) { oItems.js++; }
			if (oAsset.options.processor === false) { oSkip[aJs[aJs.length - 1]] = true;  }
		}
		var fIf = function(oFile) {
			return !oSkip[oFile.path];
		};
		var sDir = this._config._path || DOCROOT + this._config.folder + DIRECTORY_SEPARATOR;
		var oCssmin = this._config.processor.css;
		if (typeof oCssmin !== 'object') { oCssmin = {name: oCssmin}; } 
		if (this._merge) {
			if (bCss) {
				oGulp.src(aCss)
				.pipe(oPlugins.if(fIf, oPlugins[oCssmin.name](oCssmin.options || {})))
				.pipe(oPlugins.header('/*--- ${file.relative} ---*/\n', {}))
				.pipe(oPlugins.concat(this._group + '.css'))
				.pipe(oGulp.dest(sDir + 'css'))
				.on('end', function() { oReady.set('css'); });
			}
			else {
				oReady.set('css');
			}
		}
		else {
			if (oItems.css) {
			oGulp.src(aCss)
			.pipe(oPlugins.newer(sDir + 'css'))
			.pipe(oGulp.dest(sDir + 'css'))
			.on('end', function() { oReady.set('css'); });
			}
			else {
				oReady.set('css');
			}
		}
		var oJsmin = this._config.processor.js;
		if (typeof oJsmin !== 'object') { oJsmin = {name: oJsmin}; } 
		if (this._merge) {
			if (bJs) {
				oGulp.src(aJs)
				.pipe(oPlugins.if(fIf, oPlugins[oJsmin.name](oJsmin.options || {})))
				.pipe(oPlugins.header('/*--- ${file.relative} ---*/\n', {}))
				.pipe(oPlugins.concat(this._group + '.js'))
				.pipe(oGulp.dest(sDir + 'js'))
				.on('end', function() { oReady.set('js'); });
			}
			else {
				oReady.set('js');
			}
		}
		else {
			if (oItems.js) {
				oGulp.src(aJs)
				.pipe(oPlugins.newer(sDir + 'js'))
				.pipe(oGulp.dest(sDir + 'js'))
				.on('end', function() { oReady.set('js'); });
			}
			else {
				oReady.set('js');
			}
		}
	},
	/**
	 * Sets 'on update' handler
	 */	
	onUpdate: function(fCall) {
		this._onUpdate = fCall;
		return this;
	},
	/**
	 * Assets configuration reference
	 * @private	 
	 */	
	_config: oApp.Config('assets'),
	/**
	 * Appends a kind of asset to the chain
	 */	 	
	_add: function(sType, sUrl, oOptions, bCode) {
		var oAsset = {type: sType, url: sUrl};
		if (bCode) { oAsset.isCode = true; }
		if (sUrl.indexOf('://') > -1) { oAsset.extern = true; }
		oAsset.options = oOptions || {};
		this._items.push(oAsset);
		if (!oAsset.extern) { this._interns[sType].push(oAsset); }
		return this;
	},
	/**
	 * Gets the asset's actual URL
	 */	 	
	_getUrl: function(oAsset) {
		var sUrl = oAsset.url;
		if (!oAsset.extern) {
			sUrl = '/' + this._config.folder + '/' + oAsset.type + '/' + sUrl;
			var sDir = this._config.load_paths[oAsset.type] + DIRECTORY_SEPARATOR;
			var nTS = this._ts;
			try {
				nTS = oFS.statSync(sDir + oAsset.url).mtime.getTime();
			}
			catch (e) {}
			sUrl += '?' + parseInt(nTS / 1000);
		}
		return sUrl;
	},
	/**
	 * Renders a single asset
	 */	 	
	_renderItem: function(oAsset) {
		var sText = '';
		switch (oAsset.type) {
		case 'css':
			sText += '<' + (oAsset.isCode ? 'style' : 'link rel="stylesheet"') + ' type="text/css"';
			if (oAsset.options.media) { sText += ' media="' + oAsset.options.media + '"'; }
			sText += oAsset.isCode ? '>\n' + oAsset.url + '\n<' + '/style>' :
				' href="' + this._getUrl(oAsset) + '" /' + '>';
		break;
		case 'js':
			sText += '<' + 'script type="text/javascript"';
			sText += oAsset.isCode ? '>\n' + oAsset.url + '\n<' + '/script>' :
				' src="' + this._getUrl(oAsset) + '"><' + '/script>';
		break;
		}
		return sText;
	}
});

module.exports = Assets;
