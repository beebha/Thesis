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
      'courses_details'
    ],
    grouper: function (record) {
      return record.get('instructor_name')[0];
    },
    data: []
  }
});