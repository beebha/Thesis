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
        nextViewCommand: 'onNextViewCommand',
        showAddCoursesMsg: 'onShowAddCoursesMsg'
      }
    }
  },
  // function that is called upon successful registration of user
  onShowAddCoursesMsg: function ()
  {
    var ac = this;
    var addCoursesView = ac.getAddCoursesView();

    Ext.Msg.show({
      title: 'Add Courses',
      message: "Successful Registration!!!<br><br>Please add/edit all completed/currently registered courses or revisit this step later.",
      width: 210,
      height: 200,
      style: {
        fontSize: '80%'
      },
      fn: function (btn)
      {
        addCoursesView.onRegistrationMsgPanelHide();
      }
    });
  },
  // function populates user information screen when Next button is clicked
  onNextViewCommand: function()
  {
    var ac = this;
    var addCoursesView = ac.getAddCoursesView();

    addCoursesView.setMasked(false);

    var concentrationID = parseInt(addCoursesView.down('#concentrationID').getValue());
    var registrationType = addCoursesView.down('#registrationType').getValue();

    ALMITOnTheGo.app.getController('UserInformation').populateUserInformation(concentrationID, registrationType);

  }
});