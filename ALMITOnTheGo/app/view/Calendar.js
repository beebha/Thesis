Ext.define('ALMITOnTheGo.view.Calendar', {
  extend: 'Ext.Panel',
  xtype: 'calendarView',
  requires: [
    'Ext.ux.TouchCalendar',
    'Ext.ux.TouchCalendarView',
    'Ext.ux.TouchCalendarSimpleEvents'
  ],
  config: {
    width: '100%',
    height: '100%',
    items: [
      {
        xtype: 'container',
        itemId: 'calendarViewContainer',
        layout: {
          type: 'vbox',
          align: 'center'
        },
        width: '100%',
        height: '100%',
        items: [
          {
            xtype      : 'touchcalendarview',
            itemId      : 'touchCalendarViewWidget',
            viewMode    : 'month',
            dayTimeSlotSize: 60,
            weekStart   : 0,
            value       : new Date(),
            width: '100%',
            height: '100%',
            listeners : {
              periodchange : function(calendarView, minDate, maxDate, direction, eOpts) {
                console.log(calendarView.getScrollable().getScroller());
                console.log("periodchange");
              },
              selectionchange : function() {
                console.log("selectionchange");
              }
            }
//            eventStore  : Ext.getStore('Events'),
//            plugins: {
//              xclass: 'Ext.ux.TouchCalendarSimpleEvents'
//            }
          },
          {
            docked: 'top',
            xtype: 'titlebar',
            cls: 'inner-toolbar',
            style: {
              border: 'none'
            },
            items: [{
              xtype: 'button',
              text: 'Month',
              listeners : {
                tap : function(button, e, eOpts) {
                  var touchCalendarViewWidget = button.up('#calendarViewContainer').down('#touchCalendarViewWidget');
                  touchCalendarViewWidget.setViewMode('month');
                }
              }
            }, {
              xtype: 'button',
              text: 'Week',
              listeners : {
                tap : function(button, e, eOpts) {
                  var touchCalendarViewWidget = button.up('#calendarViewContainer').down('#touchCalendarViewWidget');
                  button.up('#calendarViewContainer').down('#touchCalendarViewWidget').setViewMode('week');
                }
              }
            }, {
              xtype: 'button',
              text: 'Day',
              listeners : {
                tap : function(button, e, eOpts) {
                  var touchCalendarViewWidget = button.up('#calendarViewContainer').down('#touchCalendarViewWidget');
                  touchCalendarViewWidget.setViewMode('day');
                }
              }
            }]

          },
          {
            docked: 'bottom',
            xtype: 'titlebar',
            cls: 'inner-toolbar',
            style: {
              border: 'none'
            }
          }
        ]
      }
    ]
  }
});
