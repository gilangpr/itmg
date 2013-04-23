var c = Ext.getCmp('<?php echo $this->container ?>');
var id = 'peers-add-form';
if (!c.up().items.get(id)) {
	
	c.up().add({
		title: 'Add New Peer Company',
		id: id,
		closable: true,
		autoScroll: true,
		tbar: [{
			xtype: 'button',
			text: 'Save',
			iconCls: 'icon-accept',
			listeners: {
				click: function() {
					var form = Ext.getCmp('add-new-peers-form').getForm();
					var store = loadStore('Peers');
					if (form.isValid()) {
						form.submit({
							url: sd.baseUrl + '/peers/request/create',
							success: function(data) {
								var json = Ext.decode(data.responseText);
								form.reset();
								store.loadPage(1); // Refresh grid data
								Ext.Msg.alert('Success', 'Data has been saved');
								Ext.getCmp(id).close();
							},
							failure: function(data) {
								var json = Ext.decode(data.responseText);
								Ext.Msg.alert('Error', json.error_message);
							}
						})
					}
				}
			} 
		},{
			xtype: 'button',
			text: 'Cancel',
			iconCls: 'icon-stop',
			listeners: {
				click: function() {
					if (confirm('Are you sure want to cancel ?')) {
						this.up().up().close();
					}
				}
			}
		}],
		items: [{
			xtype: 'panel',
			border: false,
			items: [{
				xtype: 'form',
				layout: 'form',
				border: false,
				bodyPadding: '5 5 5 5',
				id: 'add-new-peers-form',
				defaultType: 'textfield',
				items: [{
					fieldLabel: 'Company Name',
					name: 'COMPANY_NAME',
					allowBlank: false
				},{
					fieldLabel: 'Brief History',
					name: 'BRIEF_HISTORY',
					xtype: 'htmleditor',
					height: 150,
					allowBlank: false
				},{
					fieldLabel: 'Business Activity',
					name: 'BUSINESS_ACTIVITY',
					xtype: 'htmleditor',
					height: 150,
					allowBlank: false
				}]
			}]
		}]
	});
}
c.up().setActiveTab(id);