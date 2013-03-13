var storeRC = loadStore('NewsCategorys');
storeRC.load({
	params: {
		all: 1
	}
});
Ext.create('Ext.Window', {
	title: 'Add News',
	width: 500,
	draggable: false,
	resizable: false,
	modal: true,
	items: [{
		xtype: 'panel',
		border: false,
		items: [{
			xtype: 'form',
			layout: 'form',
			id: 'news-add-new-form',
			border: false,
			bodyPadding: '5 5 5 5',
			defaultType: 'textfield',
			items: [{
				fieldLabel: 'Title',
				name: 'TITLE',
				emptyText: 'News Title',
				allowBlank: false
			},{
				xtype: 'combobox',
				name: 'CATEGORY',
				store: storeRC,
				displayField: 'NEWS_CATEGORY',
				typeAhead: false,
				editable: false,
				emptyText: 'Select category',
				fieldLabel: 'Category',
				allowBlank: false
			},{
				xtype: 'filefield',
				name: 'FILE_PATH',
				fieldLabel: 'File',
				emptyText: 'Please select a document',
				allowBlank: false
			}]
		}]
	}],
	buttons: [{
		text: 'Upload',
		listeners: {
			click: function() {
				var form = Ext.getCmp('news-add-new-form').getForm();
				var store = loadStore('Newss');
				if(form.isValid()) {
					form.submit({
						url: sd.baseUrl + '/news/request/create',
						waitMsg: 'Uploading document, please wait..',
						success: function(d, e) {
							var json = Ext.decode(e.response.responseText);
							Ext.Msg.show({
								title: 'Message',
								msg: 'File sucessfully uploaded',
								minWidth: 200,
								modal: true,
								icon: Ext.Msg.INFO,
								buttons: Ext.Msg.OK
							});
							form.reset();
							store.loadPage(store.currentPage);
						},
						failure: function(d, e) {
							var json = Ext.decode(e.response.responseText);
							Ext.Msg.show({
								title: 'Error',
								msg: json.error_message,
								minWidth: 200,
								modal: true,
								icon: Ext.Msg.INFO,
								buttons: Ext.Msg.OK
							});
						}
					});
				}
			}
		}
	},{
		text: 'Cancel',
		listeners: {
			click: function() {
				this.up().up().close();
			}
		}
	}]
}).show();