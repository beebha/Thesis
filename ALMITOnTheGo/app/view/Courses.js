Ext.define('ALMITOnTheGo.view.Courses', {
  extend: 'Ext.Panel',
  xtype: 'coursesView',
  requires: [
    'Ext.field.Radio'
  ],
  config: {
    width: '100%',
    height: '100%',
    items: [
      {
        xtype: 'panel',
        itemId: 'coursesCardPanel',
        layout: 'card',
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
                centered: true,
                defaults: {
                  labelWidth: '95%',
                  labelAlign: 'right'
                },
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
                centered: true,
                defaults: {
                  labelWidth: '95%',
                  labelAlign: 'right'
                },
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
                centered: true,
                defaults: {
                  labelWidth: '95%',
                  labelAlign: 'right'
                },
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
                      '<div><b>{course_code}</b><br>',
                      '<span style="font-size: 80%">',
                        '{course_title}</span>',
                      '<span style="float:right;margin-right:2em;">',
                      '<tpl for="attributes_array">',
                        '<span class="squarebox {.}">{.}</span>&nbsp;&nbsp;',
                      '</tpl>',
                      '</span><br>',
                      '<span style="font-size: 80%;font-style:italic">{course_term_label}</span></div>'),
                    store: null,
                    useSimpleItems: true,
                    disableSelection: false,
                    onItemDisclosure: true
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
        delegate: '#viewCoursesList',
        event: 'itemtap',
        fn: 'onViewCoursesListItemTap'
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
  onViewCoursesListItemTap: function () {
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('viewCoursesListItemTapCommand');
    });

    task.delay(500);
  }
});