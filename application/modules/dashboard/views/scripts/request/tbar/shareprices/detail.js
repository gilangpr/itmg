var c = Ext.getCmp('<?php echo $this->container ?>');
var storeSP = loadStore('Shareprices');
var storeRR_curpage = storeSP.currentPage;
storeSP.load({
	params: {
		all: 1
	}
});
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
		id: 'detail-shareprices-main',
		width: 345,
		height: 152,
		modal: true,
		closable: true,
		resizable: false,
		draggable: false,
		items: [{
			xtype: 'form',
			layout: 'anchor',
			//renderTo: 'dr',
			border: false,
			id: 'detail-shareprices-form',
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
				emptyText: 'Select shareprices name'
			}]
		}],
		buttons: [{
			text: 'Search',
			listeners: {
				click: function() {
					var form = Ext.getCmp('detail-shareprices-form');
					if(form.getForm().isValid()) {
						form.getForm().submit({
							url: sd.baseUrl + '/shareprices/request/detail',
							success: function(d, e) {
								var _id = 'shareprices-detail-result' + Math.random();
								c.up().add({
									title: 'Details Result',
									closable: true,
									id: _id,
									xtype: 'chart',
						            animate: false,
						            store: storeSP,
						            insetPadding: 30,
						            axes: [{
						                type: 'Numeric',
						                minimum: 0,
						                position: 'left',
						                fields: ['data1'],
						                title: false,
						                grid: true,
						                label: {
						                    renderer: Ext.util.Format.numberRenderer('0,0'),
						                    font: '10px Arial'
						                }
						            }, {
						                type: 'Category',
						                position: 'bottom',
						                fields: ['name'],
						                title: false,
						                label: {
						                    font: '11px Arial',
//						                    renderer: function(name) {
//						                        return name.substr(0, 3) + ' 07';
//						                    }
						                }
						            }],
						            series: [{
						                type: 'line',
						                axis: 'left',
						                xField: 'name',
						                yField: 'data1',
						                listeners: {
						                  itemmouseup: function(item) {
						                      Ext.example.msg('Item Selected', item.value[1] + ' visits on ' + Ext.Date.monthNames[item.value[0]]);
						                  }  
						                },
						                tips: {
						                    trackMouse: true,
						                    width: 80,
						                    height: 40,
						                    renderer: function(storeItem, item) {
						                        this.setTitle(storeItem.get('SHAREPRICES_NAME'));
						                        this.update(storeItem.get('data1'));
						                    }
						                },
						                style: {
						                    fill: '#38B8BF',
						                    stroke: '#38B8BF',
						                    'stroke-width': 3
						                },
						                markerConfig: {
						                    type: 'circle',
						                    size: 4,
						                    radius: 4,
						                    'stroke-width': 0,
						                    fill: '#38B8BF',
						                    stroke: '#38B8BF'
						                }
						            }]					            
								});
								c.up().setActiveTab(_id);
								form.up().close();
							},
							failure: function(d, e) {
								
							}
						});
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
