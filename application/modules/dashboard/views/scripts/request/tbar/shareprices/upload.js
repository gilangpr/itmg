Ext.create('Ext.Window', {
	title: 'Upload Excel',
	width: 400,
	height: 98,
	resizable: false,
	draggable: false,
	closable: false,
	modal: true,
	buttons: [{
		text: 'Upload',
		listeners: {
			
		}
	},{
		text: 'Cancel',
		listeners: {
			click: function() {
				this.up().up().close();
			}
		}
	}],
	items: [{
		xtype: 'form',
		layout: 'form',
		border: false,
		bodyPadding: '5 5 5 5',
		id: 'sharehodlings-upload-form',
		items: [{
			xtype: 'fileuploadfield',
			name: 'FILE',
			fieldLabel: 'Select file',
			allowBlank: false
		}]
	}]
}).show();