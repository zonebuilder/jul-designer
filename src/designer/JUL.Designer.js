/*
	JUL Designer version 1.7
	Copyright (c) 2014 - 2016 The Zonebuilder (zone.builder@gmx.com)
	http://sourceforge.net/projects/jul-designer/
	Licenses: GPLv2 or later; LGPLv3 or later (http://sourceforge.net/p/jul-designer/wiki/License/)
*/
/**
	@fileOverview	
	JUL Designer is a RAD tool used to visually build a JavaScript application.
	Given a component based application running in an event-driven environment, 
	JUL Designer helps you to generate the component tree with the attached event listeners. 
	It also generates the JavaScript code for the current component tree.
	
	 = Features =
	 
	  * visually building and live testing a JavaScript application 
	  * working with your preferred JavaScript component framework 
	  * can be used with tag based languages (HTML, XUL, SVG etc.) 
	  * generates the JavaScript code with option to separate UI layout and logic 
	  * copy, paste and undo operations for the components and their members
	  * downloading generated code, exporting XML layout
	
	 = System requirements =
	 
	  * A CSS2 compliant web browser with JavaScript 1.5 or later engine 
	  * A web server with PHP 5.2.0 or later extension 
	  * 1024x768 minimum resolution
*/
/* jshint browser: true, curly: true, eqeqeq: true, evil: true, expr: true, funcscope: true, immed: true, latedef: true, loopfunc: true,  
	onevar: true, newcap: true, noarg: true, node: true, strict: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals ample, JUL */

