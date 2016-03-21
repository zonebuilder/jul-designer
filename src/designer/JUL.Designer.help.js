/*
	JUL Designer version 1.7
	Copyright (c) 2014 - 2016 The Zonebuilder (zone.builder@gmx.com)
	http://sourceforge.net/projects/jul-designer/
	Licenses: GPLv2 or later; LGPLv3 or later (http://sourceforge.net/p/jul-designer/wiki/License/)
*/
/**
	@fileOverview	This file configures the 'Help' window
*/
/* jshint browser: true, curly: true, eqeqeq: true, evil: true, expr: true, funcscope: true, immed: true, latedef: true, loopfunc: true,  
	onevar: true, newcap: true, noarg: true, node: true, strict: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals ample, JUL */

(function() {
'use strict';

/* generatedBy JCS version 1.1 */

/**
	Help module
	@namespace
	@name	JUL.Designer.help
*/
JUL.ns('JUL.Designer.help');

/**
	UI configuration for the help window
	@type	Object
*/
JUL.Designer.help.ui = {
	tag: 'window',
	hidden: true,
	title: JUL.Designer.title + ' Help',
	width: 950,
	height: 490,
	children: [
		{tag: 'toolbox', children: [
			{tag: 'toolbar', children: [
				{tag: 'toolbargrippy'},
				{tag: 'toolbarbutton', type: 'checkbox', checked: true, label: 'Show contents', listeners: {
					command: function() {
						ample.getElementById('tree-help').setAttribute('hidden', this.getAttribute('checked') !== 'true');
					}
				}},
				{tag: 'toolbarseparator'},
				{tag: 'vbox', flex: 1},
				{xclass: 'html', tag: 'div', width: 220, style: 'padding:5px 18px 0 0;text-align:right', children: [
					{xclass: 'html', tag: 'a', target: '_blank', href: 'docs/index.html?1458419577827', html: 'Open in a new window'}
				]}
			]}
		]},
		{tag: 'hbox', flex: 1, children: [
			{tag: 'tree', id: 'tree-help', seltype: 'single', width: 280, height: '100%', children: [
				{tag: 'treecols', children: [
					{tag: 'treecol', primary: true, width: 310, label: 'Contents'}
				]},
				{tag: 'treebody'}
			],
			listeners: {
				select: function(oEvent) {
					var oNodeList = this.selectedItems;
					if (!oNodeList.length) { return; }
					var oHelp = ample.getElementById('iframe-help');
					oHelp.setAttribute('src', JUL.Designer.help.src + '#' + oNodeList.item(oNodeList.length - 1).getAttribute('id').substr(10));
				}
			}},
			{tag: 'vbox', flex: 1, children: [
				{xclass: 'html', tag: 'div', flex: 1, children: [
					{xclass: 'html', tag: 'iframe', id: 'iframe-help', name: 'iframe-help', width: '100%', height: '100%', seamless: 'yes', style: 'border:0', src: 'docs/index.html?1458419577827'}
				]}
			]}
		]}
	]
};

JUL.apply(JUL.Designer.help, /** @lends JUL.Designer.help */ {
	/**
		The URL of the help site
		@type	String
	*/
	src: 'docs/index.html?' + (new Date()).getTime(),
	/**
		Attaches custom processing when help loads
	*/
	onLoad: function() {
		var oHelp = document.getElementById('iframe-help');
		oHelp = oHelp.contentDocument || oHelp.contentWindow.document;
		var oToc = oHelp.getElementById('toc');
		if (!oToc || !oToc.firstChild) { return; }
		var oStyle = oHelp.styleSheets[oHelp.styleSheets.length - 1];
		if (oStyle.insertRule) { oStyle.insertRule('.to-top{display:none;}', 0); }
		else if (oStyle.addRule) { oStyle.addRule('.to-top', 'display:none', 0); }
		oToc.style.cssText = oToc.style.cssText + ';display:none';
		var fParse = function(oNode, oTree) {
			if (!oNode.firstChild) { return; }
			var oItem, i, oChild;
			if (oNode.nodeType === 1 && oNode.nodeName.toLowerCase() === 'li') {
				oItem = JUL.Designer.parser.create({tag: 'treeitem', id: 'node-help-' + oNode.firstChild.hash.substr(1), container: true, open: true, children: [
					{tag: 'treerow', children: [
						{tag: 'treecell', label: oNode.firstChild.text || oNode.firstChild.innerText}
					]}
				]}, null, oTree);
				for (i = 1; i < oNode.childNodes.length; i++) {
					oChild = oNode.childNodes[i];
					if (oChild.nodeType === 1 && oChild.nodeName.toLowerCase() === 'ul') {
						fParse(oChild, oItem);
						break;
					}
				}
			}
			if (oNode.nodeType === 1 && oNode.nodeName.toLowerCase() === 'ul') {
				oItem = JUL.Designer.parser.create({tag: 'treechildren'}, null, oTree);
				for (i = 0; i < oNode.childNodes.length; i++) {
					oChild = oNode.childNodes[i];
					if (oChild.nodeType === 1 && oChild.nodeName.toLowerCase() === 'li') {
	 						fParse(oChild, oItem);
					}
				}
			}
		};
		var oBody = ample.getElementById('tree-help').querySelector('xul|treebody');
		for (var j = 0; j < oToc.childNodes.length; j++) {
			if (oToc.childNodes[j].nodeType === 1 && oToc.childNodes[j].nodeName.toLowerCase() === 'ul') {
				fParse(oToc.childNodes[j], oBody);
				break;
			}
			ample.getElementById('tree-help').reflow();
		}
	}
});

})();

/* end JUL.Deaigner.help.js */
