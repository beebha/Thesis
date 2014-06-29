Ext.define('ALMITOnTheGo.controller.AddCourses', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      addCoursesView: 'addCoursesView',
      userInformationView: 'userInformationView',
      mainView: 'mainView'
    },
    control: {
      addCoursesView: {
        nextViewCommand: 'onNextViewCommand'
      }
    }
  },
  onNextViewCommand: function (addedCoursesCount) {
    var ac = this;
    var addCoursesView = ac.getAddCoursesView();
    var mainView = ac.getMainView();

    addCoursesView.setMasked(false);

    if (addedCoursesCount == 0) {
      Ext.Viewport.animateActiveItem(mainView, ALMITOnTheGo.app.getController('Common').getSlideLeftTransition());
    } else {

      var concentrationID = parseInt(addCoursesView.down('#concentrationID').getValue());
      var registrationType = addCoursesView.down('#registrationType').getValue();

      ALMITOnTheGo.app.getController('UserInformation').populateUserInformation(concentrationID, registrationType);
    }
  }
});