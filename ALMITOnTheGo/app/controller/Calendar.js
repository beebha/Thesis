Ext.define('ALMITOnTheGo.controller.Calendar',
  {
    extend: 'Ext.app.Controller',
    config: {
      refs: {
        calendarView: 'calendarView'
      },
      control: {
        mainView: {
          calendarViewDetailsCommand: 'onCalendarViewDetailsCommand'
        },
        calendarView: {
          deleteUserCalendarCourseCommand: 'onDeleteUserCalendarCourseCommand'
        }
      }
    },
    onDeleteUserCalendarCourseCommand: function(recordToBeDeleted) {
      console.log("onDeleteUserCalendarCourseCommand");

      ALMITOnTheGo.app.addedCalendarCoursesStore.remove(recordToBeDeleted);

      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL+'app.php?action=deleteCalendarEvents',
        method: 'post',
        params: {
          authToken: ALMITOnTheGo.app.authToken,
          courseID: recordToBeDeleted.data.course_id
        },
        success: function () {
          Ext.each(Ext.query("*[id^=courseCalendarDelete]"), function(item) {
            var courseID = item.id.replace("courseCalendarDelete", "");
            Ext.get("courseCalendarDelete"+courseID).show();
          });
        }
      });
    },
    onShowSelectedEventCommand: function(selectedDate, displayDate) {
      console.log("onCalendarViewDetailsCommand");
      console.log("selectedDate : " + selectedDate);

      var showEventsHtml = "";

      for (var j=0; j<ALMITOnTheGo.app.allEventsStore.getCount(); j++)
      {
        var singleDayRecord = ALMITOnTheGo.app.allEventsStore.getAt(j);
        if(singleDayRecord.get('singleDate') == selectedDate) {
          showEventsHtml  += '<span style="font-size:90%;font-weight:normal;float:left;">'+singleDayRecord.data.title + ': ' + singleDayRecord.data.event;
          showEventsHtml  += singleDayRecord.get('userAddedCourse') ? " [Added]</span><br>" : "</span><br>";
        }
      }

      if(showEventsHtml != "") {
        Ext.Msg.alert(
          displayDate,
          showEventsHtml
        );
      }
    },
    onCalendarViewDetailsCommand: function (viewMode, minDate, maxDate) {
      console.log("onCalendarViewDetailsCommand");

      this.getCalendarView().setMasked({
        xtype: 'loadmask',
        message: '&nbsp;'
      });

      var concentrationCode = this.getCalendarView().down('#concentrationCode').getValue();

      if(concentrationCode != 'SWE' && concentrationCode != 'IMS' && concentrationCode != 'DGM' ) {
        concentrationCode = ALMITOnTheGo.app.defaultConcentrationCode;
        this.getCalendarView().down('#concentrationCode').setValue(concentrationCode);
      }

      this.getCalendarEvents(
        ALMITOnTheGo.app.authToken != null ? ALMITOnTheGo.app.authToken : null,
        ALMITOnTheGo.app.authToken != null ? null : ALMITOnTheGo.app.getController('Common').getConcentrationID(concentrationCode),
        viewMode.toUpperCase(),
        minDate,
        maxDate
      );
    },
    getCalendarEvents: function(authToken, concentrationID, mode, minDate, maxDate) {
      console.log("getCalendarEvents");
      console.log("mode : " + mode);
      console.log("minDate : " + minDate);
      console.log("maxDate : " + maxDate);

      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL+'app.php?action=getCalendarViewDetails',
        method: 'post',
        params: {
          authToken: authToken,
          concentrationID: concentrationID,
          mode: mode,
          minDate: minDate,
          maxDate: maxDate
        },
        success: function (response) {
          var calResponse = Ext.JSON.decode(response.responseText);
          ALMITOnTheGo.app.getController('Calendar').setupCalendarViewPanel(calResponse, mode);
        }
      });
    },
    setupCalendarViewPanel: function(calResponse, mode) {
      console.log("setupCalendarViewPanel");

      var cal = ALMITOnTheGo.app.getController('Calendar');
      var calendarView = cal.getCalendarView();

      ALMITOnTheGo.app.allEventsStore.removeAll();
      ALMITOnTheGo.app.addedCalendarCoursesStore.removeAll();

      var calendarEvents = calResponse.data.calendarEvents;
      for (var i=0; i<calendarEvents.length; i++)
      {
        calendarEvents[i]['start'] = cal.getDateForCalendar(calendarEvents[i]['startDate']);
        calendarEvents[i]['end'] = cal.getDateForCalendar(calendarEvents[i]['endDate']);
        ALMITOnTheGo.app.allEventsStore.addData(calendarEvents[i]);
      }

      var userAddedCalendarCourses = calResponse.data.userAddedCalendarCourses;
      for (var i=0; i<userAddedCalendarCourses.length; i++)
      {
        ALMITOnTheGo.app.addedCalendarCoursesStore.addData(userAddedCalendarCourses[i]);
      }

      var touchCalendar = calendarView.down('#touchCalendarViewWidget');

      if(touchCalendar != null) {
        Ext.each(touchCalendar.items.items, function(singleCalendarView) {
          singleCalendarView.eventStore = ALMITOnTheGo.app.allEventsStore;
          singleCalendarView.syncHeight();
        });

        if(mode == 'WEEK') {
          Ext.each(Ext.query('td.time-block'), function(singleDayElement)
          {
            if(Ext.getDom(singleDayElement).innerHTML.indexOf('simple-event-wrapper') !== -1 )
            {
              var singleDate = Ext.getDom(singleDayElement).getAttribute('datetime');
              var eventsHtml = "";
              var eventCount = 0;

              for (var j=0; j<ALMITOnTheGo.app.allEventsStore.getCount(); j++)
              {
                var singleDayRecord = ALMITOnTheGo.app.allEventsStore.getAt(j);
                if(singleDayRecord.get('singleDate') == singleDate) {
                  if(eventCount == 0) {
                    eventsHtml  += singleDayRecord.data.singleDateDay+"<br>";
                    eventCount++;
                  }

                  var additionalCSSClass = singleDayRecord.get('userAddedCourse') ? "calendar-event" : "";
                  eventsHtml  += '<br><span class="'+additionalCSSClass+'" '+
                              'style="float:left;padding-left:0.2em;font-weight:bold;font-size:60%;text-align:center;">' +
                              singleDayRecord.data.title +
                              '</span><br><span class="'+additionalCSSClass+'" '+
                              'style="float:left;padding-left:0.2em;font-weight:normal;font-size:60%;text-align:center;font-style:italic">' +
                              singleDayRecord.data.event + '</span><br>';
                }
              }
              Ext.get(singleDayElement).setHtml(eventsHtml);
            }
          });
        }
      } else {
        calendarView.down('#calendarViewContainer').add(
          {
            xtype: 'calendar',
            itemId: 'touchCalendarViewWidget',
            width: '100%',
            height: '100%',
            showAnimation: 'flip',
            listeners: {
              periodchange: function (calendarView, minDate, maxDate, direction, eOpts) {
                console.log("periodchange");

                var min = new Date(minDate);
                var max = new Date(maxDate);
                var minDateString = min.getFullYear() + "-" + (min.getMonth() + 1) + "-" + min.getDate();
                var maxDateString = max.getFullYear() + "-" + (max.getMonth() + 1) + "-" + max.getDate();

                ALMITOnTheGo.app.getController('Calendar').onCalendarViewDetailsCommand(calendarView.getViewMode(), minDateString, maxDateString);
              },
              selectionchange: function (calendarView, newDate, oldDate, eOpts) {
                console.log("selectionchange");

                if(calendarView.getViewMode().toUpperCase() == 'MONTH') {

                  var selectedDate = new Date(newDate);
                  var selectedDateString = ('0'+selectedDate.getDate()).slice(-2) + "-" + ('0'+(selectedDate.getMonth() + 1)).slice(-2) + "-" + selectedDate.getFullYear();
                  var displayDate = selectedDate.toDateString();

                  ALMITOnTheGo.app.getController('Calendar').onShowSelectedEventCommand(selectedDateString, displayDate);
                }
              }
            },
            viewConfig: {
              viewMode: 'month',
              dayTimeSlotSize: 60,
              weekStart: 0,
              eventStore: ALMITOnTheGo.app.allEventsStore
            },
            enableSimpleEvents: true
          }
        );
        calendarView.down('#calendarViewContainer').add(
          {
            xtype: 'list',
            itemId: 'addedCalendarCoursesList',
            hidden: true,
            width: '100%',
            height: '100%',
            showAnimation: 'flip',
            itemTpl: new Ext.XTemplate(
              '<p><span style="font-weight: bold;">{course_code}</span></p>',
              '<p><span style="font-size: 80%;">{course_title}</span></p>',
              '<p><span style="font-size: 80%;font-style:italic;">{course_term_label}',
              '<span id="courseCalendarDelete{course_id}" style="float:right;font-style:normal;display:none;" class="fake-trash">#</span>',
              '</span></p>',
              '<p><span style="font-size: 80%;">{course_day}</span></p>',
              '<p><span style="font-size: 80%;">{course_time}</span></p>',
              '<p><span style="font-size: 80%;">{instructors}</span></p>',
              '<p><span style="font-size: 80%;">{location}</span></p>',
              '<p><span style="font-size: 80%;">{course_type}</span></p>',
              '<p style="margin-top:0.2em;">',
              '<tpl for="attributes_array">',
              '<span class="squarebox {.}">{.}</span>&nbsp;&nbsp;',
              '</tpl>',
              '</p>'),
            store: ALMITOnTheGo.app.addedCalendarCoursesStore,
            useSimpleItems: true,
            onItemDisclosure: false,
            disableSelection: true,
            emptyText: '<div style="margin-top: 15px; text-align: center">No Added Courses To View</div>'
          }
        );
      }

      ALMITOnTheGo.app.authToken == null ? calendarView.down('#SWEButton').show() : calendarView.down('#SWEButton').hide();
      ALMITOnTheGo.app.authToken == null ? calendarView.down('#IMSButton').show() : calendarView.down('#IMSButton').hide();
      ALMITOnTheGo.app.authToken == null ? calendarView.down('#DGMButton').show() : calendarView.down('#DGMButton').hide();
      ALMITOnTheGo.app.authToken == null ? calendarView.down('#viewAddedCoursesButton').hide() : calendarView.down('#viewAddedCoursesButton').show();
      calendarView.setMasked(false);
    },
    getDateForCalendar: function(dateObj) {
      return new Date(
        dateObj['year'],
        dateObj['month']-1,
        dateObj['day'],
        dateObj['hour'],
        dateObj['min']);
      }
  });