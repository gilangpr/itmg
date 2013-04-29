function showNewsSearch() {
	Date.prototype.customFormat = function(formatString){
	    var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
	    var dateObject = this;
	    YY = ((YYYY=dateObject.getFullYear())+"").slice(-2);
	    MM = (M=dateObject.getMonth()+1)<10?('0'+M):M;
	    MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
	    DD = (D=dateObject.getDate())<10?('0'+D):D;
	    DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dateObject.getDay()]).substring(0,3);
	    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
	    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);

	    h=(hhh=dateObject.getHours());
	    if (h==0) h=24;
	    if (h>12) h-=12;
	    hh = h<10?('0'+h):h;
	    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
	    mm=(m=dateObject.getMinutes())<10?('0'+m):m;
	    ss=(s=dateObject.getSeconds())<10?('0'+s):s;
	    return formatString.replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
	}

	var SP_START_DATE = '1900-01-01';
	var SP_END_DATE = '2013-12-12';
	var SP_NAMES = new Array();
	
	var storeRR = loadStore('Newss');
	var storeRRC = loadStore('NewsCategorys');
	var storeNC = loadStore('Companys');
	
	var storeRR_curpage = storeRR.currentPage;
	storeRR.load({
		params: {
			all: 1
		}
	});
	storeRRC.load({
		params: {
			all: 1
		}
	});
	
	Ext.apply(Ext.form.field.VTypes, {
		daterange: function(val, field) {
			var date = field.parseDate(val);

	        if (!date) {
	            return false;
	        }
	        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
	            var start = field.up('form').down('#' + field.startDateField);
	            start.setMaxValue(date);
	            start.validate();
	            this.dateRangeMax = date;
	        }
	        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
	            var end = field.up('form').down('#' + field.endDateField);
	            end.setMinValue(date);
	            end.validate();
	            this.dateRangeMin = date;
	        }
	        /*
	         * Always return true since we're only using this vtype to set the
	         * min/max allowed values (these are tested for after the vtype test)
	         */
	        return true;
		},
		daterangeText: 'Start Date must be less than End Date',
	});
	
	Ext.create('Ext.Window', {
		title: 'Search News',
		width: 500,
		id: 'news-search-window',
		modal: true,
		draggable: false,
		resizable: false,
		items: [{
			xtype: 'form',
			layout: 'form',
			id: 'news-search-form',
			bodyPadding: '5 5 5 5',
			waitMsgTarget: true,
			border: false,
			items: [{
				xtype: 'combobox',
				fieldLabel: 'Title',
				name: 'TITLE',
				id: 'news-title',
				store: storeRR,
				displayField: 'TITLE',
				typeAhead: true,
				allowBlank: true,
				minChars: 3,
				emptyText: 'All News'
			},{
				xtype: 'combobox',
				fieldLabel: 'Category',
				name: 'NEWS_CATEGORY',
				id: 'news-category',
				store: storeRRC,
				displayField: 'NEWS_CATEGORY',
				typeAhead: true,
				allowBlank: true,
				minChars: 3,
				emptyText: 'All Category'
			},{
				xtype: 'combobox',
				name: 'COMPANY_NAME',
				store: storeNC,
				displayField: 'COMPANY_NAME',
				typeAhead: true,
				editable: true,
				emptyText: 'Select Company',
				fieldLabel: 'Company',
				minChars: 3,
				allowBlank: true
			},{
				xtype: 'combobox',
				name: 'SOURCE',
				store: storeRR,
				displayField: 'SOURCE',
				typeAhead: true,
				editable: true,
				emptyText: 'Select Source',
				fieldLabel: 'Source',
				minChars: 3,
				allowBlank: true
			},{
				fieldLabel:'Start Date',
				xtype: 'datefield',
				id: 'start-date',
				format: 'Y-m-d',
				name: 'startdt',
		        itemId: 'startdt',
		        vtype: 'daterange',
		        endDateField: 'enddt',
		        emptyText: 'Start Date',
				labelWidth: 140,
				width: 320,
				allowBlank: false
			},{
				fieldLabel:'End Date',
				xtype: 'datefield',
				id: 'end-date',
				format: 'Y-m-d',
				name: 'enddt',
	            itemId: 'enddt',
	            vtype: 'daterange',
	            startDateField: 'startdt',
	            emptyText: 'End Date',
				labelWidth: 140,
				width: 320,
				allowBlank: false
			}]
		}],
		buttons: [{
			text: 'Search',
			listeners: {
				click: function() {
					showLoadingWindow();
					var rTitle = Ext.getCmp('news-title').getValue();
					var rCategory = Ext.getCmp('news-category').getValue();
					if(typeof(rTitle) === 'undefined') {
						rTitle = '';
					}
					if(typeof(rCategory) === 'undefined') {
						rCategory = '';
					}
					this.up().up().close();
					storeRR.load({
						params: {
							search: 1,
							title: rTitle,
							category: rCategory
						},
						callback: function(d, i, e) {
							closeLoadingWindow();
							if(d.length == 0) {
								Ext.Msg.alert('Message', 'No data found.');
							} else {
								Ext.Msg.alert('Message', 'Result: ' + d.length + ' data(s) found.');
								var c = Ext.getCmp('main-content');
								var xyz = Math.random();
								var id = 'news-reports-search-result-' + xyz;
								if(!c.items.get(id)) {
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
										store: storeRR,
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
										storeRR.pageSize = parseInt(_records[0].get('id'), 10);
										storeRR.loadPage(1);
									}, this);
									c.add({
										title: 'News',
										id: id,
										closable: true,
										bbar: bbar,
										items: [{
											xtype: 'gridpanel',
											border: false,
											store: storeRR,
											columns: [{
												text: 'Title',
												flex: 1,
												dataIndex: 'TITLE'
											},{
												text: 'Category',
												width: 150,
												align: 'center',
												dataIndex: 'NEWS_CATEGORY'
											},{
												text: 'Company',
												width: 150,
												align: 'center',
												dataIndex: 'COMPANY_NAME'
											},{
												text: 'Source',
												width: 150,
												align: 'center',
												dataIndex: 'SOURCE'
											},{
												text: 'File Size (Byte)',
												width: 120,
												dataIndex: 'FILE_SIZE',
												align: 'center',
												renderer: Ext.util.Format.numberRenderer('0.,/i')
											},{
												text: 'Downloaded',
												width: 120,
												align: 'center',
												dataIndex: 'TOTAL_HIT'
											},{
												text: 'File Type',
												width: 120,
												align: 'center',
												dataIndex: 'FILE_TYPE'
											},{
												text: 'Created Date',
												width: 150,
												align: 'center',
												dataIndex: 'CREATED_DATE'
											},{
												text: 'Last Modified',
												width: 150,
												align: 'center',
												dataIndex: 'MODIFIED_DATE'
											}],
											listeners: {
												itemdblclick: function(d, i, e) {
													document.location = sd.baseUrl + '/news/request/download/id/' + i.data.NEWS_ID;
													var store = loadStore('Newss');
													setTimeout(function(){
														store.loadPage(store.currentPage);
													},800);
												}
											}
										}]
									});
								}
								c.setActiveTab(id);
							}
						}
					});
				}
			}
		},{
			text: 'Cancel',
			listeners: {
				click: function() {
					this.up().up().close();
					storeRR.loadPage(storeRR_curpage);
				}
			}
		}]
	}).show();
}