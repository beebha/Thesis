Ext.define('ALMITOnTheGo.controller.Courses',
  {
    extend: 'Ext.app.Controller',
    config: {
      refs: {
        coursesView: 'coursesView'
      },
      control: {
        mainView: {
          coursesViewDetailsCommand: 'onCoursesViewDetailsCommand'
        },
        coursesView: {
          coursesNextButtonCommand: 'onCoursesNextButtonCommand',
          categoryBackButtonCommand: 'onCategoryBackButtonCommand',
          categoryNextButtonCommand: 'onCategoryNextButtonCommand',
          courseTermBackButtonCommand: 'onCourseTermBackButtonCommand',
          courseTermNextButtonCommand: 'onCourseTermNextButtonCommand',
          courseResultsBackButtonCommand: 'onCourseResultsBackButtonCommand',
          courseDetailBackButtonCommand: 'onCourseDetailBackButtonCommand',
          viewCoursesListItemTapCommand: 'onViewCoursesListItemTapCommand',
          viewCoursesListItemDiscloseCommand: 'onViewCoursesListItemDiscloseCommand',
          viewConflictsButtonCommand: 'onViewConflictsButtonCommand',
          addToCalendarButtonCommand: 'onAddToCalendarButtonCommand'
        }
      }
    },
    onViewConflictsButtonCommand: function() {
      console.log("onViewConflictsButtonCommand");

      var cc = this;
      var coursesView = cc.getCoursesView();
      var viewCoursesList = coursesView.down('#viewCoursesList');

      ALMITOnTheGo.app.viewCoursesStore.each(function (item, index, length) {
        viewCoursesList.getItemAt(index).setStyle('background-color:#FFFFFF;');
      });

      var allCheckedCourses = [];

      Ext.each(Ext.query("input[type='checkbox']"), function(item) {
        if(item.checked) {
          var courseID = item.value;
          var record = ALMITOnTheGo.app.viewCoursesStore.findRecord("course_id", courseID);
          allCheckedCourses.push(record.data);
        }
      });

      if(allCheckedCourses.length < 2) {
        Ext.Msg.alert('Select Course', 'Please select at least 2 courses to view conflicts', Ext.emptyFn);
      } else {

        var coursesComboChecked = [];
        var courseConflictsMsg = "";
        var courseConflictIDs = [];
        var coursesToCheck = allCheckedCourses.slice();

        for(var i=0; i<allCheckedCourses.length; i++)
        {
          var currentCourseRecord = allCheckedCourses[i];

          for(var j=0; j<coursesToCheck.length; j++)
          {
            var courseToCheck = coursesToCheck[j];
            var courseCombo = currentCourseRecord.course_id + "|" + courseToCheck.course_id;

            if((currentCourseRecord.course_id != courseToCheck.course_id) && !Ext.Array.contains(coursesComboChecked, courseCombo))
            {
              coursesComboChecked.push(currentCourseRecord.course_id + "|" + courseToCheck.course_id);
              coursesComboChecked.push(courseToCheck.course_id + "|" + currentCourseRecord.course_id);

              if(currentCourseRecord.course_term_id == courseToCheck.course_term_id)
              {
                var currentCourseDays = !Ext.isEmpty(currentCourseRecord.course_day) ? currentCourseRecord.course_day.split(",") : [];
                var courseToCheckDays = !Ext.isEmpty(courseToCheck.course_day) ? courseToCheck.course_day.split(",") : [];

                var conflictDays = Ext.Array.intersect(currentCourseDays, courseToCheckDays);

                if(!Ext.isEmpty(conflictDays))
                {
                  courseConflictsMsg += currentCourseRecord.course_code + " and " + courseToCheck.course_code + " conflict on: " + conflictDays.join(",") + "<br>";

                  if(!Ext.Array.contains(courseConflictIDs, currentCourseRecord.course_id)) {
                    courseConflictIDs.push(currentCourseRecord.course_id);
                  }
                  if(!Ext.Array.contains(courseConflictIDs, courseToCheck.course_id)) {
                    courseConflictIDs.push(courseToCheck.course_id);
                  }
                }
              }
            }
          }
        }

        if(!Ext.isEmpty(courseConflictsMsg)) {
          Ext.Msg.show({
            title: 'Course Conflicts',
            message: courseConflictsMsg,
            width: 210,
            height: 200,
            scrollable: {
              direction: 'vertical'
            },
            style: {
              fontSize: '80%'
            },
            fn:function(btn) {
              console.log("button clicked....");
              console.log(btn);
              Ext.Array.each(courseConflictIDs, function (courseID) {
                var index = ALMITOnTheGo.app.viewCoursesStore.find("course_id", courseID);
                viewCoursesList.getItemAt(index).setStyle('background-color:#C24641');
              });
            }
          });
        } else {
          Ext.Msg.alert('No Course Conflicts', 'Congratulations!', Ext.emptyFn);
        }
      }
    },
    onAddToCalendarButtonCommand: function() {
      console.log("onAddToCalendarButtonCommand");
    },
    onViewCoursesListItemTapCommand: function(list, index, target, record, e) {
      console.log("onViewCoursesListItemTapCommand");

      var courseID = record.data.course_id;
      var checkboxCourse = Ext.get('chkCourse'+courseID);
      var checkboxCourseDom = checkboxCourse.dom;

      if (e.target.tagName.toUpperCase() != 'LABEL' )
      {
        checkboxCourseDom.checked = !checkboxCourseDom.checked;
      }
    },
    onViewCoursesListItemDiscloseCommand: function(list, index, target, record, e) {
      console.log("onViewCoursesListItemDiscloseCommand");
      console.log(record);
      var cc = this;
      var coursesView = cc.getCoursesView();

      coursesView.down('#courseTitle').setValue(record.data.course_title);
      coursesView.down('#courseCode').setValue(record.data.course_code);
      coursesView.down('#courseTerm').setValue(record.data.course_term_label);
      coursesView.down('#courseDay').setValue(record.data.course_day);
      coursesView.down('#courseTime').setValue(record.data.course_time);
      coursesView.down('#courseLocation').setValue(record.data.location);
      coursesView.down('#courseType').setValue(record.data.course_type);
      coursesView.down('#courseInstructor').setValue(record.data.instructor);
      coursesView.down('#courseLimit').setValue(record.data.course_limit == 0 ? "No Limit" : record.data.course_limit);

      coursesView.down('#coursesCardPanel').animateActiveItem(4, {type:'flip'});
    },
    onCoursesViewDetailsCommand: function () {
      console.log("onCoursesViewDetailsCommand");
      var cc = this;
      var coursesView = cc.getCoursesView();

      coursesView.down('#coursesCardPanel').hide();

      // if Guest, show initial courses screen
      if (ALMITOnTheGo.app.authToken == null) {
        coursesView.down('#coursesCardPanel').show();
        coursesView.down('radiofield[name=concentration]').setGroupValue(1);
        coursesView.down('#coursesCardPanel').animateActiveItem(0, {type:'slide', direction:'left'});
      } else {

        coursesView.setMasked({
          xtype: 'loadmask',
          message: '&nbsp;'
        });

        Ext.Ajax.request({
          url: ALMITOnTheGo.app.apiURL+'app.php?action=getCourseCategoryViewDetails',
          method: 'post',
          params: {
            authToken: ALMITOnTheGo.app.authToken,
            concentrationID : null
          },
          success: function (response) {
            var coursesResponse = Ext.JSON.decode(response.responseText);
            cc.setupCategoriesViewPanel(coursesView, coursesResponse);
          }
        });
      }
    },
    onCoursesNextButtonCommand: function () {
      console.log("onCoursesNextButtonCommand");
      var cc = this;
      var coursesView = cc.getCoursesView();

      coursesView.setMasked({
        xtype: 'loadmask',
        message: '&nbsp;'
      });

      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL+'app.php?action=getCourseCategoryViewDetails',
        method: 'post',
        params: {
          authToken: ALMITOnTheGo.app.authToken,
          concentrationID: coursesView.down('radiofield[name=concentration]').getGroupValue()
        },
        success: function (response) {
          var coursesResponse = Ext.JSON.decode(response.responseText);
          cc.setupCategoriesViewPanel(coursesView, coursesResponse);
        }
      });
    },
    onCategoryNextButtonCommand: function () {
      console.log("onCategoryNextButtonCommand");
      var cc = this;
      var coursesView = cc.getCoursesView();

      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL+'app.php?action=getCourseTermViewDetails',
        method: 'post',
        success: function (response) {
          var courseTermsResponse = Ext.JSON.decode(response.responseText);
          cc.setupCourseTermsViewPanel(coursesView, courseTermsResponse);
        }
      });
    },
    onCourseTermNextButtonCommand: function () {
      console.log("onCourseTermNextButtonCommand");
      var cc = this;
      var coursesView = cc.getCoursesView();

      coursesView.setMasked({
        xtype: 'loadmask',
        message: '&nbsp;'
      });

      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL+'app.php?action=getCoursesResults',
        method: 'post',
        params: {
          authToken: ALMITOnTheGo.app.authToken,
          concentrationID: coursesView.down('radiofield[name=concentration]').getGroupValue(),
          categoryID: coursesView.down('radiofield[name=category]').getGroupValue(),
          courseTermID: coursesView.down('radiofield[name=courseTerm]').getGroupValue()
        },
        success: function (response) {
          var courseResultsResponse = Ext.JSON.decode(response.responseText);
          cc.setupCourseResultsViewPanel(coursesView, courseResultsResponse);
        }
      });
    },
    onCategoryBackButtonCommand: function () {
      console.log("onCategoryBackButtonCommand");
      var cc = this;
      var coursesView = cc.getCoursesView();
      coursesView.down('#coursesCardPanel').animateActiveItem(0, {type:'slide', direction:'right'});
    },
    onCourseTermBackButtonCommand: function () {
      console.log("onCourseTermBackButtonCommand");
      var cc = this;
      var coursesView = cc.getCoursesView();
      coursesView.down('#coursesCardPanel').animateActiveItem(1, {type:'slide', direction:'right'});
    },
    onCourseResultsBackButtonCommand: function () {
      console.log("onCourseResultsBackButtonCommand");
      var cc = this;
      var coursesView = cc.getCoursesView();
      coursesView.down('#coursesCardPanel').animateActiveItem(2, {type:'slide', direction:'right'});
    },
    onCourseDetailBackButtonCommand: function () {
      console.log("onCourseDetailBackButtonCommand");
      var cc = this;
      var coursesView = cc.getCoursesView();
      coursesView.down('#coursesCardPanel').animateActiveItem(3, {type:'flip'});
    },
    setupCourseResultsViewPanel: function(coursesView, courseResultsResponse) {
      console.log("setupCourseResultsViewPanel");
      if (courseResultsResponse.success === true) {

        var concentrationIDText = ALMITOnTheGo.app.getController('Common').getConcentrationText(courseResultsResponse.data.concentrationID);
        var categoryIDText = ALMITOnTheGo.app.getController('Common').getCategoryText(coursesView.down('radiofield[name=category]').getGroupValue());
        var courseTermIDText = ALMITOnTheGo.app.getController('Common').getCourseTermText(coursesView.down('radiofield[name=courseTerm]').getGroupValue());
        var searchCriteria = ALMITOnTheGo.app.authToken == null ? "Concentration: " + concentrationIDText + "<br>" : "";
        searchCriteria += "Category: " + categoryIDText + "<br>" +
                          "Course Term: " + courseTermIDText;

        coursesView.down('#viewConflictsButton').hide();
        coursesView.down('#addToCalendarButton').hide();

        if(courseResultsResponse.data.coursesResults.length > 0) {
          ALMITOnTheGo.app.viewCoursesStore.applyData(courseResultsResponse.data.coursesResults);
          coursesView.down('#viewCoursesList').setStore(ALMITOnTheGo.app.viewCoursesStore);
          ALMITOnTheGo.app.viewCoursesStore.each(function (item, index, length) {
            coursesView.down('#viewCoursesList').getItemAt(index).setStyle('background-color:#FFFFFF;');
          });
          coursesView.down('#viewCoursesList').show();

          if(courseResultsResponse.data.coursesResults.length >= 2) {
            coursesView.down('#viewConflictsButton').show();
          }
          if(ALMITOnTheGo.app.authToken != null) {
            coursesView.down('#addToCalendarButton').show();
          }
        } else {
          searchCriteria += "<br><span style='font-size: 115%;color:#8b0000;'>No Matching Items</span>";
          coursesView.down('#viewCoursesList').hide();
        }

        coursesView.down('#courseSearchLabel').setHtml(searchCriteria);
        coursesView.down('#coursesCardPanel').animateActiveItem(3, {type:'slide', direction:'left'});
        coursesView.setMasked(false);
      }
    },
    setupCourseTermsViewPanel: function(coursesView, courseTermsResponse) {
      console.log("setupCourseTermsViewPanel");
      if (courseTermsResponse.success === true) {

        var courseTerms = courseTermsResponse.data.currentCourseTerms;
        var singleCourseTerm;

        coursesView.down('#selectCourseTermFieldSet').removeAll();

        for (singleCourseTerm in courseTerms) {

          coursesView.down('#selectCourseTermFieldSet').add(
            {
              xtype: 'radiofield',
              name: 'courseTerm',
              value: courseTerms[singleCourseTerm]['course_term_id'],
              label: courseTerms[singleCourseTerm]['course_term_label']
            }
          );
        }
        coursesView.down('#selectCourseTermFieldSet').add(
          {
            xtype: 'radiofield',
            name: 'courseTerm',
            value: 0,
            label: 'All'
          }
        );
        coursesView.down('radiofield[name=courseTerm]').setGroupValue(0);
        coursesView.down('#coursesCardPanel').animateActiveItem(2, {type:'slide', direction:'left'});

      } else {
        // TODO - error handling
      }
    },
    setupCategoriesViewPanel: function(coursesView, coursesResponse) {
      console.log("setupCategoriesViewPanel");
      if (coursesResponse.success === true) {

        var currentReqs = coursesResponse.data.currentReqs;
        var singleReq;

        coursesView.down('#selectCategoryFieldSet').removeAll();

        for (singleReq in currentReqs) {
          var subText = "<div style = 'font-weight:normal;font-size: 95%;'>"
            +currentReqs[singleReq]['subText'] +
            "</div>";
          coursesView.down('#selectCategoryFieldSet').add(
            {
              xtype: 'radiofield',
              name: 'category',
              value: currentReqs[singleReq]['category_id'],
              label: currentReqs[singleReq]['category_label'] +
                "<br>" + subText
            }
          );
        }
        coursesView.down('#selectCategoryFieldSet').add(
          {
            xtype: 'radiofield',
            name: 'category',
            value: 0,
            label: 'All'
          }
        );
        coursesView.down('#coursesCardPanel').show();
        ALMITOnTheGo.app.authToken == null ? coursesView.down('#categoryBackButton').show() : coursesView.down('#categoryBackButton').hide();
        coursesView.down('radiofield[name=category]').setGroupValue(0);
        coursesView.down('#coursesCardPanel').animateActiveItem(1, {type:'slide', direction:'left'});
        coursesView.setMasked(false);
      } else {
        // TODO - error handling
      }
    }
  });