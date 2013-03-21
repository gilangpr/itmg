var c = Ext.getCmp('<?php echo $this->container ?>');
var selected = c.getSelectionModel().getSelection();
var fpColumns = <?php echo $this->fpColumns?>;
var fpFields = <?php echo $this->fpFields?>;
var csdColumns = <?php echo $this->csdColumns?>;
var csdFields = <?php echo $this->csdFields?>;
var srColumns = <?php echo $this->srColumns?>;
var srFields = <?php echo $this->srFields?>;
var sryColumns = <?php echo $this->sryColumns?>;
var sryFields = <?php echo $this->sryFields?>;
var aspColumns = <?php echo $this->aspColumns?>;
var aspFields = <?php echo $this->aspFields?>;
var csyColumns = <?php echo $this->csyColumns?>;
var csyFields = <?php echo $this->csyFields?>;
var fobColumns = <?php echo $this->fobColumns?>;
var fobFields = <?php echo $this->fobFields?>;
var csd_bcColumns = <?php echo $this->csd_bcColumns?>;
var csd_bcFields = <?php echo $this->csd_bcFields?>;
//var nmbr = Ext.util.Format.number;

storePEERS = loadStore('Peers');

if(selected.length > 0) {
    var id = 'peers-detail' + selected[0].id;
    if(!c.up().items.get(id)){
        var data = selected[0].data;
        var maxWidth = 221;
        //Store Resources and Reserves
//        var cellEditing = Ext.create('Ext.grid.plugin.RowEditing', {
//			clicksToMoveEditor: 1,
//	        autoCancel: false
//	    });
        
        <?php echo $this->render('/request/tbar/peers/ref/stores.js') ?>
        
        c.up().add({
            xtype: 'panel',
            layout: 'border',
            title: data.PEER_NAME,
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
                items: [{
                    title: 'Brief History',
                    collapsible: true,
                    border: false,
                    maxWidth: Ext.getBody().getViewSize().width - maxWidth,
                    items: [{
                    	xtype: 'form',
                    	layout: 'form',
                    	border: false,
                    	bodyPadding: '5 5 5 5',
                    	id: 'brief-history-form' + data.PEER_ID,
                    	items: [{
                    		xtype: 'htmleditor',
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
    									})
    								}
                    			}
                    		}
                    	}]
                    }]
                },{
                    title: 'Business Activity',
//                    bodyPadding: '5 5 5 5',
//                    html: '<p style="text-align: justify">' + data.BUSINESS_ACTIVITY.replace('\n','<br/>') + '</p>',
                    collapsible: true,
                    border: false,
                    maxWidth: Ext.getBody().getViewSize().width - maxWidth,
                    items: [{
                    	xtype: 'form',
                    	layout: 'form',
                    	border: false,
                    	bodyPadding: '5 5 5 5',
                    	id: 'business-activity-form' + data.PEER_ID,
                    	items: [{
                    		xtype: 'htmleditor',
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
    									})
    								}
                    			}
                    		}
                    	}]
                    }]
                }]
            },{ //Peers Data
                title: 'Peers Data',
                region: 'center',
                autoScroll: true,
                items: [{
                    title: 'Striping Ratio',
                    border: false,
                    collapsible: true,
                    items: [{
                        xtype: 'gridpanel',
                        border: false,
                        plugins: [new Ext.grid.plugin.RowEditing({clicksToMoveEditor: 1, autoCancel: false})],
                        minHeight: 120,
                        store: storeSRY,
                        columns: sryColumns,
                        tbar: [{
                            xtype: 'button',
                            text: 'Add New Stripping Ratio Year',
                            iconCls: 'icon-accept',
                            listeners: {
                                click: function() {
                                    Ext.create('Ext.Window', {
                                        title: 'Add New Stripping Ratio By Year',
                                        id: 'SRY',
                                        draggable: false,
                                        modal: true,
                                        width: 300,
                                        align: 'center',
                                        resizable: false,
                                        items: [{
                                            xtype: 'panel',
                                            border: false,
                                            items: [{
                                                xtype: 'form',
                                                layout: 'form',
                                                id: 'add-stripping-ratio-year-form',
                                                border: false,
                                                bodyPadding: '5 5 5 5',
                                                defaultType: 'textfield',
                                                waitMsgTarget: true,
                                                items: [{
                                                    fieldLabel: 'Title',
                                                    allowBlank: false,
                                                    name      : 'TITLE'
                                                },{
                                                    fieldLabel: 'Value',
                                                    allowBlank: false,
                                                    name      : 'VALUE',
                                                    xtype     : 'numberfield',
                                                    minValue  : 0,
                                                    value     : 0
                                                }]
                                            }],
                                            buttons: [{
                                                text: 'Save',
                                                listeners: {
                                                    click: function() {
                                                        var form = Ext.getCmp('add-stripping-ratio-year-form').getForm();
                                                        var store = loadStore('StrippingRatioYears');
                                                        
                                                        if(form.isValid()) {
                                                            form.submit({
                                                            url: sd.baseUrl + '/strippingratioyear/request/create/id/' + data.PEER_ID,
                                                            success: function(d) {
                                                                var json = Ext.decode(d.responseText);
                                                                form.reset();
                                                                store.load({
                                                                    params: {
                                                                        id: data.PEER_ID
                                                                    }
                                                                });
                                                                Ext.Msg.alert('Success', 'Data has been saved');
                                                                Ext.getCmp('SRY').close();
                                                            },
                                                            failure: function(data) {
                                                                    var json = Ext.decode(data.responseText);
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
                        }]
                    },{
                        xtype: 'gridpanel',
                        border: false,
                        minHeight: 120,
//                        plugins: [new Ext.grid.plugin.RowEditing({clicksToMoveEditor: 1, autoCancel: false})],
                        store: storeSR,
                        id: 'sr-grid',
                        columns: srColumns,
                        tbar: [{
                            xtype: 'button',
                            text: 'Add New Stripping Ratio',
                            iconCls: 'icon-accept',
                            listeners: {
                                click: function() {
                                    Ext.create('Ext.Window', {
                                        title: 'Add New Stripping Ratio',
                                        id: 'SR',
                                        draggable: false,
                                        modal: true,
                                        width: 300,
                                        align: 'center',
                                        resizable: false,
                                        items: [{
                                            xtype: 'panel',
                                            border: false,
                                            items: [{
                                                xtype: 'form',
                                                layout: 'form',
                                                id: 'add-stripping-ratio-form',
                                                border: false,
                                                bodyPadding: '5 5 5 5',
                                                defaultType: 'textfield',
                                                waitMsgTarget: true,
                                                fieldDefaults: {
                        				            labelAlign: 'left',
                        				            labelWidth: 150,
                        				            anchor: '100%'
                        				        },
                                                items: [{
                                                    fieldLabel: 'Title',
                                                    allowBlank: false,
                                                    name: 'TITLE'
                                                },{
                                                    fieldLabel: 'Sales Volume',
                                                    allowBlank: false,
                                                    name: 'SALES_VOLUME',
                                                    xtype: 'numberfield',
                                                    minValue: 0,
                                                    value: 0
                                                },{
                                                    fieldLabel: 'Production Volume',
                                                    allowBlank: false,
                                                    name: 'PRODUCTION_VOLUME',
                                                    xtype: 'numberfield',
                                                    minValue: 0,
                                                    value: 0
                                                },{
                                                    fieldLabel: 'Coal Transportations',
                                                    allowBlank: false,
                                                    name: 'COAL_TRANSPORT',
                                                    xtype: 'numberfield',
                                                    minValue: 0,
                                                    value: 0
                                                }]
                                            }],
                                            buttons: [{
                                                text: 'Save',
                                                listeners: {
                                                    click: function() {
                                                        var form = Ext.getCmp('add-stripping-ratio-form').getForm();
                                                        var store = loadStore('StrippingRatios');
                                                        
                                                        if(form.isValid()) {
                                                            form.submit({
                                                            url: sd.baseUrl + '/strippingratio/request/create/id/' + data.PEER_ID,
                                                            success: function(d) {
                                                                var json = Ext.decode(d.responseText);
                                                                form.reset();
                                                                store.load({
                                                                    params: {
                                                                        id: data.PEER_ID
                                                                    }
                                                                });
                                                                Ext.Msg.alert('Success', 'Data has been saved');
                                                                Ext.getCmp('SR').close();
                                                            },
                                                            failure: function(data) {
                                                                    var json = Ext.decode(data.responseText);
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
                        	text: 'Edit Stripping Ratio',
                        	iconCls: 'icon-accept',
                        	listeners: {
                        		click: function() {
                        			Ext.create('Ext.Window', {
                        				title: 'Edit Stripping Ratio',
                        				id: 'edit-stripping-ratio',
                        				draggable: false,
                        				modal: true,
                        				width: 300,
                        				align: 'center',
                        				resizable: false,
                        				items: [{
                        					xtype: 'panel',
                        					border: false,
                        					items: [{
                        						xtype: 'form',
                        						layout: 'form',
                        						id: 'edit-stripping-ratio-form',
                        						border: false,
                        						bodyPadding: '5 5 5 5',
                        						defaultType: 'combobox',
                        						waitMsgTarget: true,
                        						fieldDefaults: {
                        				            labelAlign: 'left',
                        				            labelWidth: 150,
                        				            anchor: '100%'
                        				        },
                        						items: [{
                        							fieldLabel: 'TITLE',
                                                    allowBlank: false,
                                                    xtype: 'combobox',
                                                    name: 'TITLE',
                                                    store: storeSR,
                                                    mode : 'local',
                                                    id: 'sr-title',
                                                    value: 'All',
                                                    listWidth : 40,
                                                    triggerAction : 'all',
                                                    displayField  : 'TITLE',
                                                    editable      : false,
                                                    forceSelection: true,
                                                    listeners: {
                                                    	change: function() {
                                                    		var _p = this.value;
                                                    		if(this.value != 'null' && this.value != '') {
                                                    			var _f = Ext.getCmp('edit-stripping-ratio-form');
                                                    			if(typeof(_f) != 'undefined') {
                                                    				var _g = Ext.getCmp('sr-grid');
                                                    				Ext.each(_g.store.data.items, function(_v) {
                                                    					/* Sales Volume */
                                                    					if(_v.data.NAME == 'Sales Volume (Mil.Tons)') {
                                                    						var x = eval('_v.data.VALUE_' + _p);
                                                    						Ext.getCmp('sr-sales-volume').setValue(x);
                                                    					}
                                                    					/* Sales Volume */
                                                    					
                                                    					/* Production Volume */
                                                    					if(_v.data.NAME == 'Production Volume (Mil.Tons)') {
                                                    						var x = eval('_v.data.VALUE_' + _p);
                                                    						Ext.getCmp('sr-production-volume').setValue(x);
                                                    					}
                                                    					/* Production Volume */
                                                    					
                                                    					/* Coal Transportation */
                                                    					if(_v.data.NAME == 'Coal Transportation (Mil.Tons)') {
                                                    						var x = eval('_v.data.VALUE_' + _p);
                                                    						Ext.getCmp('sr-coal-transport').setValue(x);
                                                    					}
                                                    					/* Coal Transportation */
                                                    				});
                                                    			}
                                                    		}
                                                    	}
                                                    }
                        						},{
                        							fieldLabel: 'Sales Volume',
                        							xtype: 'numberfield',
                        							allowBlank: false,
                        							id: 'sr-sales-volume',
                        							name: 'SALES_VOLUME',
                        							minValue: 0,
                        							value: 0
                        						},{
                        							fieldLabel: 'Production Volume',
                        							xtype: 'numberfield',
                        							allowBlank: false,
                        							id: 'sr-production-volume',
                        							name: 'PRODUCTION_VOLUME',
                        							minValue: 0,
                        							value: 0
                        						},{
                        							fieldLabel: 'Coal Transport',
                        							xtype: 'numberfield',
                        							allowBlank: false,
                        							id: 'sr-coal-transport',
                        							name: 'COAL_TRANSPORT',
                        							minValue: 0,
                        							value: 0
                        						}]
                        					}],
                        					buttons: [{
                        						text: 'Save',
                        						listeners: {
                        							 click: function() {
                                                         var form = Ext.getCmp('edit-stripping-ratio-form').getForm();
                                                         var store = loadStore('StrippingRatios');
                                                         
                                                         if(form.isValid()) {
                                                             form.submit({
                                                             url: sd.baseUrl + '/strippingratio/request/create/id/' + data.PEER_ID,
                                                             success: function(d) {
                                                                 var json = Ext.decode(d.responseText);
                                                                 form.reset();
                                                                 store.load({
                                                                     params: {
                                                                         id: data.PEER_ID
                                                                     }
                                                                 });
                                                                 Ext.Msg.alert('Success', 'Data has been saved');
                                                                 Ext.getCmp('edit-stripping-ratio').close();
                                                             },
                                                             failure: function(data) {
                                                                     var json = Ext.decode(data.responseText);
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
                        								Ext.getCmp('edit-stripping-ratio').close();
                        							}
                        						}
                        					}]
                        				}]
                        			}).show();
                        		}
                        	}
                        }]
                    }]
                },{
                    title: 'Average Selling Price',
                    border: false,
                    collapsible: true,
                    items: [{
                        xtype: 'gridpanel',
                        border: false,
                        plugins: [new Ext.grid.plugin.RowEditing({clicksToMoveEditor: 1, autoCancel: false})],
                        minHeight: 120,
                        store: storeASP,
                        id: 'asp-grid',
                        columns: aspColumns,
                        tbar: [{
                            xtype: 'button',
                            text : 'Add New Average Selling Price',
                            iconCls: 'icon-accept',
                            listeners: {
                                click: function() {
                                    Ext.create('Ext.Window', {
                                        title: 'Add New Average Selling Price',
                                        id: 'ASP',
                                        draggable: false,
                                        modal: true,
                                        width: 300,
                                        align: 'center',
                                        resizable: false,
                                        items: [{
                                            xtype: 'panel',
                                            border: false,
                                            items: [{
                                                xtype : 'form',
                                                layout: 'form',
                                                id    : 'add-average-selling-price-form',
                                                border: false,
                                                bodyPadding: '5 5 5 5',
                                                defaultType: 'textfield',
                                                waitMsgTarget: true,
                                                items: [{
                                                    fieldLabel: 'Title',
                                                    allowBlank: false,
                                                    name: 'TITLE',
                                                },{
                                                    fieldLabel: 'Type',
                                                    allowBlank: false,
                                                    xtype: 'combobox',
                                                    name: 'TYPE',
                                                    store: new Ext.data.ArrayStore({fields:['type'],data:[['Export'],['Domestic']]}),
                                                    mode : 'local',
                                                    value: 'Export',
                                                    listWidth : 40,
                                                    triggerAction : 'all',
                                                    displayField  : 'type',
                                                    valueField    : 'type',
                                                    editable      : false,
                                                    forceSelection: true
                                                },{
                                                    fieldLabel: 'Value(IDR)',
                                                    allowBlank: false,
                                                    xtype: 'numberfield',
                                                    name: 'VALUE_IDR',
                                                    minValue: 0,
                                                    value: 0
                                                },{
                                                    fieldLabel: 'Value(USD)',
                                                    allowBlank: false,
                                                    xtype: 'numberfield',
                                                    name: 'VALUE_USD',
                                                    minValue: 0,
                                                    value: 0
                                                }]
                                            }],
                                            buttons: [{
                                                text: 'Save',
                                                listeners: {
                                                    click: function() {
                                                        var form = Ext.getCmp('add-average-selling-price-form').getForm();
                                                        var store = loadStore('SellingPrices');
                                                        
                                                        if(form.isValid()) {
                                                            form.submit({
                                                            url: sd.baseUrl + '/sellingprice/request/create/id/' + data.PEER_ID,
                                                            success: function (d, e) {
                                                                var json = Ext.decode(e.response.responseText);
                                                                form.reset();
                                                                store.load({
                                                                    params: {
                                                                        id: data.PEER_ID
                                                                    }
                                                                });
                                                                Ext.Msg.alert('Success', 'Data has been saved');
                                                                Ext.getCmp('ASP').close();
                                                            },
                                                            failure: function(d, e) {
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
                                                    click: function(){
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
                        	text: 'Edit Average Selling Price',
                        	iconCls: 'icon-accept',
                        	listeners: {
                        		click: function(){
                        			Ext.create('Ext.Window', {
                        				title: 'Edit Average Selling Price',
                        				id: 'edit-average-selling_price',
                        				draggable: false,
                        				modal: true,
                        				width: 300,
                        				align: 'center',
                        				resizable: false
                        			}).show();
                        		}
                        	}
                        }]
                    }]
                },{
                    title: 'Financial Performance',
                    collapsible: true,
                    border: false,
                    plugins: [new Ext.grid.plugin.RowEditing({clicksToMoveEditor: 1, autoCancel: false})],
                    xtype: 'gridpanel',
                    minHeight: 240,
                    store: storeFP,
                    columns: fpColumns,
                    tbar: [{
                        xtype: 'button',
                        text: 'Add New Financial Performance',
                        iconCls: 'icon-accept',
                        listeners: {
                            click: function() {
                                Ext.create('Ext.Window', {
                                    title: 'Add New Financial Performance',
                                    id: 'FP',
                                    draggable: false,
                                    modal: true,
                                    width: 360,
                                    align: 'center',
                                    resizable: false,
                                    items: [{
                                        xtype: 'panel',
                                        border: false,
                                        items: [{
                                            xtype: 'form',
                                            layout: 'form',
                                            id: 'add-financial-performance-form',
                                            border: false,
                                            bodyPadding: '5 5 5 5',
                                            defaultType: 'textfield',
                                            waitMsgTarget: true,
                                            fieldDefaults: {
                    				            labelAlign: 'left',
                    				            labelWidth: 168,
                    				            anchor: '100%'
                    				        },
                                            items: [{
                                                fieldLabel: 'Title',
                                                allowBlank: false,
                                                name: 'TITLE'
                                            },{
                                                fieldLabel: 'Revenues',
                                                allowBlank: false,
                                                xtype: 'numberfield',
                                                minValue: 0,
                                                name: 'REVENUE'
                                            },{
                                                fieldLabel: 'Gross Profit',
                                                allowBlank: false,
                                                xtype: 'numberfield',
                                                minValue: 0,
                                                name: 'GROSS_PROFIT'
                                            },{
                                                fieldLabel: 'EBIT',
                                                allowBlank: false,
                                                xtype: 'numberfield',
                                                minValue: 0,
                                                name: 'EBIT'
                                            },{
                                                fieldLabel: 'EBITDA',
                                                allowBlank: false,
                                                xtype: 'numberfield',
                                                minValue: 0,
                                                name: 'EBITDA'
                                            },{
                                                fieldLabel: 'Net Profit',
                                                allowBlank: false,
                                                xtype: 'numberfield',
                                                minValue: 0,
                                                name: 'NET_PROFIT'
                                            },{
                                                fieldLabel: 'Total Assets',
                                                allowBlank: false,
                                                xtype: 'numberfield',
                                                minValue: 0,
                                                name: 'TOTAL_ASSETS'
                                            },{
                                                fieldLabel: 'Cash',
                                                allowBlank: false,
                                                xtype: 'numberfield',
                                                minValue: 0,
                                                name: 'CASH'
                                            },{
                                                fieldLabel: 'Gross Profit Margin',
                                                allowBlank: false,
                                                name: 'GROSS_PROFIT_MARGIN'
                                            },{
                                                fieldLabel: 'EBIT Margin',
                                                allowBlank: false,
                                                name: 'EBIT_MARGIN'
                                            },{
                                                fieldLabel: 'Net Profit Margin',
                                                allowBlank: false,
                                                name: 'NET_PROFIT_MARGIN'
                                            },{
                                                fieldLabel: 'Return On Asset',
                                                allowBlank: false,
                                                name: 'RETURN_ASSET'
                                            },{
                                                fieldLabel: 'Return On Equity',
                                                allowBlank: false,
                                                name: 'RETURN_EQUITY'
                                            },{
                                                fieldLabel: 'Return On Investment',
                                                allowBlank: false,
                                                name: 'RETURN_INVESTMENT'
                                            }]
                                        }],
                                        buttons: [{
                                            text: 'Save',
                                            listeners: {
                                                click: function() {
                                                    var form = Ext.getCmp('add-financial-performance-form').getForm();
                                                    var store = loadStore ('FinancialPerformances');
                                                        
                                                    if (form.isValid()) {
                                                        form.submit({
                                                        url: sd.baseUrl + '/financialperform/request/create/id/' + data.PEER_ID,
                                                        success: function(d) {
                                                            //console.log(data);
                                                            var json = Ext.decode(d.responseText);
                                                            form.reset();
                                                            store.load({
                                                                    params: {
                                                                        id: data.PEER_ID
                                                                    }
                                                            }); // Refresh grid data
                                                            Ext.Msg.alert('Success', 'Data has been saved');
                                                            Ext.getCmp('FP').close();
                                                        },
                                                        failure: function(data) {
                                                                //console.log(data);
                                                                var json = Ext.decode(data.responseText);
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
                    }]
                },{
                    title: 'Total Cash Cost (FOB)',
                    collapsible: true,
                    border: false,
                    xtype: 'gridpanel',
                    plugins: [new Ext.grid.plugin.RowEditing({clicksToMoveEditor: 1, autoCancel: false})],
                	store: storeFOB,
                    columns: fobColumns,
                    minHeight: 150,
                    tbar: [{
                    	xtype: 'button',
                    	text: 'Add New Total Cash Cost',
                    	iconCls: 'icon-accept',
                    	listeners: {
                    		click: function() {
                    			Ext.create('Ext.Window', {
                    				title: 'Add New Total Cash Cost',
                    				id: 'FOB',
                    				draggable: false,
                    				modal: true,
                    				width: 300,
                    				align: 'center',
                    				resizable: false,
                    				items: [{
                    					xtype: 'panel',
                    					border: false,
                    					items: [{
                    						xtype: 'form',
                    						layout: 'form',
                    						id: 'add-new-total-cash-cost-form',
                    						border: false,
                    						bodyPadding: '5 5 5 5',
                    						defaultType: 'textfield',
                    						waitMsgTarget: true,
                    						fieldDefaults: {
                    				            labelAlign: 'left',
                    				            labelWidth: 160,
                    				            anchor: '100%'
                    				        },
                    						items: [{
                    							fieldLabel: 'Title',
                    							allowBlank: false,
                    							name: 'TITLE'
                    						},{
                    							fieldLabel: 'Ex. Royalty (IDR)',
                    							allowBlank: false,
                    							xtype: 'numberfield',
                    							minValue: 0,
                    							value: 0,
                    							name: 'ROYALTY_IDR'
                    						},{
                    							fieldLabel: 'Ex. Royalty (USD)',
                    							allowBlank: false,
                    							xtype: 'numberfield',
                    							minValue: 0,
                    							value: 0,
                    							name: 'ROYALTY_USD'
                    						},{
                    							fieldLabel: 'Total (IDR)',
                    							allowBlank: false,
                    							xtype: 'numberfield',
                    							minValue: 0,
                    							value: 0,
                    							name: 'TOTAL_IDR'
                    						},{
                    							fieldLabel: 'Total (USD)',
                    							allowBlank: false,
                    							xtype: 'numberfield',
                    							minValue: 0,
                    							value: 0,
                    							name: 'TOTAL_USD'
                    						},{
                    							fieldLabel: 'Currency 1 USD',
                    							allowBlank: false,
                    							xtype: 'numberfield',
                    							minValue: 0,
                    							value: 0,
                    							name: 'CURRENCY'
                    						}]
                    					}],
                    						buttons: [{
                    							text: 'Save',
                    							listeners: {
                    								click: function() {
                    									var form = Ext.getCmp('add-new-total-cash-cost-form').getForm();
                    									var store = loadStore('TotalCashCosts');
                    									
                    									if(form.isValid()) {
                    										form.submit({
                                                                url: sd.baseUrl + '/totalcashcost/request/create/id/' + data.PEER_ID,
                                                                success: function(d) {
                                                                    //console.log(data);
                                                                    var json = Ext.decode(d.responseText);
                                                                    form.reset();
                                                                    store.load({
                                                                        params: {
                                                                            id: data.PEER_ID
                                                                        }
                                                                    }); // Refresh grid data
                                                                    Ext.Msg.alert('Success', 'Data has been saved');
                                                                    Ext.getCmp('FOB').close();
                                                                },
                                                                failure: function(data) {
                                                                    //console.log(data);
                                                                    var json = Ext.decode(data.responseText);
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
                    }]
                },{ //Reserves & Resources
                    title: 'Reserves & Resources',
                    collapsible: true,
                    border: false,
                    xtype: 'gridpanel',
                    plugins: [new Ext.grid.plugin.RowEditing({clicksToMoveEditor: 1, autoCancel: false})],
                    store: storeRR,
                    minHeight: 130,
                    tbar: [{
                        xtype: 'button',
                        text: 'Add New Reserves & Resources',
                        iconCls: 'icon-accept',
                        listeners: {
                            click: function() {
                                Ext.create('Ext.Window', {
                                    title: 'Add New Reserves & Resources',
                                    id: 'RR',
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
                                            id: 'add-new-reserves-resources-form',
                                            border: false,
                                            bodyPadding: '5 5 5 5',
                                            defaultType: 'textfield',
                                            waitMsgTarget: true,
                                            items: [{
                                                fieldLabel: 'Mine',
                                                allowBlank: false,
                                                name: 'MINE'
                                            },{
                                                fieldLabel: 'Resources',
                                                allowBlank: false,
                                                name: 'RESOURCES',
                                                xtype: 'numberfield',
                                                minValue: 0,
                                                value: 0
                                            },{
                                                fieldLabel: 'Reserves',
                                                allowBlank: false,
                                                name: 'RESERVES',
                                                xtype: 'numberfield',
                                                minValue: 0,
                                                value: 0
                                            },{
                                                fieldLabel: 'Area',
                                                allowBlank: false,
                                                name: 'AREA',
                                                xtype: 'numberfield',
                                                minValue: 0,
                                                value: 0
                                            },{
                                                fieldLabel: 'CV',
                                                allowBlank: false,
                                                name: 'CV'
                                            },{
                                                fieldLabel: 'Location',
                                                allowBlank: false,
                                                name: 'LOCATION'
                                            },{
                                                fieldLabel: 'License',
                                                allowBlank: false,
                                                name: 'LICENSE'
                                            }]
                                        }],
                                        buttons: [{
                                                text: 'Save',
                                                listeners: {
                                                    click: function() {
                                                        var form = Ext.getCmp('add-new-reserves-resources-form').getForm();
                                                        var store = loadStore ('PeerResourceReserves');
                                                        
                                                        if (form.isValid()) {
                                                            form.submit({
                                                                url: sd.baseUrl + '/peerrs/request/create/id/' + data.PEER_ID,
                                                                success: function(d) {
                                                                    //console.log(data);
                                                                    var json = Ext.decode(d.responseText);
                                                                    form.reset();
                                                                    store.load({
                                                                        params: {
                                                                            id: data.PEER_ID
                                                                        }
                                                                    }); // Refresh grid data
                                                                    Ext.Msg.alert('Success', 'Data has been saved');
                                                                    Ext.getCmp('RR').close();
                                                                },
                                                                failure: function(data) {
                                                                    //console.log(data);
                                                                    var json = Ext.decode(data.responseText);
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
                        text: 'Delete',
                        iconCls: 'icon-stop',
                        listeners: {
                            click: function() {

                            }
                        }
                    }],
                    columns: [{
                        flex: 1,
                        text: 'Mine',
                        align: 'center',
                        dataIndex: 'MINE',
                        editor: {
                        	xtype: 'textfield',
                        	allowBlank: false,
                        	minValue: 0
                        }
                    },{
                        flex: 1,
                        text: 'Resources <br /> (Mil. Tons)',
                        align: 'center',
                        dataIndex: 'RESOURCES',
                        editor: {
                        	xtype: 'numberfield',
                        	allowBlank: false,
                        	minValue: 0
                        }
                    },{
                        flex: 1,
                        text: 'Reserves <br /> (Mil. Tons)',
                        align: 'center',
                        dataIndex: 'RESERVES',
                        editor: {
                        	xtype: 'numberfield',
                        	allowBlank: false,
                        	minValue: 0
                        }
                    },{
                        flex: 1,
                        text: 'Area (Ha)',
                        align: 'center',
                        dataIndex: 'AREA',
                        editor: {
                        	xtype: 'numberfield',
                        	allowBlank: false,
                        	minValue: 0
                        }
                    },{
                        flex: 1,
                        text: 'CV (Kcal)',
                        align: 'center',
                        dataIndex: 'CV',
                        editor: {
                        	xtype: 'textfield',
                        	allowBlank: false,
                        	minValue: 0
                        }
                    },{
                        flex: 1,
                        text: 'Location',
                        align: 'center',
                        dataIndex: 'LOCATION',
                        editor: {
                        	xtype: 'textfield',
                        	allowBlank: false,
                        	minValue: 0
                        }
                    },{
                        flex: 1,
                        text: 'License',
                        align: 'center',
                        dataIndex: 'LICENSE',
                        editor: {
                        	xtype: 'textfield',
                        	allowBlank: false,
                        	minValue: 0
                        }
                    }]
                },{
                    title: 'Composition of the Company\'s Shareholders at the End of the Year',
                    collapsible: true,
                    border: false,
                    xtype: 'gridpanel',
                    plugins: [new Ext.grid.plugin.RowEditing({clicksToMoveEditor: 1, autoCancel: false})],
                    minHeight: 150,
                    columns: csyColumns,
                    store: storeCSY,
                    tbar: [{
                        xtype: 'button',
                        text: 'Add New Composition',
                        iconCls: 'icon-accept',
                        listeners: {
                            click: function() {
                                Ext.create('Ext.Window', {
                                    title: 'Add New Composition Company at the End of the Year',
                                    id: 'CSY',
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
                                            id: 'add-new-composition-form',
                                            border: false,
                                            bodyPadding: '5 5 5 5',
                                            defaultType: 'textfield',
                                            waitMsgTarget: true,
                                            fieldDefaults: {
                    				            labelAlign: 'left',
                    				            labelWidth: 150,
                    				            anchor: '100%'
                    				        },
                                            items: [{
                                                fieldLabel: 'Title',
                                                allowBlank: false,
                                                name: 'TITLE'
                                            },{
                                                fieldLabel: 'Republic Of Indonesia',
                                                allowBlank: false,
                                                name: 'REPUBLIC_OF_INDONESIA',
                                                xtype: 'numberfield',
                                                minValue: 0,
                                                value: 0
                                            },{
                                                fieldLabel: 'Domestic Investors',
                                                allowBlank: false,
                                                name: 'DOMESTIC_INVESTOR',
                                                xtype: 'numberfield',
                                                minValue: 0,
                                                value: 0
                                            },{
                                                fieldLabel: 'Foreign Investors',
                                                allowBlank: false,
                                                name: 'FOREIGN_INVESTOR',
                                                xtype: 'numberfield',
                                                minValue: 0,
                                                value: 0
                                            }]
                                        }],
                                        buttons: [{
                                            text: 'Save',
                                            listeners: {
                                                click: function() {
                                                    var form = Ext.getCmp('add-new-composition-form').getForm();
                                                    var store = loadStore('CompositionCompanys');

                                                    if (form.isValid()) {
                                                        form.submit({
                                                            url: sd.baseUrl + '/compositioncompany/request/create/id/' + data.PEER_ID,
                                                            success: function(d) {
                                                                var json = Ext.decode(d.responseText);
                                                                form.reset();
                                                                store.load({
                                                                    params: {
                                                                        id: data.PEER_ID
                                                                    }
                                                                }); // Refresh grid data
                                                                Ext.Msg.alert('Success', 'Data has been saved');
                                                                Ext.getCmp('CSY').close();
                                                            },
                                                            failure: function(data) {
                                                                var json = Ext.decode(data.responseText);
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
                    }]
                },{
                    title: 'Coal Sales Distribution 9M11',
                    collapsible: true,
                    border: false,
                    xtype: 'gridpanel',
                    //plugins: [new Ext.grid.plugin.RowEditing({clicksToMoveEditor: 1, autoCancel: false})],
                    minHeight: 130,
                    columns: csdColumns,
                    store: storeCSD
                },{
                    title: 'Coal Sales Distribution By Country',
                    collapsible: true,
                    border: false,
                    xtype: 'gridpanel',
                    //plugins: [new Ext.grid.plugin.RowEditing({clicksToMoveEditor: 1, autoCancel: false})],
                    store: storeCSD_BC,
                    columns: csd_bcColumns,
                    minHeight: 200,
                    tbar: [{
                        xtype: 'button',
                        text: 'Add New Coal Sales Distribution',
                        iconCls: 'icon-accept',
                        listeners: {
                            click: function() {
                                Ext.create('Ext.Window', {
                                    title: 'Add New Coal Sales Distribution',
                                    id: 'CSD_BC',
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
                                            id: 'add-new-coal-sales-country-form',
                                            border: false,
                                            bodyPadding: '5 5 5 5',
                                            defaultType: 'textfield',
                                            waitMsgTarget: true,
                                            items: [{
                                            	fieldLabel: 'Title',
                                            	allowBlank: false,
                                            	name: 'TITLE'
                                            },{	
                                            	fieldLabel: 'Country',
                                                allowBlank: false,
                                                name: 'COUNTRY'
                                            },{
                                            	fieldLabel: 'Type',
                                            	allowBlank: false,
                                            	xtype: 'combobox',
                                            	store: new Ext.data.ArrayStore({fields:['type'],data:[['Export'],['Domestic']]}),
                                            	mode : 'local',
                                            	value: 'Domestic',
                                            	listWidth : 40,
                                            	triggerAction : 'all',
                                            	displayField  : 'type',
                                            	valueField    : 'type',
                                            	editable      : false,
                                            	forceSelection: true,
                                            	name: 'TYPE'
                                            },{
                                                fieldLabel: 'Volume',
                                                allowBlank: false,
                                                name: 'VOLUME',
                                                xtype: 'numberfield',
                                                minValue: 0,
                                                value: 0
                                            }]
                                        }],
                                        buttons: [{
                                            text: 'Save',
                                            listeners: {
                                                click: function() {
                                                	var form = Ext.getCmp('add-new-coal-sales-country-form').getForm();
                                                    var store = loadStore('CoalSalesDistributions');

                                                    if (form.isValid()) {
                                                        form.submit({
                                                            url: sd.baseUrl + '/coalsales/request/create/id/' + data.PEER_ID,
                                                            success: function (d, e) {
                                                                var json = Ext.decode(e.response.responseText);
                                                                form.reset();
                                                                store.load({
                                                                    params: {
                                                                        id: data.PEER_ID
                                                                    }
                                                                });
                                                                Ext.Msg.alert('Success', 'Data has been saved');
                                                                Ext.getCmp('CSD_BC').close();
                                                            },
                                                            failure: function(d, e) {
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
                    }]
                }]
            }]
        });
    }
    c.up().setActiveTab(id);
    $('body').css('overflow','hidden');
} else {
    Ext.Msg.alert('Message', 'You did not select any Company');
}