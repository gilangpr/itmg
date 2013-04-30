var storeRR = loadStore('ResearchReports');
var storeRRC = loadStore('ResearchReportCategorys');
var storeNC = loadStore('Companys');
var c = Ext.getCmp('<?php echo $this->container ?>');
var storeRR_curpage = storeRR.currentPage;
storeRR.load({
	params: {
		all: 1
	}
});

storeRRC.load({
	params: {
		all: 1
	}
});
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
	daterangeText: 'Start Date must be less than End Date',
});
storeRC.load({
	params: {
		all : 1
	}
});
Ext.create('Ext.Window', {
	title: 'Search News',
	width: 500,
	id: 'news-search-window',
	modal: true,
	draggable: false,
	resizable: false,
	items: [{
		xtype: 'form',
		layout: 'form',
		id: 'news-search-form',
		bodyPadding: '5 5 5 5',
		waitMsgTarget: true,
		border: false,
		items: [{
			xtype: 'combobox',
			fieldLabel: 'Title',
			name: 'TITLE',
			id: 'research-title',
			store: storeRR,
			displayField: 'TITLE',
			typeAhead: true,
			allowBlank: true,
			minChars: 3,
			emptyText: 'Select News'
		},{
			xtype: 'combobox',
			fieldLabel: 'Category',
			name: 'RESEARCH_REPORT_CATEGORY',
			id: 'research-category',
			store: storeRRC,
			displayField: 'RESEARCH_REPORT_CATEGORY',
			typeAhead: true,
			allowBlank: true,
			minChars: 3,
			emptyText: 'Select Category'
		},{
			xtype: 'combobox',
			fieldLabel: 'Company',
			name: 'COMPANY_NAME',
			id: 'research-company',
			store: storeNC,
			displayField: 'COMPANY_NAME',
			typeAhead: true,
			editable: true,
			emptyText: 'Select Company',
			minChars: 3,
			allowBlank: true
		},{
			xtype: 'combobox',
			name: 'ANALYST',
			id: 'research-analyst',
			store: storeRR,
			displayField: 'ANALYST',
			typeAhead: true,
			editable: true,
			emptyText: 'Select Analyst',
			fieldLabel: 'Analyst',
			minChars: 3,
			allowBlank: true
		},{
			fieldLabel:'Start Date',
			xtype: 'datefield',
			id: 'start-date',
			format: 'Y-m-d',
			name: 'startdt',
	        itemId: 'startdt',
	        vtype: 'daterange',
	        endDateField: 'enddt',
	        emptyText: 'Start Date',
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
            emptyText: 'End Date',
			labelWidth: 140,
			width: 320,
			minChars: 2,
			emptyText: 'All Category'
		},{
			xtype: 'combobox',
			name: 'COMPANY',
			store: storeRC,
			displayField: 'COMPANY',
			typeAhead: false,
			editable: false,
			emptyText: 'Select Company',
			fieldLabel: 'Company',
			allowBlank: false
		}]
	}],
	buttons: [{
		text: 'Search',
		listeners: {
			click: function() {
				var form = Ext.getCmp('research-search-form').getForm();
				var rTitle = Ext.getCmp('research-title').getValue();
				var rCategory = Ext.getCmp('research-category').getValue();
				var rCompany = Ext.getCmp('research-company').getValue();
				var rAnalyst = Ext.getCmp('research-analyst').getValue();
				var _id = 'research-search-result-' + Math.random();
				
				if(form.isValid()) {
					if(typeof(rTitle) === 'undefined') {
						rTitle = '';
					}
					if(typeof(rCategory) === 'undefined') {
						rCategory = '';
					}
					if(typeof(rCompany) === 'undefined') {
						rCompany = '';
					}
					if(typeof(rAnalyst) === 'undefined') {
						rAnalyst = '';
					}
					storeRR.load({
						params: {
							search: 1,
							title: rTitle,
							category: rCategory,
							company: rCompany,
							analyst: rAnalyst
						},
						callback: function(d, i, e) {
							Ext.getCmp('research-search-window').close();
							if(d.length == 0) {
								Ext.Msg.alert('Message', 'No data found.');
							} else {
								Ext.Msg.alert('Message', 'Result: ' + d.length + ' data(s) found.');
								c.up().add({
									title: 'Research Report Search Result',
									closable: true,
									id: _id,
									autoScroll: true,
									xtype: 'gridpanel',
									layout: 'border',
									store: storeRR,
									"columns": [{
	                                    "text": "Title",
	                                    "dataIndex": "TITLE",
	                                    "align": "left",
	                                    "width": 100,
	                                    "flex": 1,
	                                    "dataType": "string",
	                                    "visible": false,
	                                    "editor": {
	                                        "allowBlank": false
	                                    }
	                                }, {
	                                    "text": "Category",
	                                    "dataIndex": "RESEARCH_REPORT_CATEGORY",
	                                    "align": "center",
	                                    "width": 130,
	                                    "flex": 0,
	                                    "dataType": "combobox",
	                                    "visible": false
	                                }, {
	                                    "text": "Company",
	                                    "dataIndex": "COMPANY_NAME",
	                                    "align": "center",
	                                    "width": 130,
	                                    "flex": 0,
	                                    "dataType": "combobox",
	                                    "visible": false
	                                }, {
	                                    "text": "Analyst",
	                                    "dataIndex": "ANALYST",
	                                    "align": "center",
	                                    "width": 130,
	                                    "flex": 0,
	                                    "dataType": "string",
	                                    "visible": false,
	                                    "editor": {
	                                        "allowBlank": false
	                                    }
	                                }, {
	                                    "text": "File Size ( Byte )",
	                                    "dataIndex": "FILE_SIZE",
	                                    "align": "center",
	                                    "width": 130,
	                                    "flex": 0,
	                                    "dataType": "int",
	                                    "visible": false
	                                }, {
	                                    "text": "Downloaded",
	                                    "dataIndex": "TOTAL_HIT",
	                                    "align": "center",
	                                    "width": 100,
	                                    "flex": 0,
	                                    "dataType": "int",
	                                    "visible": false
	                                }, {
	                                    "text": "File Type",
	                                    "dataIndex": "FILE_TYPE",
	                                    "align": "center",
	                                    "width": 130,
	                                    "flex": 0,
	                                    "dataType": "string",
	                                    "visible": false
	                                }, {
	                                    "text": "Created Date",
	                                    "dataIndex": "CREATED_DATE",
	                                    "align": "center",
	                                    "width": 150,
	                                    "flex": 0,
	                                    "dataType": "string",
	                                    "visible": false
	                                }, {
	                                    "text": "Last Modified",
	                                    "dataIndex": "MODIFIED_DATE",
	                                    "align": "center",
	                                    "width": 130,
	                                    "flex": 0,
	                                    "dataType": "string",
	                                    "visible": false
	                                }
	                            ],
	                            bbar: new Ext.PagingToolbar({
							        store: storeRR,
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
							}
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
				storeRR.loadPage(storeRR_curpage);
			}
		}
	}]
}).show();
