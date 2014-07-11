
var day = (new Date()).getDate(),
  month = (new Date()).getMonth(),
  year = (new Date()).getFullYear();

Ext.define('ALMITOnTheGo.store.CalendarEvents', {
  extend: 'Ext.data.Store',
  config: {
    storeId: 'calendarEventsStore',
    model: 'ALMITOnTheGo.model.CalendarEvent',
    data: [{
      event: '8.03 - 8:05',
      title: 'Event Name 1',
      start: new Date(year, month, day, 8, 3),
      end: new Date(year, month, day, 8, 5),
      css: 'red'
    }, {
      event: '7:00 - 7:05',
      title: 'Event Name 2',
      start: new Date(year, month, day, 7, 0),
      end: new Date(year, month, day, 7, 5),
      css: 'blue'
    }, {
      event: '7:00 - 7:10',
      title: 'Event Name 3',
      start: new Date(year, month, day, 7, 0),
      end: new Date(year, month, day, 7, 10),
      css: 'green'
    }, {
      event: '7:06 - 7:15',
      title: 'Event Name 4',
      start: new Date(year, month, day, 7, 6),
      end: new Date(year, month, day, 7, 15),
      css: 'green'
    }, {
      event: '19.00 - 20:30',
      title: 'Event Name 5',
      start: new Date(year, month, day-2, 19, 0),
      end: new Date(year, month, day-2, 20, 30),
      css: 'blue'
    }, {
      event: '13:15 - 14:05',
      title: 'Event Name 6',
      start: new Date(year, month, day-11, 13, 15),
      end: new Date(year, month, day-11, 14, 5),
      css: 'blue'
    }, {
      event: '15:00 - 16:10',
      title: 'Event Name 7',
      start: new Date(year, month, day+2, 15, 0),
      end: new Date(year, month, day+2, 16, 10),
      css: 'green'
    }, {
      event: '00:00 - 00:00',
      title: 'Event Name 8',
      start: new Date(year, month, day+6, 0, 0),
      end: new Date(year, month, day+7, 0, 0),
      css: 'red'
    }]
  }
});