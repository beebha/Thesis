Ext.define('ALMITOnTheGo.controller.Login', {
  extend: 'Ext.app.Controller',

  config: {
    routes: {
      'registerNewUser': 'registerNewUser',
      'forgotPassword': 'forgotPassword'
    },
    refs: {
      loginView: 'loginView',
      mainView: 'mainView',
      registerView: 'registerView'
    },
    control: {
      loginView: {
        loginCommand: 'onLoginCommand',
        guestCommand: 'onGuestCommand'
      }
    }
  },
  registerNewUser: function () {
    var loginView = this.getLoginView();
    var registerView = this.getRegisterView();
    loginView.setMasked(false);

    Ext.Viewport.animateActiveItem(registerView, ALMITOnTheGo.app.getController('Common').getSlideLeftTransition());
  },
  forgotPassword: function () {
    console.log("forgotPassword");
  },
  onGuestCommand: function () {
    var loginView = this.getLoginView();
    var mainView = this.getMainView();
    loginView.setMasked(false);

    Ext.Viewport.animateActiveItem(mainView, ALMITOnTheGo.app.getController('Common').getSlideLeftTransition());
  },
  onLoginCommand: function (view, username, password) {
    var me = this,
      loginView = me.getLoginView();

    if (username.length === 0 || password.length === 0) {
      loginView.showLoginFailedMessage('Please enter your username and password.');
      return;
    }

    loginView.setMasked({
      xtype: 'loadmask'
    });

    Ext.Ajax.request({
      url: ALMITOnTheGo.app.apiURL+'app.php?action=doLogin',
      method: 'post',
      params: {
        username: username,
        password: password,
        deviceType: Ext.os.deviceType,
        deviceOS: Ext.os.name
      },
      success: function (response) {

        var loginResponse = Ext.JSON.decode(response.responseText);

        if (loginResponse.success === true) {
          // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
          ALMITOnTheGo.app.authToken = loginResponse.data;
          me.loginSuccess();
        } else {
          ALMITOnTheGo.app.authToken = null;
          me.loginFailure(loginResponse.error.message);
        }
      }
    });
  },
  loginSuccess: function () {
    var loginView = this.getLoginView();
    var mainView = this.getMainView();
    loginView.setMasked(false);

    Ext.Viewport.animateActiveItem(mainView, ALMITOnTheGo.app.getController('Common').getSlideLeftTransition());
  },
  loginFailure: function (message) {
    var loginView = this.getLoginView();
    loginView.showLoginFailedMessage(message);
    loginView.setMasked(false);
  }
});