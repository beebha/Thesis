Ext.define('ALMITOnTheGo.view.Forgot', {
  extend: 'Ext.Panel',
  xtype: 'forgotView',
  requires: [
  ],
  config: {
    width: '100%',
    height: '100%',
    itemId: 'forgotViewPanel',
    layout: 'vbox',
    flex: 1,
    items: [
      {
        xtype: 'container',
        itemId: 'forgotViewContainer',
        width: '100%',
        height: '100%',
        items: [
          {
            docked: 'top',
            xtype: 'toolbar',
            title: 'Forgot Username/Password'
          },
          {
            xtype: 'label',
            itemId: 'invalidEmailLabel',
            hidden: true,
            hideAnimation: 'fadeOut',
            showAnimation: 'fadeIn',
            style: 'color:#990000;margin-top:0.5em;margin-left:0.5em;'
          },
          {
            xtype: 'fieldset',
            style: {
              marginTop: '-0.5em'
            },
            instructions: {
              title:
                'You can request to have your username emailed to you ' +
                'and to reset your password if you have forgotten your username or password.<br><br>',
              docked: 'top'
            },
            items: [
              {
                xtype: 'emailfield',
                placeHolder: 'Email',
                itemId: 'emailTextField',
                required: true
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
                itemId: 'requestButton',
                text: 'Request Username/Password',
                cls: 'modus-button default small'
              },
              {
                xtype: 'spacer',
                width: '0.5em'
              },
              {
                xtype: 'fixedbutton',
                itemId: 'cancelButton',
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
        delegate: '#requestButton',
        event: 'tap',
        fn: 'onRequestButtonTap'
      },
      {
        delegate: '#cancelButton',
        event: 'tap',
        fn: 'onCancelButtonTap'
      }
    ]
  },
  onRequestButtonTap: function() {
    console.log("onRequestButtonTap");
    var me = this;

    var invalidEmailLabel = me.down('#invalidEmailLabel');
    var emailField = me.down('#emailTextField');

    invalidEmailLabel.hide();
    invalidEmailLabel.setHtml('');

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('requestCommand', emailField.getValue());
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
  showInvalidEmailMessage: function (message) {
    var label = this.down('#invalidEmailLabel');
    label.setHtml(message);
    label.show();
  }
});
