Ext.define('ALMITOnTheGo.view.Grades', {
  extend: 'Ext.Panel',
  xtype: 'gradesView',
  config: {
    width: '100%',
    height: '100%',
    items: [
      {
        xtype: 'container',
        itemId: 'gradesContainer',
        layout: 'vbox',
        width: '97%',
        centered: true,
        items: [
          {
            xtype: 'fieldset',
            itemId: 'userGPAFieldSet',
            items: [
              {
                xtype: 'textfield',
                label: 'GPA',
                itemId: 'userGPA',
                readOnly: true
              }
            ]
          },
          {
            xtype: 'fieldset',
            items: [
              {
                xtype: 'list',
                itemId: 'gradesCoursesList',
                height: window.innerHeight / 2,
                width: '100%',
                itemTpl: new Ext.XTemplate(
                  '<div style="font-weight: bold;">{course_code}',
                  '<span style="float: right; font-size: 80%; padding-right:0.2em;">',
                  '<i>{grade_label}</i>',
                  '</span>',
                  '</div>',
                  '<div style="font-weight: lighter; font-size: 80%">{course_title}</div>',
                  '<div style="font-style:italic;font-size: 80%">{course_term_label}</div>'
                ),
                store: {
                  storeId: 'gradesCoursesStore',
                  fields: ['course_code', 'course_title', 'grade_label', 'course_term_label'],
                  sorters: 'course_code',
                  data: []
                },
                emptyText: '<div style="font-size: 120%; color: grey">No Completed Courses</div>',
                disableSelection: true
              }
            ]
          }
        ]
      }
    ]
  }
});
