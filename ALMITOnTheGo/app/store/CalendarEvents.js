Ext.define('ALMITOnTheGo.store.CourseCalendarEvents', {
  extend: 'Ext.data.Store',
  config: {
    storeId: 'allEventsStore',
    model: 'ALMITOnTheGo.model.CalendarEvent',
    data: []
  }
});