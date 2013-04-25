var c = Ext.getCmp('<?php echo $this->container ?>');
//var storeSP = loadStore('Peers');
var storeSP = Ext.create('Ext.data.Store',{
    storeId: 'Peers2',
    model: 'Peer',
    proxy: {
        type: 'ajax',
        api: {
            read: '/peers/request/autocom'
        },
        actionMethods: {
            create: 'POST'
        },
        reader: {
            idProperty: 'PEER_NAME',
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
        property: 'PEER_ID',
        direction: 'ASC'
    },
    autoSync: true
});
//var storeRR_curpage = storeSP.currentPage;

//storeSP.load({
//	params: {
//		all: 1
//	}
//});

Ext.create('Ext.Window', {
	title: 'Search Peers',
	xtype: 'panel',
	layout: 'border',
	id: 'search-peers',
	modal: true,
	closable: true,
	width: 400,
	height: 100,
	resizable: false,
	draggable: false,
	buttons: [{
		text: 'Search',
		listeners: {
			click: function() {
				var form = Ext.getCmp('search-peers-form')
				console.log()
				if(form.getForm().isValid()) {
					var _store = loadStore('Peers');
					_store.load({
						params: {
							type: 'search',
							name: Ext.getCmp('peers-search-peer-name').getValue()
						}
					});
					this.up().up().close();
				}
			}
		}
	},{
		text: 'Cancel',
		listeners: {
			click: function() {
				Ext.getCmp('search-peers').close();
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
				allowBlank: false,
				name: 'PEER_NAME',
				store: storeSP,
				minChars: 3,
				id: 'peers-search-peer-name',
				displayField: 'PEER_NAME'
			}]
		}]
	}]
}).show(); 