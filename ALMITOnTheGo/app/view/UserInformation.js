Ext.define('ALMITOnTheGo.view.UserInformation', {
  extend: 'Ext.Panel',
  xtype: 'userInformationView',
  requires: [
    'Ext.form.FieldSet',
    'Ext.Label',
    'Ext.Img',
    'Ext.List',
    'Ext.field.Hidden',
    'Ext.util.DelayedTask'
  ],
  config: {
    title: 'User Information',
    items: [
      {
        xtype: 'titlebar',
        title: 'User Information',
        docked: 'top'
      },
      {
        xtype: 'panel',
        itemId: 'reviewUserInformationMsgPanel',
        modal: true,
        hideOnMaskTap: true,
        showAnimation: {
          type: 'popIn',
          duration: 250,
          easing: 'ease-out'
        },
        hideAnimation: {
          type: 'popOut',
          duration: 250,
          easing: 'ease-out'
        },
        centered: true,
        width: 300,
        height: 300,
        styleHtmlContent: true,
        html: '<p><b>Please review all information</b><br><br>' +
          'Click <b>Back</b> to make changes.<br>' +
          'Click <b>Done</b> to start using this application.<br><br>' +
          'Tap anywhere outside this alert to dismiss this message.</p>',
        items: [
          {
            docked: 'top',
            xtype: 'toolbar',
            title: 'Review',
            style: {
              fontSize : '80%'
            }
          }
        ]
      },
      {
        xtype: 'container',
        itemId: 'reviewUserInformationContainer',
        hidden: true,
        width: '80%',
        layout: 'fit',
        centered: true,
        items: [
          {
            xtype: 'fieldset',
            items: [
              {
                xtype: 'textfield',
                label: 'Registration Type',
                itemId: 'registration',
                readOnly: true
              },
              {
                xtype: 'textfield',
                label: 'Concentration',
                itemId: 'concentration',
                readOnly: true
              },
              {
                xtype: 'textfield',
                label: 'Current GPA',
                itemId: 'currentGPA',
                name: 'currentGPA',
                readOnly: true
              },
              {
                xtype: 'hiddenfield',
                itemId: 'concentrationID',
                name: 'concentrationID'
              },
              {
                xtype: 'hiddenfield',
                itemId: 'registrationType',
                name: 'registrationType'
              }
            ]
          },
          {
            xtype: 'fieldset',
            title: 'Completed Courses',
            items: [
              {
                xtype: 'list',
                height: window.innerHeight / 5,
                width: '100%',
                itemId: 'completedCoursesList',
                itemTpl: new Ext.XTemplate(
                  '<div style="font-weight: bold;">{course_code}',
                  '<span style="float: right; font-size: 80%; padding-right:3em;">',
                  '<i>{grade_label}</i>',
                  '</span>',
                  '</div>',
                  '<div style="font-weight: lighter; font-size: 80%">{course_title} [{course_term_label}]</div>'
                ),
                store: {
                  storeId: 'completedCoursesStore',
                  fields: ['course_id', 'course_code', 'course_title', 'course_term_label', 'grade_id', 'grade_label'],
                  sorters: 'course_code',
                  data: []
                },
                emptyText: '<div style="font-size: 120%; color: grey">No Completed Courses</div>',
                disableSelection: true
              }
            ]
          },
          {
            xtype: 'fieldset',
            title: 'Registered Courses',
            items: [
              {
                xtype: 'list',
                height: window.innerHeight / 5,
                width: '100%',
                itemId: 'registeredCoursesList',
                itemTpl: new Ext.XTemplate(
                  '<div style="font-weight: bold;">{course_code}',
                  '<span style="float: right; font-size: 80%; padding-right:3em;">',
                  '<i>{grade_label}</i>',
                  '</span>',
                  '</div>',
                  '<div style="font-weight: lighter; font-size: 80%">{course_title} [{course_term_label}]</div>'
                ),
                store: {
                  storeId: 'registeredCoursesStore',
                  fields: ['course_id', 'course_code', 'course_title', 'course_term_label', 'grade_id', 'grade_label'],
                  sorters: 'course_code',
                  data: []
                },
                emptyText: '<div style="font-size: 120%; color: grey">No Registered Courses</div>',
                disableSelection: true
              }
            ]
          }
        ]
      },
      {
        docked: 'bottom',
        xtype: 'titlebar',
        items: [
          {
            xtype: 'button',
            text: 'Done',
            itemId: 'doneButton',
            align: 'right',
            hidden: true
          },
          {
            xtype: 'button',
            text: 'Back',
            itemId: 'backButton',
            align: 'left',
            hidden: true
          }
        ]
      }
    ],
    listeners: [
      {
        delegate: '#backButton',
        event: 'tap',
        fn: 'onBackButtonTap'
      },
      {
        delegate: '#doneButton',
        event: 'tap',
        fn: 'onDoneButtonTap'
      },
      {
        delegate: '#reviewUserInformationMsgPanel',
        event: 'hide',
        fn: 'onReviewUserInformationMsgPanelHide'
      }
    ]
  },
  onReviewUserInformationMsgPanelHide: function () {
    var me = this;
    me.down('#completedCoursesList').refresh();
    me.down('#registeredCoursesList').refresh();
    me.down('#reviewUserInformationContainer').show();
    me.down('#backButton').show();
    me.down('#doneButton').show();
  },
  onBackButtonTap: function () {
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('backButtonCommand');
    });

    task.delay(500);
  },
  onDoneButtonTap: function () {
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('doneButtonCommand', me);
    });

    task.delay(500);
  }
});