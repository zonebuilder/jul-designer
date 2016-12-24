/*
	JUL - The JavaScript UI Language version 1.3.7
	Copyright (c) 2012 - 2016 The Zonebuilder (zone.builder@gmx.com)
	http://sourceforge.net/projects/jul-javascript/
	Licenses: GNU GPLv2 or later; GNU LGPLv3 or later (http://sourceforge.net/p/jul-javascript/wiki/License/)
 */
/**
	@fileOverview	
	The JavaScript UI Language (JUL) is a configuration and instantiation module for the JavaScript frameworks. 
	It can be used with any framework that accepts a configuration object as a constructor parameter, 
	or with a custom factory for the other frameworks.<br />
	JUL parses a tree of configuration objects, and creates the runtime components in the expected order and membership. 
	For the most uses, after this step, you will have your application's user interface up and running.<br>
	<br>An example of the JUL tree for a generic 'FWK.Widgets' component library:
	<pre><code>var oUiConfig = {
	    xclass: 'FWK.Widgets.DataView',
	    id: 'APP.mainView',
	    autoDraw: false,
	    overflow: 'hidden',
	    children: [{
	        xclass: 'FWK.Widgets.VLayout',
	        id:'VLayout0',
	        children: [{
	            xclass: 'FWK.Widgets.ToolStrip',
	            id: 'ToolStrip0',
	            visibilityMode: 'multiple'
	        }, {
	            xclass: 'FWK.Widgets.HLayout',
	            id: 'HLayout0',
	            children: [{
	                xclass: 'FWK.Widgets.VLayout',
	                id: 'Navigation',
	                width: 200,
	                showResizeBar: true
	                }, {
	                xclass: 'FWK.Widgets.TabSet',
	                   id: 'TabSet1',
	                tabs: [{
	                    xclass: 'FWK.Widgets.Tab',
	                    title: 'Tab1',
	                    id: 'Tab1'
	                }, {
	                    xclass: 'FWK.Widgets.Tab',
	                    title: 'Tab2',
	                    id: 'Tab2'
	                }],
	                showTabScroller:true,
	                showTabPicker:true,
	                destroyPanes:false,
	                showEdges:false
	            }]
	        }]
	    }],
	    width: '100%',
	    height: '100%'
	};
	var oParser = new JUL.UI.Parser({
	    classProperty: 'xclass',
	    childrenProperty: 'children',
	    membersProperties: ['tabs'],
	    idProperty: 'id'
	});
	oParser.create(oUiConfig);
	APP.mainView.render();</code></pre>
	Another example of the JUL tree for a XUL dialog:
	<pre><code>var oUiConfig = {
	    tag: 'dialog',
	    id: 'dialog-browse',
	    title: 'Open',
	    width: 500,
	    height: 250,
	    hidden: true,
	    children: [
	        {tag: 'listbox', id: 'listbox-browse', selType: 'single', 
	            flex: 1, children: [
	            {tag: 'listhead', children: [
	                {tag: 'listheader', label: 'Name', width: 300}
	        ]},
	            {tag: 'listbody', children: [
	                {tag: 'listitem', children: [
	                    {tag: 'listcell', label: 'File 1'}
	                ]},
	                {tag: 'listitem', children: [
	                    {tag: 'listcell', label: 'File 2'}
	                ]}
	            ]}
	        ]}
	    ],
	};
	var oParser = new JUL.UI.Parser({
	    defaultClass: 'xul',
	    useTags: true,
	    tagProperty: 'tag',
	    customFactory: 'JUL.UI.createDom',
	    topDown: true
	});
	var oDialog = oParser.create(oUiConfig);
	oDialog.show();</code></pre>
*/
/* jshint browser: true, curly: true, eqeqeq: true, expr: true, funcscope: true, immed: true, latedef: true, 
	onevar: true, newcap: true, noarg: true, node: true, strict: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals ample, JUL: true */

