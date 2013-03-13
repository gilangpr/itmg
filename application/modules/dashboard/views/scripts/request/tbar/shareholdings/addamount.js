var c = Ext.getCmp('<?php echo $this->container ?>');
var id = 'shareholdings-add-amount-shareholding-form';//?
if(!c.up().items.get(id)) {
	
	Ext.define('Shareholding', {
		extend: 'Ext.data.Model',
		fields: [{
			name: 'SHAREHOLDING_ID',
			type: 'string'
		}]
	});
Ext.create('Ext.Window', {
	title: 'Add Amount',
	width: 400,
	height: 165,
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
						url: sd.baseUrl + '/shareholdings/request/amount',
						success: function(data) {
							var json = Ext.decode(data.respnoseText);
							form.reset();
							Ext.Msg.alert('Message','Success adding Amount');
							var store = loadStore('Shareholdings');
							store.loadPage(1);
						},
						failure: function(data) {
							var json = Ext.decode(data.responseText);
							Ext.Msg.alert('Message',json.error_message);
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
			xtype: 'combobox',
			fieldLabel: 'Investor Name',
			name: 'INVESTOR_NAME',
			store: Ext.data.StoreManager.lookup('Shareholdings'),
			displayField: 'INVESTOR_NAME',
			typeAhead: true,
			allowBlank: false
		},{
			fieldLabel: 'Amount',
			xtype: 'numberfield',
			name: 'AMOUNT',
			allowBlank: false,
			minValue: 0,
			value: 0,
			name: 'AMOUNT'
		},{
			fieldLabel: 'Date',
	        name: 'DATE',
	        format: 'Y-m-d',
	        xtype: 'datefield',
	        allowBlank: false
	    }]
	}]
}).show();
}