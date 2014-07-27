Ext.define('ALMITOnTheGo.store.ViewCourses', {
  extend: 'Ext.data.Store',
  config: {
    storeId: 'viewCoursesStore',
    fields: [
      'course_id',
      'course_code',
      'course_title',
      'attributes',
      'attributes_array',
      'course_term_id',
      'course_term_label',
      'course_day',
      'course_limit',
      'course_time',
      'course_type',
      'instructors',
      'location'
    ],
    sorters: ['course_term_id', 'course_code'],
    data: []
  }
});