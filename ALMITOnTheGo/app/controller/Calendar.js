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
        },
        calendarView: {
          hello: 'onCalendarViewDetailsCommand'
        }
      }
    },
    onCalendarViewDetailsCommand: function (viewMode, date) {
      console.log("onCalendarViewDetailsCommand");

      console.log("viewMode : " + viewMode);
      console.log("date : " + date);

      this.getCalendarEvents(
        ALMITOnTheGo.app.authToken != null ? ALMITOnTheGo.app.authToken : null,
        ALMITOnTheGo.app.authToken != null ? null : ALMITOnTheGo.app.getController('Common').getConcentrationID(ALMITOnTheGo.app.defaultConcentrationCode),
        viewMode,
        date
      );
    },
    getCalendarEvents: function(authToken, concentrationID, mode, date) {
      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL+'app.php?action=getCalendarViewDetails',
        method: 'post',
        params: {
          authToken: authToken,
          concentrationID: concentrationID,
          mode: mode,
          date: date
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

      Ext.each(calendarView.down('#touchCalendarViewWidget').items.items, function(calendarView) {
        calendarView.eventStore = ALMITOnTheGo.app.allEventsStore;
      });
      calendarView.down('#touchCalendarViewWidget').setViewConfig(
      {
        viewMode: mode,
        dayTimeSlotSize: 60,
        weekStart: 0,
        eventStore: ALMITOnTheGo.app.allEventsStore
      });


    },
    getDateForCalendar: function(dateObj) {
      return new Date(
        dateObj['year'],
        dateObj['month'],
        dateObj['day'],
        dateObj['hour'],
        dateObj['min']);
      }
  });