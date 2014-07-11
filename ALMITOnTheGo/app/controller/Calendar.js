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
    onCalendarViewDetailsCommand: function () {
      console.log("onCalendarViewDetailsCommand");
      var cal = this;
      var calendarView = cal.getCalendarView();

      calendarView.down('#calendarViewContainer').add(
        {
          xtype: 'calendar',
          itemId: 'touchCalendarViewWidget',
          viewMode: 'month',
          value: new Date(),
          width: '100%',
          height: '100%',
          listeners: {
            periodchange: function (calendarView, minDate, maxDate, direction, eOpts) {
              console.log("periodchange");
            },
            selectionchange: function () {
              console.log("selectionchange");
            },
            eventtap: function (eventRecord, e, eOpts) {
              console.log("eventtap");
              console.log(eventRecord);
            }
          },
          enableEventBars: {
            eventHeight: 'auto',
            eventBarTpl: '<div>{title}</div>'
          },
          viewConfig: {
            weekStart: 0,
            eventStore: ALMITOnTheGo.app.allEventsStore
          }
        }
      );
    }
  });