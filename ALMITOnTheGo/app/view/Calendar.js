Ext.define('ALMITOnTheGo.view.Calendar', {
  extend: 'Ext.Panel',
  xtype: 'calendarView',
  requires: [
    'Ext.ux.TouchCalendar',
    'Ext.ux.TouchCalendarView',
    'Ext.ux.TouchCalendarEvents',
    'Ext.ux.TouchCalendarEventsBase',
    'Ext.ux.TouchCalendarMonthEvents',
    'Ext.ux.TouchCalendarWeekEvents',
    'Ext.ux.TouchCalendarDayEvents',
    'Ext.ux.TouchCalendarSimpleEvents',
    'Ext.field.Hidden'
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
                text: 'M',
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
                text: 'W',
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
                itemId: 'SWEButton',
                text: 'SWE&nbsp;<span class="squarebox SWE">&nbsp;&nbsp;</span>',
                align: 'right',
                hidden: true,
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('SWE button tapped');
                    button.up('#calendarViewContainer').down('#concentrationCode').setValue('SWE');
                    ALMITOnTheGo.app.getController('Calendar').onCalendarViewDetailsCommand('month', 'current', 'current');
                  }
                }
              },
              {
                xtype: 'button',
                itemId: 'IMSButton',
                text: 'IMS&nbsp;<span class="squarebox IMS">&nbsp;&nbsp;</span>',
                align: 'right',
                hidden: true,
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('IMS button tapped');
                    button.up('#calendarViewContainer').down('#concentrationCode').setValue('IMS');
                    ALMITOnTheGo.app.getController('Calendar').onCalendarViewDetailsCommand('month', 'current', 'current');
                  }
                }
              },
              {
                xtype: 'button',
                itemId: 'DGMButton',
                text: 'DGM&nbsp;<span class="squarebox DGM">&nbsp;&nbsp;</span>',
                align: 'right',
                hidden: true,
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('DGM button tapped');
                    button.up('#calendarViewContainer').down('#concentrationCode').setValue('DGM');
                    ALMITOnTheGo.app.getController('Calendar').onCalendarViewDetailsCommand('month', 'current', 'current');
                  }
                }
              }
            ]
          },
          {
            xtype: 'hiddenfield',
            itemId: 'concentrationCode'
          }
        ]
      }
    ]
  }
});
