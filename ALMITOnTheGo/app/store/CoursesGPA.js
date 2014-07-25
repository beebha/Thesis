Ext.define('ALMITOnTheGo.store.CoursesGPA', {
  extend: 'Ext.data.Store',
  config: {
    storeId: 'courseGPAStore',
    fields: ['course_term_label', 'course_term_id', 'gpa_x_label', 'gpa'],
    sorters: ['course_term_id'],
    data: []
  }
});