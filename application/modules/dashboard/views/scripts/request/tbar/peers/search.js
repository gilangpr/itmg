var c = Ext.getCmp('<?php echo $this->container ?>');
var selected = c.getSelectionModel().getSelection();
var storeSP = Ext.create('Ext.data.Store',{
    storeId: 'Peers_autocomplete_search',
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

Ext.create('Ext.Window', {
	title: 'Search Peers',
	xtype: 'panel',
	layout: 'border',
	id: 'search-peers',
	modal: true,
	closable: true,
	width: 400,
	height: 97,
	resizable: false,
	draggable: false,
	buttons: [{
		text: 'Search',
		listeners: {
			click: function() {
				var form = Ext.getCmp('search-peers-form')
				var _id = 'peers-search-result-' + Math.random();
				if(form.getForm().isValid()) {
					var _storePeers = Ext.create("Ext.data.Store", {
						model: "Peer",
						storeId: "Peers__",
						proxy:{"type":"ajax","api":{"read":"\/peers\/request\/read","create":"\/peers\/request\/create","update":"\/peers\/request\/update","destroy":"\/peers\/request\/destroy"},"actionMethods":{"create":"POST","destroy":"POST","read":"POST","update":"POST"},"reader":{"idProperty":"DATE","type":"json","root":"data.items","totalProperty":"data.totalCount"},"writer":{"type":"json","root":"data","writeAllFields":true},
							extraParams: {
								type: 'search',
								name: Ext.getCmp('peers-search-peer-name').getValue()
							}}});
					showLoadingWindow();
					_storePeers.load({
						callback: function(d,i,e,f) {
							c.up().add({
								title: 'Peers Search Result',
								closable: true,
								id: _id,
								autoScroll: true,
								xtype: 'gridpanel',
								layout: 'border',
								store: _storePeers,
								tbar : [{
									xtype: 'button',
		                            text: 'View Peer Detail',
		                            iconCls: 'icon-detail',
		                            listeners: {
		                            	click: function() {
		                            		var _objGrid = Ext.getCmp(_id);
		                            		var _objSelectedGrid = _objGrid.getSelectionModel().getSelection();
		                            		Ext.require([
											    'Ext.window.MessageBox',
											    'Ext.tip.*'
											]);
											var storePEERS = loadStore('Peers');
		                            		if(_objSelectedGrid.length > 0) {
		                            			var id = 'peers-detail' + selected[0].id;
												if(!c.up().items.get(id)){
													var data = _objSelectedGrid[0].data;
											        var maxWidth = 221;
											        var max_length_title = 15;
											        var grid_height = 180;
											        var TITLE = (data.PEER_NAME.length > max_length_title) ? data.PEER_NAME.substring(0,max_length_title) + '...' : data.PEER_NAME
											        
													/* Rendering Files */

													<?php echo $this->render('/request/tbar/peers/dev/models.js')?>
													<?php echo $this->render('/request/tbar/peers/dev/stores.js')?>

													/* End of : Rendering Files */

											        c.up().add({
											        	xtype: 'panel',
											            layout: 'border',
											            title: TITLE,
											            id: id,
											            closable: true,
											            autoScroll: true,
											            border: false,
											            items: [{
											                title: 'Peers Detail',
											                collapsible: true,
											                region: 'west',
											                width: '50%',
											                autoScroll: true,
											                id: 'peers-detail-left-' + selected[0].id,
											                items: [{
											                	title: 'Brief History',
											                    border: false,
											                    maxWidth: Ext.getBody().getViewSize().width - maxWidth,
											                    items: [{
											                    	xtype: 'form',
											                    	layout: 'form',
											                    	border: false,
											                    	bodyPadding: '5 5 5 5',
											                    	id: 'brief-history-form' + data.PEER_ID,
											                    	items: [{
											                    		xtype: 'textarea',
											                    		name: 'BRIEF_HISTORY',
											                    		value: data.BRIEF_HISTORY,
											                    		minHeight: 220,
											                    		allowBlank: false
											                    	}],
											                    	buttons: [{
											                    		text: 'Update',
											                    		iconCls: 'icon-accept',
											                    		listeners: {
											                    			click: function() {
											                    				var form = Ext.getCmp('brief-history-form' + data.PEER_ID).getForm();
											    								if(form.isValid()) {
											    									Ext.MessageBox.confirm('Confirm', 'Are you sure want to update this data ?', function(a) {
											    										if(a == 'yes') {
											    											form.submit({
													    										url: sd.baseUrl + '/peers/request/update-detail',
													    										waitMsg: 'Updating data, please wait..',
													    										params: {
													    											id: data.PEER_ID,
													    											type: 'BRIEF_HISTORY'
													    										},
													    										success: function(d, e) {
													    											var json = Ext.decode(e.response.responseText);
													    											Ext.Msg.alert('Message', 'Update success.');
													    											storePEERS.loadPage(storePEERS.currentPage);
													    										},
													    										failure: function(d, e) {
													    											var json = Ext.decode(e.response.responseText);
													    											Ext.Msg.alert('Error', json.error_message);
													    										}
													    									});
											    										}
											    									});
											    								}
											                    			}
											                    		}
											                    	}]
											                    }]
											                },{
											                    title: 'Business Activity',
											                    border: false,
											                    maxWidth: Ext.getBody().getViewSize().width - maxWidth,
											                    items: [{
											                    	xtype: 'form',
											                    	layout: 'form',
											                    	border: false,
											                    	bodyPadding: '5 5 5 5',
											                    	id: 'business-activity-form' + data.PEER_ID,
											                    	items: [{
											                    		xtype: 'textarea',
											                    		name: 'BUSINESS_ACTIVITY',
											                    		value: data.BUSINESS_ACTIVITY,
											                    		minHeight: 220,
											                    		allowBlank: false
											                    	}],
											                    	buttons: [{
											                    		text: 'Update',
											                    		iconCls: 'icon-accept',
											                    		listeners: {
											                    			click: function() {
											                    				var form = Ext.getCmp('business-activity-form' + data.PEER_ID).getForm();
											    								if(form.isValid()) {
											    									Ext.MessageBox.confirm('Confirm', 'Are you sure want to update this data ?', function(a) {
											    										if(a == 'yes') {
											    											form.submit({
													    										url: sd.baseUrl + '/peers/request/update-detail',
													    										waitMsg: 'Updating data, please wait..',
													    										params: {
													    											id: data.PEER_ID,
													    											type: 'BUSINESS_ACTIVITY'
													    										},
													    										success: function(d, e) {
													    											var json = Ext.decode(e.response.responseText);
													    											Ext.Msg.alert('Message', 'Update success.');
													    											storePEERS.loadPage(storePEERS.currentPage);
													    										},
													    										failure: function(d, e) {
													    											var json = Ext.decode(e.response.responseText);
													    											Ext.Msg.alert('Error', json.error_message);
													    										}
													    									});
											    										}
											    									});
											    								}
											                    			}
											                    		}
											                    	}]
											                    }]
											                }]
											            },{ /* Peers Data */
											                region: 'center',
											                autoScroll: true,
											                items: [{
											                    border: false,
											                    autoScroll: true,
											                    items: [
											                    <?php echo $this->render('/request/tbar/peers/pieces/stripping-ratio-year.js')?>,
											                    <?php echo $this->render('/request/tbar/peers/pieces/stripping-ratio.js')?>,
											                    <?php echo $this->render('/request/tbar/peers/pieces/average-selling-price.js')?>,
											                    <?php echo $this->render('/request/tbar/peers/pieces/financial-performance.js')?>,
											                    <?php echo $this->render('/request/tbar/peers/pieces/total-cash-cost.js')?>,
											                    <?php echo $this->render('/request/tbar/peers/pieces/reserves-and-resources.js')?>,
											                    <?php echo $this->render('/request/tbar/peers/pieces/composition-company.js')?>,
											                    <?php echo $this->render('/request/tbar/peers/pieces/coal-sales-distribution.js')?>
											                    ]
											                }]
											            }]
											        });
												}
												c.up().setActiveTab(id);
											    $('body').css('overflow','hidden');
		                            		} else {
		                            			Ext.Msg.alert('Error', 'You did not select any Peer.');
		                            		}
		                            	}
		                            }
								}],
								columns: [{
                                    "text": "Peer Name",
                                    "dataIndex": "PEER_NAME",
                                    "align": "left",
                                    "width": 250,
                                    "flex": 1,
                                    "dataType": "string",
                                    "visible": false,
                                    "editor": {
                                        "allowBlank": false
                                    }
	                            }, {
                                    "text": "Created Date",
                                    "dataIndex": "CREATED_DATE",
                                    "align": "center",
                                    "width": 150,
                                    "flex": 0,
                                    "dataType": "string",
                                    "visible": false
                                }, {
                                    "text": "Modified Date",
                                    "dataIndex": "MODIFIED_DATE",
                                    "align": "center",
                                    "width": 150,
                                    "flex": 0,
                                    "dataType": "string",
                                    "visible": false
                                }],
							    bbar: new Ext.PagingToolbar({
							        store: _storePeers,
							        displayInfo: true,
							        displayMsg: 'Displaying data {0} - {1} of {2}',
							        emptyMsg: 'No data to display',
							        items: [
							            '-',
							            'Records per page',
							            '-',
							            new Ext.form.ComboBox({
										  name : 'perpage',
										  width: 50,
										  store: new Ext.data.ArrayStore({fields:['id'],data:[['25'],['50'],['75'],['100']]}),
										  mode : 'local',
										  value: '25',
										  listWidth     : 40,
										  triggerAction : 'all',
										  displayField  : 'id',
										  valueField    : 'id',
										  editable      : false,
										  forceSelection: true,
										  listeners: {
										  	select: function(combo, _records) {
										  		_storePeers.pageSize = parseInt(_records[0].get('id'), 10);
												_storePeers.loadPage(1);
										  	}
										  }
										})
							        ]
							    })
							});
							c.up().setActiveTab(_id);
							closeLoadingWindow();
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
				allowBlank: true,
				name: 'PEER_NAME',
				store: storeSP,
				minChars: 3,
				id: 'peers-search-peer-name',
				displayField: 'PEER_NAME',
				pageSize: 10
			}]
		}]
	}]
}).show(); 