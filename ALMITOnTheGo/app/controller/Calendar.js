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

      this.getCalendarView().setMasked({
        xtype: 'loadmask',
        message: '&nbsp;'
      });

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

      var touchCalendar = calendarView.down('#touchCalendarViewWidget');

      if(touchCalendar != null) {
        Ext.each(touchCalendar.items.items, function(singleCalendarView) {
          singleCalendarView.eventStore = ALMITOnTheGo.app.allEventsStore;
          singleCalendarView.syncHeight();
        });

        if(mode == 'WEEK') {
          Ext.each(Ext.query('td.time-block'), function(singleDayElement)
          {
            if(Ext.getDom(singleDayElement).innerHTML.indexOf('simple-event-wrapper') !== -1 )
            {
              var singleDate = Ext.getDom(singleDayElement).getAttribute('datetime');
              var eventsHtml = "";
              var eventCount = 0;

              for (var j=0; j<ALMITOnTheGo.app.allEventsStore.getCount(); j++)
              {
                var singleDayRecord = ALMITOnTheGo.app.allEventsStore.getAt(j);
                if(singleDayRecord.get('singleDate') == singleDate) {
                  if(eventCount == 0) {
                    eventsHtml  += singleDayRecord.data.singleDateDay+"<br>";
                    eventCount++;
                  }
                  eventsHtml  += '<br><span style="float:left;padding-left:0.2em;font-weight:bold;font-size:60%;text-align:center;">' +
                              singleDayRecord.data.title +
                              '</span><br><span style="float:left;padding-left:0.2em;font-weight:normal;font-size:60%;text-align:center;font-style:italic">' +
                              singleDayRecord.data.event+ '</span><br>';
                }
              }
              Ext.get(singleDayElement).setHtml(eventsHtml);
            }
          });
        }
      } else {
        calendarView.down('#calendarViewContainer').add(
          {
            xtype: 'calendar',
            itemId: 'touchCalendarViewWidget',
            width: '100%',
            height: '100%',
            listeners: {
              periodchange: function (calendarView, minDate, maxDate, direction, eOpts) {
                console.log("periodchange");

                var min = new Date(minDate);
                var max = new Date(maxDate);
                var minDateString = min.getFullYear() + "-" + (min.getMonth() + 1) + "-" + min.getDate();
                var maxDateString = max.getFullYear() + "-" + (max.getMonth() + 1) + "-" + max.getDate();

                ALMITOnTheGo.app.getController('Calendar').onCalendarViewDetailsCommand(calendarView.getViewMode(), minDateString, maxDateString);
              },
              selectionchange: function (calendarView, newDate, oldDate, eOpts) {
                console.log("selectionchange");
                console.log("newDate: " + newDate);
                console.log("oldDate: " + oldDate);
              },
              eventtap: function (eventRecord, e, eOpts) {
                console.log("eventtap");
                console.log(eventRecord);
                Ext.Msg.alert(
                  eventRecord.data.event,
                  eventRecord.data.title
                );
              }
            },
            viewConfig: {
              viewMode: 'month',
              dayTimeSlotSize: 60,
              weekStart: 0,
              eventStore: ALMITOnTheGo.app.allEventsStore
            },
            enableSimpleEvents: true
          }
        );
      }

      ALMITOnTheGo.app.authToken == null ? calendarView.down('#SWEButton').show() : calendarView.down('#SWEButton').hide();
      ALMITOnTheGo.app.authToken == null ? calendarView.down('#IMSButton').show() : calendarView.down('#IMSButton').hide();
      ALMITOnTheGo.app.authToken == null ? calendarView.down('#DGMButton').show() : calendarView.down('#DGMButton').hide();

      calendarView.setMasked(false);
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