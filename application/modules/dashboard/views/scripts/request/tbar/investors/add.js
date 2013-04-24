var c = Ext.getCmp('<?php echo $this->container ?>');
var id = 'investors-add-investor-form';
/*
*Star
*
if (Ext.ux.form == undefined) {
    Ext.ns('Ext.ux.form');
}

Ext.ux.form.HtmlEditorCounterPlugin = function (config) {
    Ext.apply(this, config);
};

Ext.extend (Ext.ux.form.HtmlEditorCounterPlugin, Ext.util.Observable, {
    prefix: '',
    itemTypeSingular: ' character',
    itemTypePlural: ' characters',
    itemTypeNone: ' characters',
    onRender: function (o) {
        this.counter = Ext.DomHelper.append(document.body,{
          tag : 'div',
          style: 'padding-top:2px'
        })
        this.editor.wrap.up('div.x-form-element').appendChild(this.counter);
        this.set_counter ((this.editor.initialConfig.value || '').length);
    },
    init:   function (editor) {
        this.editor = editor;
        this.editor.on ('render', this.onRender, this);
        this.editor.on ('sync', function (ct, html) { this.set_counter (html.length); }, this);
    },
    set_counter: function (s) {
        this.counter.innerHTML = this.prefix + s + ((s) ? ((s > 1) ? this.itemTypePlural: this.itemTypeSingular) : this.itemTypeNone);
    }
});
/*
*End
*/
//var myplugin = new Ext.ux.form.HtmlEditorCounterPlugin ({prefix: 'Current size is '});

if(!c.up().items.get(id)) {
	
	Ext.define('InvestorType', {//model
		extend: 'Ext.data.Model',
		fields: [{
			name: 'INVESTOR_TYPE_ID',
			type: 'string'
		}]
	});
	
	c.up().add({
		title: 'Add New Investor',
		id: id,
		closable: true,
		autoScroll: true,
		tbar: [{
			xtype: 'button',
			text: 'Save',
			iconCls: 'icon-accept',
			listeners: {
				click: function() {
					var form = Ext.getCmp('add-new-investor-form').getForm();
					if(form.isValid()) {
						form.submit({
							url: sd.baseUrl + '/investors/request/create',
							success: function(data) {
								var json = Ext.decode(data.responseText);
								form.reset();
								store.loadPage(1); // Refresh grid data
								Ext.Msg.alert('Success', 'Data has been saved');
							},
							failure: function(data) {
								var json = Ext.decode(data.responseText);
								Ext.Msg.alert('Error', json.error_message);
							}
						})
					}
				}
			}
		},{
			xtype: 'button',
			text: 'Cancel',
			iconCls: 'icon-stop',
			listeners: {
				click: function() {
					if(confirm('Are you sure want to cancel ?')) {
						this.up().up().close();
					}
				}
			}
		}],
		items: [{
			xtype: 'panel',
			border: false,
			items: [{
				xtype: 'form',
				layout: 'form',
				border: false,
				bodyPadding: '5 5 5 5',
				id: 'add-new-investor-form',
				defaultType: 'textfield',
				items: [{
					fieldLabel: 'Company Name',
					name: 'COMPANY_NAME',
					allowBlank: false
				},{
					fieldLabel: 'Equity Asset',
					name: 'EQUITY_ASSETS',
					xtype: 'numberfield',
					minValue: 0,
					allowBlank: false
				},{
					xtype: 'combobox',
					fieldLabel: 'Investor Type',
					name: 'INVESTOR_TYPE_ID',
					labelWidth: 130,
					store: Ext.data.StoreManager.lookup('InvestorTypes'),
					displayField: 'INVESTOR_TYPE',
					valueField:'INVESTOR_TYPE_ID',
					typeAhead: true,
					allowBlank: false,
					minChars: 2,
					emptyText: 'Select Investor Type'
				},{
					fieldLabel: 'Style',
					name: 'STYLE',
					allowBlank: false
				},{
					fieldLabel: 'Company Address',
					name: 'ADDRESS',
					xtype: 'htmleditor',
					height: 150
				},{
					xtype: 'combobox',
					fieldLabel: 'Location',
					name: 'LOCATION_ID',
					labelWidth: 130,
					store: Ext.data.StoreManager.lookup('Locations'),
					displayField: 'LOCATION',
					valueField:'LOCATION_ID',
					typeAhead: true,
					allowBlank: false,
					minChars: 2,
					emptyText: 'Select Location'
				},{
					fieldLabel: 'Phone Number #1',
					name: 'PHONE_1',
					labelWidth: 130
				},{
					fieldLabel: 'Phone Number #2',
					name: 'PHONE_2',
					labelWidth: 130,
				},{
					fieldLabel: 'Fax',
					name: 'FAX'
				},{
					fieldLabel: 'Email #1',
					name: 'EMAIL_1'
				},{
					fieldLabel: 'Email #2',
					name: 'EMAIL_2'
				},{
					fieldLabel:'Website',
					name:'WEBSITE'
				},{
					fieldLabel: 'Company Overview',
					name: 'COMPANY_OVERVIEW',
					xtype: 'textarea',
					height: 150,
					msgTarget:'under',
					maxLength:1000
					//plugins:[myplugin]
				},{
					fieldLabel: 'Investment Strategy',
					name: 'INVESTMENT_STRATEGY',
					xtype: 'textarea',
					height: 150,
					msgTarget:'under',
					maxLength:1000
				}]
			}]
		}]
	});
}
c.up().setActiveTab(id);
