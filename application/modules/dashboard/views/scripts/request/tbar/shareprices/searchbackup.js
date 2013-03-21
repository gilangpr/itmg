var c = Ext.getCmp('<?php echo $this->container ?>');
var storeSH = loadStore('Shareholdings');
var storeRR_curpage = storeSH.currentPage;
storeSH.load({
    params: {
        all: 1
    }
});
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
        }
    });
Ext.create('Ext.Window', {
    title: 'Search Investor',
    xtype: 'panel',
    layout: 'border',
    id: 'search-investor-main',
    modal: true,
    closable: true,
    width: 310,
    height: 163,
    resizable: false,
    draggable: false,
    items: [{
        xtype: 'form',
        layout: 'anchor',
        border: false,
        id: 'search-shareholdings-form',
        bodyPadding: '5 5 5 5',
        defaultType: 'textfield',
        items: [{
            fieldLabel: 'Investor Name',
            xtype: 'combobox',
            emptyText: 'All',
            id: 'investor-name',
            name: 'INVESTOR_NAME',
            store: storeSH,
            displayField: 'INVESTOR_NAME',
            allowBlank: true
        },{
            fieldLabel:'Start Date',
            xtype: 'datefield',
            name: 'START_DATE',
            id: 'start-date',
            vtype: 'daterange',
            endDateField: 'end-date', // id of the end date field
            format: 'Y-m-d',
            allowBlank: false
        },{
            fieldLabel:'End Date',
            xtype: 'datefield',
            name: 'END_DATE',
            id: 'end-date',
            vtype: 'daterange',
            startDateField: 'start-date', // id of the start date field
            format: 'Y-m-d',
            allowBlank: false
        }]
    }],
    buttons: [{
        text: 'Search',
        listeners: {
            click: function() {
                var form = Ext.getCmp('search-shareholdings-form');
                var _id = 'shareholdings-search-result-' + Math.random();
                if(form.getForm().isValid()) {
                    Ext.define('Shareholding__', {
                        extend: 'Ext.data.Model',
                        fields: [{
                            name: 'AMOUNT',
                            type: 'string'
                        },{
                            name: 'DATE',
                            type: 'string'
                        }]
                    });
                    var _xxstore = Ext.create("Ext.data.Store", {
                        model: "Shareholding__",
                        storeId: "Shareholdings__",
                        proxy: {
                            "type": "ajax",
                            "api": {
                                "read": sd.baseUrl + '/shareholdings/request/search'
                            },
                            "actionMethods": {
                                "read": "POST"
                            },
                            "reader": {
                                "idProperty": "SHAREHOLDING_ID",
                                "type": "json",
                                "root": "data.items",
                                "totalProperty": "data.totalCount"
                            }
                        },
                        sorter: {
                            "property": "SHAREHOLDING_ID",
                            "direction": "ASC"
                        }
                    });
                    //console.log(form.getForm()._fields.items);
                    _xxstore.load({
                        params: {
                            'INVESTOR_NAME': (typeof(form.getForm()._fields.items[0].value) == 'undefined') ? '' : form.getForm()._fields.items[0].value,
                            'START_DATE': form.getForm()._fields.items[1].value,
                            'END_DATE': form.getForm()._fields.items[2].value
                        }
                   
                    });
                    c.up().add({
                        title: 'Search result',
                        closable: true,
                        id: _id,
                        store: _xxstore,
                        xtype: 'gridpanel',
                        columns: [{
                            text: 'AMOUNT',
                            dataIndex: 'AMOUNT'
                        },{
                            text: 'DATE',
                            dataIndex: 'DATE'
                        }]
                    });
                    c.up().setActiveTab(_id);
                    form.up().close();
//                    form.getForm().submit({
//                        url: sd.baseUrl + '/shareholdings/request/search',
//                        success: function(d, e) {
//                            var _id = 'shareholdings-search-result' + Math.random();
//                            var json = Ext.decode(data.responseText);
//                           
//                        },
//                        failure: function(d, e) {
//                            var json = Ext.decode(data.responseText); // Decode responsetext | Json to Javasript Object
//                            closeLoadingWindow();
//                        }
//                    });
                }
            }
        }
    }]
}).show();