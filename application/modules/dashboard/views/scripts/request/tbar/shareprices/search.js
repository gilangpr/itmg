var c = Ext.getCmp('<?php echo $this->container ?>');
var storeSP = loadStore('SharepricesNames');
Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit', 'Ext.window.MessageBox',  'Ext.form.field.Number']);
Ext.onReady(function() {
	
	// Add the additional 'advanced' VTypes
	Ext.apply(Ext.form.field.VTypes, {
		daterange: function(val, field) {
			var date = field.parseDate(val);

            if (!date) {
                return false;
            }
            if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                var start = field.up('form').down('#' + field.startDateField);
                start.setMaxValue(date);
                start.validate();
                this.dateRangeMax = date;
            }
            else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                var end = field.up('form').down('#' + field.endDateField);
                end.setMinValue(date);
                end.validate();
                this.dateRangeMin = date;
            }
            /*
             * Always return true since we're only using this vtype to set the
             * min/max allowed values (these are tested for after the vtype test)
             */
            return true;
		},
		daterangeText: 'Start date must be less than end date',
	});
	
	Ext.create('Ext.Window', {
		title: 'Search Shareprices',
		xtype: 'panel',
		layout: 'border',
		id: 'search-shareprices-main',
		width: 395,
		height: 174,
		modal: true,
		closable: true,
		resizable: false,
		draggable: false,
		items: [{
			xtype: 'form',
			layout: 'anchor',
			border: false,
			id: 'search-shareprices-form',
			bodyPadding: '5 5 5 5',
			defaultType: 'textfield',
			width: 400,
			items: [{
				fieldLabel:'Start Date',
				xtype: 'datefield',
				id: 'start-date',
				format: 'Y-m-d',
				name: 'startdt',
		        itemId: 'startdt',
		        vtype: 'daterange',
		        endDateField: 'enddt',
		        emptyText: 'End Date',
				labelWidth: 140,
				width: 320,
				allowBlank: false
			},{
				fieldLabel:'End Date',
				xtype: 'datefield',
				id: 'end-date',
				format: 'Y-m-d',
				name: 'enddt',
	            itemId: 'enddt',
	            vtype: 'daterange',
	            startDateField: 'startdt',
	            emptyText: 'Start Date',
				labelWidth: 140,
				width: 320,
				allowBlank: false
			},{
				xtype: 'combobox',
				id: 'combo',
				fieldLabel: 'Shareprices Name',
				name: 'SHAREPRICES_NAME',
				labelWidth: 140,
				width: 370,
				store: storeSP,
				displayField: 'SHAREPRICES_NAME',
				typeAhead: true,
				allowBlank: false,
				minChars: 2,
				multiSelect: true,
				emptyText: 'Select shareprices name'
			},{
				xtype: 'textfield',
				fieldLabel: 'Shareprices Name',
				labelWidth: 140,
				store: storeSP,
				displayField: 'SHAREPRICES_NAME',
			}]
		}],
		buttons: [{
			text: 'Search',
			listeners: {
				click: function() {
					var form = Ext.getCmp('search-shareprices-form');
					var _id = 'shareprices-search-result-' + Math.random();
					if(form.getForm().isValid()) {
						Ext.define('Shareprice__', {
	                        extend: 'Ext.data.Model',
	                        fields: [{
	                        	name: "DATE",
                                type: "string"
                            },{
                                name: "JKSE",
                                type: "float"
                            },{
                                name: "ITMG",
                                type: "float"
                            },{
                                name: "PTBA",
                                type: "float"
                            },{
                                name: "BUMI",
                                type: "float"
                            },{
                                name: "ADRO",
                                type: "float"
                            },{
                                name: "BYAN",
                                type: "float"
                            },{
                                name: "BRAU",
                                type: "float"
                            },{
                                name: "HRUM",
                                type: "float"
                            },{
                                name: "BORN",
                                type: "float"
                            },{
                                name: "KKGI",
                                type: "float"
                            },{
                                name: "ARII",
                                type: "float"
                            },{
                                name: "GEMS",
                                type: "float"
                            },{
                                name: "TOBA",
                                type: "float"
                            },{
                                name: "BSSR",
                                type: "float"
                            }]
	                    });
						var _xxstore = Ext.create("Ext.data.Store", {
							model: "Shareprice__",
	                        storeId: "Shareprices__",
	                        proxy: {
	                            "type": "ajax",
	                            "api": {
	                                "read": sd.baseUrl + '/shareprices/request/search'
	                            },
	                            "actionMethods": {
	                                "read": "POST"
	                            },
	                            "reader": {
                                    "idProperty": "DATE",
                                    "type": "json",
                                    "root": "data.items",
                                    "totalProperty": "data.totalCount"
                                }
	                        },
	                        sorter: {
	                            "property": "SHAREPRICES_ID",
	                            "direction": "ASC"
	                        }
						});
						_xxstore.load({
							 params: {
		                            'SHAREPRICES_NAME': form.getForm()._fields.items[3].value,
				                    'START_DATE': form.getForm()._fields.items[0].value,
		                            'END_DATE': form.getForm()._fields.items[1].value
		                     }
	                   
	                    });
						c.up().add({
	                        title: 'Search Result : ' + form.getForm()._fields.items[3].value, 
	                        closable: true,
	                        id: _id,
	                        store: _xxstore,
	                        xtype: 'gridpanel',
	                        "columns": [{
                                "text": "Date",
                                "dataIndex": "DATE",
                                "align": "center",
                                "width": 125,
                                "flex": 0,
                                "dataType": "string",
                                "visible": false
                            },{
                                "text": "JKSE",
                                "dataIndex": "JKSE",
                                "align": "center",
                                "width": 75,
                                "flex": 1,
                                "dataType": "float",
                                "visible": false,
                                renderer: Ext.util.Format.numberRenderer('0.,00/i')
                            },{
                                "text": "ITMG",
                                "dataIndex": "ITMG",
                                "align": "center",
                                "width": 75,
                                "flex": 1,
                                "dataType": "float",
                                "visible": false,
                                "renderer": Ext.util.Format.numberRenderer('0.,/i')
                            },{
                                "text": "PTBA",
                                "dataIndex": "PTBA",
                                "align": "center",
                                "width": 75,
                                "flex": 1,
                                "dataType": "float",
                                "visible": false,
                                renderer: Ext.util.Format.numberRenderer('0.,/i')
                            },{
                                "text": "BUMI",
                                "dataIndex": "BUMI",
                                "align": "center",
                                "width": 75,
                                "flex": 1,
                                "dataType": "float",
                                "visible": false,
                                renderer: Ext.util.Format.numberRenderer('0.,/i')
                            },{
                                "text": "ADRO",
                                "dataIndex": "ADRO",
                                "align": "center",
                                "width": 75,
                                "flex": 1,
                                "dataType": "float",
                                "visible": false,
                                renderer: Ext.util.Format.numberRenderer('0.,/i')
                            },{
                                "text": "BYAN",
                                "dataIndex": "BYAN",
                                "align": "center",
                                "width": 75,
                                "flex": 1,
                                "dataType": "float",
                                "visible": false,
                                renderer: Ext.util.Format.numberRenderer('0.,/i')
                            },{
                                "text": "BRAU",
                                "dataIndex": "BRAU",
                                "align": "center",
                                "width": 75,
                                "flex": 1,
                                "dataType": "float",
                                "visible": false,
                                renderer: Ext.util.Format.numberRenderer('0.,/i')
                            },{
                                "text": "HRUM",
                                "dataIndex": "HRUM",
                                "align": "center",
                                "width": 75,
                                "flex": 1,
                                "dataType": "float",
                                "visible": false,
                                renderer: Ext.util.Format.numberRenderer('0.,/i')
                            },{
                                "text": "BORN",
                                "dataIndex": "BORN",
                                "align": "center",
                                "width": 75,
                                "flex": 1,
                                "dataType": "float",
                                "visible": false,
                                renderer: Ext.util.Format.numberRenderer('0.,/i')
                            },{
                                "text": "KKGI",
                                "dataIndex": "KKGI",
                                "align": "center",
                                "width": 75,
                                "flex": 1,
                                "dataType": "float",
                                "visible": false,
                                renderer: Ext.util.Format.numberRenderer('0.,/i')
                            },{
                                "text": "ARII",
                                "dataIndex": "ARII",
                                "align": "center",
                                "width": 75,
                                "flex": 1,
                                "dataType": "float",
                                "visible": false,
                                renderer: Ext.util.Format.numberRenderer('0.,/i')
                            },{
                                "text": "GEMS",
                                "dataIndex": "GEMS",
                                "align": "center",
                                "width": 75,
                                "flex": 1,
                                "dataType": "float",
                                "visible": false,
                                renderer: Ext.util.Format.numberRenderer('0.,/i')
                            },{
                                "text": "TOBA",
                                "dataIndex": "TOBA",
                                "align": "center",
                                "width": 75,
                                "flex": 1,
                                "dataType": "float",
                                "visible": false,
                                renderer: Ext.util.Format.numberRenderer('0.,/i')
                            },{
                                "text": "BSSR",
                                "dataIndex": "BSSR",
                                "align": "center",
                                "width": 75,
                                "flex": 1,
                                "dataType": "float",
                                "visible": false,
                                renderer: Ext.util.Format.numberRenderer('0.,/i')
                            }]
	                    });
	                    c.up().setActiveTab(_id);
	                    form.up().close();

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
	
});
