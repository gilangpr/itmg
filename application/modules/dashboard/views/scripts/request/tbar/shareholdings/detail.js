var c = Ext.getCmp('<?php echo $this->container ?>');
var selected = c.getSelectionModel().getSelection();
if(selected.length > 0) {
	var id = 'shareholdings-detail-' + selected[0].id;
	if(!c.up().items.get(id)) {
		var data = selected[0].data;
		var cellEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 1,
	        autoCancel: false
	    });
		var store = loadStore('ShareholdingAmounts');
		store.load({
			params: {
				id: data.SHAREHOLDING_ID /* single param */
			}
		});
		store.autoSync = true;
		
		// Bottom toolbar 
		
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
				columns: [{
					text: 'Amount',
					dataIndex: 'AMOUNT',
					flex: 1,
					editor: {
						xtype: 'numberfield',
						allowBlank: false,
						minValue: 0
					}
				},{
					text: 'Created Date',
					dataIndex: 'CREATED_DATE',
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
//y
var tip = Ext.create('Ext.tip.ToolTip', {
    target: 'id',
    html: 'I am a tooltip on myPanel'
});