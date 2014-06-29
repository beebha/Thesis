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
          viewCoursesListItemTapCommand: 'onViewCoursesListItemTapCommand'
        }
      }
    },
    onViewCoursesListItemTapCommand: function(dataview, index, target, record, e, eOpts) {
      console.log("onViewCoursesListItemTapCommand");
      var cc = this;
      var coursesView = cc.getCoursesView();
    },
    onCoursesViewDetailsCommand: function () {
      console.log("onCoursesViewDetailsCommand");
      var cc = this;
      var coursesView = cc.getCoursesView();

      // if Guest, show initial courses screen
      if (ALMITOnTheGo.app.authToken == null) {
        coursesView.down('#coursesCardPanel').setActiveItem(0);
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
      coursesView.down('#coursesCardPanel').setActiveItem(0);
    },
    onCourseTermBackButtonCommand: function () {
      console.log("onCourseTermBackButtonCommand");
      var cc = this;
      var coursesView = cc.getCoursesView();
      coursesView.down('#coursesCardPanel').setActiveItem(1);
    },
    onCourseResultsBackButtonCommand: function () {
      console.log("onCourseResultsBackButtonCommand");
      var cc = this;
      var coursesView = cc.getCoursesView();
      coursesView.down('#coursesCardPanel').setActiveItem(2);
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

        coursesView.down('#coursesCardPanel').setActiveItem(3);
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

        coursesView.down('#coursesCardPanel').setActiveItem(2);

      } else {
        // TODO - error handling
      }
    },
    setupCategoriesViewPanel: function(coursesView, coursesResponse) {
      console.log("setupCategoriesViewPanel");
      if (coursesResponse.success === true) {

        console.log(coursesResponse);

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
        coursesView.down('#coursesCardPanel').setActiveItem(1);
      } else {
        // TODO - error handling
      }
    }
  });