function loadMenus() {
	var tbar = new Array();
	var t = [{
		xtype: 'button',
		text: 'Investors',
		height: sd.nav.height,
		width: sd.nav.width
	},{
		xtype: 'button',
		text: 'Shareholdings',
		height: sd.nav.height,
		width: sd.nav.width
	},{
		xtype: 'button',
		text: 'Peers',
		height: sd.nav.height,
		width: sd.nav.width
	},{
		xtype: 'button',
		text: 'Shareprices',
		height: sd.nav.height,
		width: sd.nav.width
	},{
		xtype: 'button',
		text: 'Research Report',
		height: sd.nav.height,
		width: sd.nav.width
	},{
		xtype: 'button',
		text: 'News',
		height: sd.nav.height,
		width: sd.nav.width
	},{
		xtype: 'button',
		text: 'User Management',
		height: sd.nav.height,
		width: sd.nav.width
	}];
	
	// Add Toolbar Listeners :
	var idx = 0;
	Ext.each(t, function(c, i) {
		t[i].listeners = {
			click: function() {
				loadContent(this);
			}
		}
		tbar[idx] = t[i];
		
		if(i < t.length - 1) {
			tbar[idx+1] = '-';
			idx+=2;
		}
	});
	
	var x = Ext.create('Ext.panel.Panel', {
		renderTo: document.getElementById('nav'),
		border: false,
		tbar: tbar,
		id: 'big-panel'
	});
}
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
function closeLoadingWindow() {
	var loading = Ext.getCmp('loading-window');
	loading.close();
}
function loadContent(param1) {
	var tabp = Ext.getCmp('main-content');
	if(!tabp.items.get(param1.text + '-tabs')) {
		showLoadingWindow();
		Ext.Ajax.request({
			url: sd.baseUrl + '/dashboard/request/get-tree',
			params: {
				name: param1.text
			},
			success: function(data) {
				var json = Ext.decode(data.responseText);
				var treeStore = Ext.create('Ext.data.TreeStore', json.data.items);
				
				tabp.add({
					xtype: 'panel',
					layout: 'border',
					title: param1.text,
					id: param1.text + '-tabs',
					closable: true,
					items: [{
						xtype: 'treepanel',
						title: param1.text + ' - Sub Menu',
						region: 'west',
						collapsible: true,
						store: treeStore,
						rootVisible: false,
						width: 200,
						padding: '1 1 1 1',
						listeners: {
							itemClick: function(view, records, item, index, eventObj) {
								if(records.isLeaf()) {
									var tp = Ext.getCmp(param1.text + '-tabpanel');
									var replacer = records.data.text.replace(' ','-') + '-tabchild';
									
									if(!tp.items.get(replacer)) {
										
										defineModel(records.raw.models);
										
										var store = getStore(records.raw);
										
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
											store: store,
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
											store.pageSize = parseInt(_records[0].get('id'), 10);
											store.loadPage(1);
										}, this);
										
										// Add tbar Listeners :
										Ext.each(records.raw.contents.tbars, function(d, i) {
											records.raw.contents.tbars[i].listeners = {
												click: function(a, b) {
													showLoadingWindow();
													Ext.Ajax.request({
														url: sd.baseUrl + '/dashboard/request/get-tbar-listeners',
														params: {
															id: a.id,
															container: replacer
														},
														success: function(data) {
															var json = Ext.decode(data.responseText);
															eval(json.data.items);
															closeLoadingWindow();
														},
														failure: function(a,b,c) {
															Ext.Msg.alert('Message', 'Error ' + a.status + ' : The source that you are looking for are ' + a.statusText);
															closeLoadingWindow();
														}
													});
												}
											}
										});
										
										var tabcontent = {
											xtype: records.raw.contents.xtype,
											tbar: records.raw.contents.tbars,
											title: records.data.text,
											id: replacer,
											closable: true,
											store: store,
											autoScroll: true
										};
										
										var cellEditing = Ext.create('Ext.grid.plugin.RowEditing', {
											clicksToMoveEditor: 1,
									        autoCancel: false
									    });
										
										Ext.each(records.raw.contents.columns, function(e, i) {
											if(e.dataType == 'combobox') {
												
												var temp = e.dataIndex.split('_');
												var st = '';
												for(var j=0;j<temp.length;j++) {
													st += temp[j].substring(0,1) + temp[j].substring(1,temp[j].length).toLowerCase();
												}
												st += 's';
												
												records.raw.contents.columns[i].editor = new Ext.form.field.ComboBox({
													displayField: e.dataIndex,
												    width: 500,
												    labelWidth: 130,
												    store: Ext.data.StoreManager.lookup(st),
												    typeAhead: true,
												    editable: false
												});
											}
										});
										
										if(records.raw.contents.xtype == 'gridpanel') {
											tabcontent.columns = records.raw.contents.columns;
											tabcontent.bbar = bbar;
											tabcontent.plugins = [cellEditing]
										}
										
										store.loadPage(1);
										tp.add(tabcontent);
										
									}
									tp.setActiveTab(replacer);
								}
							}
						}
					},{
						xtype: 'tabpanel',
						id: param1.text + '-tabpanel',
						region: 'center',
						padding: '1 1 1 0'
					}]
				});
				
				closeLoadingWindow();
				
				tabp.setActiveTab(param1.text + '-tabs');
			}
		});
	}
	tabp.setActiveTab(param1.text + '-tabs');
}
function getStore(data) {
	var store = Ext.create('Ext.data.Store', {
		model: data.models.modelName,
		storeId: data.stores.storeName,
		proxy: data.stores.proxy,
		sorters: data.stores.sorters,
		autoSync: true
	});
	return store;
}
function defineModel(data) {

	Ext.define(data.modelName, {
		extend: 'Ext.data.Model',
		fields: data.fields
	});
	
}
function loadStore(name) {
	var store = Ext.data.StoreManager.lookup(name);
	return store;
}