Ext.define('ALMITOnTheGo.view.Password', {
  extend: 'Ext.Panel',
  xtype: 'passwordView',
  requires: [
  ],
  config: {
    itemId: 'passwordViewPanel',
    modal: true,
    layout: 'vbox',
    flex: 1,
    items: [
      {
        xtype: 'container',
        itemId: 'passwordViewContainer',
        width: '100%',
        height: '100%',
        items: [
          {
            docked: 'top',
            xtype: 'toolbar',
            title: 'Change Password'
          },
          {
            xtype: 'label',
            itemId: 'invalidPasswordLabel',
            hidden: true,
            hideAnimation: 'fadeOut',
            showAnimation: 'fadeIn',
            style: 'color:#990000;margin-top:0.5em;margin-left:0.5em;'
          },
          {
            xtype: 'fieldset',
            itemId: 'passwordFieldSet',
            style: {
              marginTop: '-0.2em'
            },
            items: [
              {
                xtype: 'passwordfield',
                placeHolder: 'Password',
                itemId: 'passwordTextField',
                required: true,
                minLength: 4,
                maxLength: 20
              },
              {
                xtype: 'passwordfield',
                placeHolder: 'Confirm Password',
                itemId: 'confirmPasswordTextField',
                required: true,
                minLength: 4,
                maxLength: 20
              }
            ]
          },
          {
            xtype: 'panel',
            layout: {
              pack: 'center',
              type: 'hbox'
            },
            items: [
              {
                xtype: 'fixedbutton',
                itemId: 'changePwdButton',
                text: 'Change Password',
                cls: 'modus-button default small'
              },
              {
                xtype: 'spacer',
                width: '0.5em'
              },
              {
                xtype: 'fixedbutton',
                itemId: 'cancelButton',
                hidden: true,
                text: 'Cancel',
                cls: 'modus-button primary small'
              }
            ]
          }
        ]
      }
    ],
    listeners: [
      {
        delegate: '#changePwdButton',
        event: 'tap',
        fn: 'onChangePwdButtonTap'
      },
      {
        delegate: '#cancelButton',
        event: 'tap',
        fn: 'onCancelButtonTap'
      }
    ]
  },
  onChangePwdButtonTap: function() {
    console.log("onChangePwdButtonTap");
    var me = this;

    var invalidPasswordLabel = me.down('#invalidPasswordLabel');
    var passwordField = me.down('#passwordTextField');
    var confirmPasswordField = me.down('#confirmPasswordTextField');

    invalidPasswordLabel.hide();
    invalidPasswordLabel.setHtml('');

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('changePwdCommand', passwordField.getValue(), confirmPasswordField.getValue());
    });

    task.delay(500);
  },
  onCancelButtonTap: function() {
    console.log("onCancelButtonTap");
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('cancelCommand');
    });

    task.delay(500);
  },
  showInvalidPasswordMessage: function (message) {
    var label = this.down('#invalidPasswordLabel');
    label.setHtml(message);
    label.show();
  }
});
