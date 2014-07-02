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
                  labelWidth: '85%'
                },
                centered: true,
                items: [
                  {
                    xtype: 'radiofield',
                    name: 'concentration',
                    value: 1,
                    label: 'Software Engineering',
                    checked: true
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
                    label: 'Mathematics & Computation'
                  },
                  {
                    xtype: 'radiofield',
                    name: 'concentration',
                    value: 4,
                    label: 'Digital Media & Instructional Design'
                  },
                  {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Select Concentration',
                    style: {
                      fontSize: '80%'
                    }
                  },
                  {
                    docked: 'bottom',
                    xtype: 'titlebar',
                    items: [
                      {
                        xtype: 'button',
                        text: 'Next',
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
                  labelWidth: '85%'
                },
                centered: true,
                items: [
                  {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Select Category',
                    style: {
                      fontSize: '80%'
                    }
                  },
                  {
                    docked: 'bottom',
                    xtype: 'titlebar',
                    items: [
                      {
                        xtype: 'button',
                        text: 'Back',
                        itemId: 'categoryBackButton',
                        align: 'left',
                        hidden: true
                      },
                      {
                        xtype: 'button',
                        text: 'Next',
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
                  labelWidth: '85%'
                },
                centered: true,
                items: [
                  {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Select Course Term',
                    style: {
                      fontSize: '80%'
                    }
                  },
                  {
                    docked: 'bottom',
                    xtype: 'titlebar',
                    items: [
                      {
                        xtype: 'button',
                        text: 'Back',
                        itemId: 'courseTermBackButton',
                        align: 'left'
                      },
                      {
                        xtype: 'button',
                        text: 'Next',
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
                centered: true,
                items: [
                  {
                    xtype: 'label',
                    itemId: 'courseSearchLabel',
                    style: {
                      fontWeight: 'bold',
                      fontSize: '80%',
                      padding: '0.5em',
                      textAlign: 'left'
                    }
                  },
                  {
                    xtype: 'list',
                    itemId: 'viewCoursesList',
                    hidden: true,
                    height: window.innerHeight / 2,
                    mode: 'MULTI',
                    itemTpl: new Ext.XTemplate(
                      '<p><b>{course_code}</b></p>',
                      '<p><span style="font-size: 80%">{course_title}</span></p>',
                      '<p><span style="font-size: 80%;font-style:italic;">{course_term_label}</span></p>',
                      '<p style="margin-top:0.2em;">',
                      '<tpl for="attributes_array">',
                      '<span class="squarebox {.}">{.}</span>&nbsp;&nbsp;',
                      '</tpl>',
                      '</p>'),
                    store: null,
                    useSimpleItems: true,
                    disableSelection: false,
                    onItemDisclosure: true,
                    listeners : {
                      itemtap : function(list, index, target, record, e) {
                        if (e.getTarget('.x-list-disclosure')) {
                          list.up('#coursesViewPanel').fireEvent('viewCoursesListItemDiscloseCommand', list, index, target, record, e);
                        } else {
                          list.up('#coursesViewPanel').fireEvent('viewCoursesListItemTapCommand', list, index, target, record, e);
                        }
                      }
                    }
                  },
                  {
                    xtype: 'label',
                    itemId: 'courseSearchNoResultsLabel',
                    hidden: true,
                    style: {
                      fontWeight: 'bold',
                      fontSize: '110%',
                      padding: '1em',
                      textAlign: 'center',
                      color: 'red'
                    },
                    html: 'No Matching Items'
                  },
                  {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Search Course Results',
                    style: {
                      fontSize: '80%'
                    }
                  },
                  {
                    docked: 'bottom',
                    xtype: 'titlebar',
                    items: [
                      {
                        xtype: 'button',
                        text: 'Back',
                        itemId: 'courseResultsBackButton',
                        align: 'left'
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
                    style: {
                      fontSize: '80%'
                    }
                  },
                  {
                    docked: 'bottom',
                    xtype: 'titlebar',
                    items: [
                      {
                        xtype: 'button',
                        text: 'Back',
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
      }
    ]
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
  },
  onViewCoursesListItemTap: function () {
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('viewCoursesListItemTapCommand');
    });

    task.delay(500);
  }
});