Ext.create('Ext.Window', {
	title: 'Add New ITM Participant',
	draggable: false,
	modal: true,
	width: 400,
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
			id: 'itmparticipant-add-form',
			waitMsgTarget: true,
			items: [{
		   		fieldLabel: 'Name',
		  		allowBlank: false,
		     	name: 'NAME_PART'
            },{
		        fieldLabel: 'Phone 1',
		        allowBlank: false,
		        name: 'PHONE_PART1',
            },{
		        fieldLabel: 'Phone 2',
		        allowBlank: true,
		        name: 'PHONE_PART2',
            },{
				fieldLabel:'Email',
				//allowBlank:false,
				name:'EMAIL_PART',
				vtype:'email'					
			},{
				fieldLabel: 'Address',
				name: 'ADDRESS_PART',
				xtype: 'htmleditor',
				height: 150
            },{
		        xtype: 'radiofield',
				name: 'SEX_PART',
				value: 'MAN',
				fieldLabel: 'Sex',
				boxLabel: 'Man'
            },{
				xtype: 'radiofield',
				name: 'SEX_PART',
				value: 'WOMAN',
				fieldLabel: '',
				labelSeparator: '',
				hideEmptyLabel: false,
				boxLabel: 'Woman'
			},{
		        fieldLabel: 'Position',
		        allowBlank: false,
		        name: 'POSITION_PART'
            }]
		}]
	}],
	buttons: [{
		text: 'Save',
		listeners: {
			click: function() {
				var form = this.up().up().items.items[0].items.items[0].getForm();
				var store = loadStore('Itmparticipants');
				if(form.isValid()) {
					form.submit({
						url: sd.baseUrl + '/itmparticipant/request/create',
						waitMsg: 'Saving data, please wait..',
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
		text: 'Cancel',
		listeners: {
			click: function() {
				this.up().up().close();
			}
		}
	}]
}).show();