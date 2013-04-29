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

//var storeNT = Ext.create('Ext.data.Store',{
//    storeId: 'NewssTitle',
//    model: 'News',
//    proxy: {
//        type: 'ajax',
//        api: {
//            read: '/news/request/autocom'
//        },
//        actionMethods: {
//            create: 'POST'
//        },
//        reader: {
//            idProperty: 'TITLE',
//            type: 'json',
//            root: 'data.items',
//            totalProperty: 'data.totalCount'
//        },
//        writer: {
//            type: 'json',
//            root: 'data',
//            writeAllFields: true
//        }
//    },
//    sorter: {
//        property: 'NEWS_ID',
//        direction: 'ASC'
//    },
//    autoSync: true
//});

//Add the additional 'advanced' VTypes
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
			emptyText: 'Select News'
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
			emptyText: 'Select Category'
		},{
			xtype: 'combobox',
			fieldLabel: 'Company',
			name: 'COMPANY_NAME',
			id: 'news-company',
			store: storeNC,
			displayField: 'COMPANY_NAME',
			typeAhead: true,
			editable: true,
			emptyText: 'Select Company',
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
				var form = Ext.getCmp('news-search-form').getForm();
				var rTitle = Ext.getCmp('news-title').getValue();
				var rCategory = Ext.getCmp('news-category').getValue();
				var rCompany = Ext.getCmp('news-company').getValue();
				
				if(form.isValid()) {
					if(typeof(rTitle) === 'undefined') {
						rTitle = '';
					}
					if(typeof(rCategory) === 'undefined') {
						rCategory = '';
					}
					if(typeof(rCompany) === 'undefined') {
						rCategory = '';
					}
					storeRR.load({
						params: {
							search: 1,
							title: rTitle,
							category: rCategory,
							company: rCompany
						},
						callback: function(d, i, e) {
							Ext.getCmp('news-search-window').close();
							if(d.length == 0) {
								Ext.Msg.alert('Message', 'No data found.');
							} else {
								Ext.Msg.alert('Message', 'Result: ' + d.length + ' data(s) found.');
							}
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
				storeRR.loadPage(storeRR_curpage);
			}
		}
	}]
}).show();