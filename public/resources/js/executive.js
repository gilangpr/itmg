var investorStore = new Array();
var locationStore = new Array();
var investorTypeStore = new Array();
var contactStore = new Array();
var newsContent;
var tabRrContent;

function showLoadingWindow() {
	Ext.create('Ext.Window', {
		id: 'loading-window',
		title: 'Loading',
		width: 200,
		resizable: false,
		draggable: false,
		modal: true,
		closable: false,
		html: '<div style="padding: 10px;text-align: center"><img width="40" height="40" src="' + sd.baseUrl + '/images/350.gif"/><br/>Loading data, please wait..</div>'
	}).show();
}

function loadStore(name) {
	var store = Ext.data.StoreManager.lookup(name);
	return store;
}

function closeLoadingWindow() {
	var loading = Ext.getCmp('loading-window');
	loading.close();
}

function loadContent(content) {
	var id = content.text;
	var tabp = Ext.getCmp('main-content');
	
	if(id == 'Investors') {
		showInvestorSearch();
	} else if(id == 'Shareholdings') {
		showShareholdingSearch();
	} else if(id == 'Peers') {
		showPeerSearch();
	}else if(id == 'Research Reports') {
		//var window = Ext.create('App.view.ResearchReport').show();
		if(typeof(tabRrContent) === 'undefined') {
			tabRrContent = Ext.create('App.view.tabp.ResearchReport');
		}
		if(!tabp.items.get('research-report-grid')) {
			tabp.add(tabRrContent);
		}
		tabp.setActiveTab('research-report-grid');
	} else if(id == 'News') {
		if(typeof(newsContent) === 'undefined') {
			newsContent = Ext.create('App.view.tabp.News');
		}
		if(!tabp.items.get('news-grid')) {
			tabp.add(newsContent);
		}
		tabp.setActiveTab('news-grid');
	}
}

function convert(obj) {
	console.log(obj);
	obj.bbar = new Ext.PagingToolbar({
		id: 'news-paging-toolbar-' + Math.random(232323),
		displayInfo: true,
		displayMsg: 'Displaying data {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	console.log(obj);
	return obj;
}

function getInvestorStore() {
	Ext.Ajax.request({
		url: sd.baseUrl + '/investors/executive/get-list-investors',
		success: function(data) {
			var json = Ext.decode(data.responseText);
			investorStore = json.data.items;
			getLocationStore();
		}
	});
}

function getLocationStore() {
	Ext.Ajax.request({
		url: sd.baseUrl + '/investors/executive/get-list-locations',
		success: function(data) {
			var json = Ext.decode(data.responseText);
			locationStore = json.data.items;
			getInvestorTypeStore();
		}
	});
}

function getInvestorTypeStore() {
	Ext.Ajax.request({
		url: sd.baseUrl + '/investors/executive/get-list-investortype',
		success: function(data) {
			var json = Ext.decode(data.responseText);
			investorTypeStore = json.data.items;
			getContactStore();
		}
	});
}

function getContactStore() {
	Ext.Ajax.request({
		url: sd.baseUrl + '/investors/executive/get-list-contacts',
		success: function(data) {
			var json = Ext.decode(data.responseText);
			contactStore = json.data.items;
			loadInvestorSearch();
			closeLoadingWindow();
		}
	});
}


function loadInvestorSearch() {
	Ext.create('Ext.Window', {
		title: 'Search Investor',
		xtype: 'panel',
		layout: 'border',
		id: 'search-investor-main',
		modal: true,
		closable: true,
		width: 740,
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
						for(var attrname in val1) {
							obj3[attrname] = val1[attrname];
						}
						for(var attrname in val2) {
							obj3[attrname] = val2[attrname];
						}
						//showLoadingWindow();
						Ext.Ajax.request({
							url: sd.baseUrl + '/investors/request/search',
							params: obj3,
							success: function(data) {
								
								//closeLoadingWindow();
							},
							failure: function(data) {
								
								//closeLoadingWindow();
							}
						});
					}
				}
			}
		},{
			text: 'Cancel',
			listeners: {
				click: function() {
					var p = Ext.getCmp('search-investor-main');
					if(confirm('Cancel Search ?')) {
						p.close();
					}
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
					name: 'COMPANY_NAME',
					store: investorStore,
					value: 'All',
					typeAhead: true,
					allowBlank: false
				},{
					fieldLabel: 'Contact Person',
					emptyText: 'All',
					typeAhead: true,
					store: contactStore,
					value: 'All',
					name: 'CONTACT PERSON',
					allowBlank: false
				},{
					fieldLabel: 'Equity Assets',
					emptyText: 'All',
					name: 'EQUITY_ASSETS',
					store: [['Small','Small'],['Medium','Medium'],['Large','Large']],
					value: 'Small',
					editable: false,
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
					name: 'INVESTOR_TYPE',
					store: investorTypeStore,
					value: 'All',
					typeAhead: true,
					allowBlank: false
				},{
					fieldLabel: 'Location',
					emptyText: 'All',
					name: 'LOCATION',
					store: locationStore,
					value: 'All',
					typeAhead: true,
					allowBlank: false
				},{
					fieldLabel: 'Format',
					emptyText: 'List',
					name: 'FORMAT',
					store: [['List','List'],['Detail','Detail']],
					value: 'List',
					editable: false,
					allowBlank: false
				}]
			}]
		}]
	}).show();
}