(function(global) {
'use strict';
global.JUL = {};


JUL = {
	version: '1.3.7',
	apply: function(oSource, oAdd, bDontReplace) {
		if (!oAdd || typeof oAdd !== 'object') { return oSource; }
		var aMembers = [].concat(oAdd);
		for (var i = 0; i < aMembers.length; i++) {
			oAdd = aMembers[i];
			for (var sItem in oAdd) {
				if (oAdd.hasOwnProperty(sItem) && (!bDontReplace || typeof oSource[sItem] !== 'undefined')) {
					oSource[sItem] = oAdd[sItem];
				}
			}
		}
		return oSource;
	},
	get: function(sPath, oRoot) {
		var oCurrent = oRoot || global;
		if (!sPath) { return oCurrent; }
		if (typeof sPath !== 'string') { return sPath; }
		var aNames = sPath.replace(/\\\./g, ':::::').split('.');
		var sItem = '';
		while (aNames.length) {
			sItem = aNames.shift().replace(/:{5}/g, '.');
			if (typeof oCurrent[sItem] === 'undefined') { return oCurrent[sItem]; }
			oCurrent = oCurrent[sItem];
		}
		return oCurrent;
	},
	makeCaller: function(oScope, fCall, bAppendThis) {
		if (!oScope || (!fCall && fCall !== 0)) { return null; }
		if (typeof fCall !== 'function') {
			fCall = oScope[fCall];
			if (typeof fCall !== 'function') { return null; }
		}
		bAppendThis = (bAppendThis || false) && true;
		this._callers = this._callers || [];
		for (var i = 0; i < this._callers.length; i++) {
			if (oScope === this._callers[i][0] && fCall === this._callers[i][1] && bAppendThis === this._callers[i][2]) { return this._callers[i][3]; }
		}
		var fCaller = bAppendThis ? function() { return fCall.apply(oScope, [].slice.call(arguments).concat([this])); } :
			function() { return fCall.apply(oScope, [].slice.call(arguments)); };
		if (this._callers.length > 16383) { this._callers = this._callers.slice(1024, 16384); }
		this._callers.push([oScope, fCall, bAppendThis, fCaller]);
		return fCaller;
	},
	ns: function(sPath, oInit, oRoot) {
		var aNames = sPath ? sPath.replace(/\\\./g, ':::::').split('.') : [];
		var sItem = '';
		var oRe = /^(\d|[1-9]\d+)$/;
		var oCurrent = oRoot || global;
		if (!oRoot && aNames.length && ('window' === aNames[0] || 'global' === aNames[0])) { aNames.shift(); }
		while (aNames.length) {
			sItem = aNames.shift().replace(/:{5}/g, '.');
			if (typeof oCurrent[sItem] === 'undefined') { oCurrent[sItem] = aNames.length && oRe.test(aNames[0]) ? [] : {}; }
				if (!aNames.length && typeof oInit !== 'undefined') { oCurrent[sItem] = oInit; }
			oCurrent = oCurrent[sItem];
		}
		return oCurrent;
	},
	trim: function(sText, sWhat, _bFromMap) {
		if (typeof sText !== 'string') { sText = sText.toString(); }
		if (!sText) { return sText; }
		if (_bFromMap || !(sWhat || sWhat === 0)) {
			if (typeof String.prototype.trim === 'function') {
				return sText.trim();
			}
			else {
				return sText.replace(/\s+$/, '').replace(/^\s+/, '');
			}
		}
		else {
			if (typeof sWhat !== 'string') { sWhat = sWhat.toString(); }
			var nEnd = sText.length;
			while (nEnd >= sWhat.length && sText.slice(nEnd - sWhat.length, nEnd) === sWhat) { nEnd = nEnd - sWhat.length; }
			if (nEnd < sText.length) { sText = sText.slice(0, nEnd); }
			if (sText.length < sWhat.length) { return sText; }
			var nStart = 0;
			while (nStart <= sText.length - sWhat.length && sText.slice(nStart, nStart + sWhat.length) === sWhat) { nStart = nStart + sWhat.length; }
			if (nStart) { sText = sText.substr(nStart); }
			return sText;
		}
	},
	typeOf: function(oData) {
		return ({}).toString.call(oData).match(/\w+/g)[1];
	}
};

if (typeof Array.prototype.indexOf !== 'function') {
	Array.prototype.indexOf = function(oSearch, nStart) {
		for (var i = nStart || 0; i < this.length; i++) {
			if (this[i] === oSearch) { return i; }
		}
		return -1;
	};
}

if (typeof Array.prototype.map !== 'function') {
	Array.prototype.map = function(fMap, oScope) {
		if (typeof fMap !== 'function') { return null; }
		var aResult = [];
		for (var i = 0; i < this.length; i++) {
			aResult.push(oScope ? fMap.call(oScope, this[i], i, this) : fMap(this[i], i, this));
		}
		return aResult;
	};
}

})(typeof global !== 'undefined' ? global : window);


(function() {
'use strict';


JUL.ns('JUL.Ref');

JUL.Ref = function(oRef, sKey) {
	if (!(this instanceof JUL.Ref)) {
		return new JUL.Ref(oRef, sKey);
	}
	if (oRef instanceof JUL.Ref) {
		JUL.apply(this, oRef);
		return;
	}
	this._ref = oRef;	
	this._key = sKey;
	if (typeof oRef === 'object' && oRef.ref) {
		this._ref = oRef.ref;
		this._key = oRef.key;
		for (var sMember in oRef) {
			if (oRef.hasOwnProperty(sMember) && sMember !== 'key' && sMember !== 'ref') {
				this[sMember] = oRef[sMember];
			}
		}
	}
};

JUL.apply(JUL.Ref.prototype,  {
	del: function() {
		delete this._ref[this._key];
		return this;
	},
	key: function(sKey) {
		if (typeof sKey !== 'undefined') {
			this._key = sKey;
			return this;
		}
		return this._key;
	},
	ref: function(oRef, sKey) {
		if (!oRef) { return this._ref; }
		if (oRef === true) { return this._key; }
		if (oRef) { this._ref = oRef; }
		if (typeof sKey !== 'undefined') { this._key = sKey; }
		return this;
	},
	val: function(oVal) {
		if (typeof oVal !== 'undefined') {
			this._ref[this._key] = oVal;
			return this;
		}
		return this._ref[this._key];
	}
});

})();


