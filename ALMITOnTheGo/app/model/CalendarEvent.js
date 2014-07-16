Ext.define('ALMITOnTheGo.model.CalendarEvent', {
  extend: 'Ext.data.Model',
  config: {
    fields: [
      {
        name: 'courseID',
        type: 'int'
      },
      {
        name: 'event',
        type: 'string'
      },
      {
        name: 'title',
        type: 'string'
      },
      {
        name: 'start',
        type: 'date',
        dateFormat: 'c'
      },
      {
        name: 'end',
        type: 'date',
        dateFormat: 'c'
      },
      {
        name: 'css',
        type: 'string'
      },
      {
        name: 'singleDateDay',
        type: 'string'
      },
      {
        name: 'singleDate',
        type: 'string'
      },
      {
        name: 'userAddedCourse',
        type: 'boolean'
      }
    ]
  }
});