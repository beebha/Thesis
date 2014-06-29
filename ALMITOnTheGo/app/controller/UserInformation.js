Ext.define('ALMITOnTheGo.controller.UserInformation', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      userInformationView: 'userInformationView',
      addCoursesView: 'addCoursesView',
      mainView: 'mainView'
    },
    control: {
      userInformationView: {
        backButtonCommand: 'onBackButtonCommand',
        doneButtonCommand: 'onDoneButtonCommand'
      }
    }
  },
  onBackButtonCommand: function () {
    var uic = this;
    var addCoursesView = uic.getAddCoursesView();
    var userInformationView = uic.getUserInformationView();

    userInformationView.setMasked(false);
    Ext.Viewport.animateActiveItem(addCoursesView, ALMITOnTheGo.app.getController('Common').getSlideRightTransition());
  },
  onDoneButtonCommand: function (userView) {
    var userInfoData = {};
    var completedCourses = [];
    var registeredCourses = [];

    var me = this,
      userInformationView = me.getUserInformationView(),
      mainView = me.getMainView();

    userInfoData.concentrationID = userView.down('#concentrationID').getValue();
    userInfoData.registrationType = userView.down('#registrationType').getValue();
    userInfoData.currentGPA = userView.down('#currentGPA').getValue();

    Ext.Array.each(Ext.getStore('completedCoursesStore').getData().items, function (record) {
      completedCourses.push(record.data);
    });

    Ext.Array.each(Ext.getStore('registeredCoursesStore').getData().items, function (record) {
      registeredCourses.push(record.data);
    });

    userInfoData.completedCourses = completedCourses;
    userInfoData.registeredCourses = registeredCourses;
    userInfoData.authToken = ALMITOnTheGo.app.authToken;

    userInformationView.setMasked({
      xtype: 'loadmask',
      message: 'Logging In...'
    });

    Ext.Ajax.request({
      url: ALMITOnTheGo.app.apiURL+'app.php?action=saveUserInfo',
      method: 'post',
      params: {
        data: Ext.JSON.encode(userInfoData)
      },
      success: function (response) {

        var userInfoResponse = Ext.JSON.decode(response.responseText);

        if (userInfoResponse.success === true) {
          userInformationView.setMasked(false);
          Ext.Viewport.animateActiveItem(mainView, ALMITOnTheGo.app.getController('Common').getSlideLeftTransition());
        } else {
          // TODO - error handling
        }
      }
    });
  },
  populateUserInformation: function (concentrationID, registrationType) {
    var uic = this;
    var userInformationView = uic.getUserInformationView();
    var addCoursesView = uic.getAddCoursesView();

    addCoursesView.down('#concentrationID').setValue(concentrationID);
    userInformationView.down('#concentrationID').setValue(concentrationID);
    userInformationView.down('#concentration').setValue(ALMITOnTheGo.app.getController('Common').getConcentrationText(concentrationID));

    addCoursesView.down('#registrationType').setValue(registrationType);
    userInformationView.down('#registrationType').setValue(registrationType);
    userInformationView.down('#registration').setValue(ALMITOnTheGo.app.getController('Common').getRegistrationTypeText(registrationType));

    // remove records from completed and registered courses stores
    Ext.getStore('completedCoursesStore').removeAll();
    Ext.getStore('registeredCoursesStore').removeAll();

    // set completed courses and registered courses
    var addedCoursesStore = ALMITOnTheGo.app.addedCoursesStore;

    // calculate current GPA
    var credits = 0;
    var totalScore = 0;

    Ext.Array.each(addedCoursesStore.getData().items, function (record) {
      if (record.data.gpa == -1) {
        Ext.getStore('registeredCoursesStore').addData(record.data);
      } else {
        credits += 4;
        totalScore += record.data.gpa * 4;
        Ext.getStore('completedCoursesStore').addData(record.data);
      }
    });

    var currentGPA = credits > 0 ? (totalScore / credits).toFixed(2) : 0.00;
    userInformationView.down('#currentGPA').setValue(currentGPA);

    Ext.Viewport.animateActiveItem(userInformationView, ALMITOnTheGo.app.getController('Common').getSlideLeftTransition());
  }
});