function showInvestorSearch() {
	
	showLoadingWindow();
	getInvestorStore();
}

function showShareholdingSearch() {
	Ext.create('Ext.Window', {
		title: 'Search Shareholders',
		modal: true,
		resizable: false,
		draggable: false,
		width: 400,
		items: [{
			xtype: 'form',
			layout: 'form',
			border: false,
			id: 'shareholdings-search-form',
			bodyPadding: '5 5 5 5',
			items: [{
				fieldLabel: 'Start Date',
				xtype: 'datefield',
				name: 'START_DATE',
				allowBlank: false,
				format: 'Y/m/d',
				typeAhead: false
			},{
				fieldLabel: 'End Date',
				xtype: 'datefield',
				name: 'END_DATE',
				allowBlank: false,
				format: 'Y/m/d'
			},{
				fieldLabel: 'Sort By',
				xtype: 'combobox',
				name: 'SORT_BY',
				store: [
	                ['Alphabetical','Alphabetical'],
	                ['Higher_to_lower','Higher to lower'],
		        ],
		        value: 'Alphabetical',
				allowBlank: false
			}]
		}],
		buttons: [{
			text: 'Search',
			listeners: {
				click: function() {
					var form = Ext.getCmp('shareholdings-search-form').getForm();
					if(form.isValid()) {
						form.submit({
							url: sd.baseUrl + '/shareholdings/executive/search',
							success: function(data) {
								
							},
							failure: function(data) {
								
							}
						});
					}
				}
			}
		},{
			text: 'Cancel',
			listeners: {
				click: function() {
					if(confirm('Cancel Search ?')) {
						this.up().up().close();
					}
				}
			}
		}]
	}).show();
}

/* Peers Section */

function showPeerSearch() {
	showLoadingWindow();
	Ext.Ajax.request({
		url: sd.baseUrl + '/peers/executive/get-list-peers',
		success: function(data) {
			var json = Ext.decode(data.responseText);
			peerStore = json.data.items;
			
			/* --- */
			Ext.create('Ext.Window', {
				title: 'Search Peers',
				modal: true,
				draggable: false,
				resizable: false,
				width: 400,
				items: [{
					xtype: 'form',
					layout: 'form',
					id: 'peers-search-form',
					border: false,
					bodyPadding: '5 5 5 5',
					items: [{
						xtype: 'combobox',
						fieldLabel: 'Company',
						store: peerStore,
						name: 'COMPANY'
					}]
				}]
			}).show();
			/* 000 */
			
			closeLoadingWindow();
		}
	});
}