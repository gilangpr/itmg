Ext.create('Ext.Window', {
	title: 'Add Shareprices Name',
	width: 400,
	height: 97,
	closable: true,
	resizable: false,
	draggable: false,
	modal: true,
<<<<<<< HEAD
=======
	width: 350,
	resizable: false,
	items: [{
		xtype: 'panel',
		border: false,
		items: [{
			xtype: 'form',
			layout: 'form',
			border: false,
			bodyPadding: '5 5 5 5',
			defaultType: 'textfield',
			id: 'shareprices-add-form',
			waitMsgTarget: true,
			items: [{
					xtype: 'combobox',
					fieldLabel: 'Meeting Event',
					name: 'MEETING_ACTIVITIES_ID',
					labelWidth: 130,
					store: Ext.data.StoreManager.lookup('Meetingactivities'),
					displayField: 'MEETING_EVENT',
					typeAhead: true,
					allowBlank: false,
					minChars: 2,
					emptyText: 'Select Meeting Event'
				},{
					fieldLabel: 'Documentation Title',
					name: 'DOCUMENTATION_TITLE'
				},{
					xtype: 'filefield',
				        name: 'FILE_PATH',
					fieldLabel: 'File upload'
				}]
				fieldLabel: 'Name',
				allowBlank: false,
				name: 'SHAREPRICES_NAME'
			}]
		}]
	}],
>>>>>>> da7aa1a11ba2146aa19ac0a221f301217a8ed5e8
	buttons: [{
		text: 'Save',
		listeners: {
			click: function() {
				var form  = Ext.getCmp('sharepricesname-add-form').getForm();
				if(form.isValid()) {
					form.submit({
						url: sd.baseUrl + '/sharepricesname/request/create',
						success: function(data) {
							var json = Ext.decode(data.respnoseText);
							form.reset();
							Ext.Msg.alert('Message','Success adding shareprices name');
							var store = loadStore('SharepricesNames');
							store.loadPage(1);
						},
						failure: function(data,res) {
							var json = Ext.decode(res.response.responseText);
							Ext.Msg.alert('Error',json.error_message);
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
	}],
	items: [{
		xtype: 'form',
		layout: 'form',
		border: false,
		id: 'sharepricesname-add-form',
		defaultType: 'textfield',
		bodyPadding: '5 5 5 5',
		items: [{
			fieldLabel: 'Name',
			xtype: 'textfield',
			name: 'SHAREPRICES_NAME',
			allowBlank: false
		}]
	}]
}).show();
