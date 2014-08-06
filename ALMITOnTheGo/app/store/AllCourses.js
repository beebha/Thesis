Ext.define('ALMITOnTheGo.store.AllCourses', {
  extend: 'Ext.data.Store',
  config: {
    storeId: 'allCoursesStore',
    fields: [
      'course_id',
      'course_code',
      'course_title',
      'attributes',
      'course_term_label',
      'grade_id'
    ],
    sorters: 'course_code',
    grouper: function (record)
    {
      return record.get('course_code')[0];
    },
    data: []
  }
});