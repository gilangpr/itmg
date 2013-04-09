var c = Ext.getCmp('<?php echo $this->container ?>');
var selected = c.getSelectionModel().getSelection();
Ext.require(['Ext.form.field.Number']);
if(selected.length > 0) {
	var id = 'shareholdings-detail-' + selected[0].id;
	if(!c.up().items.get(id)) {
		var data = selected[0].data;
		var cellEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 1,
	        autoCancel: false
	    });
		var store = Ext.create("Ext.data.Store", {
			model: "ShareholdingAmount",
			storeId: "ShareholdingAmounts",
			proxy:{"type":"ajax","api":{"read":"\/shareholdings\/request\/get-list-amount","create":"\/shareholdings\/request\/amount","update":"\/shareholdings\/request\/upamount","destroy":"\/shareholdings\/request\/des"},"actionMethods":{"create":"POST","destroy":"POST","read":"POST","update":"POST"},"reader":{"idProperty":"SHAREHOLDING_AMOUNT_ID","type":"json","root":"data.items","totalProperty":"data.totalCount"},"writer":{"type":"json","root":"data","writeAllFields":true}},
			sorter: {"property":"SHAREHOLDING_AMOUNT_ID","direction":"ASC"}});
		
		store.load({
			params: {
				id: data.SHAREHOLDING_ID /* single param */
			}
		});
		store.autoSync = true;
		// Bottom toolbar
//		Ext.override(Ext.form.NumberField, {
//		    forcePrecision : false,
//
//		    valueToRaw: function(value) {
//		        var me = this,
//		            decimalSeparator = me.decimalSeparator;
//		        value = me.parseValue(value);
//		        value = me.fixPrecision(value);
//		        value = Ext.isNumber(value) ? value : parseFloat(String(value).replace(decimalSeparator, ','));
//		        if (isNaN(value))
//		        {
//		          value = '';
//		        } else {
//		          value = me.forcePrecision ? value.toFixed(me.decimalPrecision) : parseFloat(value);
//		          value = String(value).replace(".", decimalSeparator);
//		        }
//		        return value;
//		    }
//		});
		 
		var comboBbar2 = new Ext.form.ComboBox({
		  name : 'perpageglistamount',
		  width: 50,
		  store: new Ext.data.ArrayStore({fields:['id'],data:[['15'],['25'],['50']]}),
		  mode : 'local',
		  value: '15',
		  listWidth     : 40,
		  triggerAction : 'all',
		  displayField  : 'id',
		  valueField    : 'id',
		  editable      : false,
		  forceSelection: true
		});
		
		var bbar2 = new Ext.PagingToolbar({
			store: store,
			displayInfo: true,
			displayMsg: 'Displaying data {0} - {1} of {2}',
			emptyMsg: 'No data to display',
			items: [
			    '-',
			    'Records per page',
			    '-',
			    comboBbar2
			]
		});
		
		comboBbar2.on('select', function(combo, _records) {
			store.pageSize = parseInt(_records[0].get('id'), 10);
			store.loadPage(1);
		}, this);
		
		// End of : bottom toolbar
		c.up().add(Ext.create('Ext.panel.Panel', {
			title: 'Detail : ' + data.INVESTOR_NAME,
			id: id,
			closable: true,
			autoScroll: true,
			minHeight: 600,
			items: [{
				xtype: 'gridpanel',
				border: false,
				store: store,
				plugins: [cellEditing],//memanggil plugin
				id: 'shareholding-amount-list-' + id,
				bbar: bbar2,
				height: c.up().getHeight() - 56,//letak pagingtoolbar
				columns: [{
					text: 'Amount',
					dataIndex: 'AMOUNT',
					renderer: Ext.util.Format.numberRenderer('0.,/i'),
					flex: 1,
					editor: {
						xtype: 'numberfield',
						allowBlank: false,
						minValue: 0,
						}
				},{
					text: 'Date',
					dataIndex: 'DATE',
					align: 'center',
					width: 150
				},{
					text: 'Last Modified',
					dataIndex: 'MODIFIED_DATE',
					align: 'center',
					width: 150
				}]
			}],
			tbar: [{
				xtype: 'button',
				text: 'Delete',
				iconCls: 'icon-stop',
				listeners: {
					click: function() {
						// click action ...
						var c = Ext.getCmp('shareholding-amount-list-' + id);
						var selected = c.getSelectionModel().getSelection();
						var data2 = selected[0].data;
						if(selected.length > 0) {
							showLoadingWindow();
							Ext.Ajax.request({
								url: sd.baseUrl + '/shareholdings/request/des',
								params: {
									id: data2.SHAREHOLDING_AMOUNT_ID
								},
								success: function(d) {
									var json = Ext.decode(data.responseText); // Decode responsetext | Json to Javasript Object
									closeLoadingWindow();
									store.load({
										params: {
											id: data.SHAREHOLDING_ID /* single param */
										}
									});
									var store = Ext.StoreManager.lookup('Shareholdings');
									store.load(1);
								},
								failure: function(data) {
									var json = Ext.decode(data.responseText); // Decode responsetext | Json to Javasript Object
									closeLoadingWindow();
								}
							});
						}
					}
				}
			}]
		}));
	}		
	c.up().setActiveTab(id);
} else {
	Ext.Msg.alert('Message', 'You did not select any Investor');
}