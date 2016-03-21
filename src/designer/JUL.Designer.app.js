/*
	JUL Designer version 1.7
	Copyright (c) 2014 - 2016 The Zonebuilder (zone.builder@gmx.com)
	http://sourceforge.net/projects/jul-designer/
	Licenses: GPLv2 or later; LGPLv3 or later (http://sourceforge.net/p/jul-designer/wiki/License/)
*/
/**
	@fileOverview	This file configures the 'Application' dialog
*/
/* jshint browser: true, curly: true, eqeqeq: true, evil: true, expr: true, funcscope: true, immed: true, latedef: true, loopfunc: true,  
	onevar: true, newcap: true, noarg: true, node: true, strict: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals ample, JUL */

(function() {
'use strict';

/* generatedBy JCS version 1.1 */

/**
	Application dialog module
	@namespace
	@name	JUL.Designer.app
*/
JUL.ns('JUL.Designer.app');

/**
	UI configuration of the app dialog
	@type	Object
*/
JUL.Designer.app.ui = {
	tag: 'dialog',
	id: 'dialog-app',
	title: 'Application',
	width: 860,
	height: 430,
	hidden: true,
	children: [
		{tag: 'tabbox', children: [
			{tag: 'tabs', id: 'tabs-app', children: [
				{tag: 'tab', label: 'Settings', width: 80, pack: 'center'},
				{tag: 'tab', label: 'Default parser', width: 80, pack: 'center'},
				{tag: 'tab', label: 'Modules', id: 'tab-app-modules', width: 80, pack: 'center'},
				{tag: 'tab', label: 'JavaScript', id: 'tab-app-js', width: 80, pack: 'center'},
				{tag: 'tab', label: 'Template', width: 80, pack: 'center'}
			]}
		]},
		{tag: 'deck', id: 'deck-app', flex: 1, children: [
			{tag: 'vbox', flex: 1, children: [
				{tag: 'listbox', flex: 1, id: 'listbox-app-settings', children: [
					{tag: 'listhead', children: [
						{tag: 'listheader', label: 'Setting', width: 220},
						{tag: 'listheader', label: 'Value', width: 220},
						{tag: 'listheader', label: 'Code', width: 40}
					]},
					{tag: 'listbody'}
				]}
			]},
			{tag: 'vbox', flex: 1, children: [
				{tag: 'listbox', flex: 1, id: 'listbox-app-parser', children: [
					{tag: 'listhead', children: [
						{tag: 'listheader', label: 'Member', width: 220},
						{tag: 'listheader', label: 'Value', width: 220},
						{tag: 'listheader', label: 'Code', width: 40}
					]},
					{tag: 'listbody'}
				]}
			]},
			{tag: 'vbox', flex: 1, children: [
				{tag: 'toolbar', children: [
					{tag: 'toolbargrippy'},
					{tag: 'toolbarbutton', label: 'Add', id: 'button-add-module', type: 'menu-button', children: [
						{tag: 'menupopup', children: [
							{tag: 'menuitem', id: 'menuitem-add-current-project', label: 'Add current project'}
						]}
					]},
					{tag: 'toolbarseparator'},
					{tag: 'toolbarbutton', label: 'Up', id: 'button-up-module'},
					{tag: 'toolbarseparator'},
					{tag: 'toolbarbutton', label: 'Down', id: 'button-down-module'},
					{tag: 'toolbarseparator'},
					{tag: 'toolbarbutton', label: 'Remove', id: 'button-remove-modules'},
					{tag: 'toolbarseparator'},
					{tag: 'toolbarbutton', label: 'Change', id: 'button-change-module'},
					{tag: 'toolbarseparator'},
					{tag: 'hbox', width: '95%', children: [
						{tag: 'textbox', id: 'textbox-module-name', style: 'width:300px;margin-top:6px', tooltiptext: 'Module name'}
					]}
				]},
				{tag: 'listbox', flex: 1, id: 'listbox-app-modules', children: [
					{tag: 'listhead', children: [
						{tag: 'listheader', label: 'Module', width: 200},
						{tag: 'listheader', label: 'Namespace', width: 300},
						{tag: 'listheader', label: 'Description', width: 120}
					]},
					{tag: 'listbody'}
				]}
			]},
			{tag: 'vbox', flex: 1, children: [
				{tag: 'textbox', id: 'textbox-app-js', readonly: true, width: '100%', multiline: true, flex: 1}
			]},
			{tag: 'vbox', flex: 1, children: [
				{tag: 'description', value: 'Testing HTML page. Besides {jul_script}, {app_script} and {modules_scripts}, all {app_<property>} properties are available.'},
				{tag: 'textbox', id: 'textbox-app-template', width: '100%', multiline: true, flex: 1}
			]}
		]}
	]
};

/**
	Inteface logic of the app dialog
	@type	Object
*/
JUL.Designer.app.logic = {
	'button-add-module': {
		listeners: {
			command: function() {
				if (this.getAttribute('open') === 'true') { return; }
				JUL.Designer.app.addModule();
			}
		}
	},
	'button-change-module': {
		listeners: {
			command: function() {
				JUL.Designer.app.changeModule();
			}
		}
	},
	'button-down-module': {
		listeners: {
			command: function() {
				JUL.Designer.app.shiftModule();
			}
		}
	},
	'button-remove-modules': {
		listeners: {
			command: function() {
				JUL.Designer.app.removeModules();
			}
		}
	},
	'button-up-module': {
		listeners: {
			command: function() {
				JUL.Designer.app.shiftModule(true);
			}
		}
	},
	'dialog-app': {
		listeners: {
			dialogaccept: function() {
				JUL.Designer.app.save();
				JUL.Designer.cleanMap();
				return false;
			},
			dialogcancel: function() {
				JUL.Designer.app.cancel();
				JUL.Designer.cleanMap();
				return false;
			}
		}
	},
	'listbox-app-modules': {
		listeners: {
			select: function() {
				var oSelected = this.selectedItems;
				var oItem = oSelected.length ? oSelected.item(oSelected.length - 1) : null;
				ample.getElementById('textbox-module-name').setAttribute('value', oItem ? JUL.Designer.getWhere(oItem) : '');
			}
		}
	},
	'menuitem-add-current-project': {
		listeners: {
			command: function() {
				JUL.Designer.app.addProject();
			}
		}
	},
	'tabs-app': {
		listeners: {
			select: function() {
				if (this.parentNode.selectedTab.getAttribute('id') === 'tab-app-js') {
					setTimeout(function() { JUL.Designer.app.fillJs(); }, 100);
				}
				ample.getElementById('deck-app').setAttribute('selectedIndex', this.parentNode.selectedIndex);
			}
		}
	},
	'textbox-app-template': {
		listeners: {
			keydown: 'JUL.Designer.filterTab', blur: function() {
				JUL.Designer.app.state.newApp.template = JUL.trim(this.getAttribute('value'));
			}
		}
	},
	'textbox-module-name': {
		listeners: {
			keypress: function(oEvent) {
				if (oEvent.keyIdentifier === 'Enter') {
					var oItems = ample.getElementById('listbox-app-modules').selectedItems;
					if (oItems.length && !oEvent.shiftKey) { JUL.Designer.app.changeModule(); }
					else { JUL.Designer.app.addModule(); }
				}
			}
		}
	}
};

JUL.apply(JUL.Designer.app, /** @lends JUL.Designer.app */ {
	/**
		It holds the current application
		@type	Object
	*/
	current: {},
	/**
		Field configuration for the app dialog
		@type	Object
	*/
	fields: {
		title: {
			tooltip: 'Application\'s title', id: 'setting-app-title', defaultValue: 'Application 1', required: true, template: '<string>'
		},
		ns: {
			tooltip: 'Namespace path', id: 'setting-app-ns', defaultValue: 'app1', required: true, template: '<string>'
		},
		init: {
			tooltip: 'Application instantiation method', id: 'setting-app-init', template: ' function() { ... }', required: true, defaultValue: function() {
				for (var sItem in this.modules) {
					if (this.modules.hasOwnProperty(sItem)) {
						var sNS = this.modules[sItem].ns;
						if (sNS.substr(0, 1) === '.') { sNS = this.ns + sNS; }
						var oModule = JUL.get(sNS);
						if (!oModule) { continue; }
						var oParser = new JUL.UI.Parser(oModule.parserConfig);
						oParser.create(oModule.ui, oModule.logic);
					}
				}
			}
		},
		preferredFramework: {
			tooltip: 'If supplied, will act as the suggested framework for new projects', id: 'setting-app-framework', template: '<string>'
		}
	},
	/**
		Field configuration for the application's parser
		@type	Object
	*/
	parserFields: null,
	/**
		It holds several state variables of the application module
		@type	Object
	*/
	state: {
		/**
			The name of the current operation
			@type	String
		*/
		currentOperation: '', /**
			Reference to the edited application
			@type	Object
		*/
		newApp: null
	},
	/**
		Adds a module to the current app
		@param	{Object}	[oInit]	Optional initializer
	*/
	addModule: function(oInit) {
		var oModules = this.state.newApp.modules;
		var nLast = 1;
		var sName = JUL.trim(ample.getElementById('textbox-module-name').getAttribute('value'));
		if (!sName || oModules[sName]) {
			while ((sName = 'module' + nLast++) && oModules[sName]) {}
		}
		ample.getElementById('textbox-module-name').setAttribute('value', '');
		oModules[sName] = JUL.apply({ns: '.' + sName}, oInit || {});
		var oFields = {};
		oFields[sName] = {ns: {required: true, defaultValue: oModules[sName].ns}};
		JUL.Designer.fillListbox('listbox-app-modules', oFields, oModules, ['label', 'value-ns', 'description-description'], true);
		ample.getElementById('listbox-app-modules').querySelector('xul|listbody').lastChild.scrollIntoView();
		ample.getElementById('listbox-app-modules').clearSelection();
	},
	/**
		Adds the current project to the current app
	*/
	addProject: function() {
		var oProject = JUL.Designer.designer.current;
		if (!oProject.ns) { return; }
		var oInit = {
			ns: oProject.ns,
			description: oProject.title
		};
		var oApp = this.state.newApp;
		if (oInit.ns.substr(0, oApp.ns.length + 1) === oApp.ns + '.') {
			oInit.ns = oInit.ns.substr(oApp.ns.length);
		}
		var sName = JUL.trim(ample.getElementById('textbox-module-name').getAttribute('value'));
		if (!sName) {
		ample.getElementById('textbox-module-name').setAttribute('value', oProject.ns.split('.').pop());
	}
	this.addModule(oInit);
	},
	/**
		Cancels the app dialog
	*/
	cancel: function() {
		this.state.newApp = null;
		JUL.Designer.panels.app.hide();
		JUL.Designer.state.lastDialog = null;
	},
	/**
		Switches the current module of the application
	*/
	changeModule: function() {
		var oSelected = ample.getElementById('listbox-app-modules').selectedItems;
		if (!oSelected.length) {
			window.alert('Please select an item');
			return;
		}
		var oItem = oSelected.item(oSelected.length - 1);
		var sItem = JUL.Designer.getWhere(oItem);
		var oModules = this.state.newApp.modules;
		var sName = JUL.trim(ample.getElementById('textbox-module-name').getAttribute('value'));
		if (!sName || sName === sItem || oModules[sName]) {
			ample.getElementById('textbox-module-name').setAttribute('value', sItem);
			return;
		}
		oModules[sName] = oModules[sItem];
		delete oModules[sItem];
		JUL.Designer.state.map[oItem.getAttribute('id')] = sName;
		oItem.firstChild.setAttribute('label', sName);
		var oNode = oItem.childNodes[1];
		while (oNode) {
			var oWhere = JUL.Designer.getWhere(oNode.firstChild);
			oWhere.field.label = sName + ' - ' + oWhere.key();
			if (oWhere.key() === 'ns') { oWhere.field.defaultValue = '.' + sName; }
			oNode = oNode.nextSibling;
		}
		ample.getElementById('listbox-app-modules').clearSelection();
	},
	/**
		Performs standardization and cleanup of the application
		@param	{Object}	oApp	App config
		@returns	{Object}	A cleaned config copy
	*/
	cleanApp: function(oApp) {
		oApp = JUL.apply({}, oApp);
		JUL.Designer.applyRequired(this.fields, oApp);
		JUL.Designer.applyRequired(this.parserFields, oApp.defaultParser);
		oApp = JUL.Designer.keySort(oApp, ['modules', 'defaultParser', 'template']);
		var aSort = [];
		var oNode = ample.getElementById('listbox-app-modules').querySelector('xul|listbody').firstChild;
		while (oNode) {
			aSort.push(JUL.Designer.getWhere(oNode));
			oNode = oNode.nextSibling;
		}
		oApp.modules = JUL.Designer.keySort(oApp.modules, aSort);
		return oApp;
	},
	/**
		Closes the current app
	*/
	close: function() {
		this.current = {};
		this.onSwitchCurrent();
	},
	/**
		Deletes the current app. The projects associated to its modules remain unaffected.
	*/
	del: function() {
		if (!this.current.ns) {
			window.alert('There is no current application');
			return;
		}
		if (!window.confirm('Are you sure to permanently delete \'' + this.current.title + '\' app?')) { return; }
		ample.post('index.php/main/manage', {
			operation: 'delete',
			type: 'app',
			ns: this.current.ns
		}, function(sResponse) {
			sResponse = JSON.parse(sResponse);
			if (sResponse.error) {
				window.alert(sResponse.error);
			}
			else {
				JUL.Designer.app.close();
			}
		});
	},
	/**
		Gets the application's download URL
		@returns	{String}	Download URL
	*/
	downloadUrl: function() {
			return 'index.php/main/manage?type=app&operation=download&ns=' + encodeURIComponent(this.current.ns) +
				'&version='+ encodeURIComponent(this.current.version);
	},
	/**
		Fills the code in the text area of the JAvaSctipt tab of the app
	*/
	fillJs: function() {
		var oScript = this.cleanApp(this.state.newApp);
		delete oScript.template;
		ample.getElementById('textbox-app-js').setAttribute('value', this.testJs(oScript, true));
	},
	/**
		Fills module choosing popups
		@param	{Boolean}	[bSelectOnly]	Do not re-compute the module list
	*/
	fillMenupopup: function(bSelectOnly) {
		var oPopup = ample.getElementById('menupopup-switch-module');
		var oPopupButton = ample.getElementById('menupopup-switch-module-button');
		var oModules = this.current.modules;
		if (!bSelectOnly) {
			ample.query(oPopup).empty();
			ample.query(oPopupButton).empty();
			if (!this.current.ns) { return; }
			var n = 1;
			for (var sItem in oModules) {
				if (oModules.hasOwnProperty(sItem)) {
					var oConfig = {
						tag: 'menuitem',
						id: 'menuitem-switch-module-' + n,
						type: 'radio',
						label: sItem,
						listeners: {
							command: function() {
								JUL.Designer.app.fillMenupopup(true);
								JUL.Designer.app.switchModule(JUL.Designer.getWhere(this));
							}
						},
						parent: oPopup
					};
					JUL.Designer.state.map[oConfig.id] = sItem;
					if (oModules[sItem].description) {
						oConfig.tooltiptext = oModules[sItem].description;
					}
					JUL.Designer.parser.createComponent(oConfig);
					oConfig.id = 'menubutton-switch-module-' + n;
					oConfig.parent = oPopupButton;
					JUL.Designer.state.map[oConfig.id] = sItem;
					JUL.Designer.parser.createComponent(oConfig);
					n++;
				}
			}
		}
		if (this.state.radioTimer) { clearTimeout(this.state.radioTimer); }
		this.state.radioTimer = setTimeout(function() {
			delete JUL.Designer.app.state.radioTimer;
			var n = 1;
			for (var sItem in oModules) {
				if (oModules.hasOwnProperty(sItem)) {
					var sNS = oModules[sItem].ns;
					if (sNS.substr(0, 1) === '.') { sNS = JUL.Designer.app.current.ns + sNS; }
					ample.getElementById('menuitem-switch-module-' + n).setAttribute('checked', sNS === JUL.Designer.designer.current.ns);
					ample.getElementById('menubutton-switch-module-' + n).setAttribute('checked', sNS === JUL.Designer.designer.current.ns);
					n++;
				}
			}
		}, 100);
	},
	/**
		Fires after the current app is switched or is closed
	*/
	onSwitchCurrent: function() {
		JUL.Designer.designer.setTitle();
		ample.getElementById('anchor-test-app').setAttribute('href', this.current.ns ? this.testUrl() : '#');
		ample.getElementById('anchor-download-app').setAttribute('href', this.current.ns ? this.downloadUrl() : '#');
		if (JUL.Designer.state.oTestAppWnd && !JUL.Designer.state.oTestAppWnd.closed) {
			JUL.Designer.state.oTestAppWnd.close();
		}
		this.fillMenupopup();
	},
	/**
		Opens an application
		@param	{String}	sItem	App namespace
	*/
	open: function(sItem) {
		ample.get('index.php/main/manage', {
			type: 'app',
			operation: 'open',
			ns: sItem,
			ts: (new Date()).getTime()
		}, function(sResponse) {
			var oResult = JSON.parse(sResponse, JUL.Designer.jsonReviver);
			if (oResult.error) {
				window.alert(oResult.error);
				return;
			}
			var oApp = JUL.Designer.app;
			JUL.Designer.panels.browse.hide();
			oApp.current = oResult.result;
			oApp.onSwitchCurrent();
			setTimeout(function() {
				for (var sItem in oApp.current.modules) {
					if (oApp.current.modules.hasOwnProperty(sItem)) {
						oApp.switchModule(sItem);
						break;
					}
				}
			}, 100);
		});
	},
	/**
		Removes several modules from the current app
	*/
	removeModules: function() {
		var oSelected = ample.getElementById('listbox-app-modules').selectedItems;
		if (!oSelected.length) {
			window.alert('Please select some items');
			return;
		}
		var oModules = this.state.newApp.modules;
		for (var i = oSelected.length - 1; i >= 0; i--) {
			var sItem = JUL.Designer.getWhere(oSelected.item(i));
			delete oModules[sItem];
		}
		ample.query(oSelected).remove();
	},
	/**
		Saves the current application
	*/
	save: function() {
		var oApp = this.state.currentOperation === 'save' ? this.current : this.state.newApp;
		if (!JUL.Designer.validNS(oApp.ns)) {
			window.alert('Invalid namespace');
			return;
		}
		oApp.version = '0.' + (new Date()).getTime();
		if (this.state.currentOperation !== 'save') { oApp = this.cleanApp(oApp); }
		var oScript = JUL.apply({}, oApp);
		delete oScript.template;
		ample.post('index.php/main/manage', {
			operation: this.state.currentOperation,
			type: 'app',
			ns: oApp.ns,
			old_ns: this.current.ns,
			json: JUL.Designer.parser.obj2str(oApp, true),
			js: this.testJs(oScript, true)
		}, function(sResponse) {
			sResponse = JSON.parse(sResponse);
			if (sResponse.error) {
				window.alert(sResponse.error);
			}
			else {
				var oApp = JUL.Designer.app;
				if (oApp.state.currentOperation === 'save') {
					ample.getElementById('anchor-test-app').setAttribute('href', oApp.testUrl());
					ample.getElementById('anchor-download-app').setAttribute('href', oApp.downloadUrl());
				}
				else {
					JUL.Designer.panels.app.hide();
					JUL.Designer.state.lastDialog = null;
					oApp.current = oApp.cleanApp(oApp.state.newApp);
					oApp.state.newApp = null;
					oApp.onSwitchCurrent();
				}
			}
		});
	},
	/**
		Moves a module up or down in the module list
		@param	{Boolean}	[bUp]	True for moving up, defaults to moving down
	*/
	shiftModule: function(bUp) {
		var oSelected = ample.getElementById('listbox-app-modules').selectedItems;
		if (!oSelected.length) { return; }
		var oNode = oSelected.item(oSelected.length - 1);
		if (bUp && !oNode.previousSibling) { return; }
		if (!bUp && !oNode.nextSibling) { return; }
		var oPreviousNode = bUp ? oNode.previousSibling : oNode;
		var oNextNode = bUp ? oNode : oNode.nextSibling;
		var oParent = oNode.parentNode;
		oParent.removeChild(oNextNode);
		oParent.insertBefore(oNextNode, oPreviousNode);
		ample.getElementById('listbox-app-modules').reflow();
		ample.getElementById('listbox-app-modules').selectItem(oNode);
	},
	/**
		Displays the application dialog
		@param	{String}	[sOperation]	The intended operation: new or edit
	*/
	show: function(sOperation) {
		if (sOperation === 'edit' && !this.current.ns) {
			window.alert('There is no current application');
			return;
		}
		this.state.newApp = {
			defaultParser: {},
			modules: {},
			version: '0.' + (new Date()).getTime()
		};
		var oCurrent = this.state.newApp;
		var oDesigner = JUL.Designer.designer;
		if (sOperation === 'edit') {
			for (var sItem in this.current) {
				if (this.current.hasOwnProperty(sItem)) {
					oCurrent[sItem] = oDesigner.copy(this.current[sItem]);
				}
			}
		}
		var sField;
		if (!this.parserFields) {
			this.parserFields = {};
			for (sField in oDesigner.parserFields) {
				if (oDesigner.parserFields.hasOwnProperty(sField)) {
					this.parserFields[sField] = JUL.apply({}, oDesigner.parserFields[sField]);
					if (this.parserFields[sField].id) {
						this.parserFields[sField].id = this.parserFields[sField].id.replace('project', 'app');
					}
				}
			}
		}
		ample.query('#listbox-app-settings>xul|listbody').empty();
		ample.query('#listbox-app-parser>xul|listbody').empty();
		ample.query('#listbox-app-modules>xul|listbody').empty();
		if (!oCurrent.template) {
			oCurrent.template = JUL.Designer.config.defaultAppTemplate;
		}
		ample.getElementById('textbox-app-template').setAttribute('value', oCurrent.template);
		JUL.Designer.fillListbox('listbox-app-settings', this.fields, oCurrent);
		JUL.Designer.fillListbox('listbox-app-parser', this.parserFields, oCurrent.defaultParser);
		var oFields = {};
		for (sField in oCurrent.modules) {
			if (oCurrent.modules.hasOwnProperty(sField)) { oFields[sField] = {ns: {required: true, defaultValue: '.' + sField}}; }
		}
		JUL.Designer.fillListbox('listbox-app-modules', oFields, oCurrent.modules, ['label', 'value-ns', 'description-description'], true);
		this.state.currentOperation = sOperation;
		JUL.Designer.panels.app.setAttribute('title',
			sOperation === 'new' ? 'New application' : 'Edit application - ' + oCurrent.title);
		JUL.Designer.state.lastDialog = JUL.Designer.panels.app;
		ample.getElementById('menuitem-add-current-project').setAttribute('disabled', !JUL.Designer.designer.current.ns);
		JUL.Designer.panels.app.showModal();
		var oTabs = JUL.Designer.panels.app.querySelector('xul|tabs');
		oTabs.firstChild.$activate();
	},
	/**
		Switches the currently opened module of the app
		@param	{String}	sItem	Module name
	*/
	switchModule: function(sItem) {
		var oModule = this.current.modules[sItem];
		var sNS = oModule.ns;
		if (sNS.substr(0, 1) === '.') { sNS = this.current.ns + sNS; }
		var oProject = JUL.Designer.designer;
		if (oProject.current.ns === sNS) { return; }
		oProject.state.initProject = {
			ns: sNS,
			title: this.current.title + ' - ' + (oModule.description || sItem.substr(0, 1).toUpperCase() + sItem.substr(1)),
			parserConfig: oProject.copy(this.current.defaultParser)
		};
		if (this.current.preferredFramework) { oProject.state.initProject.suggestedFramework = this.current.preferredFramework; }
		if (oProject.current.ns && oProject.checkSave('open_new', sNS)) { return; }
		oProject.open(sNS, true);
	},
	/**
		Gets the JavaScript code of the application config
		@param	{Object}	oJs	App config without the page template part
		@param	{Boolean}	[bComment]	Whether to generate some default comments or not
		@returns	{String}	The JavaSctipt code
	*/
	testJs: function(oJs, bComment) {
		var sJs = '/* generated by ' + JUL.Designer.title + ' version ' + JUL.Designer.version + ' */\n';
		if (bComment) {
			var oApp = JUL.Designer.keySort(oJs, ['modules']);
			delete oApp.defaultParser;
			var oParser = JUL.Designer.keySort(oJs.defaultParser);
			for (var sItem in oParser) {
				if (oParser.hasOwnProperty(sItem) && typeof JUL.UI[sItem] !== 'undefined' &&
					JSON.stringify(oParser[sItem]) === JSON.stringify(JUL.UI[sItem])) { delete oParser[sItem]; }
			}
			var aItems = [
				{suf: '', ref: oApp, desc: ''},
				{suf: '.defaultParser', ref: oParser, desc: ' default parser'}
			];
			sJs = sJs + '/* \'' + oApp.title + '\' namespace */\n';
			sJs = sJs + "JUL.ns('" + oApp.ns + "');\n\n";
			for (var i = 0; i < aItems.length; i++) {
				var oItem = aItems[i];
				sJs = sJs + (oItem.suf ? oApp.ns + oItem.suf + ' =\n' : 'JUL.apply(' + oApp.ns + ',\n');
				sJs = sJs + '/* begin \'' + oApp.title + "'" + oItem.desc + ' */\n';
				sJs = sJs + JUL.Designer.parser.obj2str(oItem.ref) + '\n';
				sJs = sJs + '/* end \'' + oApp.title + "'" + oItem.desc + ' */\n';
				sJs = sJs + (oItem.suf ? '' : ')') + ';\n\n';
			}
		}
		else {
			sJs = sJs + "JUL.ns('" + oJs.ns + "');\n";
			sJs = sJs + 'JUL.apply(' + oJs.ns + ', ' + JUL.Designer.parser.obj2str(oJs) + ');\n';
		}
		return sJs;
	},
	/**
		Retrieves the test URL of the application
		@returns	{String}	Test URL
	*/
	testUrl: function() {
			return 'index.php/main/manage?type=app&operation=test&ns=' + encodeURIComponent(this.current.ns) +
				'&version='+ encodeURIComponent(this.current.version) +
				'&current='+ encodeURIComponent(JUL.Designer.designer.current.ns || '');
	}
});

})();

/* end JUL.Designer.app.js */
