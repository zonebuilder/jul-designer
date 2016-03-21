/*
	JUL Designer version 1.7
	Copyright (c) 2014 - 2016 The Zonebuilder (zone.builder@gmx.com)
	http://sourceforge.net/projects/jul-designer/
	Licenses: GPLv2 or later; LGPLv3 or later (http://sourceforge.net/p/jul-designer/wiki/License/)
*/
/**
	@fileOverview	This file configures 'About' window
*/
/* jshint browser: true, curly: true, eqeqeq: true, evil: true, expr: true, funcscope: true, immed: true, latedef: true, loopfunc: true,  
	onevar: true, newcap: true, noarg: true, node: true, strict: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals JUL */

(function() {
'use strict';

/* generatedBy JCS version 1.1 */

/**
	About window module
	@namespace
	@name	JUL.Designer.about
*/
JUL.ns('JUL.Designer.about');

/**
	About window UI config
	@type	Object
*/
JUL.Designer.about.ui = {
	tag: 'window',
	css: 'logo-bg',
	hidden: true,
	title: 'About',
	width: 570,
	height: 252,
	'aml:resizable': false,
	orient: 'horizontal',
	children: [
		{tag: 'vbox', width: 253, children: [
			{xclass: 'html', tag: 'div', style: 'padding: 8px 0', flex: 1, children: [
				{xclass: 'html', tag: 'img', width: 240, height: 224, alt: 'JUL Designer', src: 'media/jul224.png'}
			]}
		]},
		{tag: 'vbox', flex: 1, children: [
			{tag: 'spacer', height: 60},
			{tag: 'description', css: 'logo-title', value: JUL.Designer.title},
			{tag: 'description', value: 'Version ' + JUL.Designer.version},
			{tag: 'description', html: 'Copyright &copy; 2014 - 2016 <a target="_blank" href="' + ample.$encodeXMLCharacters(JUL.Designer.config.zb_link) + '">The Zonebuilder</a>'},
			{tag: 'description', html: 'Powered by <a target="_blank" href="http://www.amplesdk.com/">Ample SDK</a> &amp; <a target="_blank" href="http://kohanaframework.org/">Kohana PHP</a>'}
		]}
	],
	listeners: {
		click: function(oEvent) {
			if (oEvent.target.nodeName !== 'a') { this.hide(oEvent); }
		}
	}
};

JUL.apply(JUL.Designer.about, /** @lends JUL.Designer.about */ {});

})();

/* end JUL.Designer.about.js */
