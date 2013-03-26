Ext.create('Ext.Window', {
	title: 'Add New Shareholder',
	width: 400,
	height: 146,
	closable: true,
	resizable: false,
	draggable: false,
	modal: true,
	buttons: [{
		text: 'Save',
		listeners: {
			click: function() {
				var form  = Ext.getCmp('shareholdings-add-new-form').getForm();
				if(form.isValid()) {
					form.submit({
						url: sd.baseUrl + '/shareholdings/request/create',
						success: function(data) {
							var json = Ext.decode(data.respnoseText);
							form.reset();
							Ext.Msg.alert('Message','Success adding new shareholder');
							var store = loadStore('Shareholdings');
							store.loadPage(1);
						},
						failure: function(data,res) {
							var json = Ext.decode(res.response.responseText);
							Ext.Msg.alert('Error',json.error_message);
						}
					});
				}
			}
		}
	},{
		text: 'Cancel',
		listeners: {
			click: function() {
				if(confirm('Are you sure want to cancel ?')) {
					this.up().up().close();
				}
			}
		}
	}],
	items: [{
		xtype: 'form',
		layout: 'form',
		border: false,
		id: 'shareholdings-add-new-form',
		defaultType: 'textfield',
		bodyPadding: '5 5 5 5',
		items: [{
			fieldLabel: 'Investor Name',
			name: 'INVESTOR_NAME',
			allowBlank: false
		},{
			fieldLabel: 'Investor Status',
			name: 'INVESTOR_STATUS',
			allowBlank: false
		},{
			fieldLabel: 'Account Holder',
			name: 'ACCOUNT_HOLDER',
			allowBlank: false
		}/*,{
			fieldLabel: 'Amount',
			xtype: 'numberfield',
			allowBlank: false,
			minValue: 0,
			value: 0,
			name: 'AMOUNT'
		}*/]
	}]
}).show();