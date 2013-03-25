{
	title: 'Sector Holdings',
	style: {
		float: 'left',
		width: '50%'
	},
	minHeight: 300,
	items: [{
		xtype: 'chart',
		store: storeSH,
		width: 570,
		height: 300,
		animate: true,
		legend: {
			position: 'right'
		},
		series: [{
			type: 'pie',
			field: 'VALUE',
			showInLegend: true,
			highlight: {
				segment: {
					margin: 20
				}
			},
			label: {
				field: 'TITLE',
				contrast: true,
				display: 'none',
				font: '12px Arial'
			}
		}]
	}],
	tbar: [{
		xtype: 'button',
		text: 'Manage Data',
		iconCls: 'icon-detail',
		listeners: {
			click: function() {
				Ext.create('Ext.Window', {
					title: 'Sector Holding Data',
					resizabe: false,
					modal: true,
					draggable: false,
					resizable: false,
					items: [{
						xtype: 'gridpanel',
						minWidth: 500,
						minHeight: 200,
						border: false,
						store: storeSH,
						id: 'investors-detail-sector-holding-data-grid-' + data.INVESTOR_ID,
						tbar: [{
							xtype: 'button',
							text: 'Add New Sector Holding Data',
							iconCls: 'icon-go',
							listeners: {
								click: function() {
									Ext.create('Ext.Window', {
										title: 'Add New Sector Holding Data',
										modal: true,
										draggable: false,
										resizable: false,
										items: [{
											xtype: 'form',
											id: 'investors-detail-sector-holding-add-new-form-' + data.INVESTOR_ID,
											minWidth: 300,
											border: false,
											bodyPadding: '5 5 5 5',
											items: [{
												xtype: 'textfield',
												fieldLabel: 'Title',
												name: 'TITLE',
												allowBlank: false
											},{
												xtype: 'numberfield',
												fieldLabel: 'Value',
												name: 'VALUE',
												allowBlank: false,
												value: 0,
												minValue: 0
											}]
										}],
										buttons: [{
											text: 'Save',
											listeners: {
												click: function() {
													var form = Ext.getCmp('investors-detail-sector-holding-add-new-form-' + data.INVESTOR_ID);
													if(form.getForm().isValid()) {
														form.getForm().submit({
															url: sd.baseUrl + '/sectorholdings/request/create/id/' + data.INVESTOR_ID,
															waitMsg: 'Saving data, please wait..',
															params: {
																id: data.INVESTOR_ID
															},
															success: function(d, e) {
																var json = Ext.decode(e.response.responseText);
																Ext.Msg.alert('Message', 'Savind data success.');
																storeSH.load({
																	params: {
																		id: data.INVESTOR_ID
																	}
																});
																form.getForm().reset();
															},
															failure: function(d, e) {
																var json = Ext.decode(e.response.responseText);
																Ext.Msg.alert('Error', json.error_message);
															}
														})
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
										}]
									}).show();
								}
							}
						},{
							xtype: 'button',
							text: 'Delete',
							iconCls: 'icon-stop',
							listeners: {
								click: function() {
									var __c = Ext.getCmp('investors-detail-sector-holding-data-grid-' + data.INVESTOR_ID);
									var __selected = __c.getSelectionModel().getSelection();
									if(__selected.length > 0) {
										var __data = __selected[0].data;
										Ext.create('Ext.Window', {
											html: 'Are you sure want do delete selected item(s) ?',
											bodyPadding: '20 5 5 17',
											title: 'Confirmation',
											resizable: false,
											modal: true,
											closable: false,
											draggable: false,
											width: 300,
											height: 120,
											buttons: [{
												text: 'Yes',
												listeners: {
													click: function() {
														showLoadingWindow();
														this.up().up().close();
														Ext.Ajax.request({
															url: sd.baseUrl + '/sectorholdings/request/destroy',
															params: {
																SECTOR_HOLDING_ID: __data.SECTOR_HOLDING_ID
															},
															success: function(d) {
																var json = Ext.decode(d.responseText); // Decode responsetext | Json to Javasript Object
																closeLoadingWindow();
																storeSH.load({
																	params: {
																		id: data.INVESTOR_ID
																	}
																});
															},
															failure: function(d) {
																var json = Ext.decode(d.responseText); // Decode responsetext | Json to Javasript Object
																closeLoadingWindow();
																Ext.Msg.alert('Error', json.error_message);
															}
														});
													}
												}
											},{
												text: 'No',
												listeners: {
													click: function() {
														this.up().up().close();
													}
												}
											}]
										}).show();
									} else {
										Ext.Msg.alert('Message', 'You did not select any data.');
									}
								}
							}
						}],
						columns: [{
							text: 'Title',
							flex: 1,
							dataIndex: 'TITLE'
						},{
							text: 'Value',
							width: 120,
							align: 'center',
							dataIndex: 'VALUE'
						}]
					}]
				}).show();
			}
		}
	}]
}