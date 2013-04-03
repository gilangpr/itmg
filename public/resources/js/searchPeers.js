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
				id: 'peers-search-main',
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
							peerStore.proxy.extraParams.COMPANY_NAME = f._fields.items[0].value;
							peerStore.proxy.extraParams.TYPE = 'SEARCH';
							peerStore.load({
								params: {
									COMPANY_NAME: f._fields.items[0].value,
									TYPE: 'SEARCH'
								},
								callback: function() {
									var c = Ext.getCmp('main-content');
									var xyz = Math.random();
									if(!c.items.get('peers-search-result-' + xyz)) {
										// Bottom Bar Panel Init :
										var comboBbar = new Ext.form.ComboBox({
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
										  forceSelection: true
										});
										
										var bbar = new Ext.PagingToolbar({
											store: peerStore,
											displayInfo: true,
											displayMsg: 'Displaying data {0} - {1} of {2}',
											emptyMsg: 'No data to display',
											items: [
											    '-',
											    'Records per page',
											    '-',
											    comboBbar
											]
										});
										
										comboBbar.on('select', function(combo, _records) {
											peerStore.pageSize = parseInt(_records[0].get('id'), 10);
											peerStore.loadPage(1);
										}, this);
										
										c.add({
											title: 'Peers Search Result',
											closable: true,
											id: 'peers-search-result-' + xyz,
											bbar: bbar,
											items: [{
												xtype: 'gridpanel',
												store: peerStore,
												border: false,
												autoScroll: true,
												columns: [{
													text: 'Peer Name',
													dataIndex: 'PEER_NAME',
													flex: 1
												},{
													text: 'Created Date',
													align: 'center',
													dataIndex: 'CREATED_DATE',
													width: 150
												},{
													text : 'Modified Date',
													align: 'center',
													dataIndex: 'MODIFIED_DATE',
													width: 150
												}],
												listeners: {
													itemdblclick: function(dv, record, item, index, e) {
														loadPeerDetail(record);
													}
												}
											}]
										});
									}
									c.setActiveTab('peers-search-result-' + xyz);
									Ext.getCmp('peers-search-main').close();
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

function loadPeerDetail(data) {
	var data = data.data;
	var c = Ext.getCmp('main-content');
	var id = 'peers-detail-' + data.PEER_ID;
	if(!c.items.get(id)) {
		c.add({
			title: 'Detail: ' + data.PEER_NAME,
			closable: true,
			id: id
		});
	}
	c.setActiveTab(id);
}