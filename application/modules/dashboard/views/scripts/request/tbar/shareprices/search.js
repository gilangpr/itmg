var c = Ext.getCmp('<?php echo $this->container ?>');

Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit', 'Ext.window.MessageBox']);
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
		title: 'Detail Shareprices',
		xtype: 'panel',
		layout: 'border',
		id: 'search-shareprices-main',
		width: 345,
		height: 150,
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
			width: 350,
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
				labelWidth: 120,
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
				labelWidth: 120,
				allowBlank: false
			},{
				xtype: 'combobox',
				fieldLabel: 'Shareprices Name',
				name: 'SHAREPRICES_NAME',
				labelWidth: 120,
				width: 320,
				store: Ext.data.StoreManager.lookup('SharepricesNames'),
				displayField: 'SHAREPRICES_NAME',
				typeAhead: true,
				allowBlank: false,
				minChars: 2,
				multiSelect: true,
				emptyText: 'Select shareprices name'
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
	                            name: 'SHAREPRICES_NAME',
	                            type: 'string'
	                        },{
	                            name: 'DATE',
	                            type: 'string'
	                        },{
	                            name: 'VALUE',
	                            type: 'float'
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
	                                "idProperty": "SHAREPRICES_ID",
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
		                            'SHAREPRICES_NAME':  (typeof(form.getForm()._fields.items[2].value) == 'undefined') ? '' : form.getForm()._fields.items[2].value,
		                            'START_DATE': form.getForm()._fields.items[0].value,
		                            'END_DATE': form.getForm()._fields.items[1].value
		                     }
	                   
	                    });
						c.up().add({
	                        title: 'Search Result',
	                        closable: true,
	                        id: _id,
	                        store: _xxstore,
	                        xtype: 'gridpanel',
	                        columns: [{
	                            text: 'Name',
	                            dataIndex: 'SHAREPRICES_NAME'
	                        },{
	                            text: 'Date',
	                            dataIndex: 'DATE'
	                        },{
	                            text: 'Value',
	                            dataIndex: 'VALUE'
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