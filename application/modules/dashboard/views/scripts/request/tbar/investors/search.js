var _storeInvestors = Ext.create("Ext.data.Store", {
	model: "Investor",
	storeId: "Investors_combobox",
	proxy:{"type":"ajax","api":{"read":"\/investors\/request\/read","create":"\/investors\/request\/create","update":"\/investors\/request\/update","destroy":"\/investors\/request\/destroy"},"actionMethods":{"create":"POST","destroy":"POST","read":"POST","update":"POST"},"reader":{"idProperty":"INVESTOR_ID","type":"json","root":"data.items","totalProperty":"data.totalCount"},"writer":{"type":"json","root":"data","writeAllFields":true}},
	sorter: {"property":"INVESTOR_ID","direction":"ASC"}});

Ext.create('Ext.Window', {
	title: 'Search Investor',
	xtype: 'panel',
	layout: 'border',
	id: 'search-investor-main',
	modal: true,
	closable: true,
	width: 600,
	height: 154,
	resizable: false,
	draggable: false,
	buttons: [{
		text: 'Search',
		listeners: {
			click: function() {
				var form1 = Ext.getCmp('search-investor-form-left').getForm();
				var form2 = Ext.getCmp('search-investor-form-right').getForm();
				
				if(form1.isValid() && form2.isValid()) {
					var obj3 = {};
					var val1 = form1.getValues();
					var val2 = form2.getValues();
					var COMPANY_NAME = '';
					var CONTACT_PERSON = '';
					var EQUITY_ASSETS = '';
					var INVESTOR_TYPE = '';
					var LOCATION = '';
					var FORMAT = '';
					/* Form 1 */
					
					if(typeof(val1.COMPANY_NAME) !== 'undefined') {
						COMPANY_NAME = val1.COMPANY_NAME;
					}
					if(typeof(val1.CONTACT_PERSON) !== 'undefined') {
						CONTACT_PERSON = val1.CONTACT_PERSON;
					}
					EQUITY_ASSETS = val1.EQUITY_ASSETS;
					
					/* End of : Form 1*/
					
					/* Form 2 */
					
					if(typeof(val2.INVESTOR_TYPE) !== 'undefined') {
						INVESTOR_TYPE = val2.INVESTOR_TYPE;
					}
					
					if(typeof(val2.LOCATION) !== 'undefined') {
						LOCATION = val2.LOCATION;
					}
					
					FORMAT = val2.FORMAT;
					
					/* End of : Form 2 */
					
					var _store = Ext.data.StoreManager.lookup('Investors');
					
					_store.load({
						params: {
							TYPE: 'SEARCH',
							COMPANY_NAME: COMPANY_NAME,
							EQUITY_ASSETS: EQUITY_ASSETS,
							INVESTOR_TYPE: INVESTOR_TYPE,
							LOCATION: LOCATION,
							CONTACT_PERSON: val1.CONTACT_PERSON
						},
						callback: function() {
							if(_store.data.items.length > 0) {
								if(FORMAT == 'Detail') {
									<?php echo $this->render('/request/tbar/investors/search-detailed.js') ?>
								}
							} else {
								Ext.Msg.alert('Message', 'Sorry, No data found.');
							}
						}
					});
					// Close search window
					Ext.getCmp('search-investor-main').close();
				}
			}
		}
	},{
		text: 'Cancel',
		listeners: {
			click: function() {
				Ext.getCmp('search-investor-main').close();
			}
		}
	}],
	items: [{
		region: 'west',
		border: false,
		width: '50%',
		items: [{
			xtype: 'form',
			layout: 'form',
			border: false,
			id: 'search-investor-form-left',
			bodyPadding: '5 5 5 5',
			defaultType: 'combobox',
			items: [{
				fieldLabel: 'Company Name',
				emptyText: 'All',
				store: _storeInvestors,
                displayField: 'COMPANY_NAME',
                typeAhead: true,
				name: 'COMPANY_NAME',
				allowBlank: true
			},{
				fieldLabel: 'Contact Person',
				emptyText: 'All',
				store: Ext.data.StoreManager.lookup('Contacts'),
                displayField: 'NAME',
                typeAhead: true,
				name: 'CONTACT_PERSON',
				allowBlank: true
			},{
				fieldLabel: 'Equity Assets',
				emptyText: 'All',
				store: new Ext.data.ArrayStore({fields:['EA'],data:[['All'],['Small'],['Medium'],['Large']]}),
                displayField: 'EA',
                value: 'All',
                typeAhead: true,
                editable: false,
				name: 'EQUITY_ASSETS',
				allowBlank: false
			}]
		}]
	},{
		region: 'east',
		border: false,
		width: '50%',
		items: [{
			xtype: 'form',
			layout: 'form',
			border: false,
			id: 'search-investor-form-right',
			bodyPadding: '5 5 5 5',
			defaultType: 'combobox',
			items: [{
				fieldLabel: 'Investor Type',
				emptyText: 'All',
				store: Ext.data.StoreManager.lookup('InvestorTypes'),
                displayField: 'INVESTOR_TYPE',
                valueField:'INVESTOR_TYPE',
                typeAhead: true,
				name: 'INVESTOR_TYPE',
				allowBlank: true,
				editable: false
			},{
				fieldLabel: 'Location',
				emptyText: 'All',
				store: Ext.data.StoreManager.lookup('Locations'),
                displayField: 'LOCATION',
                valueField:'LOCATION',
                typeAhead: true,
				name: 'LOCATION',
				allowBlank: true,
				editable: false
			},{
				fieldLabel: 'Format',
				emptyText: 'List',
				name: 'FORMAT',
				store: new Ext.data.ArrayStore({fields:['FR'],data:[['List'],['Detail']]}),
				allowBlank: false,
				value: 'List',
				displayField: 'FR',
				editable: false
			}]
		}]
	}]
}).show();