(function() {
'use strict';

/* generatedBy JCS version 1.1 */

/**
	It holds the JUL.Designer application
	@namespace
	@name	JUL.Designer
*/
JUL.ns('JUL.Designer');

/**
	UI configuration for the browse dialog
	@type	Object
*/
JUL.Designer.browseUi = {
	tag: 'dialog',
	id: 'dialog-browse',
	title: 'Open',
	hidden: true,
	width: 650,
	height: 340,
	children: [
		{tag: 'listbox', id: 'listbox-browse', seltype: 'single', flex: 1, children: [
			{tag: 'listhead', children: [
				{tag: 'listheader', label: 'Namespace', width: 270},
				{tag: 'listheader', label: 'Title', width: 270}
			]},
			{tag: 'listbody'}
		],
		listeners: {
			dblclick: function(oEvent) {
				if (oEvent.target.nodeName !== 'xul:listcell') { return; }
				var sItem = JUL.Designer.getWhere(oEvent.target.parentNode);
				switch (JUL.Designer.state.browseType) {
				case 'app': JUL.Designer.app.open(sItem); break;
				case 'project': JUL.Designer.designer.open(sItem); break;
				case 'framework': JUL.Designer.framework.open(sItem); break;
				}
			}
		}}
	],
	listeners: {
		dialogaccept: function() {
			var oSelected = ample.getElementById('listbox-browse').selectedItems;
			if (!oSelected.length) {
				window.alert('Please select an item');
				return false;
			}
			var sItem = JUL.Designer.getWhere(oSelected.item(oSelected.length - 1));
				switch (JUL.Designer.state.browseType) {
				case 'app': JUL.Designer.app.open(sItem); break;
				case 'project': JUL.Designer.designer.open(sItem); break;
				case 'framework': JUL.Designer.framework.open(sItem); break;
				}
			return false;
		}
	}
};

/**
	UI configuration for the code dialog
	@type	Object
*/
JUL.Designer.codeUi = {
	tag: 'dialog',
	id: 'dialog-code',
	title: 'Code',
	hidden: true,
	width: 750,
	height: 300,
	children: [
		{tag: 'textbox', id: 'textbox-code', width: '100%', multiline: true, flex: 1, listeners: {
			keydown: 'JUL.Designer.filterTab'
		}}
	],
	listeners: {
		dialogaccept: function() {
			JUL.Designer.saveCode();
			return false;
		},
		dialogcancel: function() {
			JUL.Designer.cancelCode();
			return false;
		}
	}
};

JUL.Designer.commentUi = {
	tag: 'dialog',
	id: 'dialog-comment',
	title: 'Comment',
	hidden: true,
	width: 500,
	height: 160,
	children: [
		{tag: 'textbox', css: 'desc', id: 'textbox-comment', width: '100%', multiline: true, flex: 1, listeners: {
			keydown: 'JUL.Designer.filterTab'
		}}
	],
	listeners: {
		dialogaccept: function() {
			JUL.Designer.saveComment();
			return false;
		},
		dialogcancel: function() {
			JUL.Designer.cancelComment();
			return false;
		}
	}
};

/**
	UI configuration for the JavaScript dialog
	@type	Object
*/
JUL.Designer.jsUi = {
	tag: 'dialog',
	id: 'dialog-js',
	title: 'JavaScript',
	hidden: true,
	width: 970,
	height: 410,
	buttons: 'accept',
	children: [
		{tag: 'textbox', id: 'textbox-js', readonly: true, width: '100%', multiline: true, flex: 1}
	]
};

/**
	UI configuration for the XML layout dialog
	@type	Object
*/
JUL.Designer.xmlUi = {
	tag: 'dialog',
	id: 'dialog-xml',
	title: 'XML layout',
	hidden: true,
	width: 980,
	height: 430,
	buttons: 'accept',
	children: [
		{tag: 'hbox', children: [
			{tag: 'spacer', width: 5},
			{tag: 'vbox', width: '100%', children: [
				{tag: 'hbox', children: [
					{tag: 'label', control: 'textbox-xml-css', value: 'CSS class property'},
					{tag: 'spacer', width: 5},
					{tag: 'textbox', id: 'textbox-xml-css', style: 'width:50px'},
					{tag: 'spacer', width: 10},
					{tag: 'label', control: 'textbox-xml-html', value: 'Inner HTML property'},
					{tag: 'spacer', width: 5},
					{tag: 'textbox', id: 'textbox-xml-html', style: 'width:50px'}
				]},
				{tag: 'checkbox', id: 'checkbox-xml-merge-logic', label: 'Merge logic into layout'},
				{tag: 'hbox', children: [
					{tag: 'checkbox', id: 'checkbox-xml-export-listeners', label: 'Export listeners as attributes prepended with'},
					{tag: 'spacer', width: 5},
					{tag: 'textbox', id: 'textbox-xml-listener-prefix', style: 'width:50px'}
				]},
				{tag: 'checkbox', id: 'checkbox-xml-expand-members', label: 'Expand all \'members\' properties'}
			]},
			{tag: 'hbox', height: 80, width: 140, align: 'stretch', pack: 'stretch', children: [
				{tag: 'button', id: 'button-xml-refresh', flex: 1, label: 'Refresh', tooltiptext: 'Re-compute the XML', listeners: {
					command: function() {
						JUL.Designer.designer.refreshXml();
					}
				}}
			]}
		]},
		{tag: 'textbox', id: 'textbox-xml', readonly: true, width: '100%', multiline: true, flex: 1}
	]
};

/**
	UI configuration for the clipboard dialog
	@type	Object
*/
JUL.Designer.clipboardUi = {
	tag: 'dialog',
	id: 'dialog-clipboard',
	title: 'Clipboard',
	hidden: true,
	width: 900,
	height: 450,
	children: [
		{tag: 'textbox', id: 'textbox-clipboard-components', readonly: true, width: '100%', multiline: true, flex: 1},
		{tag: 'hbox', children: [
			{tag: 'checkbox', id: 'checkbox-paste-range', label: 'for the next paste, use only the component indexes '},
			{tag: 'textbox', id: 'textbox-range-start', type: 'number', disabled: true, min: -1, style: 'width:50px'},
			{tag: 'label', value: ' to '},
			{tag: 'textbox', id: 'textbox-range-end', type: 'number', disabled: true, min: -1, style: 'width:50px'}
		]},
		{tag: 'textbox', id: 'textbox-clipboard-members', readonly: true, width: '100%', multiline: true, flex: 1},
		{tag: 'hbox', children: [
			{tag: 'checkbox', id: 'checkbox-paste-filter', label: 'for the next paste, use only the specified members '},
			{tag: 'textbox', id: 'textbox-filter-members', disabled: true, style: 'width:450px'}
		]},
		{tag: 'description', id: 'description-exclude-paste', style: 'text-indent:17px;font-size:small;font-style:italic', value: '* special members won\'t be pasted over'}
	]
};

/**
	Interface logic for the clipboard dialog
	@type	Object
*/
JUL.Designer.clipboardLogic = {
	'checkbox-paste-filter': {
		listeners: {
			change: function() {
				var bCheck = this.getAttribute('checked') === 'true';
				ample.getElementById('textbox-filter-members').setAttribute('disabled', !bCheck);
				if (bCheck) {
					ample.getElementById('textbox-filter-members').focus();
					ample.getElementById('textbox-filter-members').blur();
				}
				else {
					ample.getElementById('textbox-filter-members').setAttribute('value', '');
				}
			}
		}
	},
	'checkbox-paste-range': {
		listeners: {
			change: function() {
				var bCheck = this.getAttribute('checked') === 'true';
				ample.getElementById('textbox-range-start').setAttribute('disabled', !bCheck);
				ample.getElementById('textbox-range-end').setAttribute('disabled', !bCheck);
				if (bCheck) {
					ample.getElementById('textbox-range-start').focus();
					ample.getElementById('textbox-range-start').blur();
					ample.getElementById('textbox-range-end').focus();
					ample.getElementById('textbox-range-end').blur();
				}
				else {
					ample.getElementById('textbox-range-start').setAttribute('value', '');
					ample.getElementById('textbox-range-end').setAttribute('value', '');
				}
			}
		}
	},
	'dialog-clipboard': {
		listeners: {
			dialogaccept: function() {
				if (ample.getElementById('checkbox-paste-range').getAttribute('checked') === 'true') {
					var nStart = parseInt(ample.getElementById('textbox-range-start').getAttribute('value'));
					var nEnd = parseInt(ample.getElementById('textbox-range-end').getAttribute('value'));
					if (!isNaN(nStart) && !isNaN(nEnd) && nStart > -1 && nStart <= nEnd) {
						JUL.apply(JUL.Designer.designer.state.clipboard, {
							pasteStart: nStart,
							pasteEnd: nEnd
						});
					}
					else {
					delete JUL.Designer.designer.state.clipboard.pasteStart;
					delete JUL.Designer.designer.state.clipboard.pasteEnd;
					}
				}
				if (ample.getElementById('checkbox-paste-filter').getAttribute('checked') === 'true') {
					var sVal = JUL.trim(ample.getElementById('textbox-filter-members').getAttribute('value'));
					if (sVal) {
						JUL.Designer.designer.state.clipboard.pasteFilter = sVal.split(',').map(JUL.trim);
					}
				}
				else {
					delete JUL.Designer.designer.state.clipboard.pasteFilter;
				}
			}
		}
	},
	'textbox-filter-members': {
		listeners: {
			blur: function() {
				var oContents = JUL.Designer.designer.state.clipboard.contentMembers || {};
				var aVal = JUL.trim(this.getAttribute('value'));
				if (aVal) {
					aVal = aVal.split(',').map(JUL.trim);
					for (var i = 0; i < aVal.length; i++) {
						if (!aVal[i] || !oContents.hasOwnProperty(aVal[i])) {
							aVal.splice(i, 1);
							i--;
						}
					}
				}
				else {
					aVal = [];
					for (var sItem in oContents) {
						if (oContents.hasOwnProperty(sItem)) { aVal.push(sItem); }
					}
				}
				this.setAttribute('value',aVal.join(', '));
			}
		}
	},
	'textbox-range-end': {
		listeners: {
			blur: function() {
				var aContents = JUL.Designer.designer.state.clipboard.contentNodes || [];
				var nVal = parseInt(this.getAttribute('value'));
				if (!aContents.length || isNaN(nVal) || nVal > aContents.length - 1) { nVal = aContents.length - 1; }
				else if (nVal < 0) { nVal = 0; }
				this.setAttribute('value', nVal);
				if (!aContents.length) { return; }
				var nStart = parseInt(ample.getElementById('textbox-range-start').getAttribute('value'));
				if (!isNaN(nVal) && nStart > nVal) {
					ample.getElementById('textbox-range-start').setAttribute('value', nVal);
				}
			}
		}
	},
	'textbox-range-start': {
		listeners: {
			blur: function() {
				var aContents = JUL.Designer.designer.state.clipboard.contentNodes || [];
				var nVal = parseInt(this.getAttribute('value'));
				if (!aContents.length || isNaN(nVal) || nVal < 0) { nVal = 0; }
				else if (nVal > aContents.length - 1) { nVal = aContents.length - 1; }
				this.setAttribute('value', nVal);
				if (!aContents.length) { return; }
				var nEnd = parseInt(ample.getElementById('textbox-range-end').getAttribute('value'));
				if (!isNaN(nEnd) && nEnd < nVal) {
					ample.getElementById('textbox-range-end').setAttribute('value', nVal);
				}
			}
		}
	}
};

JUL.apply(JUL.Designer, /** @lends JUL.Designer */ {
	/**
		This configuration holds methods to build input cells depending of data type
		@type	Object
	*/
	columnBuilders: {
		/**
			Generates a code editing button for a data field
			@param	{Object}	oField	Field configuration
			@param	{Object}	oWhere	Owner object of the editable data
			@param	{String}	sItem	Member name in the owner object
			@returns	{Object}	UI configuration tree
		*/
		code: function(oField, oWhere, sItem) {
			oField.id = 'button-code-' + oField.id;
			this.state.map[oField.id] = new JUL.Ref({ref: oWhere, key: sItem, field: oField});
			var oConfig = {tag: 'listcell', children: [
				{tag: 'button', id: oField.id, css: 'field', label: '...', width: '100%',
					tooltiptext: oField.label, listeners: {
					command: function() {
						var oWhere = JUL.Designer.getWhere(this);
						JUL.Designer.showCode(oWhere);
					}
				}}
			]};
			/* add a tooltip with the code hint */
			if (oField.template) {
				oConfig.children[0].tooltiptext = oConfig.children[0].tooltiptext + ': ' + oField.template;
			}
			return oConfig;
		},
		/**
			Generates a description editing button for a data field
			@param	{Object}	oField	Field configuration
			@param	{Object}	oWhere	Owner object of the editable data
			@param	{String}	sItem	Member name in the owner object
			@returns	{Object}	UI configuration tree
		*/
		description: function(oField, oWhere, sItem) {
			oField.id = 'button-desc-' + oField.id;
			this.state.map[oField.id] = new JUL.Ref({ref: oWhere, key: sItem, field: oField});
			return {tag: 'listcell', children: [
				{tag: 'button', css: 'field', id: oField.id, label: '...', width: '100%',
					tooltiptext: oWhere[sItem] || '', listeners: {
					command: function() {
						var oWhere = JUL.Designer.getWhere(this);
						JUL.Designer.showComment(oWhere);
					}
				}}
			]};
		},
		/**
			Generates an input text box for a data field.
			For objecs and functions, the box is read-only. In that case, use the code button for editing.
			@param	{Object}	oField	Field configuration
			@param	{Object}	oWhere	Owner object of the editable data
			@param	{String}	sItem	Member name in the owner object
			@returns	{Object}	UI configuration tree
		*/
		value: function(oField, oWhere, sItem) {
			this.state.map[oField.id] = new JUL.Ref({ref: oWhere, key: sItem, field: oField});
			/* use JUL.Designer.buildField to generate a data-dependent input control */
			return {tag: 'listcell', children: [this.buildField(oField, oWhere[sItem])]};
		},
		/**
			Generates a label for a data field
			@param	{Object}	oField	Field configuration
			@param	{Object}	oWhere	Owner object of the editable data
			@param	{String}	sItem	Member name in the owner object
			@returns	{Object}	UI configuration tree
		*/
		other: function(oField, oWhere, sItem) {
			var oConfig = {tag: 'listcell', css: 'label-field', label: oField.label};
			if (oField.tooltip || oField.description) {
				oConfig.tooltiptext = oField.tooltip || oField.description;
			}
			return oConfig;
		}
	},
	/**
		It holds the runtime panels created by the app's modules
		@type	Object
	*/
	panels: {},
	/**
		Reference to the Designer's parser
		@type	Object
	*/
	parser: null,
	/**
		Designer's parser config
		@type	Object
	*/
	parserConfig: {
		defaultClass: 'xul', useTags: true, customFactory: 'JUL.UI.createDom', topDown: true
	},
	/**
		Runtime state for the current module
		@type	Object
	*/
	state: {
		/**
			It stores a hash between UI element IDs and data field references
			@type	Object
		*/
		map: {}, /**
			Last numerical suffix used for gemerating unique IDs
			@type	Number
		*/
		lastId: 1, /**
			Last shown dialog element
			@type	Object
		*/
		lastDialog: null, /**
			It controls the type of the displayed browse dialog
			@type	String
		*/
		browseType: '', /**
			It points to the current object edited in the code dialog
			@type	Object
		*/
		currentObject: null, /**
			It stores a hash between object paths and value change event listeners
			@type	Array
		*/
		valueListeners: []
	},
	/**
		Adds a listener for a HTMLElement
		@param	{Object}	oElement	The HTMLElement
		@param	{String}	sEvent	Event name
		@param	{Function}	fListener	Listener callback
	*/
	addListener: function(oElement, sEvent, fListener) {
		if (oElement.addEventListener) {
			oElement.addEventListener(sEvent, fListener, false);
		}
		else if (oElement.attachEvent) {
			oElement.attachEvent('on' + sEvent, fListener);
		}
	},
	/**
		Adds a listener to the value changing of a member of an object
		@param	{Object}	oOwner	The object to listen on
		@param	{String}	[sItem]	Member name. Use null to listen for all members.
		@param	{Function}	fListener	Listener callback
		@param	{Object}	[oScope]	An optional scope the listener should be called in
	*/
	addValueListener: function(oOwner, sItem, fListener, oScope) {
		var oListener = new JUL.Ref({ref: oOwner, key: sItem, listener: fListener});
		if (typeof oScope === 'object') { oListener.scope = oScope; }
		this.state.valueListeners.push(oListener);
	},
	/**
		Applies required values over the membemers of an object
		@param	{Object}	oFields	Configuration hash between key names and field specifications
		@param	{Object}	oWhere	Object whose members will be processed according to the field specs
	*/
	applyRequired: function(oFields, oWhere) {
		for (var sItem in oFields) {
			if (oFields.hasOwnProperty(sItem) && oFields[sItem].required && typeof oWhere[sItem] === 'undefined') {
				oWhere[sItem] = oFields[sItem].defaultValue;
			} 
		}
	},
	/**
		Generates a specific field cell depending on the JavaScript type of the edited value
		@param	{Object}	oField	Object describing the field configuration
		@param	{Mixed}	oValue	JavaScript value to be edited
		@returns	{Object}	UI configuration tree
	*/
	buildField: function(oField, oValue) {
		var bUndefined = !oField.required && typeof oValue === 'undefined';
		if (typeof oValue === 'undefined' && typeof oField.defaultValue !== 'undefined') {
			oValue = oField.defaultValue;
		}
		var sValue = '';
		var oBuild = {
	 			id: oField.id,
	 			css: 'field',
			 tag: 'textbox',
			 width: '100%'
		};
		if (JUL.typeOf(oValue) === 'Date') {
			oBuild = {
				tag: 'hbox',
				id: oField.id,
	 				css: 'field',
				children: [
					{tag: 'datepicker', id: 'datepicker-' + oField.id},
					{tag: 'timepicker', id: 'timepicker-' + oField.id}
				]
			};
			/* map the date control and the time control to the same field */
			this.state.map[oBuild.children[0].id] = this.state.map[oField.id];
			this.state.map[oBuild.children[1].id] = this.state.map[oField.id];
			JUL.apply(oBuild.children[0], {
				value: bUndefined ? '' : oValue.getFullYear() + '-' + (101 + oValue.getMonth()).toString().substr(1) +
					'-' + (100 + oValue.getDate()).toString().substr(1),
				listeners: {
					blur: this.onDateBlur,
					keypress: function(oEvent) {
						if (oEvent.keyIdentifier === 'Enter') { JUL.Designer.onDateBlur.call(this); }
					}
				}
			});
			JUL.apply(oBuild.children[1], {
				value: bUndefined ? '' : (100 + oValue.getHours()).toString().substr(1) + ':' + (100 + oValue.getMinutes()).toString().substr(1) +
					':' + (100 + oValue.getSeconds()).toString().substr(1),
				listeners: {
					blur: this.onTimeBlur,
					keypress: function(oEvent) {
						if (oEvent.keyIdentifier === 'Enter') { JUL.Designer.onTimeBlur.call(this); }
					}
				}
			});
		}
		else if (typeof oValue === 'object' || typeof oValue === 'function') {
			/* object and function inputs are read-only, use the code (...) buttons to edit */
			oBuild.readonly = true;
			if (oValue && ['Array', 'Object'].indexOf(JUL.typeOf(oValue)) > -1) {
				var sObject = this.parser.obj2str({member: [oValue]});
				sValue = sObject.slice(sObject.indexOf('[') + 1, sObject.lastIndexOf(']')).replace(/(\n|\t)/gm, '');
			}
			else {
				sValue = (oValue ? oValue.toString().replace(JUL.UI._regExps.autoUseStrict, '$1') : '[object Null]').replace(/\n/gm, ' ').replace(/\t/gm, '');
			}
			if (sValue.length > 100) { sValue = sValue.substr(0, 100) + ' ...'; }
			oBuild.value = sValue;
		}
		else if (typeof oValue === 'boolean') {
			oBuild.tag = 'checkbox';
			oBuild.checked = oValue;
			oField.label = '&nbsp;';
			delete oBuild.width;
		}
		else if (typeof oValue === 'number') {
			oBuild.type = 'number';
			oBuild.min = -Number.MAX_VALUE;
			 oBuild.value = oValue;
		}
		else {
			if (typeof oValue === 'string' && JUL.trim(oValue) === '') {
				oBuild.value = 'String(\'' + oValue + '\')';
				oBuild.readonly = true;
			}
			else if (oValue) {
				 oBuild.value = oValue;
			}
		}
		if (oBuild.tag === 'textbox' && typeof oValue !== 'undefined' && bUndefined) { oBuild.css = 'field undef'; }
		/* attach listeners to the editable input control */
		if (oBuild.tag  === 'checkbox') {
			oBuild.listeners = {
				change: function() {
					var oWhere = JUL.Designer.getWhere(this);
					var sValue = this.getAttribute('checked');
					oWhere.oldValue = oWhere.val();
					oWhere.val(sValue === 'true');
					if (!oWhere.field.required && oWhere.val() === oWhere.field.defaultValue) { oWhere.del(); }
					JUL.Designer.onValueUpdated(oWhere);
				}
			};
		}
		if (oBuild.tag === 'textbox' && !oBuild.readonly) {
			oBuild.listeners = {
				blur: JUL.Designer.onBlur,
				focus: function() {
					if (this.getAttribute('readonly') !== 'true' && this.getAttribute('class') === 'field undef') {
						this.setAttribute('value', '');
						JUL.Designer.replaceDom(this, function() { this.setAttribute('class', 'field'); });
					}
				},
				keypress: function(oEvent) {
					if (oEvent.keyIdentifier === 'Enter') {
						JUL.Designer.onBlur.call(this);
					}
				}
			};
		}
		return oBuild;
	},
	/**
		Code triggered when the user dismisses the code dialog
	*/
	cancelCode: function() {
		this.panels.code.hide();
		this.showLast();
	},
	/**
		Code triggered when the user dismisses the comment dialog
	*/
	cancelComment: function() {
		this.panels.comment.hide();
		this.showLast();
	},
	/**
		Performs a cleanup of the mapping between element IDs and object references
	*/
	cleanMap: function() {
		for (var sItem in this.state.map) {
			if (this.state.map.hasOwnProperty(sItem) && !ample.getElementById(sItem)) {
				delete this.state.map[sItem];
			}
		}
	},
	/**
		Translates the query string from the starting URL into a Designer command.
		Implemented commands are: open app, open proeject, open framework.
	*/
	doCmd: function() {
			if (!window.location.search) { return; }
			var aCmd = window.location.search.split('?').pop().split('&');
			for (var i = 0; i < aCmd.length; i++) {
				var aItem = aCmd[i].split('=');
				if (aItem.length < 2) { aItem[1] = ''; }
				aItem = aItem.map(window.decodeURIComponent);
				switch (aItem[0]) {
				case 'oa': this.app.open(aItem[1]); break;
				case 'op': this.designer.open(aItem[1]); break;
				case 'of': this.framework.open(aItem[1]); break;
				}
			}
	},
	/**
		Fills the list box inside 'Browse' dialog with server-side data depending on the kind of browse.
		Can display applications, projects or frameworks. The location if set on the server in application/config/main.php
	*/
	fillBrowseList: function() {
		ample.query('#listbox-browse>xul|listbody').empty();
		ample.get('index.php/main/manage', {
			type: this.state.browseType,
			operation: 'browse',
			ts: (new Date()).getTime()
		}, function(oResponse) {
			oResponse = JSON.parse(oResponse);
			if (oResponse.error) {
				window.alert(oResponse.error);
				return;
			}
			var oBody = ample.query('#listbox-browse>xul|listbody').get(0);
			for (var i = 0; i < oResponse.result.length; i++) {
				var sId = 'item-' + JUL.Designer.state.lastId++;
			JUL.Designer.state.map[sId] = oResponse.result[i][0];
				oBody.appendChild(JUL.Designer.parser.createComponent({
					tag: 'listitem', id: sId,
					children: [
						JUL.Designer.parser.createComponent({tag: 'listcell', css: 'label-field', label: oResponse.result[i][0]}),
						JUL.Designer.parser.createComponent({tag: 'listcell', css: 'label-field', label: oResponse.result[i][1]})
					]
				}));
			}
		});
	},
	/**
		Builds and adds rows in a list box for a number of fields.
		By default, each row has a label, an input, and a code button.
		@param	{String}	sId	The ID of list box to add the fields to
		@param	{Object}	oFields	A hash between field names and field configurations. For each item, a row is added.
		@param	{Object}	oWhere	The object whose members will be edited using the specified field names
		@param	{Array}	[aWhat]	An array of names of items to show on each row. It defaults to: ['label', 'value', 'code']
		@param	{Boolean}	[bEditProperties]	If true, it assumes that each edited member is an object, and the row edits its properties instead of editing its value.
		The aWhat array must be in the format: ['type1-name1', 'type2-name2', ... ], where 'typeN' is the control type and 'nameN' is the field name.
	*/
	fillListbox: function(sId, oFields, oWhere, aWhat, bEditProperties) {
		var oBody = ample.query('#' + sId + '>xul|listbody');
		if (!oBody.length) { return; }
		if (!aWhat) { aWhat = ['label', 'value', 'code']; }
		oBody = oBody.get(0);
		var aConfigs = [];
		for (var sItem in oFields) {
			if (oFields.hasOwnProperty(sItem)) {
				var oOrig = oFields[sItem];
				if (typeof oWhere[sItem] === 'undefined' && oOrig.required) {
					oWhere[sItem] = typeof oOrig.defaultValue !== 'undefined' ? oOrig.defaultValue : null;
				}
				var sFieldId = oOrig.id;
				if (!sFieldId) { sFieldId = 'field-' + this.state.lastId++; }
				var aCells = [];
				for (var c = 0; c < aWhat.length; c++) {
					/* copy the field config for each cell */
					var oField = JUL.apply({id: sFieldId, label: sItem}, oOrig);
					if (oField.required && typeof oField.defaultValue === 'undefined') { oField.defaultValue = null; }
					/* find the appropriate column builder */
					var fBuilder = this.columnBuilders[aWhat[c]];
					var sProperty = false;
					if (bEditProperties) {
						var aParts = aWhat[c].split('-');
						if (aParts.length > 1 && this.columnBuilders[aParts[0]]) {
							sProperty = aParts[1];
							oField = {id: sFieldId + '-' + sProperty.toLowerCase(), label: sItem + ' - ' + sProperty};
							if (oOrig[sProperty] && typeof oOrig[sProperty] === 'object') { JUL.apply(oField, oOrig[sProperty]); }
							fBuilder = this.columnBuilders[aParts[0]];
						}
					}
					if (!fBuilder) { fBuilder = this.columnBuilders.other; }
					aCells.push(fBuilder.call(this, oField, sProperty ? oWhere[sItem] : oWhere, sProperty || sItem));
				}
				sId = 'item-' + sFieldId;
				this.state.map[sId] = sItem;
				aConfigs.push({tag: 'listitem', id: sId, children: aCells});
			}
		}
		/* create and append rows to the list box body */
		var aRoot = this.parser.create(aConfigs);
		for (var i = 0; i < aConfigs.length; i++) {
			oBody.appendChild(aRoot[i]);
		}
	},
	/**
		Changes the TAB behavior in text area controls allowing inserting tabs.
		For IE, it works in IE9+.
		@param	{Object}	oEvent	The standardized event object
		@returns	{Boolean}	Return false to cancel further processing
	*/
	filterTab: function(oEvent) {
		if (oEvent.keyIdentifier === 'U+0009') {
			oEvent.preventDefault();
			var oEl = this.$getContainer('input');
			if (!oEl) { return false; }
			try {
				var nStart = oEl.selectionStart;
				var nEnd = oEl.selectionEnd;
				var sValue = this.getAttribute('value');
				this.setAttribute('value', sValue.substring(0, nStart) + '\t' + sValue.substring(nEnd));
				oEl.selectionStart = nStart + 1;
				oEl.selectionEnd = nStart + 1;
			}
			catch(oException) {}
			 return false;
		}
	},
	/**
		Returns the object reference mapped to an interface element
		@param	{Mixed}	oElement	Element or element ID
		@returns	{Mixed}	Mapped object or value
	*/
	getWhere: function(oElement) {
		if (typeof oElement === 'string') { return this.state.map[oElement]; }
		else { return this.state.map[oElement.getAttribute('id')]; }
	},
	/**
		Application's entry point.
		It builds the interface, and performs various initializations.
	*/
	init: function() {
		this.parser = new JUL.UI.Parser(this.parserConfig);
		//this.attachDebug();
		/* storing runtime panel elements for easy referencing */
		this.panels = {
			designer: this.parser.create(this.designer.ui, this.designer.logic),
			project: this.parser.create(this.designer.projectUi, this.designer.projectLogic),
			app: this.parser.create(this.app.ui, this.app.logic),
			framework: this.parser.create(this.framework.ui, this.framework.logic),
			code: this.parser.create(this.codeUi),
			comment: this.parser.create(this.commentUi),
			browse: this.parser.create(this.browseUi),
			js: this.parser.create(this.jsUi),
			clipboard: this.parser.create(this.clipboardUi, this.clipboardLogic),
			xml: this.parser.create(this.xmlUi),
			help: this.parser.create(this.help.ui),
			about: this.parser.create(this.about.ui)
		};
		for (var sItem in this.panels) {
			if (this.panels.hasOwnProperty(sItem)) {
				ample.documentElement.appendChild(this.panels[sItem]);
				/* hide project iframe to let modal panels capture the mouse dragging */
				if (sItem === 'about' || sItem === 'designer') { continue; }
				this.panels[sItem].addEventListener('windowhidden', function() {
					var oDesigner = JUL.Designer;
					if (oDesigner.designer.current.ns && !oDesigner.state.lastDialog) {
						ample.getElementById('deck-test').setAttribute('selectedIndex', 0);
					}
				});
				this.panels[sItem].addEventListener('windowshown', function() {
					ample.getElementById('deck-test').setAttribute('selectedIndex', 1);
				});
			}
		}
		this.restorePrefs();
		ample.getElementById('deck-test').setAttribute('selectedIndex', 1);
		setTimeout(function() {
			JUL.Designer.panels.about.showModal();
		}, 500);
		setTimeout(function() {
			JUL.Designer.panels.about.hide();
		}, 5000);
		/* disable default on-select processing for the 'Add component' popup */
		ample.getElementById('table-add-component').lastChild.selectItem = function() {};
		/* filter out ESC dismissing for several dialogs */
		ample.documentElement.addEventListener('keydown', function(oEvent) {
			if (oEvent.keyIdentifier === 'U+001B' && oEvent.target.nodeName === 'xul:dialog') {
				var sId = oEvent.target.getAttribute('id');
				if (['dialog-app', 'dialog-code', 'dialog-comment', 'dialog-project', 'dialog-framework'].indexOf(sId) > -1) {
					oEvent.stopPropagation();
				}
			}
		}, true);
		ample.getElementById('table-add-component').lastChild.selectItem = function() {};
		ample.getElementById('listbox-app-modules').addEventListener('click', function(oEvent) {
			if (oEvent.target.nodeName === 'xul:listheader') {
				oEvent.stopPropagation();
			}
		}, true);
		/* add global click handlers for the project and the help iframes */
		this.addListener(document.getElementById('iframe-test'), 'load', JUL.Designer.designer.onTestLoad);
		this.addListener(document.getElementById('iframe-help'), 'load', JUL.Designer.help.onLoad);
		/* turn off wrapping for certain multiline text areas */
		try {
			ample.getElementById('textbox-code').$getContainer('input').wrap = 'off';
			ample.getElementById('textbox-js').$getContainer('input').wrap = 'off';
			ample.getElementById('textbox-xml').$getContainer('input').wrap = 'off';
			ample.getElementById('textbox-clipboard-components').$getContainer('input').wrap = 'off';
			ample.getElementById('textbox-clipboard-members').$getContainer('input').wrap = 'off';
			ample.getElementById('textbox-project-template').$getContainer('input').wrap = 'off';
			ample.getElementById('textbox-app-js').$getContainer('input').wrap = 'off';
			ample.getElementById('textbox-app-template').$getContainer('input').wrap = 'off';
		}
		catch(oException) {}
		this.doCmd();
	},
	/**
		Checks if an object has own members
		@param	{Object}	oConfig	The object to check
		@returns	{Boolean}	Returns true if the object is empty
	*/
	isEmpty: function(oConfig) {
		var n = 0;
		for (var sItem in oConfig) {
			if (oConfig.hasOwnProperty(sItem)) { n++; }
		}
		return !n;
	},
	/**
		JDON reviver callback to restore serialized non-JSON objects
		@param	{String}	sKey	The current key name
		@param	{Object}	oValue	The current object
		@returns	{Mixed}	The restored JavaScript value
	*/
	jsonReviver: function(sKey, oValue) {
		if (sKey && typeof oValue === 'string' && (JUL.Designer.parser._regExps.regexp.test(oValue) ||
			JUL.Designer.parser._regExps.functionStart.test(oValue) || JUL.Designer.parser._regExps.newStart.test(oValue))) {
			try {
				return eval('(function(){return ' + oValue + '})()');
			}
			catch(e) {
				return oValue;
			}
		}
		return oValue;
	},
	/**
		Copies an object into a new one with the keys sorted alphabetically, properties first, methods last
		@param	{Object}	oConfig	The input object
		@param	{Array}	[aAtEnd]	Optional list of keys to put at end
		@param	{Array}	[aAtStart]	Optional list of keys to put at start
		@param	{Boolean}	[bSelf]	Set it to true to sort the input object itself. It won't work in all JavaScript engines due to specific object implementation (e.g. IE).
		@returns	{Object}	The sorted object
	*/
	keySort: function(oConfig, aAtEnd, aAtStart, bSelf) {
		var aProperties = [];
		var aArrays = [];
		var aObjects = [];
		var aMethods = [];
		aAtEnd = aAtEnd || [];
		aAtStart = aAtStart || [];
		var oTemp = bSelf ? {} : oConfig;
		for (var sItem in oConfig) {
			if (oConfig.hasOwnProperty(sItem)) {
				if (aAtEnd.indexOf(sItem) < 0 && aAtStart.indexOf(sItem) < 0) {
					var sType = JUL.typeOf(oConfig[sItem]);
					switch (sType) {
					case 'Array': aArrays.push(sItem); break;
					case 'Object': aObjects.push(sItem); break;
					case 'Function': aMethods.push(sItem); break;
					default: aProperties.push(sItem);
					}
				}
				if (bSelf) {
					oTemp[sItem] = oConfig[sItem];
					delete oConfig[sItem];
				}
			}
		}
		var aKeys = [].concat(aAtStart, aProperties.sort(), aArrays.sort(), aObjects.sort(), aMethods.sort(), aAtEnd);
		var oNew = bSelf ? oConfig : {};
		for (var i = 0; i < aKeys.length; i++) {
			var sKey = aKeys[i];
			if (typeof oTemp[sKey] !== 'undefined') { oNew[sKey] = oTemp[sKey]; }
		}
		return oNew;
	},
	/**
		Custom on-blur handler for all value fields
		@param	{Object}	oEvent	The standardized event object
	*/
	onBlur: function(oEvent) {
		if (this.getAttribute('readonly') === 'true' || this.getAttribute('class') === 'field undef') { return; }
		var oWhere = JUL.Designer.getWhere(this);
		var sValue = this.getAttribute('value');
		if (this.getAttribute('type') === 'number' && sValue) {
			sValue = parseFloat(sValue);
			if (isNaN(sValue)) {
				sValue = oWhere.val();
				if (typeof sValue === 'undefined') { sValue = ''; }
			}
			this.setAttribute('value', sValue);
		}
		if (sValue === '' && !oWhere.field.required) {
			if (typeof oWhere.val() !== 'undefined') {
				oWhere.oldValue = oWhere.val();
				oWhere.del();
			JUL.Designer.onValueUpdated(oWhere);
			}
			if (oEvent && typeof oWhere.field.defaultValue !== 'undefined') {
				if (typeof oWhere.oldValue === typeof oWhere.field.defaultValue) {
					this.setAttribute('value', oWhere.field.defaultValue);
					JUL.Designer.replaceDom(this, function() { this.setAttribute('class', 'field undef'); });
				}
				else {
					JUL.Designer.replaceDom(this, JUL.Designer.parser.createComponent(JUL.Designer.buildField(oWhere.field)));
				}
			}
			return;
		}
		if (oWhere.field.required && sValue === '') {
			sValue = oWhere.field.defaultValue;
		}
		if (oWhere.val() !== sValue) {
			oWhere.oldValue = oWhere.val();
			oWhere.val(sValue);
			JUL.Designer.onValueUpdated(oWhere);
		}
		if (oEvent) {
			if (typeof oWhere.oldValue === typeof sValue) {
				this.setAttribute('value', sValue);
			}
			else {
				JUL.Designer.replaceDom(this, JUL.Designer.parser.createComponent(JUL.Designer.buildField(oWhere.field, sValue)));
			}
		}
	},
	/**
		Custom on-blur handler for all date fields
	*/
	onDateBlur: function() {
		var sId = this.getAttribute('id');
		var oWhere = JUL.Designer.getWhere(sId);
		var oVal = oWhere.val();
		var sVal = this.$getContainer('input').value;
		if (sVal && !/^\d{4}\W\d{2}\W\d{2}$/.test(sVal)) {
			this.setAttribute('value', oVal ? oVal.getFullYear() + '-' + (101 + oVal.getMonth()).toString().substr(1) +
				'-' + (100 + oVal.getDate()).toString().substr(1) : '');
			return;
		}
		this.setAttribute('value', sVal ? sVal.substr(0, 4) + '-' + sVal.substr(5, 2) + '-' + sVal.substr(8, 2) : '');
		oWhere.field.oldValue = oVal;
		if (sVal) {
			var oDate = oVal ? new Date(oVal.getTime()) : new Date(1980, 0);
			if (!oVal) { ample.getElementById('timepicker' + sId.substr(10)).setAttribute('value', '00:00:00'); }
			oDate.setFullYear(parseInt(sVal.substr(0, 4)));
			oDate.setMonth(parseInt(sVal.substr(5, 2)) - 1);
			oDate.setDate(parseInt(sVal.substr(8, 2)));
			oWhere.val(oDate);
		}
		else {
			ample.getElementById('timepicker' + sId.substr(10)).setAttribute('value', '');
			if (oWhere.field.required) { oWhere.val(oWhere.field.defaultValue); }
			else { oWhere.del(); }
		}
		JUL.Designer.onValueUpdated(oWhere);
	},
	/**
		Custom on-blur handler for all time fields
	*/
	onTimeBlur: function() {
		var sId = this.getAttribute('id');
		var oWhere = JUL.Designer.getWhere(sId);
		var oVal = oWhere.val();
		var sVal = this.$getContainer('input').value;
		if (sVal && !/^\d{2}\W\d{2}\W\d{2}$/.test(sVal)) {
			this.setAttribute('value', oVal ? (100 + oVal.getHours()).toString().substr(1) + ':' + (100 + oVal.getMinutes()).toString().substr(1) +
				':' + (100 + oVal.getSeconds()).toString().substr(1) : '');
			return;
		}
		if (!sVal) { sVal = '00:00:00'; }
		this.setAttribute('value', sVal.substr(0, 2) + ':' + sVal.substr(3, 2) + ':' + sVal.substr(6, 2));
		oWhere.field.oldValue = oVal;
		var oDate = oVal ? new Date(oVal.getTime()) : new Date(1980, 0);
		if (!oVal) { ample.getElementById('datepicker' + sId.substr(10)).setAttribute('value', '1980-01-01'); }
		oDate.setHours(parseInt(sVal.substr(0, 2)));
		oDate.setMinutes(parseInt(sVal.substr(3, 2)));
		oDate.setSeconds(parseInt(sVal.substr(6, 2)));
		oWhere.val(oDate);
		JUL.Designer.onValueUpdated(oWhere);
	},
	/**
		Fires all listeners attached to the value-changing of one or all members of an object
		@param	{Object}	oWhere	The object to search for listeners in
	*/
	onValueUpdated: function(oWhere) {
		for (var i = 0; i < this.state.valueListeners.length; i++) {
			var oListener = this.state.valueListeners[i];
			if (oListener.ref() === oWhere.ref() && (!oListener.key() || oListener.key() === oWhere.key())) {
				oListener.listener.call(oListener.scope || oWhere.ref(), oWhere);
			}
		}
	},
	/**
		Removes one or more value-changing listeners form an object
		@param	{Object}	oOwner	The object to remove the listeners from
		@param	{String}	sItem	The key to remove the listeners from. Set it to null to search all keys
		@param	{Function}	[fListener]	A reference to the listener to remove
	*/
	removeValueListener: function(oOwner, sItem, fListener) {
		for (var i = 0; i < this.state.valueListeners.length; i++) {
			var oListener = this.state.valueListeners[i];
			if (oListener.ref() === oOwner && (!sItem || oListener.key() === sItem) &&
				(!fListener || oListener.listener === fListener)) {
				this.state.valueListeners.splice(i, 1);
				i--;
			}
		}
	},
	/**
		Replaces or transforms a DOM tree
		@param	{Object}	oOld	The DOM root to be processed
		@param	{Mixed}	oNew	If a function, it will be called to build the DOM tree. If an object, the DOM tree will be replace with it.
	*/
	replaceDom: function(oOld, oNew) {
		var fChange = false;
		if (typeof oNew === 'function' ) {
			fChange = oNew;
			oNew = oOld;
		}
		var oParent = oOld.parentNode;
		var oNext = oOld.nextSibling;
		oParent.removeChild(oOld);
		if (fChange) { fChange.call(oNew, oParent, oNext); }
		if (oNext) { oParent.insertBefore(oNew, oNext); }
		else { oParent.appendChild(oNew); }
	},
	/**
		Restores client-side UI preferences from the storing cookie
	*/
	restorePrefs: function() {
		try {
			var oRestore = JSON.parse(ample.cookie('jul-designer-prefs'));
		}
		catch (e) { return; }
		if (!oRestore || typeof oRestore !== 'object') { return; }
		for (var sItem in this._prefs) {
			if (this._prefs.hasOwnProperty(sItem) && oRestore[sItem]) {
				var aEl = ample.query(sItem);
				var aItems = oRestore[sItem];
				for (var k = 0; k < aEl.length && k < aItems.length; k++) {
					var oEl = aEl.get(k);
					var aPrefs = [].concat(this._prefs[sItem]);
					for (var i = 0; i < aPrefs.length; i++) {
						var sPref = aPrefs[i];
						if (typeof aItems[k][sPref] !== 'undefined') { oEl.setAttribute(sPref, aItems[k][sPref]); }
					}
				}
			}
		}
	},
	/**
		Converts and applies the JavaScript code in the code dialog
	*/
	saveCode: function() {
		var sText = JUL.trim(ample.getElementById('textbox-code').getAttribute('value'));
		var oCurrent = this.state.currentObject;
		oCurrent.oldValue = oCurrent.val();
		if (sText) {
			try {
				oCurrent.val(eval('(function(){return ' + sText + '})()'));
			}
			catch(e) {
				window.alert(e.description || e.message);
				return;
			}
		}
		else {
			oCurrent.del();
		}
		/* fire value-changed listeners */
		JUL.Designer.onValueUpdated(oCurrent);
		var oTwin = this.state.map[oCurrent.field.id.substr(12)]; // button-code-
		if (oTwin) {
			var oField = ample.getElementById(oTwin.field.id);
			if (oField) {
				JUL.Designer.replaceDom(oField, this.parser.create(this.buildField(oTwin.field, oTwin.val())));
			}
		}
		this.panels.code.hide();
		this.showLast();
	},
	/**
		Saves the text in the comment dialog
	*/
	saveComment: function() {
		var sText = JUL.trim(ample.getElementById('textbox-comment').getAttribute('value'));
		var oCurrent = this.state.currentObject;
		if (sText) {
			oCurrent.val(sText);
		}
		else {
			oCurrent.del();
		}
		ample.getElementById(oCurrent.field.id).setAttribute('tooltiptext', sText);
		this.panels.comment.hide();
		this.showLast();
	},
	/**
		Saves the client-side UI preferences in a cookie
	*/
	savePrefs: function() {
		var oSave = {};
		for (var sItem in this._prefs) {
			if (this._prefs.hasOwnProperty(sItem)) {
				var aEl = ample.query(sItem);
				var aItems = [];
				if (aEl.length) { oSave[sItem] = aItems; }
				for (var k = 0; k < aEl.length; k++) {
					var oEl = aEl.get(k);
					oEl.getBoundingClientRect();
					var aPrefs = [].concat(this._prefs[sItem]);
					aItems[k] = {};
					for (var i = 0; i < aPrefs.length; i++) {
						var sPref = aPrefs[i];
						var sAttr = oEl.getAttribute(sPref);
						if (sAttr && sAttr !== '0') { aItems[k][sPref] = sAttr; } 
					}
				}
			}
		}
		ample.cookie('jul-designer-prefs', JSON.stringify(oSave), {
			expires: 7,
			path: '/'
		});
	},
	/**
		Displays the code editing dialog
		@param	{Object}	oWhere	JUL.Ref object to edit
	*/
	showCode: function(oWhere) {
		var sIitle = oWhere.field.label + (oWhere.field.required ? '*' : '');
		if (oWhere.field.template) {
			sIitle = sIitle + ': ' + oWhere.field.template.substr(0, 100);
			if (oWhere.field.template.length > 100) { sIitle = sIitle + ' ...'; }
		}
		this.panels.code.setAttribute('title', sIitle);
		this.state.currentObject = oWhere;
		var oValue = oWhere.val();
		var sPrefix = '';
		if (typeof oValue === 'undefined' && typeof oWhere.field.defaultValue !== 'undefined') {
			oValue = oWhere.field.defaultValue;
			sPrefix = '/* value is undefined - default pasted */\n';
		}
		var sObject = this.parser.obj2str({o: oValue});
		var sText = sObject.slice(sObject.indexOf(':') + 1, sObject.lastIndexOf('}')).replace(/\n\t/gm, '\n');
		ample.getElementById('textbox-code').setAttribute('value', typeof oValue === 'undefined' ? '' : sPrefix + JUL.trim(sText));
		if (this.state.lastDialog) { this.state.lastDialog.hide(); }
		this.panels.code.showModal();
		setTimeout(function() {
			ample.getElementById('textbox-code').focus();
		}, 500);
	},
	/**
		Displays comment editing dialog
		@param	{Object}	oWhere	JUL.Ref object to edit
	*/
	showComment: function(oWhere) {
		this.panels.comment.setAttribute('title', oWhere.field.label);
		this.state.currentObject = oWhere;
		var oValue = oWhere.val();
		ample.getElementById('textbox-comment').setAttribute('value', oValue || '');
		if (this.state.lastDialog) { this.state.lastDialog.hide(); }
		this.panels.comment.showModal();
		setTimeout(function() {
			ample.getElementById('textbox-comment').focus();
		}, 500);
	},
	/**
		Shows the last hidden window
	*/
	showLast: function() {
		if (this.state.lastDialog) { this.state.lastDialog.showModal(); }
		if (this.state.lastDialog === this.panels.framework) {
			setTimeout(function() { JUL.Designer.framework.scrollLists(); }, 500);
		}
	},
	/**
		Checks of a string is a valid namespace for the designer.
		For this app, each segment in the space must be a member of an object and a valid variable bane.
		@param	{String}	sNS	The string to check
		@returns	{Boolean}	Returns true if the string is a valid namespace for the designer
	*/
	validNS: function(sNS) {
		var aNS = sNS.split('.');
		for (var i = 0; i < aNS.length; i++) {
			if (!JUL.UI._regExps.variable.test(aNS[i])) { return false; }
		}
		return true;
	},
	/**
		A hash between CSS selectors and lists of attributes of the UI elements
		@type	Object
		@private
	*/
	_prefs: {
		'#command-show-add': 'checked', '#command-show-menu': 'checked', '#command-show-status': 'checked', '#dialog-app': ['width', 'height'],
		'#dialog-browse': ['width', 'height'],
		'#dialog-clipboard': ['width', 'height'],
		'#dialog-code': ['width', 'height'],
		'#dialog-comment': ['width', 'height'],
		'#dialog-framework': ['width', 'height'],
		'#dialog-help': ['width', 'height'],
		'#dialog-js': ['width', 'height'],
		'#dialog-project': ['width', 'height'],
		'#dialog-xml': ['width', 'height'],
		'#listbox-app-modules xul|listheader': 'width', '#listbox-app-parser xul|listheader': 'width', '#listbox-app-settings xul|listheader': 'width', '#listbox-designer-listeners xul|listheader': 'width', '#listbox-designer-logic xul|listheader': 'width', '#listbox-designer-ui xul|listheader': 'width', '#listbox-framework-component-events xul|listheader': 'width', '#listbox-framework-component-members xul|listheader': 'width', '#listbox-framework-component-settings': 'height', '#listbox-framework-component-settings xul|listheader': 'height', '#listbox-framework-components xul|listheader': 'width', '#listbox-framework-settings xul|listheader': 'width', '#listbox-project-parser xul|listheader': 'width', '#listbox-project-settings xul|listheader': 'width', '#menubar-app': 'hidden', '#statusbar-app': 'hidden', '#tree-interface': 'height', '#tree-interface xul|treecol': 'width', '#vbox-add-component': 'hidden', '#vbox-framework-components': 'width', '#vbox-project': 'width'
	}
});

window.onbeforeunload = function(oEvent) {
	JUL.Designer.savePrefs();
	if (JUL.Designer.state.oTestWnd && !JUL.Designer.state.oTestWnd.closed) {
		JUL.Designer.state.oTestWnd.close();
	}
	if (JUL.Designer.state.oTestAppWnd && !JUL.Designer.state.oTestAppWnd.closed) {
		JUL.Designer.state.oTestAppWnd.close();
	}
	try { JUL.Designer.designer.checkSave('exit'); } catch (e) {}
	if (JUL.Designer.designer.state.notSaved) {
		return 'Unsaved changes to the project will be discarded when you leave the page';
	}
};

JUL.apply(ample.classes[JUL.UI.xmlNS.xul + '#listcell'].prototype , {
	$getTagOpen: function() {
		var oHeader	= this.parentNode.parentNode.parentNode.firstChild.childNodes[this.parentNode.childNodes.$indexOf(this)];
		var sHtml	= '<td class="xul-listcell' + (this.hasAttribute("class") ? " " + this.getAttribute("class") : "") + '"' + (oHeader && oHeader.getAttribute("hidden") === "true" ? ' style="display:none;"' : '') + '><div class="xul-listcell--box" style=""><div class="xul-listcell--label xul-listcell--gateway" style="">';
		if (this.hasAttribute("image")) {
			sHtml	+= '<img src="' + ample.$encodeXMLCharacters(this.getAttribute("image")) + '" align="absmiddle"/> ';
		}
		if (this.hasAttribute("label")) {
			sHtml	+= ample.$encodeXMLCharacters(this.getAttribute("label"));
		}
		return sHtml;
	},
	$getTagClose: function() {
		return '</div></div></td>';
	}
});

})();

/* end JUL.Designer.ja */