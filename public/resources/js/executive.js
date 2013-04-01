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
		showInvestorSearch2();
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
					this.up().up().close();
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
			var peerStore = Ext.create("Ext.data.Store", {
				model: "Peer",
				storeId: "Peers",
				proxy:{"type":"ajax","api":{"read":"\/peers\/executive\/get-list-peers","create":"\/peers\/request\/create","update":"\/peers\/request\/update","destroy":"\/peers\/request\/destroy"},"actionMethods":{"create":"POST","destroy":"POST","read":"POST","update":"POST"},"reader":{"idProperty":"PEER_ID","type":"json","root":"data.items","totalProperty":"data.totalCount"},"writer":{"type":"json","root":"data","writeAllFields":true}},
				sorter: {"property":"PEER_ID","direction":"ASC"}});
			
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
						name: 'COMPANY',
						displayField: 'PEER_NAME',
						emptyText: 'All'
					}]
				}],
				buttons: [{
					text: 'Search',
					listeners: {
						click: function() {
							var f = Ext.getCmp('peers-search-form').getForm();
							console.log(f);
							peerStore.load({
								params: {
									COMPANY_NAME: f._fields.items[0].value,
									TYPE: 'SEARCH'
								}
							});
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
			/* 000 */
			
			closeLoadingWindow();
		}
	});
}