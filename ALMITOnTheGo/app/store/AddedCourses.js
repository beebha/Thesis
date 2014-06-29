Ext.define('ALMITOnTheGo.store.AddedCourses', {
  extend: 'Ext.data.Store',
  config: {
    storeId: 'addedCoursesStore',
    fields: ['course_id', 'course_code', 'course_title', 'attributes', 'course_term_label', 'grade_id', 'grade_label', 'gpa'],
    sorters: 'course_code',
    data: []
  }
});