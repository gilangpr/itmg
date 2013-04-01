var c = Ext.getCmp('<?php echo $this->container ?>');
var selected = c.getSelectionModel().getSelection();
if(selected.length > 0) {
	var id = 'investors-detail-' + selected[0].id;
	var cellEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 1,
	        autoCancel: false
	    });
	var cellEditing2 = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 1,
	        autoCancel: false
	    });
	
	storeINVESTORS = loadStore('Investors');
	storeIT = loadStore('InvestorTypes');
	storeLOCATIONS = loadStore('Locations');
	
	/*
	 * Meeting Activities
	 */
	
	var storeMA = Ext.create("Ext.data.Store", {
		model: "Meetingactivitie",
		storeId: "Meetingactivities",
		proxy:{extraParams:{id:selected[0].data.INVESTOR_ID},"type":"ajax","api":{"read":"\/meetingactivitie\/request\/read","create":"\/meetingactivitie\/request\/create","update":"\/meetingactivitie\/request\/update","destroy":"\/meetingactivitie\/request\/destroy"},"actionMethods":{"create":"POST","destroy":"POST","read":"POST","update":"POST"},"reader":{"idProperty":"MEETING_ACTIVITIE_ID","type":"json","root":"data.items","totalProperty":"data.totalCount"},"writer":{"type":"json","root":"data","writeAllFields":true}},
		sorter: {"property":"MEETING_ACTIVITIE_ID","direction":"ASC"}});
	
	storeMA.load();
	
	/*
	 * End of : Meeting Activities
	 */
	
	/*
	 * Meeting Investors
	 */
	
	var storeMI = Ext.create("Ext.data.Store", {
		model: "Meetinginvestor",
		storeId: "Meetinginvestors",
		proxy:{extraParams:{id:selected[0].data.INVESTOR_ID},"type":"ajax","api":{"read":"\/meetinginvestor\/request\/read","create":"\/meetinginvestor\/request\/create","update":"\/meetinginvestor\/request\/update","destroy":"\/meetinginvestor\/request\/destroy"},"actionMethods":{"create":"POST","destroy":"POST","read":"POST","update":"POST"},"reader":{"idProperty":"MEETING_INVESTOR","type":"json","root":"data.items","totalProperty":"data.totalCount"},"writer":{"type":"json","root":"data","writeAllFields":true}},
		sorter: {"property":"MEETING_INVESTOR","direction":"ASC"}});
	
	storeMI.load();
	
	/*
	 * End of : Meeting Investors
	 */

	/*
	 * Contacts
	 */
	
	var storeCO = Ext.create("Ext.data.Store", {
		model: "Contact",
		storeId: "Contacts",
		proxy:{extraParams:{id:selected[0].data.INVESTOR_ID},"type":"ajax","api":{"read":"\/contacts\/request\/read","create":"\/contacts\/request\/create","update":"\/contacts\/request\/update","destroy":"\/contacts\/request\/destroy"},"actionMethods":{"create":"POST","destroy":"POST","read":"POST","update":"POST"},"reader":{"idProperty":"CONTACT_ID","type":"json","root":"data.items","totalProperty":"data.totalCount"},"writer":{"type":"json","root":"data","writeAllFields":true}},
		sorter: {"property":"CONTACT_ID","direction":"ASC"}});
	
	storeCO.load();
	
	/*
	 * End of : Contacts
	 */
	
	/*
	 * Sector Holdings
	 */
	
	var storeSH = Ext.create('Ext.data.Store', {
		model: 'SectorHolding',
		storeId: 'SectorHoldings',
		proxy: {
			extraParams:{id:selected[0].data.INVESTOR_ID},
	        "type": "ajax",
	        "api": {
	            "read": "\/sectorholdings\/request\/read",
	            "create": "\/sectorholdings\/request\/create",
	            "update": "\/sectorholdings\/request\/update",
	            "destroy": "\/sectorholdings\/request\/destroy"
	        },
	        "actionMethods": {
	            "create": "POST",
	            "destroy": "POST",
	            "read": "POST",
	            "update": "POST"
	        },
	        "reader": {
	            "idProperty": "TITLE",
	            "type": "json",
	            "root": "data.items",
	            "totalProperty": "data.totalCount"
	        },
	        "writer": {
	            "type": "json",
	            "root": "data",
	            "writeAllFields": true
	        }
	    },
	    sorter: {
	        "property": "TITLE",
	        "direction": "ASC"
	    },
	});
	
	storeSH.load();
	
	/*
	 * End of : Sector Holdings
	 */
	
	/*
	 * Portfolio Distributions
	 */
	
	var storePD = Ext.create('Ext.data.Store', {
		model: 'PortfolioDistribution',
		storeId: 'PortfolioDistributions',
		proxy: {
			extraParams:{id:selected[0].data.INVESTOR_ID},
	        "type": "ajax",
	        "api": {
	            "read": "\/portfoliodistribution\/request\/read",
	            "create": "\/portfoliodistribution\/request\/create",
	            "update": "\/portfoliodistribution\/request\/update",
	            "destroy": "\/portfoliodistribution\/request\/destroy"
	        },
	        "actionMethods": {
	            "create": "POST",
	            "destroy": "POST",
	            "read": "POST",
	            "update": "POST"
	        },
	        "reader": {
	            "idProperty": "TITLE",
	            "type": "json",
	            "root": "data.items",
	            "totalProperty": "data.totalCount"
	        },
	        "writer": {
	            "type": "json",
	            "root": "data",
	            "writeAllFields": true
	        }
	    },
	    sorter: {
	        "property": "TITLE",
	        "direction": "ASC"
	    },
	});
	
	storePD.load();
	
	/*
	 * End of : Portfolio Distributions
	 */
	
	/*
	 * Custom Attributes
	 */
	
	var storeCA = Ext.create('Ext.data.Store', {
		model: 'CustomAttribute',
		storeId: 'CustomAttributes',
		proxy: {
			extraParams:{id:selected[0].data.INVESTOR_ID},
	        "type": "ajax",
	        "api": {
	            "read": "\/customattributes\/request\/read",
	            "create": "\/customattributes\/request\/create",
	            "update": "\/customattributes\/request\/update",
	            "destroy": "\/customattributes\/request\/destroy"
	        },
	        "actionMethods": {
	            "create": "POST",
	            "destroy": "POST",
	            "read": "POST",
	            "update": "POST"
	        },
	        "reader": {
	            "idProperty": "TITLE",
	            "type": "json",
	            "root": "data.items",
	            "totalProperty": "data.totalCount"
	        },
	        "writer": {
	            "type": "json",
	            "root": "data",
	            "writeAllFields": true
	        }
	    },
	    sorter: {
	        "property": "TITLE",
	        "direction": "ASC"
	    },
	});
	
	storeCA.load();
	
	/*
	 * End of : Custom Attributes
	 */
	
	if(!c.up().items.get(id)) {
		var data = selected[0].data;
		var maxWidth = 221;
		c.up().add(Ext.create('Ext.panel.Panel', {
			title: 'Detail : ' + data.COMPANY_NAME,
			layout: 'border',
			id: id,
			closable: true,
			autoScroll: true,
			waitMsgTarget: true,
			tbar:[{
				xtype: 'button',
				text: 'Print Page',
				iconCls: 'icon-print',
				listeners: {
					click: function() {
						//var myWindow = window.open('', '', 'width=900,height=900');
						window.open(sd.baseUrl + '/investors/request/print/id/' + data.INVESTOR_ID, '_blank');
					   
					}
				}
			}],
			items: [{
				region: 'north',
				maxWidth: Ext.getBody().getViewSize().width - maxWidth,
				border: false,
				items: [{
					title: 'Detail Investor',
					border: false,
					style: {
						float: 'left',
						width: '50%'
					},
					items: [{
						xtype: 'form',
						layout: 'form',
						border: false,
						id: 'investors-detail-investor-form-' + data.INVESTOR_ID,
						bodyPadding: '5 5 5 5',
						items: [{
							xtype: 'numberfield',
							name: 'EQUITY_ASSETS',
							fieldLabel: 'Equity Assets',
							minValue: 0,
							value: data.EQUITY_ASSETS,
							allowBlank: false
						},{
							xtype: 'combobox',
							name: 'INVESTOR_TYPE',
							fieldLabel: 'Investor Type',
							allowBlank: false,
							store: storeIT,
							displayField: 'INVESTOR_TYPE',
							value: data.INVESTOR_TYPE
						},{
							xtype: 'textfield',
							name: 'STYLE',
							fieldLabel: 'Style',
							value: data.STYLE,
							allowBlank: false
						}],
						buttons: [{
							text: 'Update',
							iconCls: 'icon-accept',
							listeners: {
								click: function() {
									var form = Ext.getCmp('investors-detail-investor-form-' + data.INVESTOR_ID).getForm();
									if(form.isValid()) {
										form.submit({
											url: sd.baseUrl + '/investors/request/update-detail',
											params: {
												id: data.INVESTOR_ID,
												batch: 1,
												btype: 'detail-investor',
												type: 'batch'
											},
											waitMsg: 'Updating data, please wait..',
											success: function(d, e) {
												var json = Ext.decode(e.response.responseText);
												Ext.Msg.alert('Message', 'Update success.');
												storeINVESTORS.loadPage(storeINVESTORS.currentPage);
											},
											failure: function(d, e) {
												var json = Ext.decode(e.response.responseText);
												Ext.Msg.alert('Error', json.error_message);
											}
										});
									}
								}
							}
						}]
					}/*,{
						title: 'Custom Attributes',
						xtype: 'gridpanel',
						minHeight: 180,
						maxHeight: 180,
						id: 'investors-detail-custom-attributes-grid-' + data.INVESTOR_ID,
						autoScroll: true,
						columns: [{
							text: 'Title',
							flex: 1
						},{
							text: 'Value',
							width: 150,
							align: 'center'
						}],
						tbar: [{
							xtype: 'button',
							text: 'Add New Attribute',
							iconCls: 'icon-go',
							listeners: {
								click: function() {
									
								}
							}
						},{
							xtype: 'button',
							text: 'Delete Attribute',
							iconCls: 'icon-stop',
							listeners: {
								click: function() {
									
								}
							}
						}]
					}*/]
				},{
					title: 'Company Address',
					border: false,
					style: {
						float: 'rigth',
						width: '50%'
					},
					items: [{
						xtype: 'form',
						layout: 'form',
						id: 'investors-detail-company-address-form-' + data.INVESTOR_ID,
						bodyPadding: '5 5 5 5',
						border: false,
						items: [{
							xtype: 'htmleditor',
							fieldLabel: 'Address',
							name: 'ADDRESS',
							allowBlank: false,
							height: 150,
							value: data.ADDRESS
						},{
							xtype: 'combobox',
							fieldLabel: 'Location',
							name: 'LOCATION',
							displayField: 'LOCATION',
							allowBlank: false,
							store: storeLOCATIONS,
							value: data.LOCATION
						},{
							xtype: 'textfield',
							name: 'PHONE_1',
							fieldLabel: 'Phone #1',
							allowBlank: false,
							value: data.PHONE_1
						},{
							xtype: 'textfield',
							name: 'PHONE_2',
							fieldLabel: 'Phone #2',
							allowBlank: true,
							value: data.PHONE_2
						},{
							xtype: 'textfield',
							name: 'EMAIL_1',
							fieldLabel: 'Email #1',
							allowBlank: false,
							value: data.EMAIL_1
						},{
							xtype: 'textfield',
							name: 'EMAIL_2',
							fieldLabel: 'Email #2',
							allowBlank: true,
							value: data.EMAIL_2
						},{
							xtype: 'textfield',
							name: 'FAX',
							fieldLabel: 'Fax',
							allowBlank: false,
							value: data.FAX
						},{
							xtype: 'textfield',
							name: 'WEBSITE',
							fieldLabel: 'Website',
							allowBlank: true,
							value: data.WEBSITE
						}]
					}],
					buttons: [{
						text: 'Update',
						iconCls: 'icon-accept',
						listeners: {
							click: function() {
								var form = Ext.getCmp('investors-detail-company-address-form-' + data.INVESTOR_ID).getForm();
								if(form.isValid()) {
									form.submit({
										url: sd.baseUrl + '/investors/request/update-detail',
										params: {
											id: data.INVESTOR_ID,
											batch: 1,
											btype: 'company-address',
											type: 'batch'
										},
										waitMsg: 'Updating data, please wait..',
										success: function(d, e) {
											var json = Ext.decode(e.response.responseText);
											Ext.Msg.alert('Message', 'Update success.');
											storeINVESTORS.loadPage(storeINVESTORS.currentPage);
										},
										failure: function(d, e) {
											var json = Ext.decode(e.response.responseText);
											Ext.Msg.alert('Error', json.error_message);
										}
									});
								}
							}
						}
					}]
				}]
			},{
				region: 'north',
				title: 'Company Overview',
				border: false,
				maxWidth: Ext.getBody().getViewSize().width - maxWidth,
				items: [{
					xtype: 'form',
					layout: 'form',
					border: false,
					bodyPadding: '5 5 5 5',
					id: 'investors-detail-company-overview-form-' + data.INVESTOR_ID,
					items: [{
						xtype: 'htmleditor',
						name: 'COMPANY_OVERVIEW',
						value: data.COMPANY_OVERVIEW,
						minHeight: 160,
						allowBlank: false
					}],
					buttons: [{
						text: 'Update',
						iconCls: 'icon-accept',
						listeners: {
							click: function() {
								var form = Ext.getCmp('investors-detail-company-overview-form-' + data.INVESTOR_ID).getForm();
								if(form.isValid()) {
									form.submit({
										url: sd.baseUrl + '/investors/request/update-detail',
										waitMsg: 'Updateing data, please wait..',
										params: {
											id: data.INVESTOR_ID,
											type: 'COMPANY_OVERVIEW'
										},
										success: function(d, e) {
											var json = Ext.decode(e.response.responseText);
											Ext.Msg.alert('Message', 'Update success.');
											storeINVESTORS.loadPage(storeINVESTORS.currentPage);
										},
										failure: function(d, e) {
											var json = Ext.decode(e.response.responseText);
											Ext.Msg.alert('Error', json.error_message);
										}
									})
								}
							}
						}
					}]
				}]
			},{
				region: 'north',
				title: 'Investment Strategy',
				border: false,
				maxWidth: Ext.getBody().getViewSize().width - maxWidth,
				items: [{
					xtype: 'form',
					layout: 'form',
					border: false,
					bodyPadding: '5 5 5 5',
					id: 'investors-detail-investment-strategy-form-' + data.INVESTOR_ID,
					items: [{
						xtype: 'htmleditor',
						name: 'INVESTMENT_STRATEGY',
						value: data.INVESTMENT_STRATEGY,
						minHeight: 160,
						allowBlank: false
					}],
					buttons: [{
						text: 'Update',
						iconCls: 'icon-accept',
						listeners: {
							click: function() {
								var form = Ext.getCmp('investors-detail-investment-strategy-form-' + data.INVESTOR_ID).getForm();
								if(form.isValid()) {
									form.submit({
										url: sd.baseUrl + '/investors/request/update-detail',
										waitMsg: 'Updateing data, please wait..',
										params: {
											id: data.INVESTOR_ID,
											type: 'INVESTMENT_STRATEGY'
										},
										success: function(d, e) {
											var json = Ext.decode(e.response.responseText);
											Ext.Msg.alert('Message', 'Update success.');
											storeINVESTORS.loadPage(storeINVESTORS.currentPage);
										},
										failure: function(d, e) {
											var json = Ext.decode(e.response.responseText);
											Ext.Msg.alert('Error', json.error_message);
										}
									})
								}
							}
						}
					}]
				}]
			},{
				region: 'north',
				border: false,
				maxWidth: Ext.getBody().getViewSize().width - maxWidth,
				items: [
				<?php echo $this->render('/request/tbar/investors/chart-pie.js')?>,
				<?php echo $this->render('/request/tbar/investors/chart-line.js')?>]
			},{
				region: 'north',
				title: 'Key Persons',
				border: false,
				maxWidth: Ext.getBody().getViewSize().width - maxWidth,
				items: [{
					xtype: 'gridpanel',
					border: false,
					minHeight: 150,
					maxHeight: 150,
					autoScroll: true,
					id: 'investors-detail-key-persons-grid-' + data.INVESTOR_ID,
					store: storeCO,
					bbar: new Ext.PagingToolbar({
						store: storeCO,
						displayInfo: true,
						displayMsg: 'Displaying data {0} - {1} of {2}',
						emptyMsg: 'No data to display',
						items: [
						    '-',
						    'Records per page'
						]
					}),
					columns: [{
						text: 'Name',
						flex: 1,
						dataIndex: 'NAME'
					},{
						text: 'Position',
						width: 200,
						align: 'center',
						dataIndex: 'POSITION'
					},{
						text: 'Email',
						width: 200,
						align: 'center',
						dataIndex: 'EMAIL'
					},{
						text: 'Phone',
						width: 200,
						align: 'center',
						dataIndex: 'PHONE_1'
					}]
				}],
				tbar: [{
					xtype: 'button',
					text: 'Add New Contact',
					iconCls: 'icon-go',
					listeners: {
						click: function() {
							Ext.create('Ext.Window', {
                                title: 'Add New Contacts',
                                id: 'CO',
                                draggable: false,
                                modal: true,
                                width: 400,
                                align: 'center',
                                resizable: false,
                                items: [{
                                    xtype: 'panel',
                                    border: false,
                                    items: [{
                                        xtype: 'form',
                                        layout: 'form',
                                        id: 'add-new-contacts-form',
                                        border: false,
                                        bodyPadding: '5 5 5 5',
                                        defaultType: 'textfield',
                                        waitMsgTarget: true,
                                        items: [{
                                            fieldLabel: 'Name',
                                            allowBlank: false,
                                            name: 'NAME'
                                		},{
                                            fieldLabel: 'Phone 1',
                                            allowBlank: false,
                                            name: 'PHONE_1',
                                  		},{
                                            fieldLabel: 'Phone 2',
                                            allowBlank: true,
                                            name: 'PHONE_2',
                                    
                               			},{
											fieldLabel:'Email',
											//allowBlank:false,
											name:'EMAIL',
											vtype:'email'					
										},{
					                        fieldLabel: 'Address',
											name: 'ADDRESS',
											xtype: 'htmleditor',
											height: 150
                           
                               			},{
                                            xtype: 'radiofield',
											name: 'SEX',
											value: 'Male',
											fieldLabel: 'Sex',
											boxLabel: 'Male',
											checked: true
                                		},{
										 	xtype: 'radiofield',
										 	name: 'SEX',
										 	value: 'Female',
										 	fieldLabel: '',
										 	labelSeparator: '',
										 	hideEmptyLabel: false,
										 	boxLabel: 'Female'
		  								},{
                                            fieldLabel: 'Position',
                                            allowBlank: false,
                                            name: 'POSITION'
                                		}]
                           			}],
                                    buttons: [{//===Save Contacts
	                                    text: 'Save',
	                                    listeners: {
	                                        click: function() {
	                                            var form = Ext.getCmp('add-new-contacts-form').getForm();
	                                            var store = loadStore ('Contacts');
	                                            
	                                            if (form.isValid()) {
	                                                form.submit({
	                                                    url: sd.baseUrl + '/contacts/request/create/id/' + data.INVESTOR_ID,
	                                                    waitMsg: 'Saving new Key Person, please wait..',
	                                                    success: function(d, e) {
	                                                        var json = Ext.decode(e.response.responseText);
	                                                        form.reset();
	                                                        store.load({
	                                                            params: {
	                                                                id: data.INVESTOR_ID
	                                                            }
	                                                        });
	                                                        Ext.Msg.alert('Success', 'Data has been saved');
	                                                        Ext.getCmp('CO').close();
	                                                    },
	                                                    failure: function(d, e) {
	                                                        //console.log(data);
	                                                        var json = Ext.decode(e.response.responseText);
	                                                        Ext.Msg.alert('Error', json.error_message);
	                                                    }
	                                                });
	                                            }
	                                        }
	                                    }
	                                },{
	                                    text: 'Cancel',
	                                    listeners: {
	                                        click: function() {
	                                            this.up().up().up().close();
	                                        }
	                                    }
	                                }] 
	                            }]
	                        }).show();
						}
					}
				},{
					xtype: 'button',
					text: 'Delete Contact',
					iconCls: 'icon-stop',
					listeners: {
						click: function() {
							var __c = Ext.getCmp('investors-detail-key-persons-grid-' + data.INVESTOR_ID);
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
													url: sd.baseUrl + '/contacts/request/destroy',
													params: {
														id: __data.CONTACT_ID
													},
													success: function(d) {
														var json = Ext.decode(d.responseText); // Decode responsetext | Json to Javasript Object
														closeLoadingWindow();
														storeCO.load({
															params: {
																id: data.INVESTOR_ID
															}
														});
														Ext.Msg.alert('Message', 'Data successfully deleted.');
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
								Ext.Msg.alert('Error', 'You did not select any contact.');
							}
						}
					}
				}]
			},{
				region: 'north',
				title: 'Meeting Investor',
				border: false,
				maxWidth: Ext.getBody().getViewSize().width - maxWidth,
				items: [{
					xtype: 'gridpanel',
					border: false,
					minHeight: 150,
					maxHeight: 150,
					autoScroll: true,
					store: storeMI,
					id: 'investors-detail-meeting-investor-grid-' + id,
					columns: [{
						text: 'Meeting Date',
						align: 'center',
						width: 100,
						dataIndex: 'MEETING_DATE'
					},{
						text: 'Meeting Event',
						flex: 1,
						dataIndex: 'MEETING_EVENT'
					},{
						text: 'Start Time',
						align: 'center',
						width: 150,
						dataIndex: 'START_TIME'
					},{
						text: 'End Time',
						align: 'center',
						width: 150,
						dataIndex: 'END_TIME'
					}]
				}],
				tbar: [{
					xtype: 'button',
					text: 'Add New Meeting Investors',
					iconCls: 'icon-go',
					listeners: {
						click: function() {
							Ext.create('Ext.Window', {
								title: 'Add New Meeting Investors',
                                draggable: false,
			    				id: 'MI',
                                modal: true,
                                width: 400,
                                align: 'center',
                                resizable: false,
                                items: [{
                                	xtype: 'panel',
                                	border: false,
                                	items: [{
                                		xtype: 'form',
                                		layout: 'form',
                                		id: 'add-meetinginvestors-form',
                                		border: false,
                                		bodyPadding: '5 5 5 5',
                                		defaultType: 'textfield',
                                		waitMsgTarget: true,
                                		items: [{
                                			xtype: 'combobox',
                                            fieldLabel: 'Meeting Event',
                                            name: 'MEETING_ACTIVITIE_ID',
                                            labelWidth: 130,
                                            store: Ext.data.StoreManager.lookup('Meetingactivities'),
                                            displayField: 'MEETING_EVENT',
                                            valueField:'MEETING_ACTIVITIE_ID',
                                            typeAhead: true,
                                            allowBlank: false,
                                            minChars: 1,
                                            emptyText: 'Select Meeting Event'
                                		}]
                                	}],
                                	buttons: [{
                                		text: 'Save',
                                		listeners: {
                                			click: function() {
                                				var form = Ext.getCmp('add-meetinginvestors-form').getForm();
                                				if (form.isValid()) {
                                					form.submit({
                                						url: sd.baseUrl + '/meetinginvestor/request/create/id'+data.INVESTOR_ID,
                                						waitMsg: 'Saving data, please wait..',
                                						params: {
                                							id: data.INVESTOR_ID
                                						},
                                						success: function(d, e) {
                                							var json = Ext.decode(e.response.responseText);
                                							form.reset();
                                							var store = loadStore('Meetinginvestors');
                                							store.load({
                                								params: {
                                									id: data.INVESTOR_ID
                                								}
                                							});
                                							Ext.Msg.alert('Success', 'Data has been saved');
                                							Ext.getCmp('MI').close();
                                						},
                                						failure: function(d, e) {
                                							var json = Ext.decode(e.response.responseText);
                                							Ext.Msg.alert('Error','Sorry, data already exist');
                                						}
                                					});
                                				}
                                			}
                                		}
                                	},{
                                		text: 'Cancel',
                                		listeners: {
                                			click: function() {
                                				this.up().up().up().close();
                                			}
                                		}
                                	}]
                                }]
                            }).show();
						}
					}
				},{
					xtype: 'button',
					text: 'Detail Meeting',
					iconCls: 'icon-detail',
					listeners: {
						click: function() {
							<?php echo $this->render('/request/tbar/investors/meeting-gilang.js')?>
						}
					}
				},{
					xtype: 'button',
					text: 'Delete Meeting Investors',
					iconCls: 'icon-stop',
					listeners: {
						click: function() {
							var __c = Ext.getCmp('investors-detail-meeting-investor-grid-' + id);
							var __sel = __c.getSelectionModel().getSelection();
							if(__sel.length > 0) {
								var __data = __sel[0].data;
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
													url: sd.baseUrl + '/meetinginvestor/request/destroy',
													params: {
														INVESTOR_ID: __data.INVESTOR_ID,
                										MEETING_ACTIVITIE_ID: __data.MEETING_ACTIVITIE_ID
													},
													success: function(d) {
														var json = Ext.decode(d.responseText); // Decode responsetext | Json to Javasript Object
														closeLoadingWindow();
														var store = loadStore('Meetinginvestors');
														store.load({
															params: {
																id: data.INVESTOR_ID
															}
														});
													},
													failure: function(d) {
														var json = Ext.decode(d.responseText); // Decode responsetext | Json to Javasript Object
														closeLoadingWindow();
														Ext.Msg.alert('Error', d.error_message);
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
								Ext.Msg.alert('Error', 'You did not select any Meeting Investors.');
							}
						}
					}
				}]
			}]
		}));
	}
	c.up().setActiveTab(id);
	$('body').css('overflow','hidden');
	
	
	/* Investment Strategy */
	
	var hx = $('#investors-detail-investment-strategy-form-' + data.INVESTOR_ID).append('');
	
} else {
	Ext.Msg.alert('Message', 'You did not select any Investor');
}