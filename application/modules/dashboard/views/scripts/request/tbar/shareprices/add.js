//Store Shareprices Name
var storeSR = Ext.create('Ext.data.Store',{
    storeId: 'Shareprices',
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
			store: storeSR,
			fieldLabel: 'Shareprices Name',
	        displayField:'SHAREPRICES_NAME',
			name: 'SHAREPRICES_NAME',
	        typeAhead: false,
	        loadingText: 'Searching...',
			labelWidth: 110,
			minChars: 3,
	        hideTrigger:false,
	        applyTo: 'search',
			emptyText: 'Select shareprices name',
	        itemSelector: 'div.search-item',
	        onSelect: function(record){ // override default onSelect to do redirect
	            alert("do something here");
	        }
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