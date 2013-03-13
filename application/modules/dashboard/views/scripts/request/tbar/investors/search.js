Ext.create('Ext.Window', {
	title: 'Search Investor',
	xtype: 'panel',
	layout: 'border',
	id: 'search-investor-main',
	modal: true,
	closable: true,
	width: 600,
	height: 154,
	resizable: false,
	draggable: false,
	buttons: [{
		text: 'Search',
		listeners: {
			click: function() {
				var form1 = Ext.getCmp('search-investor-form-left').getForm();
				var form2 = Ext.getCmp('search-investor-form-right').getForm();
				
				if(form1.isValid() && form2.isValid()) {
					var obj3 = {};
					var val1 = form1.getValues();
					var val2 = form2.getValues();
					for(var attrname in val1) {
						obj3[attrname] = val1[attrname];
					}
					for(var attrname in val2) {
						obj3[attrname] = val2[attrname];
					}
					showLoadingWindow();
					Ext.Ajax.request({
						url: sd.baseUrl + '/investors/request/search',
						params: obj3,
						success: function(data) {
							
							closeLoadingWindow();
						},
						failure: function(data) {
							
							closeLoadingWindow();
						}
					});
				}
			}
		}
	},{
		text: 'Cancel',
		listeners: {
			click: function() {
				var p = Ext.getCmp('search-investor-main');
				if(confirm('Cancel search ?')) {
					p.close();
				}
			}
		}
	}],
	items: [{
		region: 'west',
		border: false,
		width: '50%',
		items: [{
			xtype: 'form',
			layout: 'form',
			border: false,
			id: 'search-investor-form-left',
			bodyPadding: '5 5 5 5',
			defaultType: 'combobox',
			items: [{
				fieldLabel: 'Company Name',
				emptyText: 'All',
				name: 'COMPANY_NAME',
				allowBlank: false
			},{
				fieldLabel: 'Contact Person',
				emptyText: 'All',
				name: 'CONTACT PERSON',
				allowBlank: false
			},{
				fieldLabel: 'Equity Assets',
				emptyText: 'All',
				name: 'EQUITY_ASSETS',
				allowBlank: false
			}]
		}]
	},{
		region: 'east',
		border: false,
		width: '50%',
		items: [{
			xtype: 'form',
			layout: 'form',
			border: false,
			id: 'search-investor-form-right',
			bodyPadding: '5 5 5 5',
			defaultType: 'combobox',
			items: [{
				fieldLabel: 'Investor Type',
				emptyText: 'All',
				name: 'INVESTOR_TYPE',
				allowBlank: false
			},{
				fieldLabel: 'Location',
				emptyText: 'All',
				name: 'LOCATION',
				allowBlank: false
			},{
				fieldLabel: 'Format',
				emptyText: 'List',
				name: 'FORMAT',
				allowBlank: false
			}]
		}]
	}]
}).show();
//var c = Ext.getCmp('<?php echo $this->container ?>');
//var id = 'investor-search-investor';
//
//if(!c.up().items.get(id)) {
//	c.up().add({
//		xtype: 'panel',
//		layout: 'border',
//		title: 'Seach Investors',
//		id: id,
//		closable: true,
//		border: false,
//		bodyStyle: {
//			'background-color' : '#FFF'
//		},
//		tbar: [{
//			xtype: 'button',
//			text: 'Search',
//			iconCls: 'icon-accept',
//			listeners: {
//				click: function() {
//					var form1 = this.up().up().items.items[0];
//					var form2 = this.up().up().items.items[1];
//					if(form1.getForm().isValid() && form2.getForm().isValid()) {
//						var obj3 = {};
//						var val1 = form1.getValues();
//						var val2 = form2.getValues();
//						for(var attrname in val1) {
//							obj3[attrname] = val1[attrname];
//						}
//						for(var attrname in val2) {
//							obj3[attrname] = val2[attrname];
//						}
//						showLoadingWindow();
//						Ext.Ajax.request({
//							url: sd.baseUrl + '/investors/request/search',
//							params: obj3,
//							success: function(data) {
//								
//								closeLoadingWindow();
//							},
//							failure: function(data) {
//								
//								closeLoadingWindow();
//							}
//						})
//					}
//				}
//			}
//		},{
//			xtype: 'button',
//			text: 'Cancel',
//			iconCls: 'icon-stop',
//			listeners: {
//				click: function() {
//					if(confirm('Abort search investor ?')) {
//						this.up().up().close();
//					}
//				}
//			}
//		}],
//		items: [{
//			xtype: 'form',
//			region: 'west',
//			id: 'search-form-one',
//			border: false,
//			bodyPadding: '5 5 5 5',
//			items: [{
//				xtype: 'combobox',
//				fieldLabel: 'Company Name',
//				name: 'COMPANY_NAME',
//				allowBlank: false,
//				width: 300
//			},{
//				xtype: 'combobox',
//				fieldLabel: 'Contact Person',
//				name: 'CONTACT_PERSON',
//				allowBlank: false,
//				width: 300
//			},{
//				xtype: 'combobox',
//				fieldLabel: 'Equity Assets',
//				name: 'EQUITY_ASSETS',
//				allowBlank: false,
//				width: 300
//			}]
//		},{
//			xtype: 'form',
//			region: 'west',
//			id: 'search-form-two',
//			border: false,
//			bodyPadding: '5 5 5 5',
//			items: [{
//				xtype: 'combobox',
//				fieldLabel: 'Investor Type',
//				name: 'INVESTOR_TYPE',
//				allowBlank: false,
//				width: 300
//			},{
//				xtype: 'combobox',
//				fieldLabel: 'Location',
//				name: 'LOCATION',
//				allowBlank: false,
//				width: 300
//			},{
//				xtype: 'combobox',
//				fieldLabel: 'Format',
//				name: 'FORMAT',
//				allowBlank: false,
//				width: 300
//			}]
//		}]
//	});
//}
//c.up().setActiveTab(id);