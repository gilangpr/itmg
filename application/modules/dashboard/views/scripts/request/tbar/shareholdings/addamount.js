var c = Ext.getCmp('<?php echo $this->container ?>');
var selected = c.getSelectionModel().getSelection();
var id = 'shareholdings-add-amount-shareholding-form';//?
if(selected.length > 0) {
	var id = 'shareholdings-add-amount-shareholding-form' + selected[0].id;
/* get investor name by id */
if(!c.up().items.get(id)) {
	var data = selected[0].data;
};
	Ext.define('Shareholding', {
		extend: 'Ext.data.Model',
		fields: [{
			name: 'SHAREHOLDING_ID',
			type: 'string'
		}]
	});
	store.load({
		params: {
			id: data.SHAREHOLDING_ID /* single param */
		}
	});
	store.autoSync = true;
    Ext.create('Ext.Window', {
	title:'ADD AMOUNT : ' + data.INVESTOR_NAME,
	id: id,
	layout: 'anchor',
	width: 400,
	height: 130,
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
						params: selected[0].data,
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
				{
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
		items:[{
//		items: [{
//			xtype: 'combobox',
//			fieldLabel: 'Investor Status',
//			pageSize: 10,
//			anchor: '100%',
//			name: 'INVESTOR_STATUS',
//			store: Ext.data.StoreManager.lookup('Shareholdings'),
//			displayField: 'INVESTOR_STATUS',
//			typeAhead: true,
//			allowBlank: false
//		},{
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
} else {
	Ext.Msg.alert('Message', 'You did not select any Investor');
}