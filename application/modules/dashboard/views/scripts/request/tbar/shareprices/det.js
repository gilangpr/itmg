
Ext.create('Ext.Window', {
	title: 'Detail Shareprices',
	width: 400,
	height: 125,
	closable: true,
	resizable: false,
	draggable: false,
	modal: true,
	buttons: [{
		text: 'See details',
		listeners: {
			
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
		id: 'shareprices-detail-form',
		defaultType: 'textfield',
		bodyPadding: '5 5 5 5',
		items: [{
			xtype: 'fieldcontainer',
            fieldLabel: 'Date Range',
            combineErrors: true,
            msgTarget : 'side',
            layout: 'hbox',
            defaults: {
            	flex: 1,
                hideLabel: true
            },
            items: [{
                xtype     : 'datefield',
                name      : 'startDate',
                fieldLabel: 'Start',
                margin: '0 5 0 0',
                allowBlank: false
                },{
                xtype     : 'datefield',
                name      : 'endDate',
                fieldLabel: 'End',	
                allowBlank: false
                }
            ]
        },{
			xtype: 'combobox',
			fieldLabel: 'Shareprices Name',
			name: 'SHAREPRICES_NAME',
			labelWidth: 110,
			store: Ext.data.StoreManager.lookup('SharepricesNames'),
			displayField: 'SHAREPRICES_NAME',
			typeAhead: true,
			allowBlank: false,
			minChars: 2,
			emptyText: 'Select'
		}]
	}]
}).show();