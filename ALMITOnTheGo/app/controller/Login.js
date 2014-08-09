Ext.define('ALMITOnTheGo.controller.Login', {
  extend: 'Ext.app.Controller',

  config: {
    routes: {
      'forgotPassword': 'forgotPassword'
    },
    refs: {
      landingView: 'landingView',
      loginView: 'loginView',
      mainView: 'mainView',
      passwordView: 'passwordView'
    },
    control: {
      loginView: {
        loginCommand: 'onLoginCommand',
        backCommand: 'onBackCommand'
      }
    }
  },
  // function to bring user to landing view when back button is clicked
  onBackCommand: function ()
  {
    window.history.back();
    var loginView = this.getLoginView();
    var landingView = this.getLandingView();
    loginView.setMasked(false);

    Ext.Viewport.animateActiveItem(landingView, ALMITOnTheGo.app.getController('Common').getSlideRightTransition());
  },
  // function to log in user after credentials verification
  onLoginCommand: function (view, username, password)
  {
    var me = this,
      loginView = me.getLoginView();

    if (username.length === 0 || password.length === 0) {
      loginView.showLoginFailedMessage('Please enter your username and password.');
      return;
    }

    loginView.setMasked({
      xtype: 'loadmask',
      message: '&nbsp;'
    });

    Ext.Ajax.request({
      url: ALMITOnTheGo.app.apiURL + 'app.php?action=doLogin',
      method: 'post',
      params: {
        username: username,
        password: password,
        deviceType: Ext.os.deviceType,
        deviceOS: Ext.os.name
      },
      success: function (response)
      {
        var loginResponse = Ext.JSON.decode(response.responseText);

        if (loginResponse.success === true) {
          // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
          ALMITOnTheGo.app.authToken = loginResponse.data.authToken;
          me.loginSuccess(loginResponse.data.forgotPasswordReset == 1);
        } else {
          ALMITOnTheGo.app.authToken = null;
          me.loginFailure(loginResponse.error.message);
        }
      }
    });
  },
  // function to bring user to main view after successful login
  loginSuccess: function (forgotPasswordReset)
  {
    window.history.back();
    var loginView = this.getLoginView();
    var mainView = this.getMainView();
    var passwordView = this.getPasswordView();

    loginView.setMasked(false);

    if (forgotPasswordReset) {
      passwordView.down('#passwordFieldSet').setInstructions({
        title: 'For privacy and security reasons you must change your password.<br><br>',
        docked: 'top'
      });
      Ext.Viewport.animateActiveItem(passwordView, ALMITOnTheGo.app.getController('Common').getSlideTopTransition());
    } else {
      Ext.Viewport.animateActiveItem(mainView, ALMITOnTheGo.app.getController('Common').getSlideLeftTransition());
    }
  },
  // function that shows login failure message
  loginFailure: function (message)
  {
    var loginView = this.getLoginView();
    loginView.showLoginFailedMessage(message);
    loginView.setMasked(false);
  }
});