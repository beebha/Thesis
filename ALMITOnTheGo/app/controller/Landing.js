Ext.define('ALMITOnTheGo.controller.Landing', {
  extend: 'Ext.app.Controller',

  config: {
    routes: {
      'registerNewUser': 'registerNewUser',
      'loginUser': 'loginUser'
    },
    refs: {
      landingView: 'landingView',
      loginView: 'loginView',
      mainView: 'mainView',
      registerView: 'registerView'
    },
    control: {
      landingView: {
        loginCommand: 'onLoginCommand',
        guestCommand: 'onGuestCommand'
      }
    }
  },
  // function to bring user to register view
  registerNewUser: function ()
  {
    var landingView = this.getLandingView();
    var registerView = this.getRegisterView();
    landingView.setMasked(false);

    Ext.Viewport.animateActiveItem(registerView, ALMITOnTheGo.app.getController('Common').getSlideLeftTransition());
  },
  // function to bring user to login view
  loginUser: function ()
  {
    var landingView = this.getLandingView();
    var loginView = this.getLoginView();
    landingView.setMasked(false);

    Ext.Viewport.animateActiveItem(loginView, ALMITOnTheGo.app.getController('Common').getSlideLeftTransition());
  },
  // function to bring login user as guest
  onGuestCommand: function ()
  {
    var landingView = this.getLandingView();
    var mainView = this.getMainView();
    landingView.setMasked(false);

    Ext.Viewport.animateActiveItem(mainView, ALMITOnTheGo.app.getController('Common').getSlideLeftTransition());
  }
});