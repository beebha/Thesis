Ext.define('ALMITOnTheGo.controller.Common',
  {
    extend: 'Ext.app.Controller',

    getSlideLeftTransition: function () {
      return { type: 'slide', direction: 'left' };
    },
    getSlideRightTransition: function () {
      return { type: 'slide', direction: 'right' };
    },
    getSlideTopTransition: function () {
      return { type: 'slide', direction: 'up' };
    },
    getSlideBottomTransition: function () {
      return { type: 'slide', direction: 'down' };
    },
    getConcentrationText: function (concentrationID) {
      var concentrationText = "";
      if (parseInt(concentrationID) == 0) {
        concentrationText = "All";
      } else {
        concentrationText = ALMITOnTheGo.app.allConcentrations[parseInt(concentrationID)];
      }
      return concentrationText;
    },
    getCategoryText: function (categoryID) {
      var categoryText = "";
      if (parseInt(categoryID) == 0) {
        categoryText = "All";
      } else {
        categoryText = ALMITOnTheGo.app.allCategories[parseInt(categoryID)];
      }
      return categoryText;
    },
    getCourseTermText: function (courseTermID) {
      var courseTermText = "";
      if (parseInt(courseTermID) == 0) {
        courseTermText = "All";
      } else {
        courseTermText = ALMITOnTheGo.app.allCourseTerms[parseInt(courseTermID)];
      }
      return courseTermText;
    },
    getRegistrationTypeText: function (registrationType) {
      var registrationTypeText = "";
      switch (registrationType) {
        case 'GUEST':
          registrationTypeText = "Guest";
          break;
        case 'DEGREE':
          registrationTypeText = "Degree Candidate";
          break;
        case 'PRE-ADMISSION':
          registrationTypeText = "Pre-Admission Candidate";
          break;
      }
      return registrationTypeText;
    },
    getConcentrationID: function (concentrationCode) {
      var concentrationID = 0;
      switch (concentrationCode) {
        case 'SWE':
          concentrationID = 1;
          break;
        case 'IMS':
          concentrationID = 2;
          break;
        case 'MAC':
          concentrationID = 3;
          break;
        case 'DGM':
          concentrationID = 4;
          break;
      }
      return concentrationID;
    }
  });