var __c = Ext.getCmp('investors-detail-meeting-activities-grid-' + data.INVESTOR_ID);
var __selected = __c.getSelectionModel().getSelection();
if(__selected.length > 0) {
	var __id = 'investor-details-meetings-tabs-' + __selected[0].data.MEETING_ACTIVITIE_ID;
	if(!c.up().items.get(__id)) {
		var maxWidth = 221;
		c.up().add({
			title: 'Meeting: ' + __selected[0].data.MEETING_EVENT,
			closable: true,
			id: __id,
			xtype: 'panel',
            layout: 'border',
            autoScroll: true,
            border: false,
            items:[{
            	title: 'Meeting Contacts',
                border: false,
                region:'north',
                xtype: 'gridpanel',
                autoScroll:true,
                minHeight: 200,
                maxWidth: Ext.getBody().getViewSize().width - maxWidth,
                tbar:[{
                	xtype:'button',
                	text:'Add New Meeting Contacts',
                	iconCls:'icon-accept',
                	listeners:{
                		click:function(){
                			var _sCO = Ext.create("Ext.data.Store", {
                				model: "Contact",
                				storeId: "Contacts",
                				proxy:{extraParams:{id: data.INVESTOR_ID},"type":"ajax","api":{"read":"\/contacts\/request\/read","create":"\/contacts\/request\/create","update":"\/contacts\/request\/update","destroy":"\/contacts\/request\/destroy"},"actionMethods":{"create":"POST","destroy":"POST","read":"POST","update":"POST"},"reader":{"idProperty":"CONTACT_ID","type":"json","root":"data.items","totalProperty":"data.totalCount"},"writer":{"type":"json","root":"data","writeAllFields":true}},
                				sorter: {"property":"CONTACT_ID","direction":"ASC"}});
                			
                			_sCO.load({
                				params: {
                					id: data.INVESTOR_ID
                				}
                			});
                			
                			Ext.create('Ext.Window', {
                				title: 'Add Meeting Contact',
                				width: 300,
                				modal: true,
                				resizable: false,
                				draggable: false,
                				items: [{
                					xtype: 'form',
                					layout: 'form',
                					id: 'investors-detail-meeting-contacts-add-' + __selected[0].data.MEETING_ACTIVITIE_ID,
                					border: false,
                					bodyPadding: '5 5 5 5',
                					items: [{
                						xtype: 'combobox',
                						store: _sCO,
                						fieldLabel: 'Contact Name',
                						name: 'NAME',
                						displayField: 'NAME',
                						allowBlank: false
                					}]
                				}],
                				buttons: [{
                					text: 'Save',
                					iconCls: 'icon-accept',
                					listeners: {
                						click: function() {
                							var form = Ext.getCmp('investors-detail-meeting-contacts-add-' + __selected[0].data.MEETING_ACTIVITIE_ID);
                							if(form.getForm().isValid()) {
                								form.getForm().submit({
                									url: sd.baseUrl + '/meetingcontact/request/create',
                									params: {
                										INVESTOR_ID: data.INVESTOR_ID,
                										MEETING_ACTIVITIE_ID: __selected[0].data.MEETING_ACTIVITIE_ID
                									},
                									success: function(d, e) {
                										var json = Ext.decode(e.response.responseText);
                										Ext.Msg.alert('Message', 'Data successfully saved.');
                										form.up().close();
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
                			}).show();;
                		}
                	}
                },{
                	xtype:'button',
                	text:'Delete Meeting Contacts',
                	iconCls:'icon-stop',
                	listeners:{
                		click:function(){
                			
                		}
                	}
                }],
                columns:[{
                	text:'Meeting Event'
                },{
                	text:'Contacts'
                },{
                	text:'Created Date'
                }]
            },{
            	title:'ITM Participants',
            	border:false,
            	region:'north',
            	xtype:'gridpanel',
            	autoScroll:true,
            	minHeight:200,
            	maxWidth: Ext.getBody().getViewSize().width - maxWidth,
            	tbar:[{
            		xtype:'button',
            		text:'Add New ITM Participants',
            		iconCls:'icon-accept',
            		listeners:{
            			click:function(){

            			}
            		}
            	},{
            		xtype:'button',
            		text:'Delete ITM Participants',
            		iconCls:'icon-stop',
            		listeners:{
            			click:function(){

            			}
            		}
            	}],
            	columns:[{
            		text:'Name Participants'
            	},{
            		text:'Email'
            	}]
            },{
            	title:'Meeting Documents',
            	collapsible:true,
            	border:false,
            	region:'north',
            	xtype:'gridpanel',
            	autoScroll:true,
            	minHeight:200,
            	maxWidth: Ext.getBody().getViewSize().width - maxWidth,
            	tbar:[{
            		xtype:'button',
            		text:'Upload Documents',
            		iconCls:'icon-attachment',
            		listeners:{
            			click:function(){
                            Ext.create('Ext.Window', {
                                title: 'Add New Contacts',
                                id: 'MD',
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
                                        id: 'upload-new-document-form',
                                        border: false,
                                        bodyPadding: '5 5 5 5',
                                        defaultType: 'textfield',
                                        waitMsgTarget: true,
                                        items: [{
                                                    fieldLabel: 'Documentation Title',
                                                    name: 'DOCUMENTATION_TITLE'
                                                },{
                                                    xtype: 'filefield',
                                                        name: 'FILE_PATH',
                                                    fieldLabel: 'File upload'
                                                }]
                                        }]
                                }]
                            }).show();                                                
            			}
            		}
            	},{
            		xtype:'button',
            		text:'Delete Documents',
            		iconCls:'icon-stop',
            		listeners:{
            			click:function(){

            			}
            		}
            	},{
            		xtype:'button',
            		text:'Downloads Documents',
            		iconCls:'icon-download',
            		listeners:{
            			click:function(){

            			}
            		}
            	}],
            	columns:[{
            		text:'Documents Title'
            	},{
            		text:'Upload Date'
            	}]
            }]
		});
		
	}
	c.up().setActiveTab(__id);
} else {
	Ext.Msg.alert('Message', 'You did not select any Meetings.');
}