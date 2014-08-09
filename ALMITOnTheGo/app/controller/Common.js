Ext.define('ALMITOnTheGo.controller.Common',
  {
    extend: 'Ext.app.Controller',
    // utility function to allow view to transition by sliding to left
    getSlideLeftTransition: function ()
    {
      return { type: 'slide', direction: 'left' };
    },
    // utility function to allow view to transition by sliding to right
    getSlideRightTransition: function ()
    {
      return { type: 'slide', direction: 'right' };
    },
    // utility function to allow view to transition by sliding up
    getSlideTopTransition: function ()
    {
      return { type: 'slide', direction: 'up' };
    },
    // utility function to allow view to transition by sliding down
    getSlideBottomTransition: function ()
    {
      return { type: 'slide', direction: 'down' };
    },
    // utility function to get concentration display text based on concentration ID
    getConcentrationText: function (concentrationID)
    {
      var concentrationText = "";
      if (parseInt(concentrationID) == 0) {
        concentrationText = "All";
      } else {
        concentrationText = ALMITOnTheGo.app.allConcentrations[parseInt(concentrationID)];
      }
      return concentrationText;
    },
    // utility function to get category display text based on category ID
    getCategoryText: function (categoryID)
    {
      var categoryText = "";
      if (parseInt(categoryID) == 0) {
        categoryText = "All";
      } else {
        categoryText = ALMITOnTheGo.app.allCategories[parseInt(categoryID)];
      }
      return categoryText;
    },
    // utility function to get course term display text based on course term ID
    getCourseTermText: function (courseTermID)
    {
      var courseTermText = "";
      if (parseInt(courseTermID) == 0) {
        courseTermText = "All";
      } else {
        courseTermText = ALMITOnTheGo.app.allCourseTerms[parseInt(courseTermID)];
      }
      return courseTermText;
    },
    // utility function to get course term display text based on course term ID
    getRegistrationTypeText: function (registrationType)
    {
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
    // utility function to get concentration ID based on concentration Code
    getConcentrationID: function (concentrationCode)
    {
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