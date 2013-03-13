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
var csyFields = [];

if(selected.length > 0) {
    var id = 'peers-detail' + selected[0].id;
    if(!c.up().items.get(id)){
        var data = selected[0].data;
        var storeRR = loadStore('PeerResourceReserves');
        storeRR.load({
            params: {
                id: data.PEER_ID
            }
        });
        Ext.define('FinancialPerformance', {
            extend: 'Ext.data.Model',
            fields: fpFields
        });
        var storeFP = Ext.create('Ext.data.Store',{
            storeId: 'FinancialPerformances',
            model: 'FinancialPerformance',
            proxy: {
                type: 'ajax',
                api: {
                    read: '/financialperform/request/read',
                    create: '/financialperform/request/create',
                    update: '/financialperform/request/update',
                    destroy: '/financialperform/request/destroy'
                },
                actionMethods: {
                    create: 'POST',
                    destroy: 'POST',
                    read: 'POST',
                    update: 'POST'
                },
                reader: {
                    idProperty: 'FINANCIAL_PERFORM_ID',
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
                property: 'FINANCIAL_PERFORM_ID',
                direction: 'ASC'
            }
        });
        storeFP.load({
            params: {
                id: data.PEER_ID
            }
        });
        Ext.define('CoalSalesDistribution', {
            extend: 'Ext.data.Model',
            fields: csdFields
        });
        var storeCSD = Ext.create('Ext.data.Store',{
            storeId: 'CoalSalesDistributions',
            model: 'CoalSalesDistribution',
            proxy: {
                type: 'ajax',
                api: {
                    read: '/coalsales/request/read',
                    create: '/coalsales/request/create',
                    update: '/coalsales/request/update',
                    destroy: '/coalsales/request/destroy'
                },
                actionMethods: {
                    create: 'POST',
                    destroy: 'POST',
                    read: 'POST',
                    update: 'POST'
                },
                reader: {
                    idProperty: 'COAL_SALES_DISTRIBUTION_ID',
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
                property: 'COAL_SALES_DISTRIBUTION_ID',
                direction: 'ASC'
            }
        });
        storeCSD.load({
            params: {
                id: data.PEER_ID
            }
        });
        Ext.define('StrippingRatio', {
            extend: 'Ext.data.Model',
            fields: srFields
        });
        var storeSR = Ext.create('Ext.data.Store',{
            storeId: 'StrippingRatios',
            model: 'StrippingRatio',
            proxy: {
                type: 'ajax',
                api: {
                    read: '/strippingratio/request/read',
                    create: '/strippingratio/request/create',
                    update: '/strippingratio/request/update',
                    destroy: '/strippingratio/request/destroy'
                },
                actionMethods: {
                    create: 'POST',
                    destroy: 'POST',
                    read: 'POST',
                    update: 'POST'
                },
                reader: {
                    idProperty: 'STRIPPING_RATIO_ID',
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
                property: 'STRIPPING_RATIO_ID',
                direction: 'ASC'
            }
        });
        storeSR.load({
            params: {
                id: data.PEER_ID
            }
        });
        Ext.define('StrippingRatioYear', {
            extend: 'Ext.data.Model',
            fields: sryFields
        });
        var storeSRY = Ext.create('Ext.data.Store',{
            storeId: 'StrippingRatioYears',
            model: 'StrippingRatioYear',
            proxy: {
                type: 'ajax',
                api: {
                    read: '/strippingratioyear/request/read',
                    create: '/strippingratioyear/request/create',
                    update: '/strippingratioyear/request/update',
                    destroy: '/strippingratioyear/request/destroy'
                },
                actionMethods: {
                    create: 'POST',
                    destroy: 'POST',
                    read: 'POST',
                    update: 'POST'
                },
                reader: {
                    idProperty: 'STRIPPING_RATIO_YEAR_ID',
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
                property: 'STRIPPING_RATIO_YEAR_ID',
                direction: 'ASC'
            }
        });
        storeSRY.load({
            params: {
                id: data.PEER_ID
            }
        });
         Ext.define('SellingPrice', {
            extend: 'Ext.data.Model',
            fields: aspFields
        });
        var storeASP = Ext.create('Ext.data.Store',{
            storeId: 'SellingPrices',
            model: 'SellingPrice',
            proxy: {
                type: 'ajax',
                api: {
                    read: '/sellingprice/request/read',
                    create: '/sellingprice/request/create',
                    update: '/sellingprice/request/update',
                    destroy: '/sellingprice/request/destroy'
                },
                actionMethods: {
                    create: 'POST',
                    destroy: 'POST',
                    read: 'POST',
                    update: 'POST'
                },
                reader: {
                    idProperty: 'SELLING_PRICE_ID',
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
                property: 'SELLING_PRICE_ID',
                direction: 'ASC'
            }
        });
        storeASP.load({
            params: {
                id: data.PEER_ID
            }
        });
        Ext.define('CompositionCompany', {
            extend: 'Ext.data.Model',
            fields: csyFields
        });
        var storeCSY = Ext.create('Ext.data.Store',{
            storeId: 'CompositionCompanys',
            model: 'CompositionCompany',
            proxy: {
                type: 'ajax',
                api: {
                    read: '/compositioncompany/request/read',
                    create: '/compositioncompany/request/create',
                    update: '/compositioncompany/request/update',
                    destroy: '/compositioncompany/request/destroy'
                },
                actionMethods: {
                    create: 'POST',
                    destroy: 'POST',
                    read: 'POST',
                    update: 'POST'
                },
                reader: {
                    idProperty: 'COMPOSITION_COMPANY_ID',
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
                property: 'COMPOSITION_COMPANY_ID',
                direction: 'ASC'
            }
        });
        storeCSY.load({
            params: {
                id: data.PEER_ID
            }
        });
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
                    bodyPadding: '5 5 5 5',
                    html: '<p style="text-align: justify">' + data.BRIEF_HISTORY.replace('\n','<br/>') + '</p>',
                    collapsible: true,
                    border: false
                },{
                    title: 'Business Activity',
                    bodyPadding: '5 5 5 5',
                    html: '<p style="text-align: justify">' + data.BUSINESS_ACTIVITY.replace('\n','<br/>') + '</p>',
                    collapsible: true,
                    border: false
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
                        minHeight: 100,
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
                                                        var store = loadStore('StrippingRatioYear');
                                                        
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
                        minHeight: 100,
                        store: storeSR,
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
                                                        var store = loadStore('StrippingRatio');
                                                        
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
                        }]
                    }]
                },{
                    title: 'Average Selling Price',
                    border: false,
                    collapsible: true,
                    items: [{
                        xtype: 'gridpanel',
                        border: false,
                        minHeight: 100,
                        store: storeASP,
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
                                                    // fieldLabel: 'Type',
                                                    // xtype: 'fieldcontainer',
                                                    // defaultType: 'radiofield',
                                                    // defaults: {
                                                    //     flex: 1
                                                    // },
                                                    // layout: 'hbox',
                                                    // items: [{
                                                    //     boxLabel: 'Domestic',
                                                    //     name: 'TYPE',
                                                    //     inputValue: 'domestic',
                                                    //     id: 'radio1'
                                                    // },{
                                                    //     boxLabel: 'Export',
                                                    //     name: 'TYPE',
                                                    //     inputValue: 'export',
                                                    //     id: 'radio2'
                                                    // }]
                                                    fieldLabel: 'Type',
                                                    allowBlank: false,
                                                    xtype: 'combobox',
                                                    name: 'TYPE',
                                                    store: new Ext.data.ArrayStore({fields:['type'],data:[['Export'],['Domestic']]}),
                                                    mode : 'local',
                                                    value: '',
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
                        }]
                    }]
                },{
                    title: 'Financial Performance',
                    collapsible: true,
                    border: false,
                    xtype: 'gridpanel',
                    minHeight: 200,
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
                                    width: 400,
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
                    border: false,
                    collapsible: true,
                    items: [{
                        xtype: 'gridpanel',
                        border: false,
                        minHeight: 100,
                        columns: [{
                            flex: 1,
                            text: 'Tanjung Enim System *)'
                        },{
                            text: 'FY10',
                            align: 'center'
                        },{
                            text: '9M10',
                            align: 'center'
                        },{
                            text: '9M11',
                            align: 'center'
                        }]
                    }]
                },{ //Reserves & Resources
                    title: 'Reserves & Resources',
                    collapsible: true,
                    border: false,
                    xtype: 'gridpanel',
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
                        dataIndex: 'MINE'
                    },{
                        flex: 1,
                        text: 'Resources <br /> (Mil. Tons)',
                        align: 'center',
                        dataIndex: 'RESOURCES'
                    },{
                        flex: 1,
                        text: 'Reserves <br /> (Mil. Tons)',
                        align: 'center',
                        dataIndex: 'RESERVES'
                    },{
                        flex: 1,
                        text: 'Area (Ha)',
                        align: 'center',
                        dataIndex: 'AREA'
                    },{
                        flex: 1,
                        text: 'CV (Kcal)',
                        align: 'center',
                        dataIndex: 'CV'
                    },{
                        flex: 1,
                        text: 'Location',
                        align: 'center',
                        dataIndex: 'LOCATION'
                    },{
                        flex: 1,
                        text: 'License',
                        align: 'center',
                        dataIndex: 'LICENSE'
                    }]
                },{
                    title: 'Composition of the Company\'s Shareholders at the End of the Year 2009 & 2010',
                    collapsible: true,
                    border: false,
                    xtype: 'gridpanel',
                    minHeight: 100,
                    columns: [],
                    //columns: csyColumns,
                    //store: storeCSY,
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
                                            frame: true,
                                            fieldDefaults: {
                                                msgTarget: 'side',
                                                labelWidth: 75
                                            },
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            waitMsgTarget: true,
                                            items: [{
                                                fieldLabel: 'Title',
                                                allowBlank: false,
                                                name: 'TITLE'
                                            },{
                                                fieldLabel: 'Ownership',
                                                allowBlank: false,
                                                name: 'TYPE',
                                                xtype: 'combobox',
                                                store: new Ext.data.ArrayStore({fields:['type'], data:[['State'],['Public']]}),
                                                mode: 'local',
                                                value: 'State',
                                                listWidth: 40,
                                                triggerAction: 'all',
                                                displayField: 'type',
                                                valueField: 'type',
                                                editable: false,
                                                forceSelection: true
                                            },{
                                                fieldLabel: 'Value',
                                                allowBlank: false,
                                                name: 'VALUE',
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
                                                    var store = loadStore('CompositionCompany');

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
                    minHeight: 200,
                    columns: csdColumns,
                    store: storeCSD,
                    tbar:[{
                        xtype: 'button',
                        text: 'Add New Coal Sales Distribution',
                        iconCls: 'icon-accept',
                        listeners: {
                            click: function() {
                                Ext.create('Ext.Window', {
                                    title: 'Add New Coal Sales Distribution',
                                    id: 'CSD',
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
                                            id: 'add-coal-sales-form',
                                            border: false,
                                            bodyPadding: '5 5 5 5',
                                            defaultType: 'textfield',
                                            waitMsgTarget: true,
                                            items: [{
                                                fieldLabel: 'Title',
                                                allowBlank: false,
                                                name: 'TITLE'
                                            },{
                                                fieldLabel: 'Name',
                                                allowBlank: false,
                                                xtype: 'combobox',
                                                store: new Ext.data.ArrayStore({fields:['type'],data:[['Export'],['Domestic']]}),
                                                mode : 'local',
                                                value: '',
                                                listWidth : 40,
                                                triggerAction : 'all',
                                                displayField  : 'type',
                                                valueField    : 'type',
                                                editable      : false,
                                                forceSelection: true
                                            },{
                                                fieldLabel: 'Volume',
                                                allowBlank: false,
                                                xtype: 'numberfield',
                                                minValue: 0,
                                                value: 0,
                                                name: 'VOLUME'
                                            }]
                                        }],
                                        buttons: [{
                                            text: 'Save',
                                            listeners: {
                                                click: function() {
                                                    
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
                    title: 'Coal Sales Distribution By Country',
                    collapsible: true,
                    border: false,
                    xtype: 'gridpanel',
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
                                                fieldLabel: 'Country',
                                                allowBlank: false,
                                                name: 'COUNTRY'
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
                        text: 'Country',
                        align: 'center',
                        dataIndex: 'COUNTRY'
                    },{
                        flex: 1,
                        text: 'Percentage',
                        align: 'center',
                        dataIndex: 'PERCENTAGE'
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
