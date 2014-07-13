var day = (new Date()).getDate(), month = (new Date()).getMonth(), year = (new Date()).getFullYear();
Ext.define('ALMITOnTheGo.store.CalendarEvents', {
  extend: 'Ext.data.Store',
  config: {
    storeId: 'calendarEventsStore',
    model: 'ALMITOnTheGo.model.CalendarEvent',
    data: [
      {
        event: '0.00 - 0.01 am',
        title: 'Sample Event Name',
        start: new Date(year, month, day, 0, 0),
        end: new Date(year, month, day, 0, 1),
        css: 'temp'
      }
    ]
  }
});