var storeSR = Ext.create('Ext.data.Store',{
    storeId: 'SharepricesNames',
    model: 'SharepricesName',
    proxy: {
        type: 'ajax',
        api: {
            read: '/sharepricesname/request/readauto'
        },
        actionMethods: {
            create: 'POST'
        },
        reader: {
            idProperty: 'SHAREPRICES_NAME',
            type: 'json',
            root: 'data.items',
            totalProperty: 'data.totalCount'
        },
        writer: {
            type: 'json',
            root: 'data',
            writeAllFields: true
        }
    },
    sorter: {
        property: 'SHAREPRICES_NAME_ID',
        direction: 'ASC'
    },
    autoSync: true
});
Ext.create('Ext.Window', {
	title: 'Add New Shareprices',
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
				var form  = Ext.getCmp('shareprices-add-new-form').getForm();
				if(form.isValid()) {
					form.submit({
						url: sd.baseUrl + '/shareprices/request/create',
						success: function(data) {
							var json = Ext.decode(data.respnoseText);
							form.reset();
							Ext.Msg.alert('Message','Success adding new Shareprices');
							form.reset();
							store.loadPage(store.currentPage);
						},
						failure: function(data,res) {
							var json = Ext.decode(res.response.responseText);
							Ext.Msg.alert('Error',json.error_message);
							form.reset();
							store.loadPage(1);
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
	}],
	items: [{
		xtype: 'form',
		layout: 'form',
		border: false,
		id: 'shareprices-add-new-form',
		defaultType: 'textfield',
		bodyPadding: '5 5 5 5',
		items: [{
	        fieldLabel: 'Date',
	        name: 'DATE',
	        format: 'Y-m-d',
	        allowBlank: false,
	        emptyText: 'Input date',
	        xtype: 'datefield'
	    },{
			xtype: 'combobox',
			fieldLabel: 'Shareprices Name',
			id: 'shareprices-name',
			name: 'SHAREPRICES_NAME',
			displayField: 'SHAREPRICES_NAME',
			labelWidth: 110,
			store: storeSR,
			minChars: 3,
			emptyText: 'Select shareprices name',
			typeAhead: true,
			allowBlank: false
		},{
			fieldLabel: 'Value',
			xtype: 'numberfield',
			name: 'VALUE',
			allowBlank: false,
			minValue: 0,
			value: 0
		}]
	}]
}).show();