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
        xtype: 'container',
        itemId: 'userInformationContainer',
        hidden: true,
        width: '97%',
        layout: 'vbox',
        centered: true,
        items: [
          {
            xtype: 'fieldset',
            style: {
              marginTop: '0.8em'
            },
            items: [
              {
                xtype: 'textfield',
                itemId: 'registration',
                labelWidth: '0%',
                readOnly: true
              },
              {
                xtype: 'textfield',
                itemId: 'concentration',
                labelWidth: '0%',
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
            style: {
              marginTop: '-1em'
            },
            items: [
              {
                xtype: 'titlebar',
                docked: 'top',
                height: '1em',
                title: 'Completed Courses',
                cls: 'inner-toolbar',
                style: {
                  border: 'none'
                },
                items: [
                  {
                    xtype: 'fixedbutton',
                    text: 'EDIT',
                    itemId: 'completedEditButton',
                    align: 'right'
                  }
                ]
              },
              {
                xtype: 'list',
                height: (window.innerHeight / 5) - 5,
                width: '100%',
                itemId: 'completedCoursesList',
                itemTpl: new Ext.XTemplate(
                  '<div style="font-weight: bold;">{course_code}',
                  '<span style="float: right;font-size:90%;height:1.6em;margin-right:0.2em;" class="squarebox grade">',
                  '<i>{grade_label}</i>',
                  '</span>',
                  '</div>',
                  '<div style="font-weight: lighter; font-size: 80%">{course_title}</div>',
                  '<div style="font-style: italic; font-size: 80%">{course_term_label}</div>'
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
            style: {
              marginTop: '-1em'
            },
            items: [
              {
                xtype: 'titlebar',
                docked: 'top',
                height: '1em',
                title: 'Registered Courses',
                cls: 'inner-toolbar',
                style: {
                  border: 'none'
                },
                items: [
                  {
                    xtype: 'fixedbutton',
                    text: 'EDIT',
                    itemId: 'registeredEditButton',
                    align: 'right'
                  }
                ]
              },
              {
                xtype: 'list',
                height: (window.innerHeight / 5) - 5,
                width: '100%',
                itemId: 'registeredCoursesList',
                itemTpl: new Ext.XTemplate(
                  '<div style="font-weight: bold;">{course_code}</div>',
                  '<div style="font-weight: lighter; font-size: 80%">{course_title}</div>',
                  '<div style="font-style: italic; font-size: 80%">{course_term_label}</div>'
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
        xtype: 'titlebar',
        docked: 'bottom',
        items: [
          {
            xtype: 'fixedbutton',
            text: 'DONE',
            itemId: 'doneButton',
            align: 'right',
            hidden: true
          }
        ]
      }
    ],
    listeners: [
      {
        delegate: '#doneButton',
        event: 'tap',
        fn: 'onDoneButtonTap'
      },
      {
        delegate: '#completedEditButton',
        event: 'tap',
        fn: 'onEditButtonTap'
      },
      {
        delegate: '#registeredEditButton',
        event: 'tap',
        fn: 'onEditButtonTap'
      }

    ]
  },
  onUserInformationPanelShow: function () {
    var me = this;
    me.down('#completedCoursesList').refresh();
    me.down('#registeredCoursesList').refresh();
    me.down('#userInformationContainer').show();
    me.down('#doneButton').show();
  },
  onEditButtonTap: function () {
    console.log("onEditButtonTap");
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('editButtonCommand');
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