Ext.create('Ext.Window', {
	title: 'Search Shareprices',
	width: 400,
	height: 200,
	closable: true,
	resizable: false,
	draggable: false,
	modal: true,
	buttons: [{
		text: 'Search',
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
			xtype:'checkbox', 
		    fieldLabel:'Company', 
		    labelSeparator:':', 
		    name: 'SHAREPRICES_NAME',
		    store: Ext.data.StoreManager.lookup('SharepricesNames'),
		    boxLabel:'SHAREPRICES_NAME', 
		    name:'status', 
		    inputValue:'0',
		}]
	}]
}).show();