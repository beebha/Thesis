Ext.define('ALMITOnTheGo.view.Courses', {
  extend: 'Ext.Panel',
  xtype: 'coursesView',
  requires: [
    'Ext.field.Radio'
  ],
  config: {
    width: '100%',
    height: '100%',
    itemId: 'coursesViewPanel',
    items: [
      {
        xtype: 'panel',
        itemId: 'coursesCardPanel',
        layout:{
          type:'card',
          animation:{
            type:'slide',
            direction: 'left'
          }
        },
        width: '100%',
        height: '100%',
        items: [
          {
            xtype: 'panel',
            itemId: 'selectConcentrationPanel',
            hidden: true,
            layout: 'vbox',
            items: [
              {
                xtype: 'fieldset',
                itemId: 'selectConcentrationFieldSet',
                width: '95%',
                defaults: {
                  labelWidth: '88%'
                },
                centered: true,
                items: [
                  {
                    xtype: 'radiofield',
                    name: 'concentration',
                    value: 1,
                    label: 'Software Engineering'
                  },
                  {
                    xtype: 'radiofield',
                    name: 'concentration',
                    value: 2,
                    label: 'Information Management Systems'
                  },
                  {
                    xtype: 'radiofield',
                    name: 'concentration',
                    value: 3,
                    label: 'Mathematics And Computation'
                  },
                  {
                    xtype: 'radiofield',
                    name: 'concentration',
                    value: 4,
                    label: 'Digital Media And Instructional Design'
                  },
                  {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Select Concentration',
                    cls: 'inner-toolbar',
                    style: {
                      border: 'none'
                    }
                  },
                  {
                    docked: 'bottom',
                    xtype: 'titlebar',
                    cls: 'inner-toolbar',
                    style: {
                      border: 'none'
                    },
                    items: [
                      {
                        xtype: 'button',
                        iconCls: 'arrow_right inner-toolbar-button',
                        iconMask: true,
                        itemId: 'coursesNextButton',
                        align: 'right'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            xtype: 'panel',
            itemId: 'selectCategoryPanel',
            hidden: true,
            layout: 'vbox',
            items: [
              {
                xtype: 'fieldset',
                itemId: 'selectCategoryFieldSet',
                width: '95%',
                defaults: {
                  labelWidth: '88%'
                },
                centered: true,
                items: [
                  {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Select Category',
                    cls: 'inner-toolbar',
                    style: {
                      border: 'none'
                    }
                  },
                  {
                    docked: 'bottom',
                    xtype: 'titlebar',
                    cls: 'inner-toolbar',
                    style: {
                      border: 'none'
                    },
                    items: [
                      {
                        xtype: 'button',
                        iconCls: 'arrow_left inner-toolbar-button',
                        iconMask: true,
                        itemId: 'categoryBackButton',
                        align: 'left',
                        hidden: true
                      },
                      {
                        xtype: 'button',
                        iconCls: 'arrow_right inner-toolbar-button',
                        iconMask: true,
                        itemId: 'categoryNextButton',
                        align: 'right'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            xtype: 'panel',
            itemId: 'selectCourseTermPanel',
            hidden: true,
            layout: 'vbox',
            items: [
              {
                xtype: 'fieldset',
                itemId: 'selectCourseTermFieldSet',
                width: '95%',
                defaults: {
                  labelWidth: '88%'
                },
                centered: true,
                items: [
                  {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Select Course Term',
                    cls: 'inner-toolbar',
                    style: {
                      border: 'none'
                    }
                  },
                  {
                    docked: 'bottom',
                    xtype: 'titlebar',
                    cls: 'inner-toolbar',
                    style: {
                      border: 'none'
                    },
                    items: [
                      {
                        xtype: 'button',
                        iconCls: 'arrow_left inner-toolbar-button',
                        iconMask: true,
                        itemId: 'courseTermBackButton',
                        align: 'left'
                      },
                      {
                        xtype: 'button',
                        iconCls: 'arrow_right inner-toolbar-button',
                        iconMask: true,
                        itemId: 'courseTermNextButton',
                        align: 'right'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            xtype: 'panel',
            itemId: 'viewCoursesListPanel',
            hidden: true,
            layout: 'vbox',
            items: [
              {
                xtype: 'fieldset',
                itemId: 'viewCoursesFieldSet',
                width: '95%',
                height:'96%',
                centered: true,
                items: [
                  {
                    xtype: 'label',
                    itemId: 'courseSearchLabel',
                    cls: 'search-results-label'
                  },
                  {
                    xtype: 'list',
                    itemId: 'viewCoursesList',
                    hidden: true,
                    height: '95%',
                    itemTpl: new Ext.XTemplate(
                      '<div class="custom-square-checkbox">',
                      '<input type="checkbox" value="{course_id}" id="chkCourse{course_id}"/>',
                      '<label for="chkCourse{course_id}"></label>',
                      '<span style="font-weight: bold;white-space: nowrap;margin-left:25px;">{course_code}</span>',
                      '</div>',
                      '<p><span style="font-size: 80%;">{course_title}</span></p>',
                      '<p><span style="font-size: 80%;font-style:italic;">{course_term_label}</span></p>',
                      '<p style="margin-top:0.2em;">',
                      '<tpl for="attributes_array">',
                      '<span class="squarebox {.}">{.}</span>&nbsp;&nbsp;',
                      '</tpl>',
                      '</p>'),
                    store: null,
                    useSimpleItems: true,
                    disableSelection: true,
                    onItemDisclosure: true,
                    listeners : {
                      itemtap : function(list, index, target, record, e) {
                        if (e.getTarget('.x-list-disclosure')) {
                          list.up('#coursesViewPanel').fireEvent('viewCoursesListItemDiscloseCommand', list, index, target, record, e);
                        } else if (e.getTarget('.x-innerhtml')) {
                          list.up('#coursesViewPanel').fireEvent('viewCoursesListItemTapCommand', list, index, target, record, e);
                        }
                      }
                    }
                  },
                  {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Search Course Results',
                    cls: 'inner-toolbar',
                    style: {
                      border: 'none'
                    }
                  },
                  {
                    docked: 'bottom',
                    xtype: 'titlebar',
                    cls: 'inner-toolbar',
                    style: {
                      border: 'none'
                    },
                    items: [
                      {
                        xtype: 'button',
                        iconCls: 'arrow_left inner-toolbar-button',
                        itemId: 'courseResultsBackButton',
                        align: 'left'
                      },
                      {
                        xtype: 'button',
                        text: 'VIEW CONFLICTS',
                        itemId: 'viewConflictsButton',
                        align: 'right',
                        listeners : {
                          tap : function(button, e, eOpts) {
                            button.up('#coursesViewPanel').fireEvent('viewConflictsButtonCommand');
                          }
                        }
                      },
                      {
                        xtype: 'button',
                        iconCls: 'calendar inner-toolbar-button',
                        iconAlign: 'right',
                        text: 'ADD TO',
                        itemId: 'addToCalendarButton',
                        align: 'right'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            xtype: 'panel',
            itemId: 'viewCourseDetailPanel',
            hidden: true,
            items: [
              {
                xtype: 'fieldset',
                itemId: 'viewCourseDetailFieldSet',
                width: '95%',
                centered: true,
                defaults: {
                  labelWidth: '25%'
                },
                items: [
                  {
                    xtype: 'textfield',
                    label: 'Title',
                    itemId: 'courseTitle',
                    readOnly: true
                  },
                  {
                    xtype: 'textfield',
                    label: 'Code',
                    itemId: 'courseCode',
                    readOnly: true
                  },
                  {
                    xtype: 'textfield',
                    label: 'Term',
                    itemId: 'courseTerm',
                    readOnly: true
                  },
                  {
                    xtype: 'textfield',
                    label: 'Day',
                    itemId: 'courseDay',
                    readOnly: true
                  },
                  {
                    xtype: 'textfield',
                    label: 'Time',
                    itemId: 'courseTime',
                    readOnly: true
                  },
                  {
                    xtype: 'textfield',
                    label: 'Location',
                    itemId: 'courseLocation',
                    readOnly: true
                  },
                  {
                    xtype: 'textfield',
                    label: 'Type',
                    itemId: 'courseType',
                    readOnly: true
                  },
                  {
                    xtype: 'textfield',
                    label: 'Instructor',
                    itemId: 'courseInstructor',
                    readOnly: true
                  },
                  {
                    xtype: 'textfield',
                    label: 'Limit',
                    itemId: 'courseLimit',
                    readOnly: true
                  },
                  {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Course Details',
                    cls: 'inner-toolbar',
                    style: {
                      border: 'none'
                    }
                  },
                  {
                    docked: 'bottom',
                    xtype: 'titlebar',
                    cls: 'inner-toolbar',
                    style: {
                      border: 'none'
                    },
                    items: [
                      {
                        xtype: 'button',
                        iconCls: 'arrow_left inner-toolbar-button',
                        iconMask: true,
                        itemId: 'courseDetailBackButton',
                        align: 'left'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    listeners: [
      {
        delegate: '#coursesNextButton',
        event: 'tap',
        fn: 'onCoursesNextButton'
      },
      {
        delegate: '#categoryBackButton',
        event: 'tap',
        fn: 'onCategoryBackButton'
      },
      {
        delegate: '#categoryNextButton',
        event: 'tap',
        fn: 'onCategoryNextButton'
      },
      {
        delegate: '#courseTermBackButton',
        event: 'tap',
        fn: 'onCourseTermBackButton'
      },
      {
        delegate: '#courseTermNextButton',
        event: 'tap',
        fn: 'onCourseTermNextButton'
      },
      {
        delegate: '#courseResultsBackButton',
        event: 'tap',
        fn: 'onCourseResultsBackButton'
      },
      {
        delegate: '#courseDetailBackButton',
        event: 'tap',
        fn: 'onCourseDetailBackButton'
      },
      {
        delegate: '#addToCalendarButton',
        event: 'tap',
        fn: 'onAddToCalendarButton'
      }
    ]
  },
  onViewConflictsButton: function () {
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      alert("firing viewConflictsButtonCommand");
      me.fireEvent('viewConflictsButtonCommand');
    });

    task.delay(500);
  },
  onAddToCalendarButton: function () {
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('addToCalendarButtonCommand');
    });

    task.delay(500);
  },
  onCoursesNextButton: function () {
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('coursesNextButtonCommand');
    });

    task.delay(500);
  },
  onCategoryBackButton: function () {
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('categoryBackButtonCommand');
    });

    task.delay(500);
  },
  onCategoryNextButton: function () {
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('categoryNextButtonCommand');
    });

    task.delay(500);
  },
  onCourseTermBackButton: function () {
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('courseTermBackButtonCommand');
    });

    task.delay(500);
  },
  onCourseTermNextButton: function () {
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('courseTermNextButtonCommand');
    });

    task.delay(500);
  },
  onCourseResultsBackButton: function () {
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('courseResultsBackButtonCommand');
    });

    task.delay(500);
  },
  onCourseDetailBackButton: function () {
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('courseDetailBackButtonCommand');
    });

    task.delay(500);
  }
});