Ext.define('ALMITOnTheGo.view.Calendar', {
  extend: 'Ext.Panel',
  xtype: 'calendarView',
  requires: [
    'Ext.ux.TouchCalendar',
    'Ext.ux.TouchCalendarView',
    'Ext.ux.TouchCalendarEvents',
    'Ext.ux.TouchCalendarMonthEvents',
    'Ext.ux.TouchCalendarWeekEvents',
    'Ext.ux.TouchCalendarDayEvents',
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
            docked: 'top',
            xtype: 'titlebar',
            cls: 'inner-toolbar',
            style: {
              border: 'none'
            },
            items:
            [
              {
                xtype: 'button',
                text: 'Month',
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('Month button clicked');
                    var touchCalendarViewWidget = button.up('#calendarViewContainer').down('#touchCalendarViewWidget');
                    touchCalendarViewWidget.setViewMode('month');
                    touchCalendarViewWidget.updateViewMode('month');
                  }
                }
              },
              {
                xtype: 'button',
                text: 'Week',
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('Week button clicked');
                    var touchCalendarViewWidget = button.up('#calendarViewContainer').down('#touchCalendarViewWidget');
                    touchCalendarViewWidget.setViewMode('week');
                    touchCalendarViewWidget.updateViewMode('week');
                  }
                }
              },
              {
                xtype: 'button',
                text: 'Day',
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('Day button clicked');
                    var touchCalendarViewWidget = button.up('#calendarViewContainer').down('#touchCalendarViewWidget');
                    touchCalendarViewWidget.setViewMode('day');
                    touchCalendarViewWidget.updateViewMode('day');
                  }
                }
              },
              {
                xtype: 'button',
                text: 'SWE&nbsp;<span class="squarebox SWE">&nbsp;&nbsp;</span>',
                align: 'right',
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('SWE button tapped');
                  }
                }
              },
              {
                xtype: 'button',
                text: 'IMS&nbsp;<span class="squarebox IMS">&nbsp;&nbsp;</span>',
                align: 'right',
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('IMS button tapped');
                  }
                }
              },
              {
                xtype: 'button',
                text: 'DGM&nbsp;<span class="squarebox DGM">&nbsp;&nbsp;</span>',
                align: 'right',
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('DGM button tapped');
                  }
                }
              }
            ]
          },
          {
            docked: 'bottom',
            xtype: 'titlebar',
            cls: 'inner-toolbar',
            style: {
              border: 'none'
            }
          },
          {
            xtype: 'calendar',
            itemId: 'touchCalendarViewWidget',
            width: '100%',
            height: '100%',
            listeners: {
              periodchange: function (calendarView, minDate, maxDate, direction, eOpts) {
                console.log("periodchange");
                console.log("minDate: " + minDate);
                console.log("maxDate: " + maxDate);

                var tempDate = new Date(minDate);
                var dateString = tempDate.getFullYear() + "-" + (tempDate.getMonth()+1) + "-" + tempDate.getDate();

                console.log(calendarView.getViewMode());
                console.log(dateString);
                ALMITOnTheGo.app.getController('Calendar').onCalendarViewDetailsCommand(calendarView.getViewMode(), dateString);
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
            enableSimpleEvents: {
              multiEventDots: false
            }
          }
        ]
      }
    ]
  }
});
