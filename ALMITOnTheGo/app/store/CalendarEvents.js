Ext.define('ALMITOnTheGo.store.CalendarEvents', {
  extend: 'Ext.data.Store',
  config: {
    storeId: 'calendarEventsStore',
    model: 'ALMITOnTheGo.model.CalendarEvent',
    data: []
  }
});