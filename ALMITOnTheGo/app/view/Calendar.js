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
    itemId: 'calendarViewPanel',
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
              border: 'none',
              height: '2.8em'
            },
            items:
            [
              {
                xtype: 'fixedbutton',
                iconCls: 'trash',
                iconAlign: 'right',
                text: 'Switch to',
                itemId: 'editCalendarButton',
                align: 'left',
                hidden: true
              },
              {
                xtype: 'togglefield',
                itemId: 'calendarToggle',
                width: '7em',
                value: 1,
                listeners: {
                  change: function(field, newValue, oldValue) {
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
                itemId: 'viewAddedCoursesButton',
                text: 'View Added Courses',
                align: 'right',
                hidden: true,
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('View Added Courses tapped');
                    var touchCalendarViewWidget = button.up('#calendarViewContainer').down('#touchCalendarViewWidget');
                    var addedCalendarCoursesList = button.up('#calendarViewContainer').down('#addedCalendarCoursesList');
                    var calendarToggleSwitch = button.up('#calendarViewContainer').down('#calendarToggle');
                    var editCalendarButton = button.up('#calendarViewContainer').down('#editCalendarButton');

                    if(touchCalendarViewWidget.isHidden()) {
                      touchCalendarViewWidget.show();
                      calendarToggleSwitch.show();
                      addedCalendarCoursesList.hide();
                      editCalendarButton.hide();
                      button.setText('View Added Courses');
                    } else {
                      touchCalendarViewWidget.hide();
                      calendarToggleSwitch.hide();
                      addedCalendarCoursesList.show();
                      editCalendarButton.show();
                      button.setText('Back to Calendar');
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
          },
          {
            xtype: 'hiddenfield',
            itemId: 'editCalendarMode',
            value: 'NORMAL'
          }
        ]
      }
    ],
    listeners: [
      {
        delegate: '#addedCalendarCoursesList',
        event: 'itemtap',
        fn: 'onAddedCalendarCoursesListItemTap'
      }
    ]
  },
  onAddedCalendarCoursesListItemTap: function (list, index, target, record, e) {
    if (!e.getTarget('.x-list-disclosure')) {
      console.log("onAddedCalendarCoursesListItemTap");
      var me = this;
      var inDeleteMode = me.down('#editCalendarMode').getValue() == 'DELETE';
      if(inDeleteMode) {
        ALMITOnTheGo.app.addedCalendarCoursesStore.remove(record);
        Ext.each(Ext.query("*[id^=courseCalendarDelete]"), function(item) {
          var courseID = item.id.replace("courseCalendarDelete", "");
          Ext.get("courseCalendarDelete"+courseID).show();
          Ext.get("courseCalendar"+courseID).hide();
        });
      } else {

      }
    }
  }
});
