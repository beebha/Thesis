Ext.define('ALMITOnTheGo.controller.Register', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      registerView: 'registerView',
      addCoursesView: 'addCoursesView',
      landingView: 'landingView',
      mainView: 'mainView'
    },
    control: {
      registerView: {
        registerCommand: 'onRegisterCommand',
        backCommand: 'onBackCommand'
      }
    }
  },
  onRegisterCommand: function (view, email, username, password, confirmPassword, registrationType, concentration)
  {
    var rc = this;
    var registerView = rc.getRegisterView();

    if (email.length === 0 || username.length === 0 ||
      password.length === 0 || confirmPassword.length === 0) {
      registerView.showRegistrationFailedMessage('Please enter email, username, password and confirm password.');
      return;
    }

    registerView.setMasked({
      xtype: 'loadmask'
    });

    Ext.Ajax.request({
      url: ALMITOnTheGo.app.apiURL + 'app.php?action=doRegister',
      method: 'post',
      params: {
        email: email,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        registrationType: registrationType,
        concentration: concentration,
        deviceType: Ext.os.deviceType,
        deviceOS: Ext.os.name
      },
      success: function (response)
      {
        var registerResponse = Ext.JSON.decode(response.responseText);

        if (registerResponse.success === true) {
          ALMITOnTheGo.app.authToken = registerResponse.data.authToken;
          rc.concentration = registerResponse.data.concentration;
          rc.registrationType = registerResponse.data.registrationType;
          rc.registerSuccess();
        } else {
          rc.registerFailure(registerResponse.error.message);
        }
      },
      failure: function (response)
      {
        ALMITOnTheGo.app.authToken = null;
        rc.registerFailure('Registration failed. Please try again later.');
      }
    });
  },
  registerSuccess: function ()
  {
    var rc = this;
    var registerView = rc.getRegisterView();
    var addCoursesView = rc.getAddCoursesView();

    Ext.Ajax.request({
      url: ALMITOnTheGo.app.apiURL + 'app.php?action=getCourses',
      method: 'post',
      params: {
        concentration: rc.concentration
      },
      success: function (response)
      {

        var coursesResponse = Ext.JSON.decode(response.responseText);

        if (coursesResponse.success === true) {

          // set data for add courses store and add the store to the list
          ALMITOnTheGo.app.allCoursesStore.applyData(coursesResponse.data);
          addCoursesView.down('#addCoursesList').setStore(ALMITOnTheGo.app.allCoursesStore);

          // set concentration type
          addCoursesView.down('#concentrationID').setValue(rc.concentration);
          // set the registrationType
          addCoursesView.down('#registrationType').setValue(rc.registrationType);

          registerView.setMasked(false);
          Ext.Viewport.animateActiveItem(addCoursesView, ALMITOnTheGo.app.getController('Common').getSlideLeftTransition());
          addCoursesView.fireEvent('showAddCoursesMsg');
        }
      }
    });
  },
  registerFailure: function (message)
  {
    var registerView = this.getRegisterView();
    registerView.showRegistrationFailedMessage(message);
    registerView.setMasked(false);
  },
  onBackCommand: function ()
  {
    window.history.back();
    var registerView = this.getRegisterView();
    var landingView = this.getLandingView();
    registerView.setMasked(false);

    Ext.Viewport.animateActiveItem(landingView, ALMITOnTheGo.app.getController('Common').getSlideRightTransition());
  }
});