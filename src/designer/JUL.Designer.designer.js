/*
	JUL Designer version 1.7
	Copyright (c) 2014 - 2016 The Zonebuilder (zone.builder@gmx.com)
	http://sourceforge.net/projects/jul-designer/
	Licenses: GPLv2 or later; LGPLv3 or later (http://sourceforge.net/p/jul-designer/wiki/License/)
*/
/**
	@fileOverview	This file configures the main page UI, the 'Project' dialog, and the project operations
*/
/* jshint browser: true, curly: true, eqeqeq: true, evil: true, expr: true, funcscope: true, immed: true, latedef: true, loopfunc: true,  
	onevar: true, newcap: true, noarg: true, node: true, strict: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals ample, JUL */

(function() {
'use strict';

/* generatedBy JCS version 1.1 */

/**
	Designer module. Takes care of the main page interface and of the project operations.
	@namespace
	@name	JUL.Designer.designer
*/
JUL.ns('JUL.Designer.designer');

/**
	UI configuration for the main page
	@type	Object
*/
JUL.Designer.designer.ui = {
	tag: 'page',
	children: [
		{tag: 'commandset', hidden: true, children: [
			{tag: 'command', id: 'command-new-app'},
			{tag: 'command', id: 'command-open-app'},
			{tag: 'command', id: 'command-edit-app'},
			{tag: 'command', id: 'command-close-app'},
			{tag: 'command', id: 'command-delete-app'},
			{tag: 'command', id: 'command-new-project'},
			{tag: 'command', id: 'command-open-project'},
			{tag: 'command', id: 'command-edit-project'},
			{tag: 'command', id: 'command-save-project'},
			{tag: 'command', id: 'command-close-project'},
			{tag: 'command', id: 'command-delete-project'},
			{tag: 'command', id: 'command-no-logic'},
			{tag: 'command', id: 'command-view-js'},
			{tag: 'command', id: 'command-xml-layout'},
			{tag: 'command', id: 'command-copy-node'},
			{tag: 'command', id: 'command-cut-node'},
			{tag: 'command', id: 'command-paste-node'},
			{tag: 'command', id: 'command-up-node'},
			{tag: 'command', id: 'command-down-node'},
			{tag: 'command', id: 'command-remove-node'},
			{tag: 'command', id: 'command-copy-members'},
			{tag: 'command', id: 'command-cut-members'},
			{tag: 'command', id: 'command-paste-members'},
			{tag: 'command', id: 'command-remove-members'},
			{tag: 'command', id: 'command-undo'},
			{tag: 'command', id: 'command-new-framework'},
			{tag: 'command', id: 'command-open-framework'},
			{tag: 'command', id: 'command-edit-framework'},
			{tag: 'command', id: 'command-close-framework'},
			{tag: 'command', id: 'command-delete-framework'},
			{tag: 'command', id: 'command-prepend-namespace'},
			{tag: 'command', id: 'command-help-contents'},
			{tag: 'command', id: 'command-help-about'},
			{tag: 'command', id: 'command-show-clipboard'},
			{tag: 'command', id: 'command-show-menu', checked: true},
			{tag: 'command', id: 'command-show-status', checked: true},
			{tag: 'command', id: 'command-show-add', checked: true}
		]},
		{xclass: 'html', tag: 'div', children: [
			{tag: 'menupopup', id: 'menupopup-show-bars', children: [
				{tag: 'menuitem', command: 'command-show-menu', type: 'checkbox', label: 'Show menu bar'},
				{tag: 'menuitem', command: 'command-show-add', type: 'checkbox', label: 'Show add component'},
				{tag: 'menuitem', command: 'command-show-status', type: 'checkbox', label: 'Show status bar'}
			]},
			{tag: 'menupopup', id: 'menupopup-edit'}
		]},
		{tag: 'menubar', id: 'menubar-app', context: 'menupopup-show-bars', children: [
			{tag: 'toolbargrippy'},
			{tag: 'menu', label: 'Application  ', children: [
				{tag: 'menupopup', children: [
					{tag: 'menuitem', command: 'command-new-app', label: 'New application ...'},
					{tag: 'menuitem', command: 'command-open-app', label: 'Open application ...'},
					{tag: 'menuitem', command: 'command-edit-app', label: 'Edit application ...'},
					{tag: 'menu', label: 'Switch module', children: [
						{tag: 'menupopup', id: 'menupopup-switch-module'}
					]},
					{tag: 'menuitem', command: 'command-close-app', label: 'Close application'},
					{tag: 'menuitem', command: 'command-delete-app', label: 'Delete application'}
				]}
			]},
			{tag: 'menu', label: 'Project  ', children: [
				{tag: 'menupopup', children: [
					{tag: 'menuitem', command: 'command-new-project', label: 'New project ...'},
					{tag: 'menuitem', command: 'command-open-project', label: 'Open project ...'},
					{tag: 'menuitem', command: 'command-edit-project', label: 'Edit project ...'},
					{tag: 'menuitem', command: 'command-save-project', label: 'Save project'},
					{tag: 'menuitem', command: 'command-close-project', label: 'Close project'},
					{tag: 'menuitem', command: 'command-delete-project', label: 'Delete project'},
					{tag: 'menuseparator'},
					{tag: 'menuitem', type: 'checkbox', command: 'command-no-logic', label: 'Don\'t separate logic'},
					{tag: 'menuseparator'},
					{tag: 'menuitem', command: 'command-view-js', label: 'View JavaScript'},
					{tag: 'menuitem', command: 'command-xml-layout', label: 'XML layout'}
				]}
			]},
			{tag: 'menu', label: 'Edit  ', children: [
				{tag: 'menupopup', id: 'menu-edit'}
			]},
			{tag: 'menu', label: 'Framework  ', children: [
				{tag: 'menupopup', children: [
					{tag: 'menuitem', command: 'command-new-framework', label: 'New framework ...'},
					{tag: 'menuitem', command: 'command-open-framework', label: 'Open framework ...'},
					{tag: 'menuitem', command: 'command-edit-framework', label: 'Edit framework ...'},
					{tag: 'menuitem', command: 'command-close-framework', label: 'Close framework'},
					{tag: 'menuitem', command: 'command-delete-framework', label: 'Delete framework'},
					{tag: 'menuseparator'},
					{tag: 'menuitem', type: 'checkbox', command: 'command-prepend-namespace', label: 'Prepend namespace'}
				]}
			]},
			{tag: 'menu', label: 'Help  ', children: [
				{tag: 'menupopup', children: [
					{tag: 'menuitem', command: 'command-help-contents', label: 'Contents'},
					{tag: 'menuitem', command: 'command-help-about', label: 'About'},
					{tag: 'menuseparator'},
					{tag: 'menuitem', command: 'command-show-clipboard', label: 'Show clipboard'}
				]}
			]}
		]},
		{tag: 'toolbar', context: 'menupopup-show-bars', children: [
			{tag: 'toolbargrippy'},
			{tag: 'toolbarbutton', label: 'NA', css: 'tbutton darkm', command: 'command-new-app', tooltiptext: 'New application'},
			{tag: 'toolbarbutton', label: 'OA', css: 'tbutton darkm', command: 'command-open-app', tooltiptext: 'Open application'},
			{tag: 'toolbarbutton', label: 'EA', css: 'tbutton darkm', command: 'command-edit-app', tooltiptext: 'Edit application'},
			{tag: 'toolbarbutton', label: 'SM', type: 'menu', css: 'tbutton darkm', tooltiptext: 'Switch module', children: [
				{tag: 'menupopup', id: 'menupopup-switch-module-button'}
			]},
			{tag: 'toolbarbutton', label: 'CA', css: 'tbutton darkm', command: 'command-close-app', tooltiptext: 'Close application'},
			{tag: 'toolbarbutton', label: 'XA', css: 'tbutton darkm', command: 'command-delete-app', tooltiptext: 'Delete application'},
			{tag: 'toolbarseparator'},
			{tag: 'toolbarbutton', label: 'NP', css: 'tbutton darkr', tooltiptext: 'New project', command: 'command-new-project'},
			{tag: 'toolbarbutton', label: 'OP', css: 'tbutton darkr', tooltiptext: 'Open project', command: 'command-open-project'},
			{tag: 'toolbarbutton', label: 'EP', css: 'tbutton darkr', tooltiptext: 'Edit project', command: 'command-edit-project'},
			{tag: 'toolbarbutton', label: 'SP', css: 'tbutton darkr', tooltiptext: 'Save project', command: 'command-save-project'},
			{tag: 'toolbarbutton', label: 'CP', css: 'tbutton darkr', tooltiptext: 'Close project', command: 'command-close-project'},
			{tag: 'toolbarbutton', label: 'XP', css: 'tbutton darkr', tooltiptext: 'Delete project', command: 'command-delete-project'},
			{tag: 'toolbarbutton', label: 'NL', type: 'checkbox', css: 'tbutton darkr', tooltiptext: 'Don\'t separate logic', command: 'command-no-logic'},
			{tag: 'toolbarbutton', label: 'JS', css: 'tbutton darkr', tooltiptext: 'View JavaScript', command: 'command-view-js'},
			{tag: 'toolbarbutton', label: 'XL', css: 'tbutton darkr', tooltiptext: 'XML layout', command: 'command-xml-layout'},
			{tag: 'toolbarseparator'},
			{tag: 'toolbarbutton', label: 'AC', id: 'tbutton-add-component', type: 'menu', css: 'tbutton darky', tooltiptext: 'Add component', children: [
				{tag: 'menupopup', children: [
					{xclass: 'html', tag: 'td', colspan: 4, height: 1, width: 148, children: [
						{tag: 'scrollbox', flex: 1, orient: 'vertical', children: [
							{xclass: 'html', tag: 'table', id: 'table-add-component', cols: 4, width: '100%', border: 0, cellspacing: 0, cellpadding: 0, children: [
								{xclass: 'html', tag: 'tbody'}
							]}
						]}
					]}
				]}
			]},
			{tag: 'toolbarbutton', label: 'CC', css: 'tbutton darky', tooltiptext: 'Copy components', command: 'command-copy-node'},
			{tag: 'toolbarbutton', label: 'TC', css: 'tbutton darky', tooltiptext: 'Cut components', command: 'command-cut-node'},
			{tag: 'toolbarbutton', label: 'PC', css: 'tbutton darky', tooltiptext: 'Paste components', command: 'command-paste-node'},
			{tag: 'toolbarbutton', label: 'UP', css: 'tbutton darky', tooltiptext: 'Move component up', command: 'command-up-node'},
			{tag: 'toolbarbutton', label: 'DN', css: 'tbutton darky', tooltiptext: 'Move component down', command: 'command-down-node'},
			{tag: 'toolbarbutton', label: 'XC', css: 'tbutton darky', tooltiptext: 'Remove components', command: 'command-remove-node'},
			{tag: 'toolbarbutton', label: 'CM', css: 'tbutton darky', tooltiptext: 'Copy members', command: 'command-copy-members'},
			{tag: 'toolbarbutton', label: 'TM', css: 'tbutton darky', tooltiptext: 'Cut members', command: 'command-cut-members'},
			{tag: 'toolbarbutton', label: 'PM', css: 'tbutton darky', tooltiptext: 'Paste members', command: 'command-paste-members'},
			{tag: 'toolbarbutton', label: 'XM', css: 'tbutton darky', tooltiptext: 'Remove members', command: 'command-remove-members'},
			{tag: 'toolbarbutton', label: 'UN', css: 'tbutton darky', tooltiptext: 'Undo', command: 'command-undo'},
			{tag: 'toolbarseparator'},
			{tag: 'toolbarbutton', label: 'NF', css: 'tbutton darkg', tooltiptext: 'New framework', command: 'command-new-framework'},
			{tag: 'toolbarbutton', label: 'OF', css: 'tbutton darkg', tooltiptext: 'Open framework', command: 'command-open-framework'},
			{tag: 'toolbarbutton', label: 'EF', css: 'tbutton darkg', tooltiptext: 'Edit framework', command: 'command-edit-framework'},
			{tag: 'toolbarbutton', label: 'CF', css: 'tbutton darkg', tooltiptext: 'Close framework', command: 'command-close-framework'},
			{tag: 'toolbarbutton', label: 'XF', css: 'tbutton darkg', tooltiptext: 'Delete framework', command: 'command-delete-framework'},
			{tag: 'toolbarbutton', label: 'PN', type: 'checkbox', css: 'tbutton darkg', tooltiptext: 'Prepend namespace', command: 'command-prepend-namespace'},
			{tag: 'toolbarseparator'},
			{tag: 'toolbarbutton', label: 'HC', css: 'tbutton darkb', tooltiptext: 'Contents', command: 'command-help-contents'},
			{tag: 'toolbarbutton', label: 'HA', css: 'tbutton darkb', tooltiptext: 'About', command: 'command-help-about'},
			{tag: 'toolbarbutton', label: 'SC', css: 'tbutton darkb', tooltiptext: 'Show clipboard', command: 'command-show-clipboard'},
			{tag: 'toolbarbutton', label: 'SB', css: 'tbutton darkb', type: 'menu', tooltiptext: 'Show bars', children: [
				{tag: 'menupopup', children: [
					{tag: 'menuitem', command: 'command-show-menu', type: 'checkbox', label: 'Show menu bar'},
					{tag: 'menuitem', command: 'command-show-add', type: 'checkbox', label: 'Show add component'},
					{tag: 'menuitem', command: 'command-show-status', type: 'checkbox', label: 'Show status bar'}
				]}
			]},
			{tag: 'vbox', flex: 1},
			{xclass: 'html', tag: 'div', width: 205, style: 'padding:5px 17px 0 0;text-align:right', children: [
				{xclass: 'html', tag: 'a', id: 'anchor-test', css: 'tbutton', target: '_test', href: '#', html: 'TP', title: 'Open the project in a separate window'},
				{xclass: 'html', tag: 'a', id: 'anchor-download', css: 'tbutton', style: 'margin-left:10px', href: '#', html: 'DP', title: 'Download saved project'},
				{xclass: 'html', tag: 'a', id: 'anchor-test-app', css: 'tbutton', style: 'margin-left:10px', target: '_test_app', href: '#', html: 'TA', title: 'Open the application in a separate window'},
				{xclass: 'html', tag: 'a', id: 'anchor-download-app', css: 'tbutton', style: 'margin-left:10px', href: '#', html: 'DA', title: 'Download saved application'}
			]}
		]},
		{tag: 'hbox', flex: 1, children: [
			{tag: 'vbox', id: 'vbox-project', width: 440, context: 'menupopup-edit', children: [
				{tag: 'hbox', flex: 1, children: [
					{tag: 'vbox', width: '100%', children: [
						{tag: 'description', value: 'Component tree', css: 'caption'},
						{tag: 'toolbar', children: [
							{tag: 'toolbargrippy'},
							{tag: 'toolbarbutton', label: 'Up', command: 'command-up-node'},
							{tag: 'toolbarseparator'},
							{tag: 'toolbarbutton', label: 'Down', command: 'command-down-node'},
							{tag: 'toolbarseparator'},
							{tag: 'toolbarbutton', label: 'Remove', command: 'command-remove-node'},
							{tag: 'toolbarseparator'},
							{tag: 'toolbarbutton', label: 'Find', id: 'button-tree-search'},
							{tag: 'toolbarseparator'},
							{tag: 'hbox', width: '95%', children: [
								{tag: 'textbox', id: 'textbox-tree-search', style: 'margin-top:6px', tooltiptext: 'Component ID or binding ID', maxwidth: 200, width: '100%'}
							]}
						]},
						{tag: 'hbox', children: [
							{tag: 'label', value: 'Show'},
							{tag: 'menulist', id: 'menulist-designer-members', children: [
								{tag: 'menupopup'}
							]},
							{tag: 'label', value: 'in'},
							{tag: 'menulist', id: 'menulist-designer-members-where', children: [
								{tag: 'menupopup', children: [
									{tag: 'menuitem', label: 'ui', value: 'ui'},
									{tag: 'menuitem', label: 'logic', value: 'logic'}
								]}
							]}
						]},
						{tag: 'hbox', children: [
							{tag: 'spacer', width: 80},
							{tag: 'label', value: 'as'},
							{tag: 'menulist', id: 'menulist-designer-members-type', children: [
								{tag: 'menupopup', children: [
									{tag: 'menuitem', label: 'Array', value: 'Array'},
									{tag: 'menuitem', label: 'Object', value: 'Object'}
								]}
							]}
						]},
						{tag: 'tree', id: 'tree-interface', minheight: 120, height: 220, children: [
							{tag: 'treecols', children: [
								{tag: 'treecol', width: 164, label: 'Component', primary: true},
								{tag: 'treecol', width: 50, label: 'ID'},
								{tag: 'treecol', width: 120, label: 'Members'}
							]},
							{tag: 'treebody'}
						]},
						{tag: 'splitter'},
						{tag: 'description', value: 'Component members', css: 'caption', id: 'label-component'},
						{tag: 'tabbox', id: 'tabbox-designer-members', children: [
							{tag: 'tabs', id: 'tabs-designer-members', children: [
								{tag: 'tab', label: 'UI', width: 60, pack: 'center'},
								{tag: 'tab', label: 'Logic', width: 60, pack: 'center'},
								{tag: 'tab', label: 'Listeners', width: 60, pack: 'center'}
							]}
						]},
						{tag: 'toolbar', children: [
							{tag: 'toolbargrippy'},
							{tag: 'toolbarbutton', label: 'Add', id: 'button-designer-add'},
							{tag: 'toolbarseparator'},
							{tag: 'toolbarbutton', label: 'Remove', command: 'command-remove-members'},
							{tag: 'toolbarseparator'},
							{tag: 'toolbarbutton', label: 'Change', id: 'button-designer-change'},
							{tag: 'toolbarseparator'},
							{tag: 'hbox', width: '95%', children: [
								{tag: 'textbox', id: 'textbox-designer-name', style: 'margin-top:6px', tooltiptext: 'Member or event name', maxwidth: 200, width: '100%'}
							]}
						]},
						{tag: 'deck', id: 'deck-designer-members', flex: 1, children: [
							{tag: 'vbox', flex: 1, children: [
								{tag: 'listbox', flex: 1, id: 'listbox-designer-ui', children: [
									{tag: 'listhead', children: [
										{tag: 'listheader', label: 'Member', width: 100},
										{tag: 'listheader', label: 'Value', width: 120},
										{tag: 'listheader', label: 'Code', width: 40}
									]},
									{tag: 'listbody'}
								]}
							]},
							{tag: 'vbox', flex: 1, children: [
								{tag: 'listbox', flex: 1, id: 'listbox-designer-logic', children: [
									{tag: 'listhead', children: [
										{tag: 'listheader', label: 'Member', width: 100},
										{tag: 'listheader', label: 'Value', width: 120},
										{tag: 'listheader', label: 'Code', width: 40}
									]},
									{tag: 'listbody'}
								]}
							]},
							{tag: 'vbox', flex: 1, children: [
								{tag: 'listbox', flex: 1, id: 'listbox-designer-listeners', children: [
									{tag: 'listhead', children: [
										{tag: 'listheader', label: 'Listener', width: 100},
										{tag: 'listheader', label: 'Value', width: 120},
										{tag: 'listheader', label: 'Code', width: 40}
									]},
									{tag: 'listbody'}
								]}
							]}
						]}
					]},
					{tag: 'spacer', width: 3},
					{tag: 'vbox', id: 'vbox-add-component', width: 140, children: [
						{tag: 'description', value: 'Add component', css: 'caption'},
						{tag: 'scrollbox', id: 'scrollbox-components', flex: 1, orient: 'vertical'}
					]}
				]}
			]},
			{tag: 'splitter', id: 'splitter-test'},
			{tag: 'vbox', flex: 1, children: [
				{tag: 'description', value: 'Project', css: 'caption', id: 'label-project'},
				{tag: 'deck', id: 'deck-test', flex: 1, children: [
					{tag: 'vbox', flex: 1, children: [
						{xclass: 'html', tag: 'div', flex: 1, children: [
							{xclass: 'html', tag: 'iframe', id: 'iframe-test', name: 'iframe-test', width: '100%', height: '100%', seamless: 'yes', style: 'border:0'}
						]}
					]},
					{tag: 'vbox', flex: 1, children: [
						{xclass: 'html', tag: 'div', flex: 1, id: 'test-bck'}
					]}
				]}
			]}
		]},
		{tag: 'statusbar', id: 'statusbar-app', context: 'menupopup-show-bars', children: [
			{tag: 'spacer', width: 4},
			{tag: 'statusbarpanel', id: 'statusbarpanel-main', label: JUL.Designer.title + ' version ' + JUL.Designer.version, flex: 1},
			{tag: 'spacer', width: 4},
			{tag: 'statusbarpanel', id: 'statusbarpanel-app', label: '', flex: 1},
			{tag: 'spacer', width: 4},
			{tag: 'statusbarpanel', id: 'statusbarpanel-project', label: '', flex: 1},
			{tag: 'spacer', width: 4},
			{tag: 'statusbarpanel', id: 'statusbarpanel-framework', label: '', flex: 1},
			{tag: 'spacer', width: 4},
			{tag: 'statusbarpanel', id: 'statusbarpanel-selection', label: '', flex: 1},
			{tag: 'spacer', width: 4}
		]}
	]
};

/**
	Interface logic for the main page
	@type	Object
*/
JUL.Designer.designer.logic = {
	'anchor-download': {
		listeners: {
			click: function() {
				var sSrc = this.getAttribute('href');
				if (sSrc.substr(0, 1) === '#') { return false; }
			}
		}
	},
	'anchor-download-app': {
		listeners: {
			click: function() {
				var sSrc = this.getAttribute('href');
				if (sSrc.substr(0, 1) === '#') { return false; }
			}
		}
	},
	'anchor-test': {
		listeners: {
			click: function() {
			var sSrc = this.getAttribute('href');
			if (sSrc.substr(0, 1) === '#') { return false; }
			if (JUL.Designer.state.oTestWnd && !JUL.Designer.state.oTestWnd.closed) {
				JUL.Designer.state.oTestWnd.close();
			}
			JUL.Designer.state.oTestWnd = window.open(sSrc, '_test');
			return false;
			}
		}
	},
	'anchor-test-app': {
		listeners: {
			click: function() {
			var sSrc = this.getAttribute('href');
			if (sSrc.substr(0, 1) === '#') { return false; }
			if (JUL.Designer.state.oTestAppWnd && !JUL.Designer.state.oTestAppWnd.closed) {
				JUL.Designer.state.oTestAppWnd.close();
			}
			JUL.Designer.state.oTestAppWnd = window.open(sSrc, '_test_app');
			return false;
			}
		}
	},
	'button-designer-add': {
		listeners: {
			command: function() {
				var nIndex = ample.getElementById('tabbox-designer-members').selectedIndex;
				JUL.Designer.designer.addMember(nIndex ? (nIndex < 2 ? 'logic' : 'listeners') : 'ui');
			}
		}
	},
	'button-designer-change': {
		listeners: {
			command: function() {
				var nIndex = ample.getElementById('tabbox-designer-members').selectedIndex;
				var sType = nIndex ? (nIndex < 2 ? 'logic' : 'listeners') : 'ui';
				var oItems = ample.getElementById('listbox-designer-' + sType).selectedItems;
				if (!oItems.length) {
					window.alert('Please select an item');
					return;
				}
				var oItem = oItems.item(oItems.length - 1);
				JUL.Designer.designer.changeMember(JUL.Designer.getWhere(oItem), sType, oItem);
			}
		}
	},
	'button-tree-search': {
		listeners: {
			command: function() {
				if (!JUL.Designer.designer.current.ui) { return; }
				JUL.Designer.designer.searchId(ample.getElementById('textbox-tree-search').getAttribute('value'));
			}
		}
	},
	'command-close-app': {
		listeners: {
			command: function() {
				JUL.Designer.app.close();
			}
		}
	},
	'command-close-framework': {
		listeners: {
			command: function() {
				JUL.Designer.framework.close();
			}
		}
	},
	'command-close-project': {
		listeners: {
			command: function() {
				JUL.Designer.designer.close();
				JUL.Designer.cleanMap();
			}
		}
	},
	'command-copy-members': {
		listeners: {
			command: function() {
				JUL.Designer.designer.onCopyMembers();
			}
		}
	},
	'command-copy-node': {
		listeners: {
			command: function() {
				JUL.Designer.designer.onCopyNode();
			}
		}
	},
	'command-cut-members': {
		listeners: {
			command: function() {
				JUL.Designer.designer.onCopyMembers(true);
			}
		}
	},
	'command-cut-node': {
		listeners: {
			command: function() {
				JUL.Designer.designer.onCopyNode(true);
			}
		}
	},
	'command-delete-app': {
		listeners: {
			command: function() {
				JUL.Designer.app.del();
			}
		}
	},
	'command-delete-framework': {
		listeners: {
			command: function() {
				JUL.Designer.framework.del();
			}
		}
	},
	'command-delete-project': {
		listeners: {
			command: function() {
				JUL.Designer.designer.del();
			}
		}
	},
	'command-down-node': {
		listeners: {
			command: function() {
				var oNodeList = ample.getElementById('tree-interface').selectedItems;
				if (!oNodeList.length) {
					window.alert('Please select a component');
					return;
				}
				var oNode = oNodeList.item(oNodeList.length - 1);
				if (oNode.nextSibling) {
					JUL.Designer.designer.shiftNode(oNode);
				}
			}
		}
	},
	'command-edit-app': {
		listeners: {
			command: function() {
				JUL.Designer.app.show('edit');
			}
		}
	},
	'command-edit-framework': {
		listeners: {
			command: function() {
				JUL.Designer.framework.show('edit');
			}
		}
	},
	'command-edit-project': {
		listeners: {
			command: function() {
				JUL.Designer.designer.show('edit');
			}
		}
	},
	'command-help-about': {
		listeners: {
			command: function() {
				JUL.Designer.panels.about.showModal();
			}
		}
	},
	'command-help-contents': {
		listeners: {
			command: function() {
				JUL.Designer.panels.help.showModal();
			}
		}
	},
	'command-new-app': {
		listeners: {
			command: function() {
				JUL.Designer.app.show('new');
			}
		}
	},
	'command-new-framework': {
		listeners: {
			command: function() {
				JUL.Designer.framework.show('new');
			}
		}
	},
	'command-new-project': {
		listeners: {
			command: function() {
				JUL.Designer.designer.show('new');
			}
		}
	},
	'command-no-logic': {
		listeners: {
			command: function() {
				var bCheck = this.getAttribute('checked') !== 'true';
				this.setAttribute('checked', bCheck);
				if (JUL.Designer.designer.current.ns) {
					JUL.Designer.designer.current.noLogic = bCheck;
					delete JUL.Designer.designer.state.clipboard.undo;
					JUL.Designer.designer.onSelectNode(JUL.Designer.designer.currentNode);
				}
			}
		}
	},
	'command-open-app': {
		listeners: {
			command: function() {
				JUL.Designer.designer.showBrowse('app');
			}
		}
	},
	'command-open-framework': {
		listeners: {
			command: function() {
				JUL.Designer.designer.showBrowse('framework');
			}
		}
	},
	'command-open-project': {
		listeners: {
			command: function() {
				JUL.Designer.designer.showBrowse('project');
			}
		}
	},
	'command-paste-members': {
		listeners: {
			command: function() {
				JUL.Designer.designer.onPasteMembers();
			}
		}
	},
	'command-paste-node': {
		listeners: {
			command: function() {
				JUL.Designer.designer.onPasteNode();
			}
		}
	},
	'command-prepend-namespace': {
		listeners: {
			command: function() {
				var bCheck = this.getAttribute('checked') !== 'true';
				this.setAttribute('checked', bCheck);
				if (JUL.Designer.framework.current.ns) { JUL.Designer.framework.current.prependNS = bCheck; }
			}
		}
	},
	'command-remove-members': {
		listeners: {
			command: function() {
				JUL.Designer.designer.onCopyMembers(true, true);
			}
		}
	},
	'command-remove-node': {
		listeners: {
			command: function() {
				JUL.Designer.designer.onCopyNode(true, true);
			}
		}
	},
	'command-save-project': {
		listeners: {
			command: function() {
				JUL.Designer.designer.saveCurrent();
				JUL.Designer.cleanMap();
			}
		}
	},
	'command-show-add': {
		listeners: {
			command: function() {
				var bCheck = this.getAttribute('checked') !== 'true';
				this.setAttribute('checked', bCheck);
				ample.getElementById('vbox-add-component').setAttribute('hidden', !bCheck);
			}
		}
	},
	'command-show-clipboard': {
		listeners: {
			command: function() {
				JUL.Designer.designer.showClipboard();
			}
		}
	},
	'command-show-menu': {
		listeners: {
			command: function() {
				var bCheck = this.getAttribute('checked') !== 'true';
				this.setAttribute('checked', bCheck);
				ample.getElementById('menubar-app').setAttribute('hidden', !bCheck);
			}
		}
	},
	'command-show-status': {
		listeners: {
			command: function() {
				var bCheck = this.getAttribute('checked') !== 'true';
				this.setAttribute('checked', bCheck);
				ample.getElementById('statusbar-app').setAttribute('hidden', !bCheck);
			}
		}
	},
	'command-undo': {
		listeners: {
			command: function() {
				JUL.Designer.designer.undo();
			}
		}
	},
	'command-up-node': {
		listeners: {
			command: function() {
				var oNodeList = ample.getElementById('tree-interface').selectedItems;
				if (!oNodeList.length) {
					window.alert('Please select a component');
					return;
				}
				var oNode = oNodeList.item(oNodeList.length - 1);
				if (oNode.previousSibling) {
					JUL.Designer.designer.shiftNode(oNode, true);
				}
			}
		}
	},
	'command-view-js': {
		listeners: {
			command: function() {
				JUL.Designer.designer.showJs();
			}
		}
	},
	'command-xml-layout': {
		listeners: {
			command: function() {
				JUL.Designer.designer.showXml();
			}
		}
	},
	'listbox-designer-listeners': {
		listeners: {
			select: function(oEvent) {
				var oNodeList = this.selectedItems;
				ample.getElementById('textbox-designer-name').setAttribute('value', oNodeList.length ? JUL.Designer.getWhere(oNodeList.item(oNodeList.length - 1)) : '');
			}
		}
	},
	'listbox-designer-logic': {
		listeners: {
			select: function(oEvent) {
				var oNodeList = this.selectedItems;
				ample.getElementById('textbox-designer-name').setAttribute('value', oNodeList.length ? JUL.Designer.getWhere(oNodeList.item(oNodeList.length - 1)) : '');
			}
		}
	},
	'listbox-designer-ui': {
		listeners: {
			select: function(oEvent) {
				var oNodeList = this.selectedItems;
				ample.getElementById('textbox-designer-name').setAttribute('value', oNodeList.length ? JUL.Designer.getWhere(oNodeList.item(oNodeList.length - 1)) : '');
			}
		}
	},
	'menu-edit': {
		children: null
	},
	'menuliist-designer-members': {
		listeners: {
			command: function() {
				if (!JUL.Designer.designer.currentNode) {
					this.setAttribute('value', '');
				}
				var sValue = this.getAttribute('value');
				JUL.Designer.designer.onMembersSelect(sValue);
			}
		}
	},
	'menuliist-designer-members-type': {
		listeners: {
			command: function() {
				if (!JUL.Designer.designer.currentNode) {
					this.setAttribute('value', '');
				}
				var sValue = this.getAttribute('value');
				JUL.Designer.designer.onMembersTypeSelect(sValue);
			}
		}
	},
	'menulist-designer-members': {
		listeners: {
			command: function() {
				var oList = this;
				setTimeout(function() {
					if (!JUL.Designer.designer.currentNode) {
						oList.setAttribute('value', '');
					return;
					}
					JUL.Designer.designer.showMembers(oList.getAttribute('value'));
				}, 50);
			}
		}
	},
	'menulist-designer-members-type': {
		listeners: {
			command: function() {
				var oList = this;
				setTimeout(function() {
					if (!JUL.Designer.designer.currentNode) {
						oList.setAttribute('value', '');
					return;
					}
					JUL.Designer.designer.changeType(oList.getAttribute('value'));
				}, 50);
			}
		}
	},
	'menulist-designer-members-where': {
		listeners: {
			command: function() {
				var oList = this;
				var sValue = this.getAttribute('value');
				setTimeout(function() {
					if (!JUL.Designer.designer.currentNode) {
						oList.setAttribute('value', '');
					return;
					}
					if (JUL.Designer.designer.current.noLogic) {
						oList.setAttribute('value', sValue);
					return;
					}
					JUL.Designer.designer.changeWhere(oList.getAttribute('value'));
				}, 50);
			}
		}
	},
	'menupopup-edit': {
		children: null
	},
	'splitter-test': {
		listeners: {
			mousedown: function() {
				ample.getElementById('deck-test').setAttribute('selectedIndex', 1);
			},
			mouseup: function() {
				if (JUL.Designer.designer.current.ns) { ample.getElementById('deck-test').setAttribute('selectedIndex', 0); }
			}
		}
	},
	'tabs-designer-members': {
		listeners: {
			select: function() {
				var nIndex = ample.getElementById('tabbox-designer-members').selectedIndex;
				ample.getElementById('deck-designer-members').setAttribute('selectedIndex', nIndex);
				var sType = nIndex ? (nIndex < 2 ? 'logic' : 'listeners') : 'ui';
				if (JUL.Designer.designer.currentNode) {
					var oConfig = JUL.Designer.getWhere(JUL.Designer.designer.currentNode).val();
					var oTarget = JUL.Designer.designer.getTarget(oConfig);
					switch(sType) {
					case 'ui': JUL.Designer.designer.currentConfig = oConfig; break;
					case 'logic': JUL.Designer.designer.currentConfig = oTarget; break;
					case 'listeners': JUL.Designer.designer.currentConfig = oTarget[JUL.Designer.designer.current.listenersProperty]; break;
					}
				}
				else {
					JUL.Designer.designer.currentConfig = null;
				}
				var oNodeList = ample.getElementById('listbox-designer-' + sType).selectedItems;
				ample.getElementById('textbox-designer-name').setAttribute('value', oNodeList.length ? JUL.Designer.getWhere(oNodeList.item(oNodeList.length - 1)) : '');
			}
		}
	},
	'tbutton-add-component': {
		listeners: {
			click: function() {
				this.firstChild.firstChild.setAttribute('height', 1);
				if (this.firstChild.getAttribute('hidden') === 'true') { return; }
				var oTable = ample.getElementById('table-add-component').lastChild;
				if (!oTable.childNodes.length) { return; }
				var nSize = ample.documentElement.getBoundingClientRect().bottom - this.getBoundingClientRect().bottom;
				nSize = nSize < 21 ? 0 : nSize - 21;
				var nHeight = oTable.lastChild.getBoundingClientRect().bottom - this.getBoundingClientRect().bottom + 6;
				this.firstChild.firstChild.setAttribute('height', nHeight < nSize ? nHeight : nSize);
			}
		}
	},
	'textbox-designer-name': {
		listeners: {
			keypress: function(oEvent) {
				if (oEvent.keyIdentifier === 'Enter') {
					var nIndex = ample.getElementById('tabbox-designer-members').selectedIndex;
					var sType = nIndex ? (nIndex < 2 ? 'logic' : 'listeners') : 'ui';
					var oItems = ample.getElementById('listbox-designer-' + sType).selectedItems;
					if (oItems.length && !oEvent.shiftKey) {
						var oItem = oItems.item(oItems.length - 1);
						JUL.Designer.designer.changeMember(JUL.Designer.getWhere(oItem), sType, oItem);
					}
					else {
						JUL.Designer.designer.addMember(sType);
					}
				}
			}
		}
	},
	'textbox-tree-search': {
		listeners: {
			keypress: function(oEvent) {
				if (oEvent.keyIdentifier === 'Enter') {
					if (!JUL.Designer.designer.current.ui) { return; }
					JUL.Designer.designer.searchId(this.getAttribute('value'));
				}
			}
		}
	},
	'tree-interface': {
		listeners: {
			select: function(oEvent) {
				var oDesigner = JUL.Designer.designer;
				if (oDesigner.state.selectTimer) { clearTimeout(oDesigner.state.selectTimer); }
				oDesigner.state.selectTimer = setTimeout(function() {
					delete oDesigner.state.selectTimer;
					var oNodeList = ample.getElementById('tree-interface').selectedItems;
					oDesigner.onSelectNode(oNodeList.length ? oNodeList.item(oNodeList.length - 1) : null);
				}, 100);
			},
			click: function(oEvent) {
				if (oEvent.target.nodeName === 'xul:treecell') {
					setTimeout(function() { JUL.Designer.designer.onCellClick(); }, 150);
				}
			}
		}
	}
};

/**
	Project dialog UI config
	@type	Object
*/
JUL.Designer.designer.projectUi = {
	tag: 'dialog',
	id: 'dialog-project',
	title: 'Project',
	width: 860,
	height: 430,
	hidden: true,
	children: [
		{tag: 'tabbox', children: [
			{tag: 'tabs', id: 'tabs-project', children: [
				{tag: 'tab', label: 'Settings', width: 80, pack: 'center'},
				{tag: 'tab', label: 'Parser', width: 80, pack: 'center'},
				{tag: 'tab', label: 'Template', width: 80, pack: 'center'}
			]}
		]},
		{tag: 'deck', id: 'deck-project', flex: 1, children: [
			{tag: 'vbox', flex: 1, children: [
				{tag: 'listbox', flex: 1, id: 'listbox-project-settings', children: [
					{tag: 'listhead', children: [
						{tag: 'listheader', label: 'Setting', width: 220},
						{tag: 'listheader', label: 'Value', width: 220},
						{tag: 'listheader', label: 'Code', width: 40}
					]},
					{tag: 'listbody'}
				]}
			]},
			{tag: 'vbox', flex: 1, children: [
				{tag: 'listbox', flex: 1, id: 'listbox-project-parser', children: [
					{tag: 'listhead', children: [
						{tag: 'listheader', label: 'Member', width: 220},
						{tag: 'listheader', label: 'Value', width: 220},
						{tag: 'listheader', label: 'Code', width: 40}
					]},
					{tag: 'listbody'}
				]}
			]},
			{tag: 'vbox', flex: 1, children: [
				{tag: 'description', value: 'Testing HTML page. Besides {jul_script} and {project_script}, all {project_<property>} properties are available.'},
				{tag: 'textbox', id: 'textbox-project-template', width: '100%', multiline: true, flex: 1}
			]}
		]}
	]
};

/**
	Project dialog logic config
	@type	Object
*/
JUL.Designer.designer.projectLogic = {
	'dialog-project': {
		listeners: {
			dialogaccept: function() {
				JUL.Designer.designer.save();
				JUL.Designer.cleanMap();
				return false;
			},
			dialogcancel: function() {
				JUL.Designer.designer.cancel();
				JUL.Designer.cleanMap();
				return false;
			}
		}
	},
	'tabs-project': {
		listeners: {
			select: function() {
				ample.getElementById('deck-project').setAttribute('selectedIndex', this.parentNode.selectedIndex);
			}
		}
	},
	'textbox-project-template': {
		listeners: {
			keydown: 'JUL.Designer.filterTab', blur: function() {
				JUL.Designer.designer.state.newProject.template = JUL.trim(this.getAttribute('value'));
			}
		}
	}
};

JUL.apply(JUL.Designer.designer, /** @lends JUL.Designer.designer */ {
	/**
		Keeps the current opened project
		@type	Object
	*/
	current: {},
	/**
		Keeps the current node config object
		@type	Object
	*/
	currentConfig: null,
	/**
		Keeps the current node in the UI tree panel
		@type	Object
	*/
	currentNode: null,
	/**
		Shares the config of the edit menu with the context popup menu
		@type	Array
	*/
	editUi: [
		{tag: 'menuitem', label: 'Copy components', command: 'command-copy-node'},
		{tag: 'menuitem', label: 'Cut components', command: 'command-cut-node'},
		{tag: 'menuitem', label: 'Paste components', command: 'command-paste-node'},
		{tag: 'menuitem', label: 'Move component up', command: 'command-up-node'},
		{tag: 'menuitem', label: 'Move component down', command: 'command-down-node'},
		{tag: 'menuitem', label: 'Remove components', command: 'command-remove-node'},
		{tag: 'menuseparator'},
		{tag: 'menuitem', label: 'Copy members', command: 'command-copy-members'},
		{tag: 'menuitem', label: 'Cut members', command: 'command-cut-members'},
		{tag: 'menuitem', label: 'Paste members', command: 'command-paste-members'},
		{tag: 'menuitem', label: 'Remove members', command: 'command-remove-members'},
		{tag: 'menuseparator'},
		{tag: 'menuitem', label: 'Undo', command: 'command-undo'}
	],
	/**
		A hash that stores the field configuration for the project's properties
		@type	Object
	*/
	fields: {
		title: {
			tooltip: 'Project\'s title', id: 'setting-project-title', defaultValue: 'Project 1', required: true, template: '<string>'
		},
		ns: {
			tooltip: 'Namespace path', id: 'setting-project-ns', defaultValue: 'project1', required: true, template: '<string>'
		},
		init: {
			tooltip: 'Project instantiation method', id: 'setting-project-init', template: ' function() { ... }', required: true, defaultValue: function() {
				var oParser = new JUL.UI.Parser(this.parserConfig);
				oParser.create(this.ui, this.logic);
			}
		},
		suggestedFramework: {
			tooltip: 'If not empty, will try to open this framework when opening the project', id: 'setting-project-framework', template: '<string>'
		},
		listenersProperty: {
			tooltip: 'Name of the event listeners property', id: 'setting-project-listeners-property', defaultValue: 'listeners', required: true, template: '<string>'
		},
		noLogic: {
			tooltip: 'Don\'t separate logic from UI', required: true, defaultValue: false, template: '<boolean>'
		}
	},
	/**
		A hash that stores the field configuration for the project parser's properties
		@type	Object
	*/
	parserFields: {
		classProperty: {
			tooltip: 'Name of the class property', id: 'setting-project-class-property', defaultValue: 'xclass', required: true, template: '<string>'
		},
		defaultClass: {
			tooltip: 'Name of the default class', id: 'setting-project-default-class', required: true, defaultValue: 'Object', template: '<string>'
		},
		childrenProperty: {
			tooltip: 'Name of the children property', id: 'setting-project-children-property', defaultValue: 'children', required: true, template: '<string>'
		},
		membersProperties: {
			tooltip: 'Array of other members properties', id: 'setting-project-members-properties', defaultValue: [], required: true, template: '["category1", "category2" ... ]'
		},
		idProperty: {
			tooltip: 'Name of the ID property', id: 'setting-project-id-property', defaultValue: 'id', required: true, template: '<string>'
		},
		bindingProperty: {
			tooltip: 'Name of the binding ui with logic property', id: 'setting-project-binding-property', defaultValue: 'cid', required: true, template: '<string>'
		},
		useTags: {
			tooltip: 'Whether to use tags in configs', id: 'setting-project-use-tags', required: true, defaultValue: false, template: '<boolean>'
		},
		tagProperty: {
			tooltip: 'Name of the tag property', id: 'setting-project-tag-property', defaultValue: 'tag', required: true, template: '<string>'
		},
		customFactory: {
			tooltip: 'If supplied, it will be passed the component config', id: 'setting-project-custom-factory', template: ' function(oConfig) { ... return oInstance; }'
		},
		topDown: {
			tooltip: 'Check this for a top-down instantiation', required: true, defaultValue: false, template: '<boolean>'
		},
		parentProperty: {
			tooltip: 'Needed if topDown is checked', required: true, defaultValue: 'parent', template: '<string>'
		}
	},
	/**
		Runtime state for the current module
		@type	Object
	*/
	state: {
		/**
			It holds both the copied nodes and the copied fields
			@type	Object
		*/
		clipboard: {}, /**
			Name of the current operation on the project
			@type	String
		*/
		currentOperation: '', /**
			It stores edited properties of the project dialog
			@type	Object
		*/
		newProject: null, /**
			True if the project is not saved
			@type	Boolean
		*/
		notSaved: false
	},
	/**
		Adds a component to the UI tree of the project
		@param	{String}	sItem	Component name
	*/
	addComponent: function(sItem) {
		if (!this.current.ns) {
			this.show('new');
			return;
		}
		var oCurrent = this.current.parserConfig;
		var oFramework = JUL.Designer.framework.current;
		/* pick the component from the current framework */
		var oComponent = oFramework.components[sItem];
		var oWhere = null;
		var bToArray = false;
		if (this.currentNode) {
			/* find the reference of the parent config */
			var oParentWhere = JUL.Designer.getWhere(this.currentNode);
			var oParentConfig = oParentWhere.val();
			var sParentId = this.getId(oParentConfig);
			if (sParentId && this.current.logic[sParentId] &&
				ample.getElementById('menulist-designer-members-where').getAttribute('value') === 'logic') {
				oParentConfig = this.current.logic[sParentId];
				}
			if (ample.getElementById('menulist-designer-members-type').getAttribute('value') === 'Object') {
				if (!oParentConfig[oParentWhere.showWhat]) {
					/* add a reference to the new component config */
					oWhere = new JUL.Ref({ref: oParentConfig, key: oParentWhere.showWhat});
				}
			}
			if (!oWhere) {
			if (!oParentConfig[oParentWhere.showWhat]) { oParentConfig[oParentWhere.showWhat] = []; }
				if (JUL.typeOf(oParentConfig[oParentWhere.showWhat]) !== 'Array') {
					oParentConfig[oParentWhere.showWhat] = [oParentConfig[oParentWhere.showWhat]];
					var oChildWhere = JUL.Designer.getWhere(this.currentNode.querySelector('xul|treechildren').firstChild);
					oChildWhere.ref(oParentConfig[oParentWhere.showWhat], 0);
					oChildWhere.parent = new JUL.Ref({ref: oParentConfig, key: oParentWhere.showWhat});
					ample.getElementById('menulist-designer-members-type').setAttribute('value', 'Array');
					bToArray = true;
				}
				/* add a reference to the new component config */
				oWhere = new JUL.Ref({ref: oParentConfig[oParentWhere.showWhat], key: oParentConfig[oParentWhere.showWhat].length, 
					parent: new JUL.Ref({ref: oParentConfig, key: oParentWhere.showWhat})});
			}
		}
		else {
			if (this.current.ui) {
				window.alert('There may be only one root component');
				return;
			}
			/* add a reference to the new component config */
			oWhere = new JUL.Ref({ref: this.current, key: 'ui'});
		}
		/* create the new component config */
		var oConfig = {};
		oWhere.val(oConfig);
		var sClass = oCurrent.useTags ? oFramework.ns : (oFramework.prependNS ? oFramework.ns + '.' + sItem : sItem);
		//if (oCurrent.defaultClass !== sClass) { oConfig[oCurrent.classProperty] = sClass; }
		oConfig[oCurrent.classProperty] = sClass;
		if (oCurrent.useTags) { oConfig[oCurrent.tagProperty] = sItem; }
		var sId = false;
		if (!this.current.noLogic)	{
			sId = (oCurrent.useTags ? oConfig[oCurrent.tagProperty] : sClass) + '-' + this.current.lastComponentId++;
			oConfig[oCurrent.bindingProperty] = sId;
		}
		if (oComponent) {
			/* apply the required values of the component class */
			var oMembers = JUL.Designer.framework.getInherited(oComponent, 'members') || {};
			for (var sMember in JUL.Designer.keySort(oMembers)) {
				if (oMembers.hasOwnProperty(sMember) && (oMembers[sMember].required || typeof oMembers[sMember].defaultValue) === 'string') {
					var oMember = oMembers[sMember];
					var oTarget = oConfig;
					if (!this.current.noLogic && oMember.logic) {
						if (!this.current.logic[sId]) { this.current.logic[sId] = {}; }
						oTarget = this.current.logic[sId];
					}
					oTarget[sMember] = oMember.defaultValue;
				}
			}
		}
		/* set undo data */
		this.state.clipboard.undo = {
			operation: 'addNodes',
			where: [oWhere],
			logic: [],
			toArray: bToArray,
			show: false
		};
		if (this.currentNode) {
			this.state.clipboard.undo.show = this.findPath(oParentWhere.val());
		}
		if (sId && this.current.logic[sId]) {
			this.state.clipboard.undo.logic.push(sId);
		}
		this.save(true, true);
		var oNode = this.buildTree(this.currentNode, oWhere);
		ample.getElementById('tree-interface').reflow();
		oNode.scrollIntoView();
	},
	/**
		Adds value listeners for the current edited config
		@param	{Object}	oConfig	The config object
	*/
	addConfigListeners: function(oConfig) {
		var oTarget = this.getTarget(oConfig);
		JUL.Designer.addValueListener(oConfig, this.current.parserConfig.classProperty, this.onClassUpdated, this);
		if (this.current.parserConfig.useTags) {
			JUL.Designer.addValueListener(oConfig, this.current.parserConfig.tagProperty, this.onClassUpdated, this);
		}
		JUL.Designer.addValueListener(oConfig, this.current.parserConfig.idProperty, this.onIdUpdated, this);
		if (!this.current.noLogic) {
			JUL.Designer.addValueListener(oConfig, this.current.parserConfig.bindingProperty, this.onBindingUpdated, this);
		}
		JUL.Designer.addValueListener(oConfig, null, this.onConfigUpdated, this);
		if (oTarget !== oConfig) { JUL.Designer.addValueListener(oTarget, null, this.onConfigUpdated, this); }
		JUL.Designer.addValueListener(oTarget[this.current.listenersProperty], null, this.onConfigUpdated, this);
	},
	/**
		Adds a member to the current config part (UI, logic or listeners).
		If the member name isn't supplied in the interface, it is auto-generated.
		@param	{String}	sType	Type of member to add
	*/
	addMember: function(sType) {
		if (!this.currentNode) {
			window.alert('Please select a component from the top');
			return;
		}
		var nLast = 1;
		var sName = JUL.trim(ample.getElementById('textbox-designer-name').getAttribute('value'));
		if (!sName || typeof this.currentConfig[sName] !== 'undefined' || this.getExclude().indexOf(sName) > -1 ||
			ample.query('#listbox-designer-' + sType + '>xul|listbody xul|listcell[label=' + sName + ']').length) {
			while ((sName = (sType === 'listeners' ? 'event' : 'member') + nLast++) && (typeof this.currentConfig[sName] !== 'undefined' ||
				this.getExclude().indexOf(sName) > -1 || ample.query('#listbox-designer-' + sType + '>xul|listbody xul|listcell[label=' + sName + ']').length)) {}
		}
		ample.getElementById('textbox-designer-name').setAttribute('value', '');
		/* build the editable field into the list box */
		var oFields = {};
		oFields[sName] = {tooltip: sType === 'listeners' ? 'Custom event' : 'Custom ' + sType + ' member'};
		JUL.Designer.fillListbox('listbox-designer-' + sType, oFields, this.currentConfig);
		ample.getElementById('listbox-designer-' + sType).querySelector('xul|listbody').lastChild.scrollIntoView();
		ample.getElementById('listbox-designer-' + sType).clearSelection();
	},
	/**
		Generates a tree panel node and its descendants as given by a config object
		@param	{Object}	[oParent]	The parent node in the tree panel. If omitted, the whole tree will be built.
		@param	{Object}	[oWhere]	Reference to the node's config object. Omit to assume the root config of the current project.
		@param	{Boolean}	[bOnlyChildren]	If true, only the descendants of the parent node are built
		@param	{Boolean}	[bSelf]	For internal use only
		@returns	{Object}	Root element of the generated tree
	*/
	buildTree: function(oParent, oWhere, bOnlyChildren, bSelf) {
		var oCurrent = this.current.parserConfig;
		var oNode = null;
		if (!oWhere) {
			oWhere = new JUL.Ref({ref: this.current, key: 'ui'});
		}
		if (!oWhere.val()) { return; }
		if (!oParent) {
			oParent = ample.getElementById('tree-interface').querySelector('xul|treebody');
		}
		if (!oParent.querySelector('xul|treechildren')) {
			JUL.Designer.parser.createComponent({tag: 'treechildren', parent: oParent});
		}
		if (!bSelf && oParent.nodeName ===  'xul:treeitem') { oParent.setAttribute('open', true); }
		var oConfig = oWhere.val();
		oWhere.showWhat = oWhere.showWhat || this.getFirstChildren(oConfig);
		var sId = this.getId(oConfig);
		if (bOnlyChildren) {
			oNode = oParent;
		}
		else {
			var sClass = oConfig[oCurrent.classProperty] || oCurrent.defaultClass;
			/* find the names of the members collections */
			var aMembers = [];
			var aSearch = [].concat(oCurrent.childrenProperty, oCurrent.membersProperties);
			for (var k = 0; k < aSearch.length; k++) {
				if (sId && this.current.logic[sId] && this.current.logic[sId][aSearch[k]] && typeof this.current.logic[sId][aSearch[k]] === 'object') { aMembers.push(aSearch[k]); }
				else if (oConfig[aSearch[k]] && typeof oConfig[aSearch[k]] === 'object') { aMembers.push(aSearch[k]); }
			}
			/* build the new node */
			var oNodeConfig = {
				tag: 'treeitem',
				id: 'node-' + JUL.Designer.state.lastId++,
				container: true,
				open: true,
				children: [
					{tag: 'treerow', children: [
						{tag: 'treecell', label: oCurrent.useTags ? (sClass === oCurrent.defaultClass ? '' : sClass + ':') + oConfig[oCurrent.tagProperty] : sClass},
						{tag: 'treecell', label: oConfig[oCurrent.idProperty] || ' '},
						{tag: 'treecell', label: aMembers.join(', ')}
					]}
				]
			};
			JUL.Designer.state.map[oNodeConfig.id] = oWhere;
			oNode = JUL.Designer.parser.create(oNodeConfig, null, oParent.querySelector('xul|treechildren'));
		}
		if (sId && this.current.logic[sId] && this.current.logic[sId][oWhere.showWhat] &&
			typeof this.current.logic[sId][oWhere.showWhat] === 'object') {
			oConfig = this.current.logic[sId];
		}
		/* build viewable child nodes */
		if (oConfig[oWhere.showWhat] && typeof oConfig[oWhere.showWhat] === 'object') {
			var sType = JUL.typeOf(oConfig[oWhere.showWhat]);
			var aItems = [].concat(oConfig[oWhere.showWhat]);
			for (var i = 0; i < aItems.length; i++) {
				var oChildWhere = null;
				if (sType === 'Array') {
					oChildWhere = new JUL.Ref({ref: oConfig[oWhere.showWhat], key: i, parent: new JUL.Ref({
						ref: oConfig, key: oWhere.showWhat
					})});
				}
				else {
					oChildWhere = new JUL.Ref({ref: oConfig, key: oWhere.showWhat});
				}
				this.buildTree(oNode, oChildWhere, false, true);
			}
		}
		else {
			oNode.setAttribute('container', false);
		}
		if (!bSelf && oParent.nodeName === 'xul:treeitem') {
			this.setCellLabel(oParent, 'members');
		}
		if (!bSelf) { return oNode; }
	},
	/**
		Cancels editing project's properties
	*/
	cancel: function() {
		this.state.newProject = null;
		JUL.Designer.panels.project.hide();
		JUL.Designer.state.lastDialog = null;
		//this.fillInterface();
	},
	/**
		Changes the name of the selected member
		@param	{String}	sItem	Old name of the member
		@param	{String}	sType	Member type: UI, logic or listeners
		@param	{Object}	oNode	Selected list box row
		@returns	{String}	The new member name
	*/
	changeMember: function(sItem, sType, oNode) {
		var sName = JUL.trim(ample.getElementById('textbox-designer-name').getAttribute('value'));
		if (!sName || sName === sItem || typeof this.currentConfig[sName] !== 'undefined' || this.getExclude().indexOf(sName) > -1 ||
			ample.query('#listbox-designer-' + sType + '>xul|listbody xul|listcell[label=' + sName + ']').length) {
			ample.getElementById('textbox-designer-name').setAttribute('value', sItem);
			return false;
		}
		var bSave = false;
		if (typeof this.currentConfig[sItem] !== 'undefined') {
			/* set undo data */
			this.state.clipboard.undo = {
				operation: 'changeMembers',
				owner: this.currentConfig,
				items: {},
				del: [],
					show: JUL.Designer.getWhere(this.currentNode),
				tabIndex: ample.getElementById('tabbox-designer-members').selectedIndex
			};
			this.state.clipboard.undo.del.push(sName);
			this.state.clipboard.undo.items[sItem] = this.currentConfig[sItem];
			this.currentConfig[sName] = this.currentConfig[sItem];
			var oWhere = JUL.Designer.getWhere(oNode.childNodes[1].firstChild);
			if (oWhere.field.required) {
				this.currentConfig[sItem] = oWhere.field.defaultValue;
			}
			else {
				delete this.currentConfig[sItem];
			}
			bSave = true;
		}
		if (bSave) { this.save(true, true); }
		JUL.Designer.state.map[oNode.getAttribute('id')] = sName;
		/* update member label where needed */
		oNode.firstChild.setAttribute('label', sName);
		var sId = oNode.childNodes[1].firstChild.getAttribute('id');
		JUL.Designer.state.map[sId].key(sName);
		JUL.Designer.state.map[sId].field.label = sName;
		JUL.Designer.state.map['button-code-' + sId].key(sName);
		JUL.Designer.state.map['button-code-' + sId].field.label = sName;
		ample.getElementById('button-code-' + sId).setAttribute('tooltiptext',
		 	JUL.Designer.state.map[sId].field.template ? sName + ': ' + JUL.Designer.state.map[sId].field.template : sName);
		ample.getElementById('listbox-designer-' + sType).clearSelection();
		return sName;
	},
	/**
		Changes the JavaScript type of the displayed member collection to either Array or Object
		@param	{String}	sType	The new desired type: Array or Object
	*/
	changeType: function(sType) {
		var oWhere = JUL.Designer.getWhere(this.currentNode);
		var oConfig = oWhere.val();
		var sId = this.getId(oConfig);
		if (sId && this.current.logic[sId] && this.current.logic[sId][oWhere.showWhat] &&
			typeof this.current.logic[sId][oWhere.showWhat] === 'object') {
			oConfig = this.current.logic[sId];
		}
		if (!oConfig[oWhere.showWhat] || JUL.typeOf(oConfig[oWhere.showWhat]) === sType) { return; }
		if (sType === 'Object' && JUL.typeOf(oConfig[oWhere.showWhat]) === 'Array') {
			if (oConfig[oWhere.showWhat].length > 1) {
				ample.getElementById('menulist-designer-members-type').setAttribute('value', 'Array');
				window.alert('Please reduce the array to at most one element');
				return;
			}
			var oChildWhere = null;
			if (oConfig[oWhere.showWhat].length) {
				this.state.clipboard.undo = {
					operation: 'changeType',
					target: oConfig,
					what: oWhere.showWhat,
					toArray: false,
					show: this.findPath(oWhere.val())
				};
				oConfig[oWhere.showWhat] = oConfig[oWhere.showWhat][0];
				oChildWhere = JUL.Designer.getWhere(this.currentNode.querySelector('xul|treechildren').firstChild);
				oChildWhere.ref(oConfig, oWhere.showWhat);
				delete oChildWhere.parent;
				this.save(true, true);
			}
		}
		if (sType === 'Array' && JUL.typeOf(oConfig[oWhere.showWhat]) === 'Object') {
			this.state.clipboard.undo = {
				operation: 'changeType',
				target: oConfig,
				what: oWhere.showWhat,
				toArray: true,
				show: this.findPath(oWhere.val())
			};
			oConfig[oWhere.showWhat] = [oConfig[oWhere.showWhat]];
				oChildWhere = JUL.Designer.getWhere(this.currentNode.querySelector('xul|treechildren').firstChild);
				oChildWhere.ref(oConfig[oWhere.showWhat], 0);
				oChildWhere.parent = new JUL.Ref({ref: oConfig, key: oWhere.showWhat});
				this.save(true, true);
		}
	},
	/**
		Vhanges the membership of the displayed member collection either to the UI configuration or to the interface logic
		@param	{String}	sTarget	Target type: UI or logic
	*/
	changeWhere: function(sTarget) {
		var oWhere = JUL.Designer.getWhere(this.currentNode);
		var sWhere = 'ui';
		var oConfig = oWhere.val();
		var sId = this.getId(oConfig);
		if (sId && this.current.logic[sId] && this.current.logic[sId].hasOwnProperty(oWhere.showWhat)) {
			sWhere = 'logic';
		}
		if (sTarget === sWhere) { return; }
		var bArray = JUL.typeOf(oConfig[oWhere.showWhat]) === 'Array';
		var oChild = null;
		var oChildWhere = null;
		if (sTarget === 'logic' && sWhere === 'ui') {
			if (!sId) {
				ample.getElementById('menulist-designer-members-where').setAttribute('value', 'ui');
				window.alert('The component must have an ID or a binding ID');
				return;
			}
			if (!oConfig[oWhere.showWhat]) { return; }
			this.state.clipboard.undo = {
				operation: 'changeWhere',
				where: oWhere,
				what: oWhere.showWhat,
				toLogic: true,
				show: this.findPath(oWhere.val())
			};
			this.current.logic[sId][oWhere.showWhat] = oConfig[oWhere.showWhat];
			delete oConfig[oWhere.showWhat];
			oChild = this.currentNode.querySelector('xul|treechildren').firstChild;
			while (oChild) {
				oChildWhere = JUL.Designer.getWhere(oChild);
				if (bArray) { oChildWhere.parent.ref(this.current.logic[sId]); }
				else { oChildWhere.ref(this.current.logic[sId]); }
				oChild = oChild.nextSibling;
			}
			this.save(true, true);
		}
		if (sTarget === 'ui' && sWhere === 'logic') {
			this.state.clipboard.undo = {
				operation: 'changeWhere',
				where: oWhere,
				what: oWhere.showWhat,
				toLogic: false,
				show: this.findPath(oWhere.val())
			};
			oConfig[oWhere.showWhat] = this.current.logic[sId][oWhere.showWhat];
			delete this.current.logic[sId][oWhere.showWhat];
			oChild = this.currentNode.querySelector('xul|treechildren').firstChild;
			while (oChild) {
				oChildWhere = JUL.Designer.getWhere(oChild);
				if (bArray) { oChildWhere.parent.ref(oConfig); }
				else { oChildWhere.ref(oConfig); }
				oChild = oChild.nextSibling;
			}
			this.save(true, true);
		}
	},
	/**
		Checks and, if necessary, ask if the current project is saved
		@param	{String}	[sPending]	An additional operation to be launched immediately after saving
		@param	{Object}	[oArg]	Optional arguments for the pending operation
		@returns	{Boolean}	True if the project has been saved
	*/
	checkSave: function(sPending, oArg) {
		if (this.state.notSaved && window.confirm('Project not saved. Do you want to save it now?')) {
			if (sPending) { this.state.pending = sPending; }
			if (oArg) { this.state.pendingArg = oArg; }
			this.state.currentOperation = 'save';
			this.save();
			return true;
		}
		return false;
	},
	/**
		Removes empty member collections, empty logic, and other un-necessary data form the passed config
		@param	{Object}	oConfig	Configuration object
	*/
	cleanConfig: function(oConfig) {
		var oCurrent = this.current.parserConfig;
		if (!oCurrent) { return; }
		JUL.Designer.keySort(oConfig, 
			[].concat(this.current.listenersProperty, oCurrent.childrenProperty, oCurrent.membersProperties),
			[oCurrent.classProperty,oCurrent.tagProperty, oCurrent.idProperty, oCurrent.bindingProperty],
		true);
		//if (oConfig[oCurrent.classProperty] === oCurrent.defaultClass) { delete oConfig[oCurrent.classProperty]; }
		var sId = this.getId(oConfig);
		var oTarget = this.getTarget(oConfig, sId);
			if (oTarget[this.current.listenersProperty]) {
			if (JUL.Designer.isEmpty(oTarget[this.current.listenersProperty])) { delete oTarget[this.current.listenersProperty]; }
			else {
				JUL.Designer.keySort(oTarget[this.current.listenersProperty], null, null, true);
			}
		}
		if (oTarget !== oConfig) {
			if (JUL.Designer.isEmpty(oTarget)) { delete this.current.logic[sId]; }
			else {
				JUL.Designer.keySort(oTarget,
					[].concat(this.current.listenersProperty, oCurrent.childrenProperty, oCurrent.membersProperties),
					[oCurrent.classProperty,oCurrent.tagProperty, oCurrent.idProperty, oCurrent.bindingProperty],
				true);
			}
		}
	},
	/**
		Cleans and standardizes an entire configuration tree, making it ready for JavaScript code exporting
		@param	{Object}	[oUi]	UI configuration, if not specified, it defaults to the current project UI
		@param	{Object}	[oLogic]	Interface logic, if not specified, it defaults to the current project logic
		@returns	{Object}	An object with two members: 'ui' for the new cleaned UI, and 'logic' for the new logic
	*/
	cleanTree: function(oUi, oLogic) {
		oUi = oUi || this.current.ui;
		oLogic = oLogic || this.current.logic;
		var oTree = {ui: null, logic: null};
		if (!oUi) { return oTree; }
		oTree.logic = JUL.Designer.keySort(oLogic);
		var oCurrent = this.current.parserConfig;
		var sListeners = this.current.listenersProperty;
		/* get he names of the member collection, to put them last in the config objects */
		var aMembers = [].concat(oCurrent.childrenProperty, oCurrent.membersProperties);
		/* make a recursive function for cleaning the tree */
		var fClean = function(oConfig) {
			oConfig = JUL.Designer.keySort(oConfig, [].concat(sListeners, aMembers),
				[oCurrent.classProperty,oCurrent.tagProperty, oCurrent.idProperty, oCurrent.bindingProperty]);
			/* remove class info if it matches project's default class */
			if (oConfig[oCurrent.classProperty] === oCurrent.defaultClass) { delete oConfig[oCurrent.classProperty]; }
			var sId = this.getId(oConfig, oCurrent);
			var oTarget = this.getTarget(oConfig, sId, oTree.logic, oCurrent);
			if (oTarget[sListeners]) {
				if (JUL.Designer.isEmpty(oTarget[sListeners])) { delete oTarget[sListeners]; }
				else { oTarget[sListeners] = JUL.Designer.keySort(oTarget[sListeners]); }
			}
			if (oTarget !== oConfig) {
				if (JUL.Designer.isEmpty(oTarget)) { delete oTree.logic[sId]; }
				else {
					oTree.logic[sId] = JUL.Designer.keySort(oTarget, [].concat(sListeners, aMembers),
						[oCurrent.classProperty,oCurrent.tagProperty, oCurrent.idProperty, oCurrent.bindingProperty]);
				}
			}
			if (oConfig[oCurrent.idProperty] || (sId && !oTree.logic[sId])) { delete oConfig[oCurrent.bindingProperty]; }
			for (var k = 0; k < aMembers.length; k++) {
				var sMember = aMembers[k];
				oTarget = null;
				if (sId && oTree.logic[sId] && oTree.logic[sId][sMember] && typeof oTree.logic[sId][sMember] === 'object') { oTarget = oTree.logic[sId]; }
				else if (oConfig[sMember] && typeof oConfig[sMember] === 'object') { oTarget = oConfig; }
				if (!oTarget) { continue; }
				var sType = JUL.typeOf(oTarget[sMember]);
				if (sType === 'Array') {
					var aChildren = [];
					for (var i = 0; i < oTarget[sMember].length; i++) { aChildren[i] = fClean.call(this, oTarget[sMember][i]); }
					oTarget[sMember] = aChildren;
				}
				else if (sType === 'Object') {
					oTarget[sMember] = fClean.call(this, oTarget[sMember]);
				}
			}
		return oConfig;
		};
		oTree.ui = JUL.typeOf(oUi) === 'Array' ? oUi.map(fClean, this) : fClean.call(this, oUi);
		if (JUL.Designer.isEmpty(oTree.logic)) { oTree.logic = null; }
		return oTree;
	},
	/**
		Closes the current project
	*/
	close: function() {
		if (!this.state.pending && this.checkSave('close')) { return; }
		this.onSelectNode(null);
		this.removeTree();
		this.current = {};
		this.onSwitchCurrent(true);
	},
	/**
		Copies a configuration object and its logic into new objects
		@param	{Object}	oConfig	Configuration object
		@param	{Boolean}	[bInstance]	If true, it treats the copied object according to the project's parser specifications, otherwise, it performs a deep copy over a regular object
		@param	{Boolean}	[bNewBinding]	If true, for each component, a new binging ID is generated aiming to avoid ID duplication.
		The ID and the binding ID properties are given by the current project's parser config.
		@param	{Object}	[oRootLogic]	Where to search for the logics counterpart of the copied config, ut defaults to the project logic.
		It needs setting bInstance to true.
		@returns	{Object}	An object with two properties: 'ui' and 'logic' if bInstance is true, or a copy of the input object otherwise
	*/
	copy: function(oConfig, bInstance, bNewBinding, oRootLogic) {
		var oLogic = {};
		var oCurrent = null;
		var aMembers = [];
		if (bInstance) {
			oRootLogic = oRootLogic || this.current.logic;
			var oCheckLogic = this.current.logic;
			oCurrent = this.current.parserConfig;
			aMembers = [].concat(oCurrent.childrenProperty, oCurrent.membersProperties);
		}
		/* build a recursive function for copying the config */
		var fCopy = function(oConfig, bInstance) {
			if (!oConfig || typeof oConfig !== 'object') { return oConfig; }
			var sType = JUL.typeOf(oConfig);
			var oNew;
			if (sType === 'Array') {
				oNew = [];
				for (var i = 0; i < oConfig.length; i++) {
					oNew.push(fCopy(oConfig[i], bInstance));
				}
				return oNew;
			}
			else if (sType === 'Object') {
				oNew = {};
				var sNewBinding = false;
		var sId = bInstance ? JUL.Designer.designer.getId(oConfig, oCurrent) : false;
				/* generate a new binding in advance, if required */
				if (bInstance && bNewBinding && sId && ((!oConfig[oCurrent.idProperty] && !JUL.Designer.designer.current.noLogic) || oCheckLogic[sId])) {
					sNewBinding = (oCurrent.useTags ? oConfig[oCurrent.tagProperty] : oConfig[oCurrent.classProperty] || oCurrent.defaultClass) + '-' + JUL.Designer.designer.current.lastComponentId++;
				}
				for (var sItem in oConfig) {
					if (oConfig.hasOwnProperty(sItem)) {
						oNew[sItem] = fCopy(oConfig[sItem], bInstance && aMembers.indexOf(sItem) > -1);
					}
				}
				if (bInstance) {
					/* copy the logic, if present */
					if (sId && oRootLogic[sId]) {
						oLogic[sId] = fCopy(oRootLogic[sId], true);
					}
					if (sNewBinding) {			
						delete oNew[oCurrent.idProperty];
						oNew[oCurrent.bindingProperty] = sNewBinding;
						if (oLogic[sId]) {
							oLogic[sNewBinding] = oLogic[sId];
							delete oLogic[sId];
						}
					}
				}
				return oNew;
			}
			else {
				return oConfig;
			}
		};	
		if (bInstance) {
			var oResult = {ui: fCopy(oConfig, true)};
			oResult.logic = oLogic;
			return oResult;
		}
		else {
			return fCopy(oConfig);
		}
	},
	/**
		Creates an XML document containing the exported XML layour of a config tree.
		The export takes into account the project's parser config and the XML layout dialog checks.
		@param	{Object}	oConfig	Configuration object
		@returns	{Object}	Root element of the XML document
	*/
	createXml: function(oConfig) {
		if (!oConfig) { return null; }
		var aTag = (oConfig[this.classProperty] + (this.useTags ? ':' + oConfig[this.tagProperty] : '')).split(':');
		if (aTag.length > 2) { aTag = aTag.shift().concat(aTag.join(':')); }
		var oWidget = aTag.length > 1 && this.xmlDoc.createElementNS ?
			this.xmlDoc.createElementNS(this.xmlNS[aTag[0]] || null, aTag[0] === this.defaultClass ? aTag[1] : aTag.join(':')) :
			this.xmlDoc.createElement(aTag.length > 1 && aTag[0] === this.defaultClass ? aTag[1] : aTag.join(':'));
		if (!oWidget) { return null; }
		for (var sItem in JUL.Designer.keySort(oConfig, null, ['type', this.idProperty, this.cssProperty, 'style'])) {
			if (oConfig.hasOwnProperty(sItem) && this.membersProperties.concat([this.childrenProperty]).indexOf(sItem) < 0 &&
				[this.listenersProperty, this.htmlProperty, this.tagProperty, this.classProperty, this.parentProperty].indexOf(sItem) < 0)
			{
				var aAttr = sItem.split(':');
				if (aAttr.length > 2) { aAttr = aAttr.shift().concat(aAttr.join(':')); }
				if (aAttr[aAttr.length - 1] === this.cssProperty) { aAttr[aAttr.length - 1] = 'class'; }
				var sAttr = ['Array', 'Date', 'Function', 'Object', 'Null', 'RegExp'].indexOf(JUL.typeOf(oConfig[sItem])) > -1 ? this.obj2str(oConfig[sItem]) : oConfig[sItem].toString();
				if (aAttr.length > 1 && oWidget.setAttributeNS) {
					oWidget.setAttributeNS(this.xmlNS[aAttr[0]] || null, aAttr[0] === this.defaultClass ? aAttr[1] : aAttr.join(':'), sAttr);
				}
				else {
					oWidget.setAttribute(aAttr.length > 1 && aAttr[0] === this.defaultClass ? aAttr[1] : aAttr.join(':'), sAttr);
					}
			}
		}
		if (this.exportListeners && oConfig[this.listenersProperty] && typeof oConfig[this.listenersProperty] === 'object') {
			var oListeners = oConfig[this.listenersProperty];
			for (sItem in JUL.Designer.keySort(oListeners)) {
				if (oListeners.hasOwnProperty(sItem)) {
					var aAll = [].concat(oListeners[sItem]);
					for (var j = 0; j < aAll.length; j++) {
				var sListener = ['Array', 'Date', 'Function', 'Object', 'Null', 'RegExp'].indexOf(JUL.typeOf(aAll[j])) > -1 ? this.obj2str(aAll[j]) : aAll[j].toString();
						if (typeof aAll[j] === 'function') {
							sListener = sListener.slice(sListener.indexOf('{') + 1, sListener.lastIndexOf('}'));
							if (JUL.trim(sListener).split('\n').length < 2) { sListener = JUL.trim(sListener); }
						}
						oWidget.setAttribute(this.listenerPrefix + sItem, sListener);
					}
				}
			}
		
		}
		if (typeof oConfig[this.htmlProperty] !== 'undefined') {
			var oText = this.xmlDoc.createTextNode(oConfig[this.htmlProperty].toString());
			oWidget.appendChild(oText);
		}
		if (oConfig[this.parentProperty] && typeof oConfig[this.parentProperty] === 'object') {
			oConfig[this.parentProperty].appendChild(oWidget);
		}
		return oWidget;
	},
	/**
		Permanently deletes the active project
	*/
	del: function() {
		if (!this.current.ns) {
			window.alert('There is no current project');
			return;
		}
		if (!window.confirm('Are you sure to permanently delete \'' + this.current.title + '\' project?')) { return; }
		ample.post('index.php/main/manage', {
			operation: 'delete',
			type: 'project',
			ns: this.current.ns
		}, function(sResponse) {
			sResponse = JSON.parse(sResponse);
			if (sResponse.error) {
				window.alert(sResponse.error);
			}
			else {
				JUL.Designer.designer.state.notSaved = false;
				JUL.Designer.designer.close();
			}
		});
	},
	/**
		Gets the download URL of the project
		@returns	{String}	Download URL
	*/
	downloadUrl: function() {
			return 'index.php/main/manage?type=project&operation=download&ns=' + encodeURIComponent(this.current.ns) +
				'&version='+ encodeURIComponent(this.current.version);
	},
	/**
		Fills the UI, logic, and listeners list boxes corresponding to a configuration object
		@param	{Object}	oConfig	Configuration object
	*/
	fillComponentLists: function(oConfig) {
			var oCurrent = this.current.parserConfig;
		this.initConfig(oConfig);
		var sId = this.getId(oConfig);
		var oUiFields = {};
		var oLogicFields = {};
		var oListenersFields = {};
		oUiFields[oCurrent.classProperty] =	{tooltip: 'Component class', required: true, defaultValue: oCurrent.defaultClass};
		if (oCurrent.useTags) {
			oUiFields[oCurrent.tagProperty] = {tooltip: 'Component tag', required: true, defaultValue: ''};
		}
		oUiFields[oCurrent.idProperty] = {tooltip: 'Component ID'};
		if (!this.current.noLogic) {
			oUiFields[oCurrent.bindingProperty] = {tooltip: 'Component binding ID'};
		}
		var sItem;
		var oMembers = null;
		var oEvents = null;
		if (JUL.Designer.framework.current.components) {
			var oComponent = this.findComponent(oConfig);
			 /* build the fields given by the component type */
			 if (oComponent) {
			 	oMembers = JUL.Designer.framework.getInherited(oComponent, 'members') || {};
				 for (sItem in JUL.Designer.keySort(oMembers)) {
				 	if (oMembers.hasOwnProperty(sItem) && this.getExclude().indexOf(sItem) < 0) {
					 	if (sId && this.current.logic[sId] && oMembers[sItem].logic) { oLogicFields[sItem] = oMembers[sItem]; }
					 	else { oUiFields[sItem] = oMembers[sItem]; }
					 	if (oMembers[sItem].required && (!oMembers[sItem].logic || !sId || !this.current.logic[sId]) &&
						 	typeof oConfig[sItem] === 'undefined') {
							oConfig[sItem] = oMembers[sItem].defaultValue;
						}
						if (oMembers[sItem].required && oMembers[sItem].logic && sId && this.current.logic[sId] &&
							typeof this.current.logic[sId][sItem] === 'undefined') {
							this.current.logic[sId][sItem] = oMembers[sItem].defaultValue;
						}
					 }
				 }
			 	oEvents = JUL.Designer.framework.getInherited(oComponent, 'events') || {};
				 for (sItem in JUL.Designer.keySort(oEvents)) {
				 	if (oEvents.hasOwnProperty(sItem)) { oListenersFields[sItem] = oEvents[sItem]; }
				 }
			 }
		}
		/* build the rest of the fields */
		for (sItem in JUL.Designer.keySort(oConfig)) {
			if (oConfig.hasOwnProperty(sItem) && this.getExclude().indexOf(sItem) < 0 &&
				(!oMembers || !oMembers[sItem] || (sId && this.current.logic[sId] && oMembers[sItem].logic))) {
				oUiFields[sItem] = {tooltip: 'Custom ui member'};
			}
		}
		var oTarget = this.getTarget(oConfig, sId);
		if (oTarget !== oConfig) {
			for (sItem in JUL.Designer.keySort(oTarget)) {
				if (oTarget.hasOwnProperty(sItem) && this.getExclude().indexOf(sItem) < 0 &&
					(!oMembers || !oMembers[sItem] || !oMembers[sItem].logic)) {
					oLogicFields[sItem] = {tooltip: 'Custom logic member'};
				}
			}
		}
		for (sItem in JUL.Designer.keySort(oTarget[this.current.listenersProperty])) {
			if (oTarget[this.current.listenersProperty].hasOwnProperty(sItem) && this.getExclude().indexOf(sItem) < 0 && (!oEvents || !oEvents[sItem])) {
				oListenersFields[sItem] = {tooltip: 'Custom event'};
			}
		}
		ample.query('#listbox-designer-ui>xul|listbody').empty();
		ample.query('#listbox-designer-logic>xul|listbody').empty();
		ample.query('#listbox-designer-listeners>xul|listbody').empty();
		JUL.Designer.fillListbox('listbox-designer-ui', oUiFields, oConfig);
		JUL.Designer.fillListbox('listbox-designer-logic', oLogicFields, oTarget);
		JUL.Designer.fillListbox('listbox-designer-listeners', oListenersFields, oTarget[this.current.listenersProperty]);
		var nIndex = ample.getElementById('tabbox-designer-members').selectedIndex;
		var sType = nIndex ? (nIndex < 2 ? 'logic' : 'listeners') : 'ui';
		switch(sType) {
		case 'ui': this.currentConfig = oConfig; break;
		case 'logic': this.currentConfig = oTarget; break;
		case 'listeners': this.currentConfig = oTarget[this.current.listenersProperty]; break;
		}
	},
	/**
		Resets the interface elements and apples the project data on them
	*/
	fillInterface: function() {
		this.removeTree();
		//JUL.Designer.cleanMap();
		ample.getElementById('menulist-designer-members').setAttribute('value', '');
		ample.getElementById('menulist-designer-members-type').setAttribute('value', '');
		ample.getElementById('menulist-designer-members-where').setAttribute('value', '');
		var oMenu = ample.getElementById('menulist-designer-members').querySelector('xul|menupopup');
		ample.query(oMenu).empty();
		var oCurrent = this.current.parserConfig;
		if (oCurrent) {
			this.buildTree();
			var aItems = [].concat(oCurrent.childrenProperty, oCurrent.membersProperties);
			for (var i = 0; i < aItems.length; i++) {
				oMenu.appendChild(JUL.Designer.parser.createComponent({
					tag: 'menuitem',
					label: aItems[i],
					value: aItems[i],
					style: 'font-style:italic'
				}));
			}
		}
		ample.getElementById('tree-interface').reflow();
	},
	/**
		Filters component selection popups according to their membership to a component
		@param	{Object}	oWhere	JUL.Ref of the owner component config
	*/
	filterMembers: function(oWhere) {
		if (!this.current.ns) { return; }
		var oConfig = oWhere ? oWhere.val() : null;
		var oComponent = oConfig ? this.findComponent(oConfig) : null;
		var oInherit = oComponent ? JUL.Designer.framework.getInherited(oComponent, 'members') || {} : {};
		var oDirect = oComponent && oComponent.members ? oComponent.members : {};
		var aMembers = [].concat(this.current.parserConfig.childrenProperty, this.current.parserConfig.membersProperties);
		var aMenus = [];
		for (var j = oComponent ? 0 : 2; j < 3; j++) {
			for (var i = 0; i < aMembers.length; i++) {
				var sItem = aMembers[i];
				/* put first direct members; put last inherited ones, in italics */
				if ((!j && oDirect.hasOwnProperty(sItem)) ||
					(j === 1 && oInherit.hasOwnProperty(sItem) && !oDirect.hasOwnProperty(sItem))) {
					var oMenu = {tag: 'menuitem', label: sItem, value: sItem};
					if (!j && oDirect[sItem].description) { oMenu.tooltiptext = oDirect[sItem].description; }
					if (j === 1 && oInherit[sItem].description) { oMenu.tooltiptext = oInherit[sItem].description; }
					aMenus.push(oMenu);
				}
				if (j === 2 && !oInherit.hasOwnProperty(sItem)) {
					aMenus.push({tag: 'menuitem', label: sItem, value: sItem, style: 'font-style:italic'});
				}
			}
			if (j === 1 && aMenus.length && aMenus.length < aMembers.length) { aMenus.push({tag: 'menuseparator'}); }
		}
		var oPopup = ample.getElementById('menulist-designer-members').querySelector('xul|menupopup');
		ample.query(oPopup).empty();
		for (i = 0; i < aMenus.length; i++) {
			oPopup.appendChild(JUL.Designer.parser.create(aMenus[i]));
		}
	},
	/**
		Searches for a component type within the current framework, that matches a given config object
		@param	{Object}	oConfig	Configuration object
		@returns	{Object}	Component data or undefined if not found
	*/
	findComponent: function(oConfig) {
		var oComponents = JUL.Designer.framework.current.components;
		if (!oComponents) { return null; }
		var oCurrent = this.current.parserConfig;
		var sClass = oConfig[oCurrent.classProperty] || oCurrent.defaultClass;
		if (oCurrent.useTags && sClass === JUL.Designer.framework.current.ns) { return oComponents[oConfig[oCurrent.tagProperty]]; }
		if (!oCurrent.useTags) {
			if (JUL.Designer.framework.current.prependNS) {
				var sNs = JUL.Designer.framework.current.ns + '.';
				if (sClass.substr(0, sNs.length) === sNs) { return oComponents[sClass.substr(sNs.length)]; }
			}
			else {
				return oComponents[sClass];
			}
		}
		return null;
	},
	/**
		Finds an object or a property throughout a configuration tree and its associated logic
		@param	{Object}	oFind	Object to find. It can be also a function that should return true when object is found.
		This function is given as parameters the current node and an array of path segmenets to it.
		@param	{String}	[sItem]	An optional property name of the input object
		@param	{Object}	[oRoot]	The root of the config tree, defaults to the UI of the current project
		@param	{Object}	[oRootLogic]	The associated config logic, defaults to the logic of the current project
		@returns	{Mixed}	Dotted path to the target or false if not found
	*/
	findPath: function(oFind, sItem, oRoot, oRootLogic) {
		if (!oRoot) { oRoot = this.current.ui; }
		if (!oRootLogic) { oRootLogic = this.current.logic; }
		if (!oRoot) { return false; }
		var aPath = [];
		var bFunction = typeof oFind === 'function';
		if (bFunction) {
			if (oFind(oRoot, aPath)) { return ''; }
		}
		else {
			if (!sItem && oRoot === oFind) { return ''; }
			if (sItem && oRoot[sItem] === oFind) { return ''; }
		}
		var aMembers = [].concat(this.current.parserConfig.childrenProperty, this.current.parserConfig.membersProperties);
		/* build a recursive function for searching */
		var fobj = function(oCurrent, nLevel) {
			if (!oCurrent) { return false; }
			if (bFunction) {
				if (oFind(oCurrent, aPath)) { return true; }
			}
			else {
				if (!sItem && oCurrent === oFind) { return true; }
				if (sItem && oCurrent[sItem] === oFind) { return true; }
			}
			var sId = JUL.Designer.designer.getId(oCurrent);
			for (var i = 0; i < aMembers.length; i++) {
				aPath[nLevel] = aMembers[i];
				var oMember = oCurrent[aMembers[i]];
				/* test to see if we go to the logic branch */
				if (sId && oRootLogic[sId] && oRootLogic[sId][aMembers[i]]) {
					oMember = oRootLogic[sId][aMembers[i]];
				}
				if (oMember) {
					aPath.length = nLevel + 1;
					if (JUL.typeOf(oMember) === 'Array') {
						for (var k = 0; k < oMember.length; k++) {
							aPath[nLevel + 1] = k;
							if (oMember[k] && fobj(oMember[k], nLevel + 2)) { return true; }
						}
					}
					else {
						if (fobj(oMember, nLevel + 1)) { return true; }
					}
				}
			}
			aPath.length = nLevel;
			return false;
		};
		return fobj(oRoot, 0) ? aPath.join('.') : false;
	},
	/**
		Beautifies an XML string (code taken from the internet, needs revising)
		@param	{String}	xml	XML string
		@returns	{String}	Formatted XML string
	*/
	formatXml: function (xml) {
	    var reg = /(>)(<)(\/*)/g;
	    var wsexp = / *(.*) +\n/g;
	    var contexp = /(<.+>)(.+\n)/g;
	    xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
	    //var pad = 0;
	    var formatted = '';
	    var lines = xml.split('\n');
	    var indent = 0;
	    var lastType = 'other';
	    // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
	    var transitions = {
	        'single->single': 0,
	        'single->closing': -1,
	        'single->opening': 0,
	        'single->other': 0,
	        'closing->single': 0,
	        'closing->closing': -1,
	        'closing->opening': 0,
	        'closing->other': 0,
	        'opening->single': 1,
	        'opening->closing': 0,
	        'opening->opening': 1,
	        'opening->other': 1,
	        'other->single': 0,
	        'other->closing': -1,
	        'other->opening': 0,
	        'other->other': 0
	    };
	    for (var i = 0; i < lines.length; i++) {
	        var ln = lines[i];
	        var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
	        var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
	        var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
	        var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
	        var fromTo = lastType + '->' + type;
	        lastType = type;
	        var padding = '';
	        indent += transitions[fromTo];
	        for (var j = 0; j < indent; j++) {
	            padding += '\t';
	        }
	        if (fromTo === 'opening->closing') {
	            formatted = formatted.substr(0, formatted.length - 1) + ln + '\n'; // substr removes line break (\n) from prev loop
	        }
				else {
	            formatted += padding + ln + '\n';
	        }
	    }
	    return formatted;
	},
	/**
		Returns a list of property names that shoukd not be altered by the user interation
		@param	{Object}	[oParserConfig]	Parser config object, defaults to project's parser
		@returns	{Array}	An array of special names
	*/
	getExclude: function(oParserConfig) {
		oParserConfig = oParserConfig || this.current.parserConfig;
		var aExclude = [].concat(oParserConfig.childrenProperty, oParserConfig.membersProperties, this.current.listenersProperty,
			oParserConfig.classProperty, oParserConfig.idProperty, oParserConfig.bindingProperty);
		if (oParserConfig.useTags) { aExclude.push(oParserConfig.tagProperty); }
		if (oParserConfig.topDown) { aExclude.push(oParserConfig.parentProperty); }
		return aExclude;
	},
	/**
		Returns a 'members' names array of the descendant collections of a component
		@param	{Object}	oConfig	Component config
		@returns	{Array}	Array of names, with direct descendants first
	*/
	getFirstChildren: function(oConfig) {
		var sId = this.getId(oConfig);
		var oLogic = sId ? this.current.logic[sId] : false;
		var aMembers = [].concat(this.current.parserConfig.childrenProperty, this.current.parserConfig.membersProperties);
		var oComponent = this.findComponent(oConfig);
		var aDirect = [];
		for (var j = oComponent && oComponent.members ? 0 : 1; j < 2; j++) {
			for (var i = 0; i < aMembers.length; i++) {
				var sItem = aMembers[i];
				if (oConfig[sItem] || (oLogic && oLogic[sItem])) {
					if (j || oComponent.members.hasOwnProperty(sItem)) { return sItem; }
				}
				if (!j && oComponent.hasOwnProperty(sItem)) { aDirect.push(sItem); }
			}
		}
		return aDirect.concat(aMembers)[0];
	},
	/**
		Retrieves an object from the configuration tree, given an access path
		@param	{String}	sPath	Dotted path relative to the tree root
		@param	{Object}	[oRoot]	Tree root, defaults to project's UI
		@param	{Object}	[oRootLogic]	Logic config, defaults to project's logic
		@returns	{Object}	Found object or undefined
	*/
	getFrom: function(sPath, oRoot, oRootLogic) {
		if (!oRoot) { oRoot = this.current.ui; }
		if (!oRootLogic) { oRootLogic = this.current.logic; }
		if (!oRoot) { return this._undef; }
		if (sPath === '') { return oRoot; }
		var aPath = sPath.split('.');
		var oCurrent = oRoot;
		var sItem = '';
		while (aPath.length) {
			sItem = aPath.shift();
			if (JUL.typeOf(oCurrent === 'Object')) {
				var sId = this.getId(oCurrent);
				if (sId && oRootLogic[sId] && oRootLogic[sId][sItem]) {
					oCurrent = oRootLogic[sId];
				}
			}
			if (typeof oCurrent[sItem] === 'undefined') { return oCurrent[sItem]; }
			oCurrent = oCurrent[sItem];
		}
		return oCurrent;
	},
	/**
		Returns the ID of a component
		@param	{Object}	oConfig	Component config
		@param	{Object}	[oParserConfig]	Parser configuration, defaults to project's parser
		@returns	{String}	Vomponent ID; falls back to the binding ID
	*/
	getId: function(oConfig, oParserConfig) {
		oParserConfig = oParserConfig || this.current.parserConfig;
		return oConfig[oParserConfig.idProperty] || oConfig[oParserConfig.bindingProperty];
	},
	/**
		Gets the actual top nodes in a collection of selected tree nodes
		@param	{Object}	oNodeList	Selected elements
		@returns	{Array}	Top selected elements
	*/
	getSelection: function(oNodeList) {
		var aSelect = [];
		for (var i = 0; i < oNodeList.length; i++) {
			var oParent = oNodeList.item(i).parentNode;
			var bRoot = true;
			while (oParent && oParent.nodeName !== 'xul:treebody') {
				if (oNodeList.$indexOf(oParent) > -1) {
					bRoot = false;
					break;
				}
				oParent = oParent.parentNode;
			}
			if (bRoot) { aSelect.push(oNodeList.item(i)); }
		}
		return aSelect;
	},
	/**
		Gets the configuration object part: UI or logic
		@param	{Object}	oConfig	Config object
		@param	{String}	[sId]	Component ID
		@param	{Object}	[oLogic]	Project logic
		@param	{Object}	[oParserConfig]	Parser config
		@returns	{String}	The UI part or the logic part, if present
	*/
	getTarget: function(oConfig, sId, oLogic, oParserConfig) {
		oParserConfig = oParserConfig || this.current.parserConfig;
		sId = sId || this.getId(oConfig, oParserConfig);
		oLogic = oLogic || this.current.logic;
		return sId && oLogic[sId] ? oLogic[sId] : oConfig;
	},
	/**
		Augments a config object for editing in the intterface
		@param	{Object}	oConfig	Config object
	*/
	initConfig: function(oConfig) {
		var sId = this.getId(oConfig);
		if (sId && !this.current.noLogic && !this.current.logic[sId] && !oConfig[this.current.listenersProperty]) {
			this.current.logic[sId] = {};
		}
		var oTarget = this.getTarget(oConfig, sId);
		if (!oTarget[this.current.listenersProperty]) {
			oTarget[this.current.listenersProperty] = {};
		}
	},
	/**
		Fires after a binding ID is modified in the interface
		@param	{Object}	oWhere	JUL.Ref of the changed value
	*/
	onBindingUpdated: function(oWhere) {
		var sValue = oWhere.val();
		if (sValue === oWhere.oldValue) { return; }
		if (sValue && typeof this.current.logic[sValue] !== 'undefined') {
			if (typeof oWhere.oldValue === 'undefined') { oWhere.del(); }
			else { oWhere.val(oWhere.oldValue); }
			ample.getElementById(oWhere.field.id).setAttribute('value', oWhere.oldValue || '');
			return;
		}
		var sId = oWhere.ref()[this.current.parserConfig.idProperty];
		this.swapLogic(null, sId || sValue, sId || oWhere.oldValue);
	},
	/**
		Fires after a user clicks on a cell in the tree panel
	*/
	onCellClick: function() {
		if (!JUL.Designer.framework.current.components) { return; }
		if (!this.currentNode) { return; }
		var oWhere = JUL.Designer.getWhere(this.currentNode);
		var oConfig = oWhere.val();
		var oComponent = this.findComponent(oConfig);
		if (!oComponent) { return; }
		/* find the component path relative to the tree root */
		var sPath = this.findPath(oConfig);
		/* try to highlight the rendered component in the project's iframe */
		var oRoot = this.getFrom(this.current.ns, document.getElementById('iframe-test').contentWindow);
		if (!oRoot) { return; }
		var oFind = this.getFrom(sPath, oRoot.ui, oRoot.logic);
		if (!oFind) { return; }
		var fGetRect = JUL.Designer.framework.getInheritedProperty(oComponent, 'getBoundingRect');
		try {
			if (typeof fGetRect === 'string' && typeof oFind._instance[fGetRect] === 'function') {
				this.showSelect(oFind._instance[fGetRect]());
			}
			else if (typeof (fGetRect = JUL.get(fGetRect)) === 'function') {
				this.showSelect(fGetRect.call(oFind._instance));
			}
			else if (typeof (fGetRect = JUL.get(JUL.Designer.framework.current.getBoundingRect)) === 'function') {
				JUL.Designer.designer.showSelect(fGetRect.call(oFind._instance));
			}
		}
		catch (e) {}
	},
	/**
		Fires after the class value if updated in the interface
		@param	{Object}	oWhere	JUL.Ref of the changed value
	*/
	onClassUpdated: function(oWhere) {
		if (oWhere.val() === oWhere.oldValue) { return; }
		this.setCellLabel(this.currentNode, 'name');
		if (this.state.selectTimer) { clearTimeout(this.state.selectTimer); }
		this.state.selectTimer = setTimeout(function() {
			var oDesigner = JUL.Designer.designer;
			delete oDesigner.state.selectTimer;
			oDesigner.onSelectNode(JUL.Designer.designer.currentNode);
		}, 100);
	},
	/**
		Fires after any of the config members is modified in the interface
		@param	{Object}	oWhere	JUL.Ref of the changed value
	*/
	onConfigUpdated: function(oWhere) {
		if (oWhere.val() === oWhere.oldValue) { return; }
		this.state.clipboard.undo = {
			operation: 'changeMembers',
			owner: oWhere.ref(),
			items: {},
			del: [],
				show: JUL.Designer.getWhere(this.currentNode),
			tabIndex: ample.getElementById('tabbox-designer-members').selectedIndex
		};
		if (typeof oWhere.oldValue === 'undefined') { this.state.clipboard.undo.del.push(oWhere.key()); }
		else { this.state.clipboard.undo.items[oWhere.key()] = oWhere.oldValue; }
		this.save(true, true);
		var oCurrent = this.current.parserConfig;
		if ([oCurrent.classProperty, oCurrent.idProperty, oCurrent.bindingProperty, oCurrent.classProperty].indexOf(oWhere.key()) > -1 ||
			(oCurrent.useTags && oWhere.key() === oCurrent.tagProperty)) {
			ample.getElementById(oWhere.field.id).blur();
		}
	},
	/**
		Fires after a copy, cut, or remove operation from the interface, on the members of a component
		@param	{Boolean}	[bCut]	True if it's a cut operation
		@param	{Boolean}	[bRemove]	True if it's a remove operation
	*/
	onCopyMembers: function(bCut, bRemove) {
		var nIndex = ample.getElementById('tabbox-designer-members').selectedIndex;
		var sType = nIndex ? (nIndex < 2 ? 'logic' : 'listeners') : 'ui';
		var oItems = ample.getElementById('listbox-designer-' + sType).selectedItems;
		if (!oItems.length) {
			window.alert('Please select some items');
			return;
		}
		if (!bRemove) { this.state.clipboard.contentMembers = {}; }
		if (bCut) {
			this.state.clipboard.undo = {
				operation: 'changeMembers',
				owner: this.currentConfig,
				items: {},
				del: [],
				show: JUL.Designer.getWhere(this.currentNode),
				tabIndex: nIndex
			};
		}
		var oWhere;
		for (var i = 0; i < oItems.length; i++) {
			 oWhere = JUL.Designer.getWhere(oItems.item(i).childNodes[1].firstChild);
			if (oWhere && typeof oWhere.val() !== 'undefined') {
				if (!bRemove) { this.state.clipboard.contentMembers[oWhere.key()] = this.copy(oWhere.val()); }
				if (bCut && this.getExclude().indexOf(oWhere.key()) < 0) {
					this.state.clipboard.undo.items[oWhere.key()] = oWhere.val();
					if (oWhere.field.required) {
						oWhere.val(oWhere.field.defaultValue);
					}
					else {
						oWhere.del();
					}
				}
			}
			if (bCut && this.getExclude().indexOf(oWhere.key()) < 0) {
				ample.query(oItems.item(i)).remove();
			}
		}
		if (!bRemove) {
			delete this.state.clipboard.pasteFilter;
		}
		if (!bCut) { return; }
		if (JUL.Designer.isEmpty(this.state.clipboard.undo.items)) {
			delete this.state.clipboard.undo;
		}
		else {
			this.save(true, true);
		}
	},
	/**
		Fires after a copy, cut, or remove operation from the interface, on several components
		@param	{Boolean}	[bCut]	True if it's a cut operation
		@param	{Boolean}	[bRemove]	True if it's a remove operation
	*/
	onCopyNode: function(bCut, bRemove) {
		var aSelect = this.getSelection(ample.getElementById('tree-interface').selectedItems);
		if (!aSelect.length) {
			window.alert('Please select some components');
			return;
		}
		var oWhere = JUL.Designer.getWhere(this.currentNode);
		this.removeConfigListeners(oWhere.val());
		this.cleanConfig(oWhere.val());
		var aCopy = [];
		if (!bRemove) { this.state.clipboard.contentNodes = []; }
		for (var u = 0; u < aSelect.length; u++) {
			oWhere = JUL.Designer.getWhere(aSelect[u]);
			aCopy[u] = this.copy(oWhere.val(), true);
			if (!bRemove) { this.state.clipboard.contentNodes.push(aCopy[u]); }
		}
		if (!bRemove) {
			delete this.state.clipboard.pasteStart;
			delete this.state.clipboard.pasteEnd;
		}
		if (!bCut) {
			oWhere = JUL.Designer.getWhere(this.currentNode);
			this.fillComponentLists(oWhere.val());
			this.addConfigListeners(oWhere.val());
			return;
		}
		this.state.clipboard.undo = {
			operation: 'removeNodes',
			ui: [],
			logic: [],
			where: [],
			wasArray: [],
			show: this.findPath(JUL.Designer.getWhere(this.currentNode).val())
		};
		for (u = 0; u < aSelect.length; u++) {
		this.state.clipboard.undo.ui.push(aCopy[u].ui);
		this.state.clipboard.undo.logic.push(aCopy[u].logic);
		oWhere = JUL.Designer.getWhere(aSelect[u]);
		this.state.clipboard.undo.where.push(oWhere);
		this.state.clipboard.undo.wasArray.push(JUL.typeOf(oWhere.ref()) === 'Array');
		}
		for (u = aSelect.length - 1; u >= 0; u--) {
			this.removeTree(aSelect[u], true);
		}
		this.save(true, true);
		ample.getElementById('tree-interface').reflow();
	},
	/**
		Fires after the component ID is modified in the interface
		@param	{Object}	oWhere	JUL.Ref of the changed value
	*/
	onIdUpdated: function(oWhere) {
		var sValue = oWhere.val();
		if (sValue === oWhere.oldValue) { return; }
		if (sValue && typeof this.current.logic[sValue] !== 'undefined') {
			if (typeof oWhere.oldValue === 'undefined') { oWhere.del(); }
			else { oWhere.val(oWhere.oldValue); }
			ample.getElementById(oWhere.field.id).setAttribute('value', oWhere.oldValue || '');
			return;
		}
		this.setCellLabel(this.currentNode, 'id');
		var sBinding = oWhere.ref()[this.current.parserConfig.bindingProperty];
		this.swapLogic(null, sValue || sBinding, oWhere.oldValue || sBinding);
	},
	/**
		Fires after the paste operation with the copied members of a component
	*/
	onPasteMembers: function() {
		if (!this.state.clipboard.contentMembers) { return; }
		if (!this.currentNode) {
			window.alert('Please elect a component');
			return;
		}
		var nIndex = ample.getElementById('tabbox-designer-members').selectedIndex;
		this.state.clipboard.undo = {
			operation: 'changeMembers',
			owner: this.currentConfig,
			items: {},
			del: [],
				show: JUL.Designer.getWhere(this.currentNode),
			tabIndex: nIndex
		};
		for (var sItem in this.state.clipboard.contentMembers) {
			if (this.state.clipboard.contentMembers.hasOwnProperty(sItem) && this.getExclude().indexOf(sItem) < 0 &&
				(!this.state.clipboard.pasteFilter || this.state.clipboard.pasteFilter.indexOf(sItem) > -1)) {
				if (typeof this.currentConfig[sItem] === 'undefined') { this.state.clipboard.undo.del.push(sItem); }
				else { this.state.clipboard.undo.items[sItem] = this.currentConfig[sItem]; }
				this.currentConfig[sItem] = this.copy(this.state.clipboard.contentMembers[sItem]);
			}
		}
		delete this.state.clipboard.pasteFilter;
		if (JUL.Designer.isEmpty(this.state.clipboard.undo.items) && !this.state.clipboard.undo.del.length) {
			delete this.state.clipboard.undo;
		}
		else {
			this.save(true, true);
			var oWhere = JUL.Designer.getWhere(this.currentNode);
			this.fillComponentLists(oWhere.val());
		}
	},
	/**
		Fires after the paste operation with the copied components
	*/
	onPasteNode: function() {
		if (!this.state.clipboard.contentNodes) { return; }
		if (!this.current.ns) { return; }
		if (this.current.ui && !this.currentNode) {
			window.alert('There may be only one root component');
			return;
		}
		this.state.clipboard.undo = {
		operation: 'addNodes',
		where: [],
		logic: [],
		show: this.currentNode ? this.findPath(JUL.Designer.getWhere(this.currentNode).val()) : false
		};
		var oNew = null;
		var sItem = '';
		if (this.current.ui) {
			var oWhere = JUL.Designer.getWhere(this.currentNode);
			var oConfig = oWhere.val();
			var sId = this.getId(oConfig);
			if (sId && this.current.logic[sId] &&
				ample.getElementById('menulist-designer-members-where').getAttribute('value') === 'logic') {
				oConfig = this.current.logic[sId];
			}
			for (var u = this.state.clipboard.pasteStart || 0; u <= (this.state.clipboard.pasteEnd || this.state.clipboard.contentNodes.length - 1); u++) {
				oNew = this.copy(this.state.clipboard.contentNodes[u].ui, true, true, this.state.clipboard.contentNodes[u].logic);
				if (!oConfig[oWhere.showWhat] && ample.getElementById('menulist-designer-members-type').getAttribute('Value') === 'Object') {
					this.state.clipboard.undo.where.push(new JUL.Ref({ref: oConfig, key: oWhere.showWhat}));
					oConfig[oWhere.showWhat] = oNew.ui;
				}
				else {
					if (!oConfig[oWhere.showWhat]) { oConfig[oWhere.showWhat] = []; }
					if (JUL.typeOf(oConfig[oWhere.showWhat]) !== 'Array') {
						oConfig[oWhere.showWhat] = [oConfig[oWhere.showWhat]];
						this.state.clipboard.undo.toArray = true;
						ample.getElementById('menulist-designer-members-type').setAttribute('value', 'Array');
					}
					this.state.clipboard.undo.where.push(new JUL.Ref({ref: oConfig[oWhere.showWhat], key: oConfig[oWhere.showWhat].length,
						parent: new JUL.Ref({ref: oConfig, key: oWhere.showWhat})}));
					oConfig[oWhere.showWhat].push(oNew.ui);
				}
				for (sItem in oNew.logic) {
					if (oNew.logic.hasOwnProperty(sItem)) {
						this.state.clipboard.undo.logic.push(sItem);
						this.current.logic[sItem] = oNew.logic[sItem];
					}
				}
			}
		}
		else {
			oNew = this.copy(this.state.clipboard.contentNodes[this.state.clipboard.pasteStart || 0].ui, true, true, this.state.clipboard.contentNodes[this.state.clipboard.pasteStart || 0].logic);
			this.state.clipboard.undo.where.push(new JUL.Ref({ref: this.current, key: 'ui'}));
			this.current.ui = oNew.ui;
			for (sItem in oNew.logic) {
				if (oNew.logic.hasOwnProperty(sItem)) {
					this.state.clipboard.undo.logic.push(sItem);
					this.current.logic[sItem] = oNew.logic[sItem];
				}
			}
		}
		delete this.state.clipboard.pasteStart;
		delete this.state.clipboard.pasteEnd;
		if (this.currentNode) {
			this.removeTree(this.currentNode, false, true);
			this.buildTree(this.currentNode, oWhere, true);
		}
		else {
		
			this.buildTree();
		}
		this.save(true, true);
		ample.getElementById('tree-interface').reflow();
	},
	/**
		Fires after the selection changed in the component panel
		@param	{Object}	oNode	The new selected tree element or null if no selection
	*/
	onSelectNode: function(oNode) {
		if (this.currentNode) {
			var oOldWhere = JUL.Designer.getWhere(this.currentNode);
			var oOldConfig = oOldWhere.val();
			if (oOldConfig) {
				this.removeConfigListeners(oOldConfig);
				this.cleanConfig(oOldConfig);
			}
		}
		ample.getElementById('menulist-designer-members').setAttribute('value', '');
		ample.getElementById('menulist-designer-members-type').setAttribute('value', '');
		ample.getElementById('menulist-designer-members-where').setAttribute('value', '');
		ample.query('#listbox-designer-ui>xul|listbody').empty();
		ample.query('#listbox-designer-logic>xul|listbody').empty();
		ample.query('#listbox-designer-listeners>xul|listbody').empty();
		ample.query(ample.getElementById('tabbox-designer-members').querySelector('xul|tabs').childNodes[1]).show();
		ample.getElementById('tabbox-designer-members').querySelector('xul|tabs').childNodes[oNode && this.state.showTab ? this.state.showTab : 0].$activate();
		if (oNode) { delete this.state.showTab; }
		//JUL.Designer.cleanMap();
		this.currentNode = oNode;
		if (oNode) {
			var oWhere = JUL.Designer.getWhere(oNode);
			var oConfig = oWhere.val();
			JUL.Designer.framework.fillScrollbox(oConfig);
			var sId = this.getId(oConfig);
			var oChildren = oConfig[oWhere.showWhat];
			if (sId && this.current.logic[sId] && this.current.logic[sId][oWhere.showWhat] &&
				typeof this.current.logic[sId][oWhere.showWhat] === 'object') {
				oChildren = this.current.logic[sId][oWhere.showWhat];
			}
			ample.getElementById('menulist-designer-members').setAttribute('value', oWhere.showWhat);
			ample.getElementById('menulist-designer-members-type').setAttribute('value', oChildren ? JUL.typeOf(oChildren) : 'Array');
			ample.getElementById('menulist-designer-members-where').setAttribute('value',
				sId && this.current.logic[sId] && this.current.logic[sId][oWhere.showWhat] && typeof this.current.logic[sId][oWhere.showWhat] === 'object' ? 'logic' : 'ui' );
			JUL.Designer.state.lastDialog = null;
			this.fillComponentLists(oConfig);
			this.addConfigListeners(oConfig);
			this.filterMembers(oWhere);
		}
		else {
			this.currentConfig = null;
			JUL.Designer.framework.fillScrollbox();
			this.filterMembers();
		}
		ample.query(ample.getElementById('tabbox-designer-members').querySelector('xul|tabs').childNodes[1])[sId && this.current.logic[sId] ? 'show' : 'hide']();
	},
	/**
		Fires after the current project is changed with another, or closed
		@param	{Boolean}	[bClose]	True after a close operation
	*/
	onSwitchCurrent: function(bClose) {
		delete this.state._xmlOptions;
		delete this.state.clipboard.undo;
		this.state.notSaved = false;
		ample.getElementById('deck-test').setAttribute('selectedIndex', bClose ? 1 : 0);
		this.setTitle();
		ample.getElementById('anchor-test').setAttribute('href', this.current.ns ? this.testUrl() : '#');
		ample.getElementById('anchor-download').setAttribute('href', this.current.ns ? this.downloadUrl() : '#');
		ample.getElementById('command-no-logic').setAttribute('checked', this.current.noLogic || false);
		this.test();
		this.fillInterface();
		if (JUL.Designer.state.oTestWnd && !JUL.Designer.state.oTestWnd.closed) {
			JUL.Designer.state.oTestWnd.close();
		}
		if (JUL.Designer.app.current.ns) {
			ample.getElementById('anchor-test-app').setAttribute('href', JUL.Designer.app.testUrl());
			if (JUL.Designer.state.oTestAppWnd && !JUL.Designer.state.oTestAppWnd.closed) {
				JUL.Designer.state.oTestAppWnd.close();
			}
			JUL.Designer.app.fillMenupopup(true);
		}
		if (bClose) { return; }
		if (this.current.suggestedFramework && this.current.suggestedFramework !== JUL.Designer.framework.current.ns) {
			JUL.Designer.framework.open(this.current.suggestedFramework);
		}
	},
	/**
		Fires after a click in the project's iframe
		@param	{Object}	oPoint	An object with the x and y coordinates of the click, relative to iframe's corner
	*/
	onTestClick: function(oPoint) {
		var fGetRect = JUL.get(JUL.Designer.framework.current.getBoundingRect);
		var oFound = {};
		var aLabels = [];
		var fPoint = function(oConfig, aPath) {
			var oComponent = JUL.Designer.designer.findComponent(oConfig);
			if (!oComponent) { return false; }
			var oRect = null;
			var fRect = JUL.Designer.framework.getInheritedProperty(oComponent, 'getBoundingRect');
			try {
				if (typeof fRect === 'string' && typeof oConfig._instance[fRect] === 'function') {
					oRect = oConfig._instance[fRect]();
				}
				else if (typeof (fRect = JUL.get(fRect)) === 'function') {
					oRect = fRect.call(oConfig._instance);
				}
				else if (typeof fGetRect === 'function') {
					oRect = fGetRect.call(oConfig._instance);
				}
			}
			catch (e) {}
			if (oRect && oPoint.x >= oRect.left && oPoint.x <= oRect.left + oRect.width &&
				oPoint.y >= oRect.top && oPoint.y <= oRect.top + oRect.height) {
				var sLabel = (1e10 - 1 - (oRect.zIndex || 0)).toFixed(0) + ':' + (1e8 + oRect.width * oRect.height).toFixed(0) + ':' + (1e6 - 1 - aLabels.length).toFixed(0);
				oFound[sLabel] = {rect: oRect, path: aPath.join('.')};
				aLabels.push(sLabel);
			}
			return false;
		};
		var oRoot = this.getFrom(this.current.ns, document.getElementById('iframe-test').contentWindow);
		this.findPath(fPoint, null, oRoot.ui, oRoot.logic);
		if (!aLabels.length) { return; }
		aLabels.sort();
		this.showSelect(oFound[aLabels[0]].rect);
		this.showPath(oFound[aLabels[0]].path);
	},
	/**
		Fires after the project's iframes loads.
		Used to (re)attach the click handler.
	*/
	onTestLoad: function() {
		if (!JUL.Designer.designer.current.ns) { return; }
		var oTest = document.getElementById('iframe-test');
		JUL.Designer.addListener(oTest.contentDocument || oTest.contentWindow.document, 'click', function(oEvent) {
			if (!JUL.Designer.framework.current.components) { return; }
			oEvent = oEvent || event;
			var oPoint = {x: oEvent.clientX, y: oEvent.clientY};
			setTimeout(function() {
				JUL.Designer.designer.onTestClick(oPoint);
			}, 100);
		});
	},
	/**
		Opens a project
		@param	{String}	sItem	Project namespace
		@param	{Boolean}	bNew	True for a new project
	*/
	open: function(sItem, bNew) {
		delete this.state.clipboard.undo;
		ample.get('index.php/main/manage', {
			type: 'project',
			operation: 'open',
			ns: sItem,
			ts: (new Date()).getTime()
		}, function(sResponse) {
			var oProject = JUL.Designer.designer;
			var oResult = JSON.parse(sResponse, JUL.Designer.jsonReviver);
			if (oResult.error) {
				if (oResult.error.indexOf('not found') > -1 && bNew) {
					oProject.show('new', oProject.state.initProject);
					delete oProject.state.initProject;
				}
				else {
					window.alert(oResult.error);
				}
				return;
			}
			JUL.Designer.panels.browse.hide();
			oProject.onSelectNode();
			oProject.removeTree();
			oProject.current = oResult.result;
			oProject.state.currentOperation = 'getJS';
			oProject.save(true);
			oProject.onSwitchCurrent();
		});
	},
	/**
		Re-computes the XML in the XML layout dialog
	*/
	refreshXml: function() {
		JUL.apply(this.state._xmlOptions, {
			cssProperty: JUL.trim(ample.getElementById('textbox-xml-css').getAttribute('value')) || JUL.UI.cssProperty,
			htmlProperty: JUL.trim(ample.getElementById('textbox-xml-html').getAttribute('value')) || JUL.UI.htmlProperty,
			listenerPrefix: JUL.trim(ample.getElementById('textbox-xml-listener-prefix').getAttribute('value')),
			exportListeners: ample.getElementById('checkbox-xml-export-listeners').getAttribute('checked') === 'true',
			mergeLogic: ample.getElementById('checkbox-xml-merge-logic').getAttribute('checked') === 'true',
			expandMembers: ample.getElementById('checkbox-xml-expand-members').getAttribute('checked') === 'true'
		});
		ample.getElementById('textbox-xml-css').setAttribute('value' , this.state._xmlOptions.cssProperty);
		ample.getElementById('textbox-xml-html').setAttribute('value' , this.state._xmlOptions.htmlProperty);
		ample.getElementById('textbox-xml').setAttribute('value', this.toXml(this.state._xmlOptions));
	},
	/**
		Removes the value listeners from an object
		@param	{Object}	oConfig	Configuration object
	*/
	removeConfigListeners: function(oConfig) {
		var oTarget = this.getTarget(oConfig);
		JUL.Designer.removeValueListener(oTarget[this.current.listenersProperty]);
		if (oTarget !== oConfig ) { JUL.Designer.removeValueListener(oTarget); }
		JUL.Designer.removeValueListener(oConfig);
	},
	/**
		Removes the selected members of a component
		@param	{Array}	aNames	The list of keys to remove
		@param	{String}	sType	The type of members: UI, logic, or listeners
		@param	{Array}	aNodes	The list of affected list box rows
	*/
	removeMembers: function(aNames, sType, aNodes) {
		var sName;
		var bSave = false;
		for (var i = 0; i < aNames.length; i++) {
			sName = aNames[i];
			if (this.getExclude().indexOf(sName) < 0) {
				if (typeof this.currentConfig[sName] !== 'undefined') {
					var oWhere = JUL.Designer.getWhere(aNodes.get(i).childNodes[1].firstChild);
					if (oWhere.field.required) {
						this.currentConfig[sName] = oWhere.field.defaultValue;
					}
					else {
						delete this.currentConfig[sName];
					}
					bSave = true;
				}
				ample.query(aNodes.get(i)).remove();
			}
		}
		if (bSave) { this.save(true); }
	},
	/**
		Removes a component and its descendants from the tree panel
		@param	{Object}	[oNode]	Component element, defaults to the UI tree root
		@param	{Boolean}	[bDeleteConfig]	Also deletes the components' config objects
		@param	{Boolean}	[bOnlyChildren]	Only removes the descendant nodes, but keeps the component
	*/
	removeTree: function(oNode, bDeleteConfig, bOnlyChildren, bSelf) {
		if (!oNode) {
			oNode = ample.getElementById ('tree-interface').querySelector('xul|treechildren');
			if (oNode && oNode.firstChild) { oNode = oNode.firstChild; }
			else { return; }
		}
		var sId = oNode.getAttribute('id');
		if ((!bOnlyChildren || bSelf) && oNode === this.currentNode) {
			var oClearConfig = JUL.Designer.getWhere(sId).val();
			if (oClearConfig) {
				this.removeConfigListeners(oClearConfig);
				this.cleanConfig(oClearConfig);
			}
			this.currentNode = null;
			this.currentConfig = null;
		}
		var oChildren = oNode.querySelector('xul|treechildren');
		if (oChildren) {
			while (oChildren.lastChild) {
				this.removeTree(oChildren.lastChild, bDeleteConfig, false, true);
			}
		}
		if (bDeleteConfig) {
			var oWhere = JUL.Designer.getWhere(sId);
			var oConfig = oWhere.val();
				if (oConfig) {
				if (bOnlyChildren) {
					if (!bSelf) {
						delete oConfig[oWhere.showWhat];
						this.setCellLabel(oNode, 'members', oConfig);
					}
				}
				else {
					var sBindingId = this.getId(oConfig);
					if (!bSelf) {
						if (JUL.typeOf(oWhere.ref()) === 'Array') {
							oWhere.ref().splice(oWhere.key(), 1);
							var oNextNode = oNode.nextSibling;
							while (oNextNode) {
								JUL.Designer.getWhere(oNextNode).key(JUL.Designer.getWhere(oNextNode).key() - 1);
								oNextNode = oNextNode.nextSibling;
							}
							if (oWhere.parent && !oWhere.ref().length) {
								oWhere.parent.del();
							}
						}
						else {
							oWhere.del();
						}
						if (oNode.parentNode.parentNode.nodeName === 'xul:treeitem') {
							this.setCellLabel(oNode.parentNode.parentNode, 'members');
						}
						if (!this.current.ui) { this.current.lastComponentId = 1; }
					}
					delete this.current.logic[sBindingId];
				}
			}
		}
		if (!bOnlyChildren) {
			ample.query(oNode).remove();
			delete JUL.Designer.state.map[sId];
		}
	},
	/**
		Daves a project or a part of it
		@param	{Boolean}	[bJsOnly]	Only saves the generated JavaScript
		@param	{Boolean}	[bUndo]	This is an update due to an undo operation
	*/
	save: function(bJsOnly, bUndo) {
		var oCurrent = !bJsOnly && this.state.currentOperation !== 'save' ? this.state.newProject : this.current;
		if (!bJsOnly && !JUL.Designer.validNS(oCurrent.ns)) {
			window.alert('Invalid namespace');
			return;
		}
		if (!bJsOnly) {
			oCurrent.version = '0.' + (new Date()).getTime();
			if (JUL.Designer.app.current.ns) {
				var oModules = JUL.Designer.app.current.modules;
				for (var sModule in oModules) {
					if (oModules.hasOwnProperty(sModule)) {
						var sNS = oModules[sModule].ns;
						if (sNS.substr(0, 1) === '.') { sNS = JUL.Designer.app.current.ns + sNS; }
						if (sNS === oCurrent.ns) {
							JUL.Designer.app.state.currentOperation = 'save';
							JUL.Designer.app.save();
							break;
						}
					}
				}
			}
		}
		if (!oCurrent.ui) { oCurrent.ui = null; }
		var oScript = JUL.apply({}, oCurrent);
		oScript.parserConfig = JUL.apply({_keepInstance: true}, oScript.parserConfig);
		delete oScript.template;
		delete oScript.lastComponentId;
		if (!bJsOnly || this.state.currentOperation === 'getJS') {
			JUL.Designer.state.code = this.testJs(oScript);
		}
		if (bJsOnly) {
			if (!bUndo) { delete this.state.clipboard.undo; }
			if (this.state.currentOperation !== 'getJS') {
				this.state.notSaved = true;
				if (this.state.timerShow) { clearTimeout(this.state.timerShow); }
				this.state.timerShow = setTimeout(function() {
					var oProject = JUL.Designer.designer;
					delete oProject.state.timerShow;
					JUL.Designer.state.code = oProject.testJs(oScript);
					var oLocation = document.getElementById('iframe-test').contentWindow.location;
					oLocation.href = oProject.testUrl();
				}, 200);
			}
			this.state.currentOperation = '';
		}
		else {
			var oWhere = null;
			if (this.currentNode) {
				 oWhere = JUL.Designer.getWhere(this.currentNode);
				this.removeConfigListeners(oWhere.val());
				this.cleanConfig(oWhere.val());
			}
			JUL.Designer.applyRequired(this.fields, oCurrent);
			JUL.Designer.applyRequired(this.parserFields, oCurrent.parserConfig);
			oCurrent = JUL.Designer.keySort(oCurrent, ['template', 'parserConfig', 'ui', 'logic']);
			oCurrent.logic = JUL.Designer.keySort(oCurrent.logic);
			var oTemplate = JUL.apply({}, oCurrent);
			delete oTemplate.ui;
			delete oTemplate.logic;
			delete oTemplate.parserConfig;
			delete oTemplate.init;
			delete oTemplate.noLogic;
			delete oTemplate.lastComponentId;
			var oData = {
				operation: this.state.currentOperation,
				type: 'project',
				ns: oCurrent.ns,
				old_ns: this.current.ns,
				js: this.testJs(oScript, true),
				json: JUL.Designer.parser.obj2str(oCurrent, true),
				template: JSON.stringify(oTemplate)
			};
			if (oWhere) {
				this.fillComponentLists(oWhere.val());
				this.addConfigListeners(oWhere.val());
			}
			ample.ajax({
				url: 'index.php/main/manage',
				type: 'POST',
				async: this.state.currentOperation !== 'save',
				dataType: 'text',
				data: oData,
				success: function(sResponse) {
					sResponse = JSON.parse(sResponse);
					if (sResponse.error) {
						window.alert(sResponse.error);
						return;
					}
					var oProject = JUL.Designer.designer;
					if (oProject.state.currentOperation === 'save') {
						oProject.state.notSaved = false;
						var sUrl = oProject.testUrl();
						ample.getElementById('anchor-test').setAttribute('href', sUrl);
						ample.getElementById('iframe-test').setAttribute('src', sUrl);
						ample.getElementById('anchor-download').setAttribute('href', oProject.downloadUrl());
						if (oProject.state.pending) {
							switch (oProject.state.pending) {
							case 'new': oProject.show('new'); break;
							case 'open': oProject.showBrowse('project'); break;
							case 'close': oProject.close(); break;
							case 'open_new': oProject.open(oProject.state.pendingArg, true); break;
							}
							delete oProject.state.pending;
							delete oProject.state.pendingArg;
						}
						else {
							window.alert('Project saved');
						}
					}
					else {
						JUL.Designer.panels.project.hide();
						JUL.Designer.state.lastDialog = null;
						oProject.onSelectNode();
						oProject.removeTree();
						oProject.current = oProject.state.newProject;
						oProject.state.newProject = null;
						var sModule = JUL.trim(oProject.state.mapsToModule || '');
						if (sModule && JUL.Designer.app.current.ns) {
							var oModules = JUL.Designer.app.current.modules;
							var sNS = oProject.current.ns;
							var sNSApp = JUL.Designer.app.current.ns;
							if (sNS.substr(0, sNSApp.length + 1) === sNSApp + '.') { sNS = sNS.substr(sNSApp.length); }
							oModules[sModule] = JUL.apply(oModules[sModule] || {},  {ns: sNS});
							JUL.Designer.app.fillMenupopup();
							JUL.Designer.app.state.currentOperation = 'save';
							JUL.Designer.app.save();
						}
						oProject.onSwitchCurrent();
					}
				}
			});
		}
	},
	/**
		Fires after the user selects saving the current project
	*/
	saveCurrent: function() {
		if (!this.current.ns) { return; }
		this.state.currentOperation = 'save';
		this.save();
	},
	/**
		Searches the component tree given the component ID. The search is cyclic.
		@param	{String}	sText	Component ID or binding ID
	*/
	searchId: function(sText) {
		sText = JUL.trim(sText);
		if (!sText) { return; }
		var bCurrent = false;
		var aStart = [];
		var aEnd = [];
		var sCurrentPath = false;
		if (this.currentNode) {
			var oWhere = JUL.Designer.getWhere(this.currentNode);
			sCurrentPath = this.findPath(oWhere.val());
		}
		var oCurrent = this.current.parserConfig;
		var fSearch = function(oConfig, aPath) {
			var sPath = aPath.join('.');
			if (sPath === sCurrentPath) {
				bCurrent = true;
			}
			else {
				if (oConfig[oCurrent.idProperty] === sText || oConfig[oCurrent.bindingProperty] === sText) {
					if (bCurrent) { aStart.push(sPath); }
					else { aEnd.push(sPath); }
				}
			}
			return false;
		};
		this.findPath(fSearch);
		aStart = aStart.concat(aEnd);
		if (!aStart.length) { return; }
		this.showPath(aStart[0]);
	},
	/**
		Sets the labels of one or more cells of an UI tree element
		@param	{Object}	oNode	Tree node element
		@param	{Array}	aLabels	List of label names
		@param	{Object}	oConfig	Component config
	*/
	setCellLabel: function(oNode, aLabels, oConfig) {
		var aItems = [].concat(aLabels);
		if (!oConfig) {
			var oWhere = JUL.Designer.getWhere(oNode);
			oConfig = oWhere.val();
		}
		var oCurrent = this.current.parserConfig;
		var sId = this.getId(oConfig);
		for (var i = 0; i < aItems.length; i++) {
			switch (aItems[i]) {
			case 'name':
				var sClass = oConfig[oCurrent.classProperty] || oCurrent.defaultClass;
				oNode.querySelector('xul|treerow').childNodes[0].setAttribute('label', oCurrent.useTags ? (sClass === oCurrent.defaultClass ? '' : sClass + ':') + oConfig[oCurrent.tagProperty] : sClass);
			break;
			case 'id':
				oNode.querySelector('xul|treerow').childNodes[1].setAttribute('label', oConfig[oCurrent.idProperty] || '');
			break;
			case 'members':
				var aMembers = [];
				var aSearch = [].concat(oCurrent.childrenProperty, oCurrent.membersProperties);
				for (var k = 0; k < aSearch.length; k++) {
					if (sId && this.current.logic[sId] && this.current.logic[sId][aSearch[k]] && typeof this.current.logic[sId][aSearch[k]] === 'object') { aMembers.push(aSearch[k]); }
					else if (oConfig[aSearch[k]] && typeof oConfig[aSearch[k]] === 'object') { aMembers.push(aSearch[k]); }
				}
				oNode.querySelector('xul|treerow').childNodes[2].setAttribute('label', aMembers.join(', '));
			break;
			}
		}
	},
	/**
		Sets the window title and other captions
	*/
	setTitle: function() {
		var sTitle;
		var sDesigner = JUL.Designer.app.current.title || JUL.Designer.title;
		ample.getElementById('statusbarpanel-app').setAttribute('label', JUL.Designer.app.current.title || '');
		ample.getElementById('statusbarpanel-project').setAttribute('label', this.current.title || '');
		ample.getElementById('statusbarpanel-framework').setAttribute('label', JUL.Designer.framework.current.title || '');
		if (this.current.ns) {
			if (JUL.Designer.framework.current.ns) {
				sTitle = this.current.title + ' - ' + JUL.Designer.framework.current.title;
			}
			else { sTitle = this.current.title; }
			window.document.title = this.current.title + ' - ' + sDesigner;
		}
		else {
			if (JUL.Designer.framework.current.ns) { sTitle = JUL.Designer.framework.current.title; }
			else { sTitle = 'Project'; }
			window.document.title = sDesigner;
		}
		ample.getElementById('label-project').setAttribute('value', sTitle);
	},
	/**
		Moves a component up or down in the children list
		@param	{Object}	oNode	Selected tree element
		@param	{Boolean}	[bUp]	True if moving up, it defaults to moving down
	*/
	shiftNode: function(oNode, bUp) {
		var oPreviousNode = bUp ? oNode.previousSibling : oNode;
		var oNextNode = bUp ? oNode : oNode.nextSibling;
		var oPreviousWhere = JUL.Designer.getWhere(oPreviousNode);
		var oNextWhere = JUL.Designer.getWhere(oNextNode);
		this.state.clipboard.undo = {
			operation: 'shiftNode',
			prev: oPreviousWhere,
			next: oNextWhere,
			show: this.findPath((bUp ? oNextWhere : oPreviousWhere).val())
		};
		var oNext = oNextWhere.val();
		oNextWhere.ref().splice(oNextWhere.key(), 1);
		oNextWhere.ref().splice(oPreviousWhere.key(), 0, oNext);
		var n = oNextWhere.key();
		oNextWhere.key(oPreviousWhere.key());
		oPreviousWhere.key(n);
		this.save(true, true);
		var oParent = oNode.parentNode;
		this.removeTree(oNextNode, false, true);
		oParent.removeChild(oNextNode);
		oParent.insertBefore(oNextNode, oPreviousNode);
		this.buildTree(oNextNode, oNextWhere, true);
		ample.getElementById('tree-interface').reflow();
		if (bUp) { ample.getElementById('tree-interface').selectItem(oNextNode); }
	},
	/**
		Shows the project dialog
		@param	{String}	sOperation	The name of the current operation (eg. new or edit)
		@param	{Object}	[oInit]	Optional initializer
	*/
	show: function(sOperation, oInit) {
		if (sOperation === 'edit' && !this.current.ns) {
			window.alert('There is no current project');
			return;
		}
		if (sOperation === 'new' && !oInit && !this.state.pending && this.checkSave('new')) { return; }
		this.state.newProject = {
			ui: null,
			logic: {},
			parserConfig: {},
			lastComponentId: 1
		};
		var oAppendFields = null;
		delete this.state.mapsToModule;
		if (sOperation === 'new' && JUL.Designer.app.current.ns && !oInit) {
			var oApp = JUL.Designer.app.current;
			var sModule = 'module1';
			var n = 2;
			while (oApp.modules[sModule]) { sModule = 'module' + n++; }
			oInit = {
				ns: oApp.ns + '.' + sModule,
				title: oApp.title + ' - ' + sModule.substr(0, 1).toUpperCase() + sModule.substr(1),
				parserConfig: this.copy(oApp.defaultParser)
			};
			if (oApp.preferredFramework) { oInit.suggestedFramework = oApp.preferredFramework; }
			oAppendFields = {mapsToModule: {tooltip: 'if non-empty, the module with this name will be added or updated to map to this project', template: '<string>'}};
			this.state.mapsToModule = sModule;
		}
		var oCurrent = this.state.newProject;
		if (oInit) { JUL.apply(oCurrent, oInit); }
		if (sOperation === 'edit') {
			for (var sItem in this.current) {
				if (this.current.hasOwnProperty(sItem)) {
					if (sItem === 'ui' || sItem === 'logic') { oCurrent[sItem] = this.current[sItem]; }
					else { oCurrent[sItem] = this.copy(this.current[sItem]); }
				}
			}
		}
		ample.query('#listbox-project-settings>xul|listbody').empty();
		ample.query('#listbox-project-parser>xul|listbody').empty();
		if (!oCurrent.template) {
			oCurrent.template = JUL.Designer.config.defaultTemplate;
		}
		ample.getElementById('textbox-project-template').setAttribute('value', oCurrent.template);
		JUL.Designer.fillListbox('listbox-project-settings', this.fields, oCurrent);
		if (oAppendFields) {
			JUL.Designer.fillListbox('listbox-project-settings', oAppendFields, this.state);
		}
		JUL.Designer.fillListbox('listbox-project-parser', this.parserFields, oCurrent.parserConfig);
		this.state.currentOperation = sOperation;
		JUL.Designer.panels.project.setAttribute('title',
			sOperation === 'new' ? 'New project' : 'Edit project - ' + oCurrent.title);
		JUL.Designer.state.lastDialog = JUL.Designer.panels.project;
		JUL.Designer.panels.project.showModal();
		var oTabs = JUL.Designer.panels.project.querySelector('xul|tabs');
		oTabs.firstChild.$activate();
	},
	/**
		Shows the browse dialog
		@param	{String}	sType	Type of browsing (eg. project or framework)
	*/
	showBrowse: function(sType) {
		if (sType === 'project' && !this.state.pending && this.checkSave('open')) { return; }
		JUL.Designer.state.browseType = sType;
		JUL.Designer.fillBrowseList();
		JUL.Designer.panels.browse.setAttribute('title', 'Open ' + sType.replace('app', 'application'));
		JUL.Designer.panels.browse.showModal();
	},
	/**
		Displays the clipboard content dialog
	*/
	showClipboard: function() {
		var oClipboard = this.state.clipboard;
		var aNodes = oClipboard.contentNodes || [];
		var oMembers = oClipboard.contentMembers || {};
		var oScript = {};
		var sText = '/* Components\' UI */\n';
		for (var i = 0; i < aNodes.length; i++) {
			oScript[i] = aNodes[i].ui;
		}
		sText = sText + '[' + JUL.Designer.parser.obj2str(oScript).slice(1, -1) + ']\n';
		sText = sText + '\n/* Components\' logic */\n';
		oScript = {};
		for (i = 0; i < aNodes.length; i++) {
			JUL.apply(oScript, aNodes[i].logic);
		}
		sText = sText + JUL.Designer.parser.obj2str(oScript) + '\n';
		ample.getElementById('textbox-clipboard-components').setAttribute('value', sText);
		sText = '/* Members */\n';
		sText = sText + JUL.Designer.parser.obj2str(oMembers) + '\n';
		ample.getElementById('textbox-clipboard-members').setAttribute('value', sText);
		sText = '* special members ';
		if (this.current.ns) {
			sText = sText + this.getExclude().map(function(s){return "'" + s + "'";}).join(', ') + ' ';
		}
		sText = sText + 'won\'t be pasted over';
		ample.getElementById('description-exclude-paste').setAttribute('value', sText);
		if (typeof oClipboard.pasteStart === 'undefined') {
			ample.getElementById('textbox-range-start').setAttribute('value', '');
			ample.getElementById('textbox-range-end').setAttribute('value', '');
		}
		else {
			ample.getElementById('textbox-range-start').setAttribute('value', oClipboard.pasteStart);
			ample.getElementById('textbox-range-end').setAttribute('value', oClipboard.pasteEnd);
		}
		ample.getElementById('textbox-range-start').setAttribute('disabled', typeof oClipboard.pasteStart === 'undefined');
		ample.getElementById('textbox-range-end').setAttribute('disabled', typeof oClipboard.pasteStart === 'undefined');
		ample.getElementById('checkbox-paste-range').setAttribute('checked', typeof oClipboard.pasteStart !== 'undefined');
		if (typeof oClipboard.pasteFilter === 'undefined') {
			ample.getElementById('textbox-filter-members').setAttribute('value', '');
		}
		else {
			ample.getElementById('textbox-filter-members').setAttribute('value', oClipboard.pasteFilter.join(', '));
		}
		ample.getElementById('textbox-filter-members').setAttribute('disabled', typeof oClipboard.pasteFilter === 'undefined');
		ample.getElementById('checkbox-paste-filter').setAttribute('checked', typeof oClipboard.pasteFilter !== 'undefined');
		JUL.Designer.panels.clipboard.showModal();
	},
	/**
		Shows the JavaScript window
	*/
	showJs: function() {
		if (!this.current.ns) { return; }
		var oCurrent = this.current;
		var oWhere = null;
		if (this.currentNode) {
			 oWhere = JUL.Designer.getWhere(this.currentNode);
			this.removeConfigListeners(oWhere.val());
			this.cleanConfig(oWhere.val());
		}
		JUL.Designer.applyRequired(this.fields, oCurrent);
		JUL.Designer.applyRequired(this.parserFields, oCurrent.parserConfig);
			var oJS = JUL.Designer.keySort(oCurrent, ['template', 'parserConfig', 'ui', 'logic']);
			oJS.logic = JUL.Designer.keySort(oJS.logic);
		delete oJS.template;
		delete oJS.lastComponentId;
		ample.getElementById('textbox-js').setAttribute('value', this.testJs(oJS, true));
		if (oWhere) {
			this.fillComponentLists(oWhere.val());
			this.addConfigListeners(oWhere.val());
		}
		var oDialog = JUL.Designer.panels.js;
		oDialog.setAttribute('title', this.current.title + ' - JavaScript');
		oDialog.showModal();
		setTimeout(function() {
			ample.getElementById('textbox-js').focus();
		}, 500);
	},
	/**
		Changes the 'members' collection displayed under a component in the UI tree panel
		@param	{String}	sWhat	The name of the new collection
	*/
	showMembers: function(sWhat) {
		var oCurrent = this.current.parserConfig;
		var aItems = [].concat(oCurrent.childrenProperty, oCurrent.membersProperties);
		if (aItems.indexOf(sWhat) < 0) { return; }
		var oWhere = JUL.Designer.getWhere(this.currentNode);
		var oConfig = oWhere.val();
		var sId = this.getId(oConfig);
		if (sWhat === oWhere.showWhat) { return; }
		var sType = oConfig[sWhat] ? JUL.typeOf(oConfig[sWhat]) : 'Array';
		if (sId && this.current.logic[sId] && this.current.logic[sId][sWhat] && 
			typeof this.current.logic[sId][sWhat] === 'object') {
			sType = JUL.typeOf(this.current.logic[sId][sWhat]);
		}
		ample.getElementById('menulist-designer-members-type').setAttribute('value', sType);
			ample.getElementById('menulist-designer-members-where').setAttribute('value',
				sId && this.current.logic[sId] && this.current.logic[sId][sWhat] && typeof this.current.logic[sId][sWhat] === 'object' ? 'logic' : 'ui' );
		this.removeTree(this.currentNode, false, true);
		oWhere.showWhat = sWhat;
		this.buildTree(this.currentNode, oWhere, true);
		ample.getElementById('tree-interface').reflow();
	},
	/**
		Searches abd expands a namespace path in the tree panel
		@param	{String}	sPath	Namespace path
		@param	{String}	sWhatChildren	What 'members' collection to display for the ending component
	*/
	showPath: function(sPath, sWhatChildren) {
		var oFind = this.getFrom(sPath);
		if (!oFind) { return; }
		var oQuery = ample.query('#tree-interface>xul|treebody>xul|treechildren');
		if (!oQuery.length) { return; }
		var oRoot = oQuery.get(0).firstChild;
		var oWhere = null;
		var aPath = sPath.length ? sPath.split('.') : [];
		var oNode = oRoot;
		var sItem = '';
		while (aPath.length) {
			sItem = aPath.shift();
			oWhere = JUL.Designer.getWhere(oNode);
			if (sItem !== oWhere.showWhat) {
				this.removeTree(oNode, false, true);
				oWhere.showWhat = sItem;
				this.buildTree(oNode, oWhere, true);
			}
			if (!aPath.length) {
				oNode = oNode.querySelector('xul|treechildren').items.item(0);
				break;
			}
			sItem = parseInt(aPath[0]);
			if (isNaN(sItem)) { sItem = 0; }
			else { aPath.shift(); }
			oNode = oNode.querySelector('xul|treechildren').items.item(sItem);
		}
		if (sWhatChildren) { oWhere = JUL.Designer.getWhere(oNode); }
		if (sWhatChildren && oWhere.showWhat !== sWhatChildren) {
			this.removeTree(oNode, false, true);
			oWhere.showWhat = sWhatChildren;
			this.buildTree(oNode, oWhere, true);
		}
		ample.getElementById('tree-interface').reflow();
		oNode.scrollIntoView();
		ample.getElementById('tree-interface').selectItem(oNode);
	},
	/**
		Tries to hint a component with a red rectangle in the project's iframe
		@param	{Object}	oRect	An object with the properties: left, top, width, height, and optionally, zIndex
	*/
	showSelect: function(oRect) {
		ample.getElementById('statusbarpanel-selection').setAttribute('label',
			oRect ? (typeof oRect.zIndex === 'undefined' ? '' : oRect.zIndex.toFixed(0) + ': ')  +
			'[' + oRect.left.toFixed(0) + ', ' + oRect.top.toFixed(0) + '] -> [' +
				(oRect.left + oRect.width).toFixed(0) + ', ' + (oRect.top + oRect.height).toFixed(0) + ']' : '');
		var oTest = document.getElementById('iframe-test');
		var oDocument = oTest.contentDocument || oTest.contentWindow.document;
		var oLines = {
			top: 'line-select-top',
			left: 'line-select-left',
			bottom: 'line-select-bottom',
			right: 'line-select-right'
		};
		if (this.state.hintTimer) {
			clearTimeout(this.state.hintTimer);
			delete this.state.hintTimer;
		}
		var oSelect;
		for (var sItem in oLines) {
			if (oLines.hasOwnProperty(sItem) && (oSelect = oDocument.getElementById(oLines[sItem]))) {
				oSelect.parentNode.removeChild(oSelect);
			}
		}
		if (!oRect) { return; }
		for (sItem in oLines) {
			if (oLines.hasOwnProperty(sItem)) {
				oSelect = oDocument.createElement('div');
				oSelect.setAttribute('id', oLines[sItem]);
				oSelect.style.cssText = oSelect.style.cssText +'position:absolute;z-index:16777271;border:1px solid red;' + 
					(sItem === 'left' || sItem === 'right' ? 'width:0.1px;' : 'height:0.1px;') +
					(sItem === 'left' || sItem === 'right' ? 'height:' + oRect.height + 'px;' : 'width:' + oRect.width + 'px;') +
					(sItem === 'right' ? 'left:' + (oRect.left + oRect.width) + 'px;' : 'left:' + oRect.left + 'px;') +
					(sItem === 'bottom' ? 'top:'+ (oRect.top + oRect.height) + 'px;' : 'top:' + oRect.top + 'px;');
				oDocument.body.appendChild(oSelect);
			}
		}
		this.state.hintTimer = setTimeout(function() {
			delete JUL.Designer.designer.state.hintTimer;
			ample.getElementById('statusbarpanel-selection').setAttribute('label', '');
			var oSelect;
			for (var sItem in oLines) {
				if (oLines.hasOwnProperty(sItem) && (oSelect = oDocument.getElementById(oLines[sItem]))) {
					oSelect.parentNode.removeChild(oSelect);
				}
			}
		}, 3000);
	},
	/**
		Shows the XML layout dialog
	*/
	showXml: function() {
		if (!this.current.ns) { return; }
		this.state._xmlOptions = this.state._xmlOptions || {
			cssProperty: JUL.UI.cssProperty,
			htmlProperty: JUL.UI.htmlProperty,
			exportListeners: false,
			listenerPrefix: 'on',
			mergeLogic: false,
			expandMembers: false
		};
		ample.getElementById('textbox-xml-css').setAttribute('value' , this.state._xmlOptions.cssProperty);
		ample.getElementById('textbox-xml-html').setAttribute('value' , this.state._xmlOptions.htmlProperty);
		ample.getElementById('checkbox-xml-export-listeners').setAttribute('checked' , this.state._xmlOptions.exportListeners);
		ample.getElementById('textbox-xml-listener-prefix').setAttribute('value' , this.state._xmlOptions.listenerPrefix);
		ample.getElementById('checkbox-xml-merge-logic').setAttribute('checked' , this.state._xmlOptions.mergeLogic);
		ample.getElementById('checkbox-xml-expand-members').setAttribute('checked' , this.state._xmlOptions.expandMembers);
		ample.getElementById('textbox-xml').setAttribute('value', this.toXml(this.state._xmlOptions));
		var oDialog = JUL.Designer.panels.xml;
		oDialog.setAttribute('title', this.current.title + ' - XML layout');
		oDialog.showModal();
		setTimeout(function() {
			ample.getElementById('textbox-xml').focus();
		}, 500);
	},
	/**
		Moves the logic members of a component between the main config and its logic part, depending on the presence of a component ID
		@param	{Object}	oWhere	JUL.Ref of the config object
		@param	{String}	sNewId	The new component ID or binding ID
		@param	{String}	sOldId	The old component ID or binding ID
		@param	{Boolean}	[bUndo]	True if this the effect of an undo operation
	*/
	swapLogic: function(oWhere, sNewId, sOldId, bUndo) {
		if (sNewId === sOldId) { return; }
		if (!bUndo && this.current.noLogic && (!sOldId || !this.current.logic[sOldId])) { return; }
		oWhere = oWhere || JUL.Designer.getWhere(this.currentNode);
		var oConfig = oWhere.val();
		if (sNewId) {
			if (sOldId && this.current.logic[sOldId]) {
				this.current.logic[sNewId] = this.current.logic[sOldId];
				delete this.current.logic[sOldId];
			}
			else {
				this.current.logic[sNewId] = {};
				var oComponent = this.findComponent(oConfig);
				if (oComponent) {
					var oMembers = JUL.Designer.framework.getInherited(oComponent, 'members') || {};
					for (var sItem in JUL.Designer.keySort(oMembers)) {
						if (oMembers.hasOwnProperty(sItem) && oMembers[sItem].logic &&
							typeof oConfig[sItem] !== 'undefined') {
								this.current.logic[sNewId][sItem] = oConfig[sItem];
								delete oConfig[sItem];
							}
					}
				}
				if (oConfig[this.current.listenersProperty]) {
					this.current.logic[sNewId][this.current.listenersProperty] = oConfig[this.current.listenersProperty];
					delete oConfig[this.current.listenersProperty];
				}
			}
		}
		else {
			if (sOldId && this.current.logic[sOldId]) {
				JUL.apply(oConfig, this.current.logic[sOldId]);
				delete this.current.logic[sOldId];
			}
			else {
				return;
			}
		}
		if (bUndo) { return; }
		if (this.state.selectTimer) { clearTimeout(this.state.selectTimer); }
		this.state.selectTimer = setTimeout(function() {
			var oDesigner = JUL.Designer.designer;
			delete oDesigner.state.selectTimer;
			oDesigner.onSelectNode(JUL.Designer.designer.currentNode);
		}, 100);
	},
	/**
		Loads the content of the project's iframe (i.e. its test page)
	*/
	test: function() {
		if (this.current.ns) {
			var sUrl = this.testUrl();
			var sOld = ample.getElementById('iframe-test').getAttribute('src');
			if (sOld === sUrl) {
				var oLocation = document.getElementById('iframe-test').contentWindow.location;
				oLocation.href = sUrl;
			}
			else {
				ample.getElementById('iframe-test').setAttribute('src', sUrl);
			}
		}
		else {
			ample.getElementById('iframe-test').setAttribute('src', 'about:blank');
		}
	},
	/**
		Generates the JavaScript required for the project's test page
		@param	{Object}	oJs	Standardized configuration tree
		@param	{Boolean}	[bComment]	Also generate some default comments
		@returns	{String}	JAvaScrtipt code
	*/
	testJs: function(oJs, bComment) {
		var sJs = '/* generated by ' + JUL.Designer.title + ' version ' + JUL.Designer.version + ' */\n';
		if (bComment) {
			var oProject = JUL.Designer.keySort(oJs);
			delete oProject.parserConfig;
			delete oProject.ui;
			delete oProject.logic;
			var oParser = JUL.Designer.keySort(oJs.parserConfig);
			delete oParser._keepInstance;
			for (var sItem in oParser) {
				if (oParser.hasOwnProperty(sItem) && typeof JUL.UI[sItem] !== 'undefined' &&
					JSON.stringify(oParser[sItem]) === JSON.stringify(JUL.UI[sItem])) { delete oParser[sItem]; }
			}
			oJs = this.cleanTree(oJs.ui, oJs.logic);
			var aItems = [
				{suf: '', ref: oProject, desc: ''},
				{suf: '.parserConfig', ref: oParser, desc: ' parser config'},
				{suf: '.ui', ref: oJs.ui, desc: ' UI'},
				{suf: '.logic', ref: oJs.logic, desc: ' logic'}
			];
			sJs = sJs + '/* \'' + oProject.title + '\' namespace */\n';
			sJs = sJs + "JUL.ns('" + oProject.ns + "');\n\n";
			for (var i = 0; i < aItems.length; i++) {
				var oItem = aItems[i];
				sJs = sJs + (oItem.suf ? oProject.ns + oItem.suf + ' =\n' : 'JUL.apply(' + oProject.ns + ',\n' );
				sJs = sJs + '/* begin \'' + oProject.title + "'" + oItem.desc + ' */\n';
				sJs = sJs + JUL.Designer.parser.obj2str(oItem.ref) + '\n';
				sJs = sJs + '/* end \'' + oProject.title + "'" + oItem.desc + ' */\n';
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
		Returns the URL of the project's test page
		@returns	{String}	Test page URL
	*/
	testUrl: function() {
			return 'index.php/main/manage?type=project&operation=test&ns=' + encodeURIComponent(this.current.ns) +
				'&version='+ encodeURIComponent(this.current.version);
	},
	/**
		Generates the XML layout code
		@param	{Object}	[oOptions]	Several options to customize the code
		@returns	{String}	XML code
	*/
	toXml: function(oOptions) {
		var sHeader = '<' + '?xml version="1.0"?' + '>';
		if (!this.current.ui) { return sHeader; }
		oOptions = oOptions || {};
		oOptions = JUL.apply({
			exportListeners: true,
			listenerPrefix: 'on',
			listenersProperty: this.current.listenersProperty,
			mergeLogic: true,
			expandMembers: !this.current.parserConfig.useTags
		}, [this.current.parserConfig, oOptions]);
		oOptions.topDown = true;
		if (oOptions.expandMembers) {
			oOptions.membersProperties = [].concat(oOptions.childrenProperty, oOptions.membersProperties);
			oOptions.childrenProperty = '_children_';
		}
		oOptions.xmlDoc = JUL.UI._createXml(sHeader.replace('"1.0"', '"1.0" encoding="UTF-8"') + '<root />');
		oOptions.xmlDoc.removeChild(oOptions.xmlDoc.lastChild);
		oOptions.xmlNS = JUL.apply({}, JUL.UI.xmlNS);
		oOptions.xmlNS.xul = 'http://www.w3.org/2015/xul';
		oOptions.customFactory = this.createXml;
		var oParser = new JUL.UI.Parser(oOptions);
		var oUi = oOptions.expandMembers ? oParser.expand(this.current.ui) : this.current.ui;
		var oLogic = null;
		if (oOptions.mergeLogic) {
			oLogic = oOptions.expandMembers ? JUL.apply({}, this.current.logic) : this.current.logic;
			if (oOptions.expandMembers) {
				for (var sItem in oLogic) {
					if (oLogic.hasOwnProperty(sItem)) { oLogic[sItem] = oParser.expand(oLogic[sItem]); }
				}
			}
		}
		oParser.create(oUi, oLogic, oOptions.xmlDoc);
		try { JUL.Designer.state._serializer = JUL.Designer.state._serializer || new XMLSerializer(); } catch (e) {}
		var oSerializer = JUL.Designer.state._serializer;
		var sEncoding = oOptions.xmlDoc.xmlEncoding || oOptions.xmlDoc.characterSet || oOptions.xmlDoc.charset;
		var sXml = oSerializer ? oSerializer.serializeToString(oOptions.xmlDoc) : (oOptions.xmlDoc.xml || '');
		sXml = sXml.replace(new RegExp(oOptions.xmlNS.xul, 'g'), JUL.UI.xmlNS.xul);
		var n = 0;
		if (sXml.substr(0, 5) === '<' + '?xml') {
			n = sXml.indexOf('?' + '>') + 2;
			sHeader = sXml.substr (0, n);
			sXml = sXml.substr(sXml.indexOf('<', n));
		}
		else if (sEncoding) {
			sHeader = sHeader.replace('"1.0"', '"1.0" encoding="' + sEncoding.toUpperCase() + '"');
		}
		var aXml = this.formatXml(sXml.replace(/\t/g, '&#9;').replace(/\n/g, '&#10;')).split('\n');
		for (var i = 0; i < aXml.length; i++) {
			n = aXml[i].indexOf('<');
			aXml[i] = aXml[i].replace(/&#10;/g, '\n' + (n > 0 ? aXml[i].substr(0, n) : '')).replace(/&#9;/g, '\t');
		}
		return sHeader + '\n' + aXml.join('\n');
	},
	/**
		Manages all undo operations
	*/
	undo: function() {
		var oUndo = this.state.clipboard.undo;
		var i = 0;
		if (!oUndo) {
			window.alert('Nothing to undo');
			return;
		}
		this.removeTree();
		switch (oUndo.operation) {
		case 'removeNodes':
			for (i = 0; i < oUndo.ui.length; i++) {
				if (oUndo.wasArray[i]) {
					oUndo.where[i].parent.val(oUndo.where[i].parent.val() || []);
					oUndo.where[i].ref(oUndo.where[i].parent.val());
					oUndo.where[i].ref().splice(oUndo.where[i].key(), 0, oUndo.ui[i]);
				}
				else {
					oUndo.where[i].val(oUndo.ui[i]);
				}
				if (oUndo.logic[i]) {
					JUL.apply(this.current.logic, oUndo.logic[i]);
				}
			}
		break;
		case 'addNodes':
			for (i = oUndo.where.length - 1; i >= 0; i--) {
				if (oUndo.where[i].parent) {
					oUndo.where[i].ref().splice(oUndo.where[i].key(), 1);
					if (!i) {
						if (oUndo.toArray) {
							oUndo.where[i].parent.val(oUndo.where[i].ref()[0]);
						}
						else if (!oUndo.where[i].ref().length) {
							oUndo.where[i].parent.del();
						}
					}
				}
				else {
				oUndo.where[i].del();
				}
			}
			for (i = oUndo.logic.length - 1; i >= 0; i--) {
				delete this.current.logic[oUndo.logic[i]];
			}
		break;
		case 'changeMembers':
			var oParser = this.current.parserConfig;
			this.initConfig(oUndo.show.val());
			if (oUndo.tabIndex === 1) { oUndo.owner = this.getTarget(oUndo.show.val()); }
			if (oUndo.tabIndex === 2) { oUndo.owner = this.getTarget(oUndo.show.val())[this.current.listenersProperty]; }
			if (oParser.idProperty in oUndo.items || oUndo.del.indexOf(oParser.idProperty) > -1) {
				var sBid = oUndo.owner[oParser.bindingProperty];
				this.swapLogic(oUndo.show, oUndo.items[oParser.idProperty] || sBid, oUndo.owner[oParser.idProperty] || sBid, true);
			}
			if (oParser.bindingProperty in oUndo.items || oUndo.del.indexOf(oParser.bindingProperty) > -1) {
				var sId = oUndo.owner[oParser.idProperty];
				this.swapLogic(oUndo.show, sId || oUndo.items[oParser.bindingProperty], sId || oUndo.owner[oParser.bindingProperty], true);
			}
			for (var sItem in oUndo.items) {
				if (oUndo.items.hasOwnProperty(sItem)) { oUndo.owner[sItem] = oUndo.items[sItem]; }
			}
			for (i = 0; i < oUndo.del.length; i++) {
				delete oUndo.owner[oUndo.del[i]];
			}
		break;
		case 'shiftNode':
			var oNext = oUndo.next.val();
			oUndo.next.ref().splice(oUndo.next.key(), 1);
			oUndo.next.ref().splice(oUndo.prev.key(), 0, oNext);
			var n = oUndo.next.key();
			oUndo.next.key(oUndo.prev.key());
			oUndo.prev.key(n);
		break;
		case 'changeWhere':
		var oNodeConfig = oUndo.where.val();
		var sNodeId = this.getId(oNodeConfig);
		if (oUndo.toLogic) {
			oNodeConfig[oUndo.what] = this.current.logic[sNodeId][oUndo.what];
			delete this.current.logic[sNodeId][oUndo.what];
		}
		else {
			if (!this.current.logic[sNodeId]) {
				this.current.logic[sNodeId] = {};
			}
			this.current.logic[sNodeId][oUndo.what] = oNodeConfig[oUndo.what];
			delete oNodeConfig[oUndo.what];
		}
		break;
		case 'changeType':
			if (oUndo.toArray) {
				oUndo.target[oUndo.what] = oUndo.target[oUndo.what][0];
			}
			else {
				oUndo.target[oUndo.what] = [oUndo.target[oUndo.what]];
			}
		break;
		default:
			delete this.state.clipboard.undo;
			return;
		}
		this.save(true);
		this.buildTree();
		if (oUndo.show && typeof oUndo.show === 'object') { oUndo.show = this.findPath(oUndo.show.val()); }
		if (oUndo.show !== false ) {
			this.state.showTab = oUndo.tabIndex;
			this.showPath(oUndo.show, oUndo.show ? oUndo.show.showWhat : false);
		}
		delete this.state.clipboard.undo;
	}
});

/* set popup mednu for edit menus */
JUL.apply(JUL.Designer.designer.logic, {
	'menu-edit': {
		children: JUL.Designer.designer.editUi
	},
	'menupopup-edit': {
		children: JUL.Designer.designer.editUi
	}
});

})();

/* end JUL.Designer.designer.js */