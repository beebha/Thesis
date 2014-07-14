Ext.define('ALMITOnTheGo.controller.Calendar',
  {
    extend: 'Ext.app.Controller',
    config: {
      refs: {
        calendarView: 'calendarView'
      },
      control: {
        mainView: {
          calendarViewDetailsCommand: 'onCalendarViewDetailsCommand'
        }
      }
    },
    onCalendarViewDetailsCommand: function (viewMode, minDate, maxDate) {
      console.log("onCalendarViewDetailsCommand");

      var concentrationCode = this.getCalendarView().down('#concentrationCode').getValue();

      if(concentrationCode != 'SWE' && concentrationCode != 'IMS' && concentrationCode != 'DGM' ) {
        concentrationCode = ALMITOnTheGo.app.defaultConcentrationCode;
        this.getCalendarView().down('#concentrationCode').getValue(concentrationCode);
      }

      this.getCalendarEvents(
        ALMITOnTheGo.app.authToken != null ? ALMITOnTheGo.app.authToken : null,
        ALMITOnTheGo.app.authToken != null ? null : ALMITOnTheGo.app.getController('Common').getConcentrationID(concentrationCode),
        viewMode.toUpperCase(),
        minDate,
        maxDate
      );
    },
    getCalendarEvents: function(authToken, concentrationID, mode, minDate, maxDate) {

      console.log("getCalendarEvents");
      console.log("mode : " + mode);
      console.log("minDate : " + minDate);
      console.log("maxDate : " + maxDate);

      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL+'app.php?action=getCalendarViewDetails',
        method: 'post',
        params: {
          authToken: authToken,
          concentrationID: concentrationID,
          mode: mode,
          minDate: minDate,
          maxDate: maxDate
        },
        success: function (response) {
          var calResponse = Ext.JSON.decode(response.responseText);
          ALMITOnTheGo.app.getController('Calendar').setupCalendarViewPanel(calResponse, mode);
        }
      });
    },
    setupCalendarViewPanel: function(calResponse, mode) {
      console.log("setupCalendarViewPanel");

      var cal = ALMITOnTheGo.app.getController('Calendar');
      var calendarView = cal.getCalendarView();

      ALMITOnTheGo.app.allEventsStore.removeAll();
      var calendarEvents = calResponse.data.calendarEvents;
      for (var i=0; i<calendarEvents.length; i++)
      {
        calendarEvents[i]['start'] = cal.getDateForCalendar(calendarEvents[i]['startDate']);
        calendarEvents[i]['end'] = cal.getDateForCalendar(calendarEvents[i]['endDate']);
        ALMITOnTheGo.app.allEventsStore.addData(calendarEvents[i]);
      }
      console.log(ALMITOnTheGo.app.allEventsStore.getCount());

      Ext.each(calendarView.down('#touchCalendarViewWidget').items.items, function(singleCalendarView) {
        singleCalendarView.eventStore = ALMITOnTheGo.app.allEventsStore;
        singleCalendarView.syncHeight();
      });
    },
    getDateForCalendar: function(dateObj) {
      return new Date(
        dateObj['year'],
        dateObj['month']-1,
        dateObj['day'],
        dateObj['hour'],
        dateObj['min']);
      }
  });