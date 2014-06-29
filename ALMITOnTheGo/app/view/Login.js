Ext.define('ALMITOnTheGo.view.Login', {
  extend: 'Ext.form.Panel',
  xtype: 'loginView',
  requires: [
    'Ext.form.FieldSet',
    'Ext.form.Password',
    'Ext.Label',
    'Ext.Img'
  ],
  config: {
    title: 'Login',
    items: [
      {
        xtype: 'titlebar',
        title: 'ALM IT On-The-Go',
        docked: 'top'
      },
      {
        xtype: 'label',
        html: 'Login failed. Please enter the correct credentials.',
        itemId: 'loginFailedLabel',
        hidden: true,
        hideAnimation: 'fadeOut',
        showAnimation: 'fadeIn',
        style: 'color:#990000;margin:10px;'
      },
      {
        xtype: 'fieldset',
        title: 'Login',
        items: [
          {
            xtype: 'textfield',
            placeHolder: 'Username',
            itemId: 'usernameTextField',
            name: 'usernameTextField',
            required: true,
            autoCapitalize: false,
            minLength: 4,
            maxLength: 20
          },
          {
            xtype: 'passwordfield',
            placeHolder: 'Password',
            itemId: 'passwordTextField',
            name: 'passwordTextField',
            required: true,
            minLength: 4,
            maxLength: 20
          }
        ]
      },
      {
        xtype: 'panel',
        layout: { type: 'hbox'},
        items: [
          {
            xtype: 'button',
            itemId: 'loginButton',
            cls: 'modus-button default',
            padding: 10,
            margin: 5,
            text: 'Log In',
            flex: 1
          },
          {
            xtype: 'button',
            itemId: 'guestButton',
            cls: 'modus-button primary',
            padding: 10,
            margin: 5,
            text: 'Continue as Guest',
            flex: 1
          }
        ]
      },
      {
        xtype: 'component',
        html: '<a href="#registerNewUser">Sign up for ALM IT On-The-Go</a>' + '  |  ' +
          '<a href="#forgotPassword">Forgot your password?</a>',
        style: 'margin:10px;'
      }
    ],
    listeners: [
      {
        delegate: '#loginButton',
        event: 'tap',
        fn: 'onLoginButtonTap'
      },
      {
        delegate: '#guestButton',
        event: 'tap',
        fn: 'onGuestButtonTap'
      }
    ]
  },
  onGuestButtonTap: function () {
    var me = this;
    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('guestCommand');
    });

    task.delay(500);
  },
  onLoginButtonTap: function () {
    var me = this;

    var usernameField = me.down('#usernameTextField'),
      passwordField = me.down('#passwordTextField'),
      loginFailedLabel = me.down('#loginFailedLabel');

    loginFailedLabel.hide();

    var username = usernameField.getValue(),
      password = passwordField.getValue();

    var task = Ext.create('Ext.util.DelayedTask', function () {
      loginFailedLabel.setHtml('');
      me.fireEvent('loginCommand', me, username, password);
    });

    task.delay(500);
  },
  showLoginFailedMessage: function (message) {
    var label = this.down('#loginFailedLabel');
    label.setHtml(message);
    label.show();
  }
});