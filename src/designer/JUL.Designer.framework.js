/*
	JUL Designer version 1.7.1
	Copyright (c) 2014 - 2016 The Zonebuilder (zone.builder@gmx.com)
	http://sourceforge.net/projects/jul-designer/
	Licenses: GPLv2 or later; LGPLv3 or later (http://sourceforge.net/p/jul-designer/wiki/License/)
*/
/**
	@fileOverview	This file configures the 'Framework' dialog
*/
/* jshint browser: true, curly: true, eqeqeq: true, evil: true, expr: true, funcscope: true, immed: true, latedef: true, loopfunc: true,  
	onevar: true, newcap: true, noarg: true, node: true, strict: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals ample, JUL */

(function() {
'use strict';

/* generatedBy JCS version 1.1 */

/**
	Framework dialog and operations module
	@namespace
	@name	JUL.Designer.framework
*/
JUL.ns('JUL.Designer.framework');

/**
	UI configuration for the framework dialog
	@type	Object
*/
JUL.Designer.framework.ui = {
	tag: 'dialog',
	id: 'dialog-framework',
	title: 'Framework',
	width: 860,
	height: 430,
	hidden: true,
	children: [
		{tag: 'tabbox', children: [
			{tag: 'tabs', id: 'tabs-framework', children: [
				{tag: 'tab', label: 'Settings', width: 80, pack: 'center'},
				{tag: 'tab', label: 'Components', width: 80, pack: 'center'}
			]}
		]},
		{tag: 'deck', id: 'deck-framework', flex: 1, children: [
			{tag: 'vbox', flex: 1, children: [
				{tag: 'listbox', flex: 1, id: 'listbox-framework-settings', children: [
					{tag: 'listhead', children: [
						{tag: 'listheader', label: 'Setting', width: 220},
						{tag: 'listheader', label: 'Value', width: 220},
						{tag: 'listheader', label: 'Code', width: 40}
					]},
					{tag: 'listbody'}
				]}
			]},
			{tag: 'vbox', flex: 1, children: [
				{tag: 'hbox', flex: 1, children: [
					{tag: 'vbox', id: 'vbox-framework-components', width: 220, minwidth: 120, children: [
						{tag: 'description', css: 'caption', value: 'Component'},
						{tag: 'toolbar', children: [
							{tag: 'toolbargrippy'},
							{tag: 'toolbarbutton', label: 'Add', id: 'button-add-component'},
							{tag: 'toolbarseparator'},
							{tag: 'toolbarbutton', label: 'Remove', id: 'button-remove-component'},
							{tag: 'toolbarseparator'},
							{tag: 'toolbarbutton', label: 'Change', id: 'button-change-component'}
						]},
						{tag: 'toolbar', children: [
							{tag: 'toolbargrippy'},
							{tag: 'hbox', width: '95%', children: [
								{tag: 'textbox', id: 'textbox-component-name', style: 'margin-top:6px', tooltiptext: 'Component name', width: 200}
							]}
						]},
						{tag: 'listbox', flex: 1, id: 'listbox-framework-components', children: [
							{tag: 'listhead', children: [
								{tag: 'listheader', label: 'Name', width: 150}
							]},
							{tag: 'listbody'}
						]}
					]},
					{tag: 'splitter'},
					{tag: 'vbox', flex: 1, children: [
						{tag: 'description', css: 'caption', value: 'Component settings'},
						{tag: 'listbox', height: 120, minheight: 70, id: 'listbox-framework-component-settings', children: [
							{tag: 'listhead', children: [
								{tag: 'listheader', label: 'Setting', width: 220},
								{tag: 'listheader', label: 'Value', width: 220},
								{tag: 'listheader', label: 'Code', width: 40}
							]},
							{tag: 'listbody'}
						]},
						{tag: 'splitter'},
						{tag: 'description', css: 'caption', value: 'Members & events'},
						{tag: 'tabbox', id: 'tabbox-current-component', children: [
							{tag: 'tabs', id: 'tabs-framework-component-members', children: [
								{tag: 'tab', label: 'Members', width: 60, pack: 'center'},
								{tag: 'tab', label: 'Events', width: 60, pack: 'center'}
							]}
						]},
						{tag: 'toolbar', children: [
							{tag: 'toolbargrippy'},
							{tag: 'toolbarbutton', label: 'Add', id: 'button-add-member'},
							{tag: 'toolbarseparator'},
							{tag: 'toolbarbutton', label: 'Remove', id: 'button-remove-member'},
							{tag: 'toolbarseparator'},
							{tag: 'toolbarbutton', label: 'Change', id: 'button-change-member'},
							{tag: 'toolbarseparator'},
							{tag: 'hbox', width: '95%', children: [
								{tag: 'textbox', id: 'textbox-member-name', style: 'margin-top:6px', tooltiptext: 'Member or event name', width: 200}
							]}
						]},
						{tag: 'deck', id: 'deck-framework-component-members', flex: 1, children: [
							{tag: 'vbox', flex: 1, children: [
								{tag: 'listbox', flex: 1, id: 'listbox-framework-component-members', children: [
									{tag: 'listhead', children: [
										{tag: 'listheader', label: 'Name', width: 120},
										{tag: 'listheader', label: 'Description', width: 80},
										{tag: 'listheader', label: 'Logic', width: 60},
										{tag: 'listheader', label: 'Required', width: 60},
										{tag: 'listheader', label: 'Default value', width: 110},
										{tag: 'listheader', label: 'Code', width: 40},
										{tag: 'listheader', label: 'Template', width: 80}
									]},
									{tag: 'listbody'}
								]}
							]},
							{tag: 'vbox', flex: 1, children: [
								{tag: 'listbox', flex: 1, id: 'listbox-framework-component-events', children: [
									{tag: 'listhead', children: [
										{tag: 'listheader', label: 'Name', width: 120},
										{tag: 'listheader', label: 'Description', width: 90},
										{tag: 'listheader', label: 'Template', width: 90}
									]},
									{tag: 'listbody'}
								]}
							]}
						]}
					]}
				]}
			]}
		]}
	]
};

/**
	Interface logic for the framework dialog
	@type	Object
*/
JUL.Designer.framework.logic = {
	'button-add-component': {
		listeners: {
			command: function() {
				JUL.Designer.framework.addComponent();
			}
		}
	},
	'button-add-member': {
		listeners: {
			command: function() {
				var nIndex = ample.getElementById('tabbox-current-component').selectedIndex;
				JUL.Designer.framework.addMember(nIndex ? 'events' : 'members');
			}
		}
	},
	'button-change-component': {
		listeners: {
			command: function() {
				var oItems = ample.getElementById('listbox-framework-components').selectedItems;
				if (!oItems.length) {
					window.alert('Please select an item');
					return;
				}
				var oItem = oItems.item(oItems.length - 1);
				JUL.Designer.framework.changeComponent(JUL.Designer.getWhere(oItem), oItem);
			}
		}
	},
	'button-change-member': {
		listeners: {
			command: function() {
				var nIndex = ample.getElementById('tabbox-current-component').selectedIndex;
				var sType = nIndex ? 'events' : 'members';
				var oItems = ample.getElementById('listbox-framework-component-' + sType).selectedItems;
				if (!oItems.length) {
					window.alert('Please select an item');
					return;
				}
				var oItem = oItems.item(oItems.length - 1);
				JUL.Designer.framework.changeMember(JUL.Designer.getWhere(oItem), sType, oItem);
			}
		}
	},
	'button-remove-component': {
		listeners: {
			command: function() {
				var oItems = ample.getElementById('listbox-framework-components').selectedItems;
				if (!oItems.length) {
					window.alert('Please select some items');
					return;
				}
				var aLabels = [];
				for (var i = 0; i < oItems.length; i++) {
					aLabels[i] = JUL.Designer.getWhere(oItems.item(i));
				}
				JUL.Designer.framework.removeComponents(aLabels);
				ample.query(oItems).remove();
			}
		}
	},
	'button-remove-member': {
		listeners: {
			command: function() {
				var nIndex = ample.getElementById('tabbox-current-component').selectedIndex;
				var sType = nIndex ? 'events' : 'members';
				var oItems = ample.getElementById('listbox-framework-component-' + sType).selectedItems;
				if (!oItems.length) {
					window.alert('Please select some items');
					return;
				}
				var aLabels = [];
				for (var i = 0; i < oItems.length; i++) {
					aLabels[i] = JUL.Designer.getWhere(oItems.item(i));
				}
				ample.query(oItems).remove();
				JUL.Designer.framework.removeMembers(aLabels);
			}
		}
	},
	'dialog-framework': {
		listeners: {
			dialogaccept: function() {
				JUL.Designer.framework.save();
				JUL.Designer.cleanMap();
				return false;
			},
			dialogcancel: function() {
				JUL.Designer.framework.cancel();
				JUL.Designer.cleanMap();
				return false;
			}
		}
	},
	'listbox-framework-component-events': {
		listeners: {
			select: function(oEvent) {
				var oNodeList = this.selectedItems;
				ample.getElementById('textbox-member-name').setAttribute('value', oNodeList.length ? JUL.Designer.getWhere(oNodeList.item(oNodeList.length - 1)) : '');
			}
		}
	},
	'listbox-framework-component-members': {
		listeners: {
			select: function(oEvent) {
				var oNodeList = this.selectedItems;
				ample.getElementById('textbox-member-name').setAttribute('value', oNodeList.length ? JUL.Designer.getWhere(oNodeList.item(oNodeList.length - 1)) : '');
			}
		}
	},
	'listbox-framework-components': {
		listeners: {
			select: function(oEvent) {
				var oFramework = JUL.Designer.framework;
				if (oFramework.state.selectTimer) { clearTimeout(oFramework.state.selectTimer); }
				oFramework.state.selectTimer = setTimeout(function() {
					delete oFramework.state.selectTimer;
					var oNodeList = ample.getElementById('listbox-framework-components').selectedItems;
					oFramework.onSelectComponent(oNodeList.length ? JUL.Designer.getWhere(oNodeList.item(oNodeList.length - 1)) : null);
				}, 100);
			}
		}
	},
	'tabs-framework': {
		listeners: {
			select: function() {
				ample.getElementById('deck-framework').setAttribute('selectedIndex', this.parentNode.selectedIndex);
			}
		}
	},
	'tabs-framework-component-members': {
		listeners: {
			select: function() {
				var nIndex = ample.getElementById('tabbox-current-component').selectedIndex;
				ample.getElementById('deck-framework-component-members').setAttribute('selectedIndex', nIndex);
				var sType = nIndex ? 'events' : 'members';
				JUL.Designer.framework.currentConfig = JUL.Designer.framework.currentComponent ? JUL.Designer.framework.currentComponent[sType] : null;
				var oNodeList = ample.getElementById('listbox-framework-component-' + sType).selectedItems;
				ample.getElementById('textbox-member-name').setAttribute('value', oNodeList.length ? JUL.Designer.getWhere(oNodeList.item(oNodeList.length - 1)) : '');
			}
		}
	},
	'textbox-component-name': {
		listeners: {
			keypress: function(oEvent) {
				if (oEvent.keyIdentifier === 'Enter') {
					var oItems = ample.getElementById('listbox-framework-components').selectedItems;
					if (oItems.length && !oEvent.shiftKey) {
				var oItem = oItems.item(oItems.length - 1);
				JUL.Designer.framework.changeComponent(JUL.Designer.getWhere(oItem), oItem);
					}
					else {
						JUL.Designer.framework.addComponent();
					}
				}
			}
		}
	},
	'textbox-member-name': {
		listeners: {
			keypress: function(oEvent) {
				if (oEvent.keyIdentifier === 'Enter') {
					var nIndex = ample.getElementById('tabbox-current-component').selectedIndex;
					var sType = nIndex ? 'events' : 'members';
					var oItems = ample.getElementById('listbox-framework-component-' + sType).selectedItems;
					if (oItems.length && !oEvent.shiftKey) {
						var oItem = oItems.item(oItems.length - 1);
						JUL.Designer.framework.changeMember(JUL.Designer.getWhere(oItem), sType, oItem);
					}
					else {
						JUL.Designer.framework.addMember(sType);
					}
				}
			}
		}
	}
};

JUL.apply(JUL.Designer.framework, /** @lends JUL.Designer.framework */ {
	/**
		Meta-information for the component fields of a framework
		@type	Object
	*/
	componentFields: {
		description: {
			tooltip: 'Component description', id: 'setting-component-description', template: '<string>'
		},
		restrictParent: {
			tooltip: 'Array of component class names this can be child of (special value \'document\')', id: 'setting-component-restrict-parent', template: 'Class1", "Class2" ... ]'
		},
		inherits: {
			tooltip: 'Name or array of names of inherited component classes', id: 'setting-component-inherits', template: '<string>'
		},
		getBoundingRect: {
			tooltip: 'Component (inherited) method that gets the visible bounding rectangle', id: 'setting-component-bouding-rect', template: ' function(/*this*/) { ... return {left: <>, top: <>, width: <>, height: <>[, zIndex: <>]}; }'
		}
	},
	/**
		It holds the current framework
		@type	Object
	*/
	current: {},
	/**
		Current selected component in the component list box
		@type	Object
	*/
	currentComponent: null,
	/**
		Current config object holding a group of component members
		@type	Object
	*/
	currentConfig: null,
	/**
		Information regading framework's fields
		@type	Object
	*/
	fields: {
		title: {
			tooltip: 'Framework\'s title', id: 'setting-framework-title', defaultValue: 'Framework 1', required: true, template: '<string>'
		},
		ns: {
			tooltip: 'Namespace path', id: 'setting-framework-ns', defaultValue: 'framework1', required: true, template: '<string>'
		},
		prependNS: {
			tooltip: 'If checked, framework\'s namespace will be prepended to each component name', id: 'setting-framework-prepend-ns', required: true, defaultValue: false, template: '<boolean>'
		},
		getBoundingRect: {
			tooltip: 'Framework method that gets the visible bounding rectangle', id: 'setting-framework-bouding-rect', template: ' function(/*this*/) { ... return {left: <>, top: <>, width: <>, height: <>[, zIndex: <>]}; }'
		}
	},
	/**
		It holds some state variables of the module
		@type	Object
	*/
	state: {
		/**
			Reference to the edited framework
			@type	Object
		*/
		newFramework: null, /**
			The current operation with the framework
			@type	String
		*/
		currentOperation: ''
	},
	/**
		Adds a component to the framework
	*/
	addComponent: function() {
		var oCurrent = this.state.newFramework;
		if (!oCurrent.components) { oCurrent.components = {}; }
		var nLast = 1;
		var sName = JUL.trim(ample.getElementById('textbox-component-name').getAttribute('value'));
		if (!sName || oCurrent.components[sName]) {
			while ((sName = 'component' + nLast++) && oCurrent.components[sName]) {}
		}
		ample.getElementById('textbox-component-name').setAttribute('value', '');
		oCurrent.components[sName] = {};
		var oFields = {};
		oFields[sName] = oCurrent.components[sName];
		JUL.Designer.fillListbox('listbox-framework-components', oFields, oCurrent.components, ['label']);
		ample.getElementById('listbox-framework-components').querySelector('xul|listbody').lastChild.scrollIntoView();
		ample.getElementById('listbox-framework-components').clearSelection();
	},
	/**
		Adds a member to a framework component
		@param	{String}	sType	Member type: member or event
	*/
	addMember: function(sType) {
		if (!this.currentComponent) {
			window.alert('Please select a component from the left');
			return;
		}
		var nLast = 1;
		var sName = JUL.trim(ample.getElementById('textbox-member-name').getAttribute('value'));
		if (!sName || this.currentConfig[sName]) {
			while ((sName = sType.slice(0, -1) + nLast++) && this.currentConfig[sName]) {}
		}
		ample.getElementById('textbox-member-name').setAttribute('value', '');
		this.currentConfig[sName] = {};
		var oFields = {};
		if (sType === 'events') {
			oFields[sName] = {};
			JUL.Designer.fillListbox('listbox-framework-component-events', oFields, this.currentConfig,
				['label', 'description-description', 'description-template'], true);
		}
		else {
			this.currentConfig[sName] = {logic: false, required: false};
			oFields[sName] = {};
			JUL.Designer.fillListbox('listbox-framework-component-members', oFields, this.currentConfig,
				['label', 'description-description', 'value-logic', 'value-required', 'value-defaultValue', 'code-defaultValue', 'description-template'], true);
		}
		ample.getElementById('listbox-framework-component-' + sType).querySelector('xul|listbody').lastChild.scrollIntoView();
		ample.getElementById('listbox-framework-component-' + sType).clearSelection();
	},
	/**
		Cancels the framework editing dialog
	*/
	cancel: function() {
		this.state.newFramework = null;
		JUL.Designer.panels.framework.hide();
		JUL.Designer.state.lastDialog = null;
	},
	/**
		Changes the name of a component
		@param	{String}	sItem	Component name
		@param	{Object}	oItem	The row element in the list box
	*/
	changeComponent: function(sItem, oItem) {
		var sName = JUL.trim(ample.getElementById('textbox-component-name').getAttribute('value'));
		var oCurrent = this.state.newFramework;
		if (!sName || sName === sItem || oCurrent.components[sName]) {
			ample.getElementById('textbox-component-name').setAttribute('value', sItem);
			return;
		}
		oCurrent.components[sName] = oCurrent.components[sItem];
		delete oCurrent.components[sItem];
		JUL.Designer.state.map[oItem.getAttribute('id' )] = sName;
		oItem.firstChild.setAttribute('label', sName);
		ample.getElementById('listbox-framework-components').clearSelection();
	},
	/**
		Changes the name of a component member
		@param	{String}	sItem	Member name
		@param	{String}	sType	Member type
		@param	{Object}	oItem	The row element in the list box
		@returns	{String}	The new name
	*/
	changeMember: function(sItem, sType, oItem) {
		var sName = JUL.trim(ample.getElementById('textbox-member-name').getAttribute('value'));
		if (!sName || sName === sItem || this.currentConfig[sName]) {
			ample.getElementById('textbox-member-name').setAttribute('value', sItem);
			return false;
		}
		this.currentConfig[sName] = this.currentConfig[sItem];
		delete this.currentConfig[sItem];
		JUL.Designer.state.map[oItem.getAttribute('id')] = sName;
		oItem.firstChild.setAttribute('label', sName);
		var oNode = oItem.childNodes[1];
		while (oNode) {
			var oWhere = JUL.Designer.getWhere(oNode.firstChild);
			oWhere.field.label = sName + ' - ' + oWhere.key();
			if (oWhere.key() === 'defaultValue' && oNode.firstChild.nodeName === 'xul:button') {
				oNode.firstChild.setAttribute('tooltiptext', oWhere.field.label);
			}
			oNode = oNode.nextSibling;
		}
		ample.getElementById('listbox-framework-component-' + sType).clearSelection();
		return sName;
	},
	/**
		Closes the current framework
	*/
	close: function() {
		this.onSelectComponent();
		ample.query('#listbox-framework-components>xul|listbody').empty();
		this.current = {};
		this.onSwitchCurrent();
	},
	/**
		Deletes the current project
	*/
	del: function() {
		if (!this.current.ns) {
			window.alert('There is no current framework');
			return;
		}
		if (!window.confirm('Are you sure to permanently delete \'' + this.current.title + '\' framework?')) { return; }
		ample.post('index.php/main/manage', {
			operation: 'delete',
			type: 'framework',
			ns: this.current.ns
		}, function(sResponse) {
			sResponse = JSON.parse(sResponse);
			if (sResponse.error) {
				window.alert(sResponse.error);
			}
			else {
				JUL.Designer.framework.close();
			}
		});
	},
	/**
		Fills the component scroll box and the component drop down menu
		@param	{Object}	[oContext]	The config object related to the selected component
	*/
	fillScrollbox: function(oContext) {
		ample.query('#scrollbox-components').empty();
		ample.query('#table-add-component>tbody').empty();
		var oCurrent = this.current;
		if (!oCurrent.components) { return; }
		var sClass = false;
		if (oContext) {
			var oParser = JUL.Designer.designer.current.parserConfig;
			sClass = oContext[oParser.classProperty] || oParser.defaultClass;
			if (oParser.useTags) { sClass = sClass === oCurrent.ns ? oContext[oParser.tagProperty] : ''; }
			else if (oCurrent.prependNS && sClass.indexOf(oCurrent.ns + '.') === 0) { sClass = sClass.substr(oCurrent.ns.length + 1); }
		}
		var oScrollbox = ample.getElementById('scrollbox-components');
		var oMenupopup = ample.getElementById('table-add-component').lastChild;
		var n = 1;
		for (var sItem in JUL.Designer.keySort(oCurrent.components)) {
			var oComponent = oCurrent.components[sItem];
			var aRestrict = [];
			if (oComponent.restrictParent) { aRestrict = aRestrict.concat(oComponent.restrictParent); }
			if (oCurrent.components.hasOwnProperty(sItem) &&
				(!oComponent.restrictParent || (sClass === false && aRestrict.indexOf('document') > -1) || aRestrict.indexOf(sClass || '') > -1)
			) {
				var oItemConfig = {
					tag: 'button',
					id: 'button-add-comp-' + n,
					label: sItem,
					width: '99%',
					css: 'cbutton',
					parent: oScrollbox,
					listeners: {
						command: function() {
							JUL.Designer.designer.addComponent(JUL.Designer.getWhere(this));
						}
					}
				};
				JUL.Designer.state.map[oItemConfig.id] = sItem;
				if (oComponent.description) {
					oItemConfig.tooltiptext = oComponent.description;
				}
				JUL.Designer.parser.createComponent(oItemConfig);
				delete oItemConfig.width;
				delete oItemConfig.css;
				oItemConfig.tag = 'menuitem';
				oItemConfig.id = 'menubutton-add-comp-' + n;
				oItemConfig.parent = oMenupopup;
				JUL.Designer.state.map[oItemConfig.id] = sItem;
				JUL.Designer.parser.createComponent(oItemConfig);
				n++;
			}
		}
	},
	/**
		Returns the inherited members of a component
		@param	{Object}	oComponent	Component config
		@param	{String}	sChildren	The type of members to retrieve
		@returns	{Object}	An object with the inherited members
	*/
	getInherited: function(oComponent, sChildren) {
		if (!oComponent.inherits) { return oComponent[sChildren]; }
		var oChildren = {};
		var aInherits = [].concat(oComponent.inherits);
		var oComponents = this.current.components;
		for (var i = 0; i < aInherits.length; i++) {
			var sName = aInherits[i];
			if (oComponents[sName] && oComponents[sName] !== oComponent) {
				JUL.apply(oChildren, this.getInherited(oComponents[sName], sChildren));
			}
		}
		if (oComponent[sChildren]) { JUL.apply(oChildren, oComponent[sChildren]); }
		return oChildren;
	},
	/**
		Gt an inherited property of a component info
		@param	{Object}	oComponent	Component config
		@param	{String}	sProperty	Property name
		@returns	{String}	Inherited property
	*/
	getInheritedProperty: function(oComponent, sProperty) {
		if (!oComponent.inherits || typeof oComponent[sProperty] !== 'undefined') {
			return oComponent[sProperty];
		}
		var sValue = this._undef;
		var aInherits = [].concat(oComponent.inherits);
		var oComponents = this.current.components;
		for (var i = aInherits.length - 1; i > -1; i--) {
			var sName = aInherits[i];
			if (oComponents[sName] && oComponents[sName] !== oComponent) {
				sValue = this.getInheritedProperty(oComponents[sName], sProperty);
				if (typeof sValue !== 'undefined') { return sValue; }
			}
		}
		return sValue;
	},
	/**
		Fires after the component selection changes
		@param	{String}	sItem	Component name
	*/
	onSelectComponent: function(sItem) {
		ample.query('#listbox-framework-component-settings>xul|listbody').empty();
		ample.getElementById('textbox-member-name').setAttribute('value', '');
		ample.query('#listbox-framework-component-members>xul|listbody').empty();
		ample.query('#listbox-framework-component-events>xul|listbody').empty();
		ample.getElementById('tabbox-current-component').querySelector('xul|tabs').firstChild.$activate();
		//JUL.Designer.cleanMap();
		if (!sItem) {
			ample.getElementById('textbox-component-name').setAttribute('value', '');
			this.currentComponent = null;
			this.currentConfig = null;
			return;
		}
		var oCurrent = this.state.newFramework;
		this.currentComponent = oCurrent.components[sItem];
		if (!this.currentComponent) { return; }
		if (!this.currentComponent.members) { this.currentComponent.members = {}; }
		if (!this.currentComponent.events) { this.currentComponent.events = {}; }
		this.currentConfig = this.currentComponent.members;
		ample.getElementById('textbox-component-name').setAttribute('value', sItem);
		JUL.Designer.fillListbox('listbox-framework-component-settings', this.componentFields, this.currentComponent);
		JUL.Designer.fillListbox('listbox-framework-component-members', JUL.Designer.keySort(this.currentComponent.members), this.currentComponent.members,
			['label', 'description-description', 'value-logic', 'value-required', 'value-defaultValue', 'code-defaultValue', 'description-template'], true);
		JUL.Designer.fillListbox('listbox-framework-component-events', JUL.Designer.keySort(this.currentComponent.events), this.currentComponent.events,
			['label', 'description-description', 'description-template'], true);
	},
	/**
		Fires after the current framework is switched or is closed
	*/
	onSwitchCurrent: function() {
		JUL.Designer.designer.setTitle();
		ample.getElementById('command-prepend-namespace').setAttribute('checked', this.current.prependNS || false);
		var oProject = JUL.Designer.designer;
		if (oProject.currentNode) {
			var oWhere = JUL.Designer.getWhere(oProject.currentNode);
			this.fillScrollbox(oWhere.val());
			oProject.removeConfigListeners(oWhere.val());
			oProject.fillComponentLists(oWhere.val());
			oProject.addConfigListeners(oWhere.val());
			oProject.filterMembers(oWhere);
		}
		else {
			this.fillScrollbox();
			oProject.filterMembers();
		}
	},
	/**
		Opens a frameweork
		@param	{String}	sItem	Framework name
	*/
	open: function(sItem) {
		ample.get('index.php/main/manage', {
			type: 'framework',
			operation: 'open',
			ns: sItem,
			ts: (new Date()).getTime()
		}, function(sResponse) {
			var oResult = JSON.parse(sResponse, JUL.Designer.jsonReviver);
			if (oResult.error) {
				window.alert(oResult.error);
				return;
			}
			JUL.Designer.panels.browse.hide();
			JUL.Designer.framework.onSelectComponent();
			ample.query('#listbox-framework-components>xul|listbody').empty();
			JUL.Designer.framework.current = oResult.result;
			JUL.Designer.framework.onSwitchCurrent();
		});
	},
	/**
		Removes several components from a framework
		@param	{Array}	aNames	List of component names
	*/
	removeComponents: function(aNames) {
		var oCurrent = this.state.newFramework;
		var sName;
		if (!oCurrent.components) { return; }
		for (var i = 0; i < aNames.length; i++) {
			sName = aNames[i];
			if (oCurrent.components[sName]) {
				if (this.currentComponent === oCurrent.components[sName]) {
					this.currentComponent = null;
					this.currentConfig = null;
				}
				delete oCurrent.components[sName];
			}
		}
	},
	/**
		Removes several members from a component info
		@param	{Array}	aNames	List of member names
	*/
	removeMembers: function(aNames) {
		var sName;
		if (!this.currentConfig) { return; }
		for (var i = 0; i < aNames.length; i++) {
			sName = aNames[i];
			delete this.currentConfig[sName];
		}
	},
	/**
		Saves the current project
	*/
	save: function() {
		var oCurrent = this.state.newFramework;
		if (!JUL.Designer.validNS(oCurrent.ns)) {
			window.alert('Invalid namespace');
			return;
		}
		JUL.Designer.applyRequired(this.fields, oCurrent);
		oCurrent = JUL.Designer.keySort(oCurrent, 'components');
		if (oCurrent.components) {
			if (JUL.Designer.isEmpty(oCurrent.components)) { delete oCurrent.components; }
			else { oCurrent.components = JUL.Designer.keySort(oCurrent.components); }
			for (var sItem in oCurrent.components) {
				if (oCurrent.components.hasOwnProperty(sItem)) {
					var oComponent = oCurrent.components[sItem];
					JUL.Designer.applyRequired(this.componentFields, oComponent);
					 oComponent = JUL.Designer.keySort(oComponent, ['members', 'events']);
					oCurrent.components[sItem] = oComponent;
					if (oComponent.members) {
						if (JUL.Designer.isEmpty(oComponent.members)) { delete oComponent.members; }
						else { oComponent.members = JUL.Designer.keySort(oComponent.members); }
					}
					if (oComponent.events) {
						if (JUL.Designer.isEmpty(oComponent.events)) { delete oComponent.events; }
						else { oComponent.events = JUL.Designer.keySort(oComponent.events); }
					}
				}
			}
		}
		ample.post('index.php/main/manage', {
			operation: this.state.currentOperation,
			type: 'framework',
			ns: oCurrent.ns,
			old_ns: this.current.ns,
			json: JUL.Designer.parser.obj2str(oCurrent, true)
		}, function(sResponse) {
			sResponse = JSON.parse(sResponse);
			if (sResponse.error) {
				window.alert(sResponse.error);
			}
			else {
				JUL.Designer.panels.framework.hide();
				JUL.Designer.state.lastDialog = null;
				JUL.Designer.framework.onSelectComponent();
				ample.query('#listbox-framework-components>xul|listbody').empty();
				JUL.Designer.framework.current = JUL.Designer.framework.state.newFramework;
				JUL.Designer.framework.state.newFramework = null;
				JUL.Designer.framework.onSwitchCurrent();
			}
		});
	},
	/**
		Scrolls the selected list box elements into the view
	*/
	scrollLists: function() {
		var oItems = ample.getElementById('listbox-framework-components').selectedItems;
		if (oItems.length) { oItems.item(oItems.length - 1).scrollIntoView(); }
		oItems = ample.getElementById('listbox-framework-component-members').selectedItems;
		if (oItems.length) { oItems.item(oItems.length - 1).scrollIntoView(); }
		oItems = ample.getElementById('listbox-framework-component-events').selectedItems;
		if (oItems.length) { oItems.item(oItems.length - 1).scrollIntoView(); }
	},
	/**
		Displays the framework dialog
		@param	{String}	[sOperation]	The current operation: new or edit
	*/
	show: function(sOperation) {
		if (sOperation === 'edit' && !this.current.ns) {
			window.alert('There is no current framework');
			return;
		}
		if (sOperation === 'new') { this.state.newFramework = {}; }
		else { this.state.newFramework = JUL.Designer.designer.copy(this.current); }
		var oCurrent = this.state.newFramework;
		ample.query('#listbox-framework-settings>xul|listbody').empty();
		ample.getElementById('textbox-component-name').setAttribute('value', '');
		ample.query('#listbox-framework-component-settings>xul|listbody').empty();
		ample.getElementById('textbox-member-name').setAttribute('value', '');
		ample.query('#listbox-framework-component-members>xul|listbody').empty();
		ample.query('#listbox-framework-components>xul|listbody').empty();
		JUL.Designer.fillListbox('listbox-framework-settings', this.fields, oCurrent);
		if (oCurrent.components) {
			JUL.Designer.fillListbox('listbox-framework-components', JUL.Designer.keySort(oCurrent.components), oCurrent.components, ['label']);
		}
		this.state.currentOperation = sOperation;
		JUL.Designer.panels.framework.setAttribute('title',
			sOperation === 'new' ? 'New framework' : 'Edit framework - ' + oCurrent.title);
		JUL.Designer.state.lastDialog = JUL.Designer.panels.framework;
		JUL.Designer.panels.framework.showModal();
		JUL.Designer.panels.framework.querySelector('xul|tabs').firstChild.$activate();
	}
});

})();

/* end JUL.Designer.framework.js */
