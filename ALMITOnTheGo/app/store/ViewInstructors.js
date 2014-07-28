Ext.define('ALMITOnTheGo.store.ViewInstructors', {
  extend: 'Ext.data.Store',
  config: {
    storeId: 'viewInstructorsStore',
    fields: [
      'instructor_id',
      'instructor_code',
      'instructor_name',
      'instructor_email',
      'instructor_url',
      'hes_course_ids',
      'course_codes',
      'course_term_ids',
      'course_term_labels',
      'course_titles',
      'course_urls'
    ],
    grouper: function (record) {
      return record.get('instructor_name')[0];
    },
    data: []
  }
});