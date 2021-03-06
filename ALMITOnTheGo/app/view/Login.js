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
        title: 'Log In',
        docked: 'top',
        items: [
          {
            xtype: 'fixedbutton',
            text: 'BACK',
            itemId: 'backButton',
            align: 'left',
            style: {
              color: '#E1D9C0'
            }
          }
        ]
      },
      {
        xtype: 'label',
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
            xtype: 'fixedbutton',
            itemId: 'loginButton',
            cls: 'modus-button default',
            padding: 10,
            margin: 5,
            text: 'Log In',
            flex: 1
          }
        ]
      },
      {
        xtype: 'component',
        html: '<center><div class="forgotLink">Forgot your username/password?</div></center>',
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
        delegate: '#backButton',
        event: 'tap',
        fn: 'onBackButtonTap'
      },
      {
        element: 'element',
        delegate: 'div.forgotLink',
        event: 'tap',
        fn: 'onForgotLinkTap'
      }
    ]
  },
  onBackButtonTap: function ()
  {
    var me = this;
    var task = Ext.create('Ext.util.DelayedTask', function ()
    {
      me.fireEvent('backCommand');
    });

    task.delay(500);
  },
  onLoginButtonTap: function ()
  {
    ALMITOnTheGo.app.authToken = null;
    var me = this;

    var usernameField = me.down('#usernameTextField'),
      passwordField = me.down('#passwordTextField'),
      loginFailedLabel = me.down('#loginFailedLabel');

    loginFailedLabel.hide();

    var username = usernameField.getValue(),
      password = passwordField.getValue();

    var task = Ext.create('Ext.util.DelayedTask', function ()
    {
      loginFailedLabel.setHtml('');
      usernameField.setValue('');
      passwordField.setValue('');
      me.fireEvent('loginCommand', me, username, password);
    });

    task.delay(500);
  },
  showLoginFailedMessage: function (message)
  {
    var label = this.down('#loginFailedLabel');
    label.setHtml(message);
    label.show();
  },
  onForgotLinkTap: function ()
  {
    Ext.Viewport.animateActiveItem({xtype: 'forgotView'}, ALMITOnTheGo.app.getController('Common').getSlideTopTransition());
  }
});