(function(global) {
'use strict';


JUL.ns('JUL.UI');

JUL.apply(JUL.UI,  {
	bindingProperty: 'cid',
	childrenProperty: 'children',
	classProperty: 'xclass',
	cssProperty: 'css',
	customFactory: null,
	defaultClass: 'Object',
	htmlProperty: 'html',
	idProperty: 'id',
	includeProperty: 'include',
	membersProperties: [],
	parentProperty: 'parent',
	parserProperty: 'parserConfig',
	referencePrefix: '=ref:',
	tagProperty: 'tag',
	topDown: false,
	useTags: false,
	xmlNS: {
		aml: 'http://www.amplesdk.com/ns/aml', aui: 'http://www.amplesdk.com/ns/aui', chart: 'http://www.amplesdk.com/ns/chart',
		 html: 'http://www.w3.org/1999/xhtml', svg: 'http://www.w3.org/2000/svg', xform: 'http://www.w3.org/2002/xforms',
		 xul: 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'
	},
	Parser: function(oConfig) {
		if (!(this instanceof JUL.UI.Parser) || this.hasOwnProperty('Parser')) {
			return this && typeof this.Parser === 'function' && this.Parser.prototype instanceof JUL.UI.Parser ?
				new this.Parser(oConfig) : new JUL.UI.Parser(oConfig);
		}
		JUL.apply(this, oConfig);
		this.Parser = function(oConfig) {
			var oReturn = JUL.UI.Parser.call(this, oConfig);
			if (typeof oReturn === 'object') { return oReturn; }
		};
		this.Parser.prototype = this;
	},
	compact: function(oData, bAuto, _nLength) {
		oData = this.include(oData);
		if (JUL.typeOf(oData[this.childrenProperty]) !== 'Array') { return oData; }
		var aItems = [];
		var oRepeat = {};
		for (var i = 0; i < oData[this.childrenProperty].length; i++) {
			var oChild = oData[this.childrenProperty][i];
			var sClass = oChild[this.classProperty] || this.defaultClass;
			var sName = this.useTags ? sClass + ':' + oChild[this.tagProperty] : sClass;
			if (aItems.indexOf(sName) < 0) {
				aItems.push(sName);
			}
			else {
				oRepeat[sName] = true;
			}
		}
		var oNew = {};
		for (var sItem in oData) {
			if (oData.hasOwnProperty(sItem) && sItem !== this.childrenProperty) {
				oNew[sItem] = oData[sItem];
			}
		}
		var oAdd = {};
		if (typeof _nLength === 'undefined') { _nLength = this.membersProperties.length; }
		for (i = 0; i < oData[this.childrenProperty].length; i++) {
			oChild = oData[this.childrenProperty][i];
			sClass = oChild[this.classProperty] || this.defaultClass;
			sName = this.useTags ? sClass + ':' + oChild[this.tagProperty] : sClass;
			var sTag = this.useTags && sClass === this.defaultClass ? oChild[this.tagProperty] : sName;
			var bCompact = typeof oChild[this.childrenProperty] === 'object' && oChild[this.childrenProperty].length;
			var iPos = this.membersProperties.indexOf(sTag);
			if (bCompact && (iPos < 0 || iPos >= _nLength)) {
				if (bAuto) {
					for (sItem in oChild) {
						if (oChild.hasOwnProperty(sItem) && sItem !== this.classProperty &&
							sItem !== this.childrenProperty && !(this.useTags && sItem === this.tagProperty)) {
							bCompact = false;
							break;
						}
					}
				}
				else {
					bCompact = false;
				}
			}
			if (bCompact && !oRepeat[sName]) {
				oAdd[sTag] = oChild[this.childrenProperty];
			}
			else {
				oAdd[this.childrenProperty] = oAdd[this.childrenProperty] || [];
				oAdd[this.childrenProperty].push(oChild);
			}
		}
		for (sItem in oAdd) {
			if (oAdd.hasOwnProperty(sItem)) {
				oNew[sItem] = oAdd[sItem];
				if (sItem !== this.childrenProperty && this.membersProperties.indexOf(sItem) < 0) {
					this.membersProperties.push(sItem);
				}
				for (i = 0; i < oAdd[sItem].length; i++) {
					oAdd[sItem][i] = this.compact(oAdd[sItem][i], bAuto, _nLength);
				}
			}
		}
		return oNew;
	},
	create: function(oTree, oBindings, oParent) {
			if (!oTree) { return null; }
			if (oBindings && oBindings[this.includeProperty]) {
					oBindings = this.include(oBindings);
			}
			if (JUL.typeOf(oTree) === 'Array') {
				return oTree.map(function(oItem) {
					return this.create(oItem, oBindings, oParent);
				}, this);
			}
			var oRoot = {root: oTree};
			var oRootParent = {root: oParent};
			var aNodes = [new JUL.Ref({ref: oRoot, key: 'root', parent: oParent ? new JUL.Ref(oRootParent, 'root') : null})];
			var aStack = aNodes;
			while (aNodes.length) {
				var aNextNodes = [];
			for (var i = 0; i < aNodes.length; i++) {
				var oCurrent = aNodes[i];
				if (!oCurrent.val() || oCurrent.val()[this.parserProperty]) { continue; }
				oCurrent.config = oCurrent.val();
				delete oCurrent.config[this._instanceProperty];
				var oNew = this.include(oCurrent.config);
				if (oNew[this.bindingProperty]) {
					if (oBindings) {
						var aCid = [].concat(oNew[this.bindingProperty]);
						for (var k = 0; k < aCid.length; k++) {
							if (oBindings[aCid[k]]) { JUL.apply(oNew, oBindings[aCid[k]]); }
						}
					}
					delete oNew[this.bindingProperty];
				}
				if (oNew[this.idProperty] && oBindings && oBindings[oNew[this.idProperty]]) {
					JUL.apply(oNew, oBindings[oNew[this.idProperty]]);
				}
				oCurrent.val(oNew);
				for (var sItem in oNew) {
					if (oNew.hasOwnProperty(sItem)) {
						if (this.referencePrefix && typeof oNew[sItem] === 'string' &&
							oNew[sItem].substr(0, this.referencePrefix.length) === this.referencePrefix) {
								var sGet = JUL.trim(oNew[sItem].substr(this.referencePrefix.length));
								oNew[sItem] = sGet ? JUL.get(sGet) : null;
							}
						if (typeof oNew[sItem] === 'object' &&
							[].concat(this.childrenProperty, this.membersProperties).indexOf(sItem) > -1) {
							var aMembers = [].concat(oNew[sItem]);
							var sType = JUL.typeOf(oNew[sItem]);
							if (sType === 'Array' || this.topDown) {
								for (var n = 0; n < aMembers.length; n++) {
										aNextNodes.push(new JUL.Ref({ref: aMembers, key: n, parent: oCurrent}));
								}
							}
							else {
									aNextNodes.push(new JUL.Ref({ref: oNew, key: sItem, parent: oCurrent}));
							}
							if (this.topDown) {
								delete oNew[sItem];
							}
							else {
								if (sType === 'Array') { oNew[sItem] = aMembers; }
							}
						}
					}
				}
			}
			aStack = this.topDown ? aStack.concat(aNextNodes) : aNextNodes.concat(aStack);
			aNodes = aNextNodes;
		}
		for (i = 0; i < aStack.length; i++) {
			oCurrent = aStack[i];
			if (!oCurrent.val()) { continue; }
			if (oCurrent.val()[this.parserProperty]) {
				var oBranchConfig = JUL.apply({}, oCurrent.val());
				var oBranchParser = new this.Parser(oBranchConfig[this.parserProperty]);
				delete oBranchConfig[this.parserProperty];
				oCurrent.val(oBranchParser.create(oBranchConfig, oBindings, this.topDown && oCurrent.parent ? oCurrent.parent.val() : null));
				continue;
			}
			if (this.topDown) {
				oCurrent.val()[this.parentProperty] = oCurrent.parent ? oCurrent.parent.val() : null;
			}
			oCurrent.val(this.createComponent(oCurrent.val()));
			if (this._keepInstance && oCurrent.config) {
				oCurrent.config[this._instanceProperty] = oCurrent.val();
			}
		}
		return oRoot.root;
	},
	createComponent: function(oConfig) {
		if (!oConfig[this.classProperty]) { oConfig[this.classProperty] = this.defaultClass; }
		var sNamespace = '';
		if (oConfig[this.idProperty]) {
			sNamespace = oConfig[this.idProperty];
			oConfig[this.idProperty] = oConfig[this.idProperty].replace(/\\\./g, '--').replace(/\./g, '-');
			if (['window.', 'global.'].indexOf(sNamespace.substr(0, 7)) > -1) { oConfig[this.idProperty] = oConfig[this.idProperty].substr(7); }
		}
		var sClass = oConfig[this.classProperty];
		if (!this.customFactory) { delete oConfig[this.classProperty]; }
		var oNew = this.customFactory ? JUL.get(this.customFactory).call(this, oConfig) : this.factory(sClass, oConfig);
		if (sNamespace.indexOf('.') > -1) {
			return JUL.ns(sNamespace.replace(/-/g, '_'), oNew);
		}
		else {
			return oNew;
		}
	},
	createDom: function(oConfig, oWidget) {
		if (!oConfig) { return null; }
		var nNS = oConfig[this.classProperty].indexOf(':');
		var sNS = nNS > -1 ? oConfig[this.classProperty].substr(0, nNS) : oConfig[this.classProperty];
		if (!this.xmlNS[sNS]) { sNS = 'html'; }
		var fCall = function() {
			var aArgs = [].slice.call(arguments);
			var oThis = aArgs.shift();
			var sFn = aArgs.shift();
			while (aArgs.length && typeof aArgs[aArgs.length - 1] === 'undefined') { aArgs.pop(); }
			return oThis[sFn].apply(oThis, aArgs);
		};
		var oDocument = window.document;
		var bAmple = typeof window.ample === 'object';
		if (bAmple) { oDocument = window.ample; }
		oWidget = oWidget || (sNS === 'html' || typeof oDocument.createElementNS !== 'function' ?
			fCall(oDocument, 'createElement', nNS > -1 ? oConfig[this.classProperty].substr(nNS + 1) : oConfig[this.tagProperty], oConfig.is) :
			fCall(oDocument, 'createElementNS', this.xmlNS[sNS], nNS > -1 ? oConfig[this.classProperty] : sNS + ':' + oConfig[this.tagProperty], oConfig.is));
		if (!oWidget) { return null; }
		if (oConfig.listeners && typeof oConfig.listeners === 'object') {
			var oListeners = oConfig.listeners;
			var oScope = oListeners.scope ? JUL.get(oListeners.scope) : null;
			for (var sItem in oListeners) {
				if (oListeners.hasOwnProperty(sItem) && sItem !== 'scope') {
					var aAll = [].concat(oListeners[sItem]);
					for (var j = 0; j < aAll.length; j++) {
						var fListener = JUL.get(aAll[j]);
						if (fListener) {
							if (bAmple || oWidget.addEventListener) { oWidget.addEventListener(sItem, oScope ? JUL.makeCaller(oScope, fListener, true) : fListener); }
							else { oWidget.attachEvent('on' + sItem, JUL.makeCaller(oScope || oWidget, fListener, true)); }
						}
					}
				}
			}
		}
		for (sItem in oConfig) {
			if (oConfig.hasOwnProperty(sItem) && [].concat(this.childrenProperty, this.membersProperties).indexOf(sItem) < 0 &&
				['listeners', this.cssProperty, 'style', this.htmlProperty, this.tagProperty, this.classProperty, this.parentProperty].indexOf(sItem) < 0)
			{
				nNS = sItem.indexOf(':');
				var sAttr = ['Array', 'Date', 'Function', 'Object', 'Null', 'RegExp'].indexOf(JUL.typeOf(oConfig[sItem])) > -1 ? this.obj2str(oConfig[sItem]) : oConfig[sItem];
				if (nNS > -1) {
					oWidget.setAttributeNS(this.xmlNS[sItem.substr(0, nNS)], sItem, sAttr);
				}
				else {
					oWidget.setAttribute(sItem, sAttr);
				}
			}
		}
		if (oConfig[this.cssProperty]) {
			oWidget.setAttribute('class', oConfig[this.cssProperty]);
		}
		if (oConfig.style) {
			if (bAmple) {
				oWidget.setAttribute('style', oConfig.style);
			}
			else {
				oWidget.style.cssText = oWidget.style.cssText +';'+ oConfig.style;
			}
		}
		if (oConfig[this.htmlProperty]) {
			if (bAmple) {
				ample.query(oWidget).append(oConfig[this.htmlProperty].substr(0, 1) === '<' && oConfig[this.htmlProperty].substr(-1) === '>' ?
					oConfig[this.htmlProperty] : '<span>' + oConfig[this.htmlProperty] + '</span>');
			}
			else {
				oWidget.innerHTML = oConfig[this.htmlProperty];
			}
		}
		for (sItem in oConfig) {
			if (oConfig.hasOwnProperty(sItem) && JUL.typeOf(oConfig[sItem]) === 'Array' &&
				[].concat(this.childrenProperty, this.membersProperties).indexOf(sItem) > -1) {
				var aMembers = oConfig[sItem];
				var oMembersWidget =  oWidget;
				if (sItem !== this.childrenProperty) {
					nNS = sItem.indexOf(':');
					if (nNS > -1) { sNS = sItem.substr(0, nNS);	}
					oMembersWidget = sNS === 'html' ? fCall(oDocument, 'createElement', nNS > -1 ? sItem.substr(nNS + 1) : sItem, oConfig.is) :
						fCall(oDocument, 'createElementNS', this.xmlNS[sNS], nNS > -1 ? sItem : sNS + ':' + sItem, oConfig.is);
				}
				for (var k = 0; k < aMembers.length; k++) {
					oMembersWidget.appendChild(aMembers[k]);
				}
				if (sItem !== this.childrenProperty) {
					oWidget.appendChild(oMembersWidget);
				}
			}
		}
		if (this.topDown && oConfig[this.parentProperty] &&
			typeof oConfig[this.parentProperty] === 'object') {
			oConfig[this.parentProperty].appendChild(oWidget);
		}
		return oWidget;
	},
	expand: function(oData) {
		oData = this.include(oData);
		var aChildren = [];
		for (var sItem in oData) {
			if (oData.hasOwnProperty(sItem) && oData[sItem] && typeof oData[sItem] === 'object' &&
				[].concat(this.childrenProperty, this.membersProperties).indexOf(sItem) > -1) {
				if (sItem === this.childrenProperty) {
					aChildren = aChildren.concat(oData[sItem]);
				}
				else {
					var oNew = {};
					if (!this.useTags && sItem !== this.defaultClass) { oNew[this.classProperty] = sItem; }
					if (this.useTags) {
						var nNS = sItem.indexOf(':');
						if (nNS > -1 && sItem.substr(0, nNS) !== this.defaultClass) { oNew[this.classProperty] = sItem.substr(0, nNS); }
						oNew[this.tagProperty] = nNS > -1 ? sItem.substr(nNS + 1) : sItem;
					}
					oNew[this.childrenProperty] = [].concat(oData[sItem]);
					delete oData[sItem];
					aChildren.push(oNew);
				}
			}
		}
		if (aChildren.length) {
			oData[this.childrenProperty] = aChildren;
			for (var i = 0; i < aChildren.length; i++) {
				aChildren[i] = this.expand(aChildren[i]);
			}
		}
		return oData;
	},
	factory: function(sClass, oArgs) {
		var aNames = sClass.split('.');
		var oCurrent = global;
		var sItem = '';
		while (aNames.length) {
			sItem = aNames.shift();
			if (typeof oCurrent[sItem] === 'undefined') { return null; }
			if (aNames.length) { oCurrent = oCurrent[sItem]; }
		}
		if (typeof oCurrent[sItem] !== 'function') { return null; }
		if (oArgs) {
			return new oCurrent[sItem](oArgs);
		}
		else {
			return new oCurrent[sItem]();
		}
	},
	include: function(oData, fMerger) {
		var oNew = {};
		if (!oData[this.includeProperty]) {
			return JUL.apply(oNew, oData);
		}
		fMerger = fMerger || this._includeMerger;
		var aIncludes = [].concat(oData[this.includeProperty]);
		for (var i = 0; i < aIncludes.length; i++) {
			var oInclude = JUL.get(aIncludes[i]);
			if (oInclude) {
				if (fMerger) {  fMerger.call(this, oNew, this.include(oInclude, fMerger)); }
				else { JUL.apply(oNew, this.include(oInclude)); }
			}
		}
		var aCid = oNew[this.bindingProperty] ? [].concat(oNew[this.bindingProperty]) : [];
		if (oData[this.bindingProperty] && aCid.indexOf(oData[this.bindingProperty]) < 0) {
			aCid.push(oData[this.bindingProperty]);
		}
		if (fMerger) { fMerger.call(this, oNew, oData); }
		else { JUL.apply(oNew, oData); }
		if (aCid.length) { oNew[this.bindingProperty] = aCid; }
		delete oNew[this.includeProperty];
		return oNew;
	},
	obj2str: function(oData, bQuote, fDecorator) {
		if (typeof this._useJsonize === 'undefined') {
			var fEmpty = function() {};
			this._useJsonize = JSON.stringify({o: fEmpty}, JUL.makeCaller(JUL.UI, '_jsonReplacer')).indexOf('function') < 0;
		}
		var sData = this._useJsonize ? JSON.stringify(this._jsonize(oData)) : JSON.stringify(oData, JUL.makeCaller(this, '_jsonReplacer'));
		if (!sData) { return ''; }
		var ca = '#';
		var c = '';
		var sIndent = '';
		var sResult = '';
		var sContent = '';
		var bString = false;
		var aStack = [];
		var aPath = [];
		var nStart = 0;
		var nLn = 0;
		var nLastComma = 0;
		for (var i = 0; i < sData.length; i++) {
			c = sData.substr(i, 1);
			if (c === '"' && ca !== '\\') {
				bString = !bString;
				if (bString) { nStart = i; }
			}
			if (bString) {
				if (bQuote) { sResult = sResult + c; }
				ca = c;
				continue;
			}
			if (!bQuote && ('{[,]}').indexOf(c) > -1 && (']}').indexOf(ca) < 0) {
				sResult = sResult + (fDecorator ? fDecorator.call(oData, sContent,
					aPath.map(function(sVal) { return sVal.toString().replace(/\./g, '\\.'); }).join('.'), sIndent) : sContent);
				sContent = '';
			}
			if (c === '"' && !bQuote) {
				var sItem = JSON.parse(sData.substr(nStart, i - nStart + 1));
				if (sData.substr(i + 1, 1) === ':') {
					if (fDecorator) { aPath[aPath.length - 1] = sItem; }
					sContent = sContent + (!this._regExps.keyword.test(sItem) && (this._regExps.variable.test(sItem) || this._regExps.uint.test(sItem)) ?
						sItem : (this._useDoubleQuotes ? sData.substr(nStart, i - nStart + 1) :
						"'" + sData.substr(nStart + 1, i - nStart - 1).replace(/\\"/g, '"').replace(/'/g, "\\'") + "'"));
				}
				else {
					var bPrefix = false;
					if (this._usePrefixes) {
						if (sItem.substr(0, this._jsonPrefixes.func.length) === this._jsonPrefixes.func) {
							bPrefix = true;
							sItem = sItem.substr(this._jsonPrefixes.func.length).replace(/^\s+/, '');
						}
						else if (sItem.substr(0, this._jsonPrefixes.newop.length) === this._jsonPrefixes.newop) {
							bPrefix = true;
							sItem = sItem.substr(this._jsonPrefixes.newop.length).replace(/^\s+/, '');
						}
					}
					if (bPrefix || (!this._usePrefixes && (this._regExps.functionStart.test(sItem) || this._regExps.newStart.test(sItem)))) {
						var oBegin = sItem.match(/\n(\s|\t)+\}$/);
						if (oBegin) {
							oBegin = oBegin[0].substr(0, oBegin[0].length - 1);
							sItem = sItem.replace(new RegExp(oBegin, 'g'), '\n');
						}
						sItem = sItem.replace(/\t/g, this._tabString)
							.replace(/\n\r?/g, this._newlineString + sIndent);
						sContent = sContent + sItem;
						ca = '~';
						continue;
					}
					else {
						bPrefix = false;
						if (this._usePrefixes &&
							sItem.substr(0, this._jsonPrefixes.regex.length) === this._jsonPrefixes.regex) {
							bPrefix = true;
							sItem = sItem.substr(this._jsonPrefixes.regex.length).replace(/^\s+/, '');
						}
						sContent = sContent + (bPrefix || (!this._usePrefixes && this._regExps.regexp.test(sItem)) ?
							sItem : (this._useDoubleQuotes ? sData.substr(nStart, i - nStart + 1) :
							"'" + sData.substr(nStart + 1, i - nStart - 1).replace(/\\"/g, '"').replace(/'/g, "\\'") + "'"));
					}
				}
			}
			else if (c === '{' || c === '[') {
				if (!bQuote && fDecorator) { aPath.push(c === '[' ? 0 : ''); }
				aStack.push(c);
				if ((aStack.length === 1 && sData.substr(i + 1, 1) !== '}' && sData.substr(i + 1, 1) !== ']') ||
					(c === '{' && ca === ':' && sData.substr(i + 1, 1) !== '}') ||
					(c === '[' && (sData.substr(i + 1, 1) === '{' || sData.substr(i + 1, 1) === '['))) {
					sIndent = sIndent + this._tabString;
					sResult = sResult + c + this._newlineString + sIndent;
					nLn = sResult.length;
				}
				else {
					sResult = sResult + c;
				}
			}
			else if (c === ',') {
				if (this._phraseLength && nLastComma && sResult.length > nLn + this._phraseLength) {
					sResult = sResult.slice(0, nLastComma) + this._newlineString + sIndent + sResult.substr(nLastComma);
					nLn = nLastComma + this._newlineString.length + sIndent.length;
				}
				nLastComma = sResult.length + 1;
				if (!bQuote && fDecorator && aStack.length && aStack[aStack.length - 1] === '[') { aPath[aPath.length - 1]++; }
				if (aStack.length === 1 || ca === '~' || ((ca === '}' || ca === ']') &&
					sData.substr(i - 2, 1) !== '{' && sData.substr(i - 2, 1) !== '[')) {
					sResult = sResult + c + this._newlineString + sIndent;
					nLn = sResult.length;
					nLastComma = 0;
				}
				else if(!bQuote) {
					sResult = sResult + c + this._spaceString;
				}
				else {
					sResult = sResult + c;
				}
			}
			else if (c === '}' || c === ']') {
				if (this._phraseLength &&  nLastComma && sResult.length > nLn + this._phraseLength) {
					sResult = sResult.slice(0, nLastComma) + this._newlineString + sIndent + sResult.substr(nLastComma);
					nLn = nLastComma + this._newlineString.length + sIndent.length;
				}
				nLastComma = 0;
				if (!bQuote && fDecorator) { aPath.pop(); }
				aStack.pop();
				if ((!aStack.length && ca !== '{' && ca !== '[') ||
					(c === '}' && aStack.length && aStack[aStack.length - 1] === '{' && ca !== '{') ||
					(c === ']' && (ca === '}'  || ca === ']'))) {
					sIndent = sIndent.substr(this._tabString.length);
					sResult = sResult + this._newlineString + sIndent + c;
					nLn = sResult.length - 1;
				}
				else {
					sResult = sResult + c;
				}
			}
			else {
				if (bQuote) { sResult = sResult + c; }
				else { sContent = sContent + (c === ':' ? c + this._spaceString : c); }
			}
			ca = c;
		}
		if (!bQuote && sContent) {
			sResult = sResult + (fDecorator ? fDecorator.call(oData, sContent, '', sIndent) : sContent);
		}
		return sResult;
	},
	xml2jul: function(oXml, bReturnString) {
		if (typeof oXml !== 'object') {
			oXml = this._createXml(oXml);
		}
		if (oXml.error) {
				return bReturnString ? this.obj2str(oXml) : oXml;
		}
		if (oXml.parseError && oXml.parseError.errorCode !== 0) {
			return bReturnString ? this.obj2str({error: oXml.parseError.reason}) : {error: oXml.parseError.reason};
		}
		var oData = {};
		var dom2jul = function(oData, oNode, bNoTag) {
			if (oNode.nodeName === 'parsererror') {
				oData.error = oNode.textContent;
				return;
				}
			var nNS = oNode.nodeName.indexOf(':');
			if (!bNoTag && nNS > -1) {
				if (this.defaultClass !== oNode.nodeName.substr(0, nNS)) {
					oData[this.classProperty] = oNode.nodeName.substr(0, nNS);
				}
				oData[this.tagProperty] = oNode.nodeName.substr(nNS + 1);
			}
			else {
				if (!bNoTag || this.defaultClass !== oNode.nodeName) {
					oData[bNoTag ? this.classProperty : this.tagProperty] = oNode.nodeName;
				}
			}
			for (var i = 0; i < oNode.attributes.length; i++) {
				var oAttribute = oNode.attributes[i];
				if (oAttribute.name.substr(0, 5) !== 'xmlns') { 
					oData[oAttribute.name === 'class' ? this.cssProperty : oAttribute.name] =
						this._regExps.number.test(oAttribute.value) || this._regExps.special.test(oAttribute.value) ?
						JSON.parse(oAttribute.value) : oAttribute.value;
				}
			}
			if (oNode.childNodes.length && oNode.firstChild.nodeType === 3 &&
				JUL.trim(oNode.firstChild.nodeValue)) {
				oData[this.htmlProperty] = oNode.firstChild.nodeValue;
			}
			var aNames = [];
			var oRepeat = {};
			for (i = 0; i < oNode.childNodes.length; i++) {
				var oChild = oNode.childNodes[i];
				if (oChild.nodeType === 1) {
					if (aNames.indexOf(oChild.nodeName) > -1) {
						oRepeat[oChild.nodeName] = true;
					}
					else {
						aNames.push(oChild.nodeName);
					}
				}
			}
			for (i = 0; i < oNode.childNodes.length; i++) {
				oChild = oNode.childNodes[i];
				if (oChild.nodeType === 1) {
					nNS = oChild.nodeName.indexOf(':');
					var sTag = !bNoTag && nNS > -1 && this.defaultClass === oChild.nodeName.substr(0, nNS) ?
						oChild.nodeName.substr(nNS + 1) : oChild.nodeName;
					if (!oRepeat[oChild.nodeName] &&
						[].concat(this.childrenProperty, this.membersProperties).indexOf(sTag) > -1) {
						var aMembers = [];
						oData[sTag] = aMembers;
						for (var k = 0; k < oChild.childNodes.length; k++) {
							var oGrandChild = oChild.childNodes[k];
							if (oGrandChild.nodeType === 1) {
								aMembers.push({});
								dom2jul.call(this, aMembers[aMembers.length - 1], oGrandChild, bNoTag);
							}
						}
					}
					else {
						aMembers = oData[this.childrenProperty] || [];
						oData[this.childrenProperty] = aMembers;
						aMembers.push({});
						dom2jul.call(this, aMembers[aMembers.length - 1], oChild, bNoTag);
					}
				}
			}
		};
		dom2jul.call(this, oData, oXml.documentElement, !this.useTags);
		return bReturnString ? this.obj2str(oData) : oData;
	},
	_includeMerger: null,
	_instanceProperty: '_instance',
	_jsonPrefixes: {
		func: '=func:', regex: '=regex:', newop: '=newop:'
	},
	_keepInstance: false,
	_newlineString: '\n',
	_phraseLength: 120,
	_regExps: {
		variable: /^[a-z$_][\w$]*$/i, number: /^[\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?$/, uint: /^(\d|[1-9]\d+)$/,
		 functionStart: /^function\s*\(/, newStart: /^new\s+[A-Z$_][\w$]*\s*\(/,
		 isoDateStart: /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d/, regexp: /^\/(\s|\S)+\/[gim]{0,3}$/,
		 special: /^(true|false|null)$/, autoUseStrict: /(\{)\r?\n?"use strict";\r?\n?/,
		 keyword: /^(break|case|catch|continue|debugger|default|delete|do|else||finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with|class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)$/
	},
	_spaceString: ' ',
	_tabString: '\t',
	_useDoubleQuotes: false,
	_usePrefixes: false,
	_createXml: function(sXml) {
		if (window.DOMParser) {
			JUL.UI._xmlParser = JUL.UI._xmlParser || new DOMParser();
			try {
				return JUL.UI._xmlParser.parseFromString(sXml, 'application/xhtml+xml');
			}
			catch(e) {
				return {error: e.message};
			}
		}
		else {
			JUL.UI._xmlParser = JUL.UI._xmlParser || new ActiveXObject('Msxml2.DOMDocument.3.0');
			 JUL.UI._xmlParser.async = false;
			 JUL.UI._xmlParser.loadXML(sXml);
			return  JUL.UI._xmlParser; 
		}
	},
	_jsonReplacer: function(sKey, oValue) {
		if (typeof oValue === 'string' && JUL.UI._regExps.isoDateStart.test(oValue)) {
			oValue = new Date(Date.UTC(parseInt(oValue.substr(0, 4)), parseInt(oValue.substr(5, 2)) - 1, parseInt(oValue.substr(8, 2)),
				parseInt(oValue.substr(11, 2)), parseInt(oValue.substr(14, 2)), parseInt(oValue.substr(17, 2)), oValue.substr(19, 1) === '.' ? parseInt(oValue.substr(20, 3)) : 0));
		}
		switch (JUL.typeOf(oValue)) {
		case 'Function':
			return (this._usePrefixes ? this._jsonPrefixes.func + ' ' : '') +
				oValue.toString().replace(JUL.UI._regExps.autoUseStrict, '$1');
		case 'RegExp':
			return (this._usePrefixes ? this._jsonPrefixes.regex + ' ' : '') +
				oValue.toString();
		case 'Date':
			return (this._usePrefixes ? this._jsonPrefixes.newop + ' ' : '') +
				'new Date(/*' + oValue.toUTCString().replace('UTC', 'GMT') + '*/' + oValue.getTime() + ')';
		default:
			return oValue;
		}
	},
	_jsonize: function(oData, _sKey) {
		var oValue = oData;
		if (typeof _sKey === 'undefined') { _sKey = ''; }
		else { oValue = oData[_sKey]; }
		if (oValue && typeof oValue === 'object' && typeof oValue.toJSON === 'function') {
			return this._jsonReplacer(_sKey, oValue.toJSON());
		}
		switch (JUL.typeOf(oValue)) {
		case 'Array':
			var aOut = [];
			for (var i = 0; i < oValue.length; i++) {
				try {
					aOut[i] = this._jsonize(oValue, i);
				}
				catch (e1) {
					aOut[i] = null;
				}
			}
			return aOut;
		case 'Object':
			var oOut = {};
			for (var sItem in oValue) {
				try {
					if (oValue.hasOwnProperty(sItem)) { oOut[sItem] = this._jsonize(oValue, sItem); }
				}
				catch (e2) {}
			}
			return oOut;
		default:
			return this._jsonReplacer(_sKey, oValue);
		}
	}
});

JUL.UI.Parser.prototype = JUL.UI;

})(typeof global !== 'undefined' ? global : window);

