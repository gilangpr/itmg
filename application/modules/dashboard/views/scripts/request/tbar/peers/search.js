Ext.create('Ext.Window', {
	title: 'Search Peers',
	xtype: 'panel',
	layout: 'border',
	id: 'search-peers',
	modal: true,
	closable: true,
	width: 400,
	height: 300,
	resizable: false,
	draggable: false,
	buttons: [{
		text: 'Search',
		listeners: {
			click: function() {
				var form = getCmp('search-peers-form').getForm();
				if(form.isValid()) {
					var obj3 = {};
					var val = form.getValues();
					for(var attrname in val) {
						obj3[attrname] = val[attrname];
					}
					showLoadingWindow();
					Ext.Ajax.request({
						url: sd.baseUrl + '/peers/request/search',
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
				var p = Ext.getCmp('search-peers');
				if(confirm('Cancel Search ?')) {
					p.close();
				}
			}
		}
	}],
	items: [{
		border: false,
		width: 390,
		items: [{
			xtype: 'form',
			layout: 'form',
			border: false,
			id: 'search-peers-form',
			bodyPadding: '5 5 5 5',
			defaultType: 'combobox',
			items: [{
				fieldLabel: 'Company Name',
				name: 'PEER_NAME',
				emptyText: 'All',
				allowBlank: false
			}]
		}]
	}]
}).show(); 