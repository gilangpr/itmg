var c = Ext.getCmp('<?php echo $this->container ?>');
var selected = c.getSelectionModel().getSelection();
if(selected.length > 0) {
	var id = 'group-manage-privilege-list-' + selected[0].id;
	var data = selected[0].data;
	
	var treeStore = Ext.create('Ext.data.TreeStore', {
		proxy: {
			type: 'ajax',
			url: sd.baseUrl + '/groups/request/read-tree',
			waitMsg: 'Loading data, please wait..',
			actionMethods: {
				read: 'POST'
			}
		}
	});
	
	treeStore.load();
	var menus = new Array();
	var sub_menus = new Array();
	var actions = new Array();
	
	if(!c.up().items.get(id)) {
		c.up().add({
			xtype: 'panel',
			id: id,
			title: 'Manage Privilege : ' + data.GROUP_NAME,
			closable: true,
			autoScroll: true,
			items: [{
				border: false,
				title: 'Access Right',
				xtype: 'treepanel',
				waitMsgTarget: true,
				closable: true,
				mask: true,
				maskConfig: {
					msg: 'Loading tree, please wait..'
				},
				id: 'groups-access-right-tree-panel',
				rootVisible: false,
				useArrows: true,
				store: treeStore,
				closable: false
			}],
			tbar: [{
				xtype: 'button',
				text: 'Save',
				iconCls: 'icon-accept',
				listeners: {
					click: function() {
						var comp = Ext.getCmp('groups-access-right-tree-panel');
						var tst = comp.getChecked();
						var posts = new Array();
						Ext.each(tst, function(d) {
							posts[posts.length] = [d.raw.ids, d.raw.type];
						});
						Ext.Ajax.request({
							url: sd.baseUrl + '/groups/request/privileges',
							params: {
								id: data.GROUP_ID,
								data: Ext.encode(posts)
							},
							success: function(_d) {
								
							},
							failure: function(_d) {
								
							}
						});
//						Ext.create('Ext.Window', {
//							html: 'Are you sure want save changes ?',
//							bodyPadding: '20 5 5 17',
//							title: 'Confirmation',
//							resizable: false,
//							modal: true,
//							closable: false,
//							draggable: false,
//							width: 300,
//							height: 120,
//							buttons: [{
//								text: 'Yes',
//								listeners: {
//									click: function() {
//										
//									}
//								}
//							},{
//								text: 'No',
//								listeners: {
//									click: function() {
//										this.up().up().close();
//									}
//								}
//							}]
//						}).show();
					}
				}
			}]
		});
	}
	c.up().setActiveTab(id);
} else {
	Ext.Msg.alert('Message', 'You did not select any Investor');
}