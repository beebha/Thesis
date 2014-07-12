Ext.define('ALMITOnTheGo.view.Calendar', {
  extend: 'Ext.Panel',
  xtype: 'calendarView',
  requires: [
    'Ext.ux.TouchCalendar',
    'Ext.ux.TouchCalendarView',
    'Ext.ux.TouchCalendarEvents',
    'Ext.ux.TouchCalendarMonthEvents',
    'Ext.ux.TouchCalendarWeekEvents',
    'Ext.ux.TouchCalendarDayEvents'
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
                    var touchCalendarViewWidget = button.up('#calendarViewContainer').down('#touchCalendarViewWidget');
                    touchCalendarViewWidget.setViewMode('month');
                  }
                }
              },
              {
                xtype: 'button',
                text: 'Week',
                listeners : {
                  tap : function(button, e, eOpts) {
                    var touchCalendarViewWidget = button.up('#calendarViewContainer').down('#touchCalendarViewWidget');
                    button.up('#calendarViewContainer').down('#touchCalendarViewWidget').setViewMode('week');
                  }
                }
              },
              {
                xtype: 'button',
                text: 'Day',
                listeners : {
                  tap : function(button, e, eOpts) {
                    var touchCalendarViewWidget = button.up('#calendarViewContainer').down('#touchCalendarViewWidget');
                    touchCalendarViewWidget.setViewMode('day');
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
          }
        ]
      }
    ]
  }
});
