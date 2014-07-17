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
    'Ext.field.Hidden',
    'Ext.field.Toggle'
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
                xtype: 'togglefield',
                itemId: 'calendarToggle',
                width: '7em',
                value: 1,
                listeners: {
                  change: function(field, newValue, oldValue) {
                    console.log('Value of this toggle has changed from ' + oldValue + ' to ' + newValue);

                    if(field.up('#calendarViewContainer')) {
                      var touchCalendarViewWidget = field.up('#calendarViewContainer').down('#touchCalendarViewWidget');
                      if(newValue == 1) {
                        touchCalendarViewWidget.setViewMode('month');
                        touchCalendarViewWidget.updateViewMode('month');
                      } else {
                        touchCalendarViewWidget.setViewMode('week');
                        touchCalendarViewWidget.updateViewMode('week');
                      }
                    }
                  }
                }
              },
              {
                xtype: 'fixedbutton',
                itemId: 'SWEButton',
                text: 'SWE&nbsp;<span class="squarebox SWE">&nbsp;&nbsp;</span>',
                align: 'right',
                hidden: true,
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('SWE button tapped');
                    button.up('#calendarViewContainer').down('#concentrationCode').setValue('SWE');
                    button.setText('SWE&nbsp;<span class="squarebox SWE">&nbsp;&nbsp;</span>');
                    button.up('#calendarViewContainer').down('#IMSButton').setText('IMS&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>');
                    button.up('#calendarViewContainer').down('#DGMButton').setText('DGM&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>');
                    button.up('#calendarViewContainer').down('#touchCalendarViewWidget').setViewMode('month');
                    button.up('#calendarViewContainer').down('#touchCalendarViewWidget').updateViewMode('month');
                    button.up('#calendarViewContainer').down('#calendarToggle').setValue(1);
                    ALMITOnTheGo.app.getController('Calendar').onCalendarViewDetailsCommand('month', 'current', 'current');
                  }
                }
              },
              {
                xtype: 'fixedbutton',
                itemId: 'IMSButton',
                text: 'IMS&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>',
                align: 'right',
                hidden: true,
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('IMS button tapped');
                    button.up('#calendarViewContainer').down('#concentrationCode').setValue('IMS');
                    button.setText('IMS&nbsp;<span class="squarebox IMS">&nbsp;&nbsp;</span>');
                    button.up('#calendarViewContainer').down('#SWEButton').setText('SWE&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>');
                    button.up('#calendarViewContainer').down('#DGMButton').setText('DGM&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>');
                    button.up('#calendarViewContainer').down('#touchCalendarViewWidget').setViewMode('month');
                    button.up('#calendarViewContainer').down('#touchCalendarViewWidget').updateViewMode('month');
                    button.up('#calendarViewContainer').down('#calendarToggle').setValue(1);
                    ALMITOnTheGo.app.getController('Calendar').onCalendarViewDetailsCommand('month', 'current', 'current');
                  }
                }
              },
              {
                xtype: 'fixedbutton',
                itemId: 'DGMButton',
                text: 'DGM&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>',
                align: 'right',
                hidden: true,
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('DGM button tapped');
                    button.up('#calendarViewContainer').down('#concentrationCode').setValue('DGM');
                    button.setText('DGM&nbsp;<span class="squarebox DGM">&nbsp;&nbsp;</span>');
                    button.up('#calendarViewContainer').down('#SWEButton').setText('SWE&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>');
                    button.up('#calendarViewContainer').down('#IMSButton').setText('IMS&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>');
                    button.up('#calendarViewContainer').down('#touchCalendarViewWidget').setViewMode('month');
                    button.up('#calendarViewContainer').down('#touchCalendarViewWidget').updateViewMode('month');
                    button.up('#calendarViewContainer').down('#calendarToggle').setValue(1);
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
