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
          viewCoursesListItemDiscloseCommand: 'onViewCoursesListItemDiscloseCommand'
        }
      }
    },
    onViewCoursesListItemTapCommand: function(list, index, target, record, e) {
      console.log("onViewCoursesListItemTapCommand");
      console.log(index);
      console.log(record);
      var cc = this;
      var coursesView = cc.getCoursesView();
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

      // if Guest, show initial courses screen
      if (ALMITOnTheGo.app.authToken == null) {
        coursesView.down('radiofield[name=concentration]').setGroupValue(1);
        coursesView.down('#coursesCardPanel').animateActiveItem(0, {type:'slide', direction:'left'});
      } else {
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

        if(courseResultsResponse.data.coursesResults.length > 0) {
          ALMITOnTheGo.app.viewCoursesStore.applyData(courseResultsResponse.data.coursesResults);
          coursesView.down('#viewCoursesList').setStore(ALMITOnTheGo.app.viewCoursesStore);
          coursesView.down('#viewCoursesList').show();
          coursesView.down('#courseSearchNoResultsLabel').hide();
        } else {
          coursesView.down('#viewCoursesList').hide();
          coursesView.down('#courseSearchNoResultsLabel').show();
        }

        var concentrationIDText = ALMITOnTheGo.app.getController('Common').getConcentrationText(courseResultsResponse.data.concentrationID);
        var categoryIDText = ALMITOnTheGo.app.getController('Common').getCategoryText(coursesView.down('radiofield[name=category]').getGroupValue());
        var courseTermIDText = ALMITOnTheGo.app.getController('Common').getCourseTermText(coursesView.down('radiofield[name=courseTerm]').getGroupValue());
        var searchCriteria = ALMITOnTheGo.app.authToken == null ? "Selected Concentration: " + concentrationIDText + "<br>" : "";
        searchCriteria += "Selected Category: " + categoryIDText + "<br>" +
                          "Selected Course Term: " + courseTermIDText;

        coursesView.down('#courseSearchLabel').setHtml(searchCriteria);

        coursesView.down('#coursesCardPanel').animateActiveItem(3, {type:'slide', direction:'left'});
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
          var subText = "<div style = 'font-weight:normal;font-size: 90%;'>"
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
        ALMITOnTheGo.app.authToken == null ? coursesView.down('#categoryBackButton').show() : coursesView.down('#categoryBackButton').hide();
        coursesView.down('radiofield[name=category]').setGroupValue(0);
        coursesView.down('#coursesCardPanel').animateActiveItem(1, {type:'slide', direction:'left'});
      } else {
        // TODO - error handling
      }
    }
  });