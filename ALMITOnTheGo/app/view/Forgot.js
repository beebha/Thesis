Ext.define('ALMITOnTheGo.view.Forgot', {
  extend: 'Ext.Panel',
  xtype: 'forgotView',
  requires: [
  ],
  config: {
    title: 'Forgot Username/Password',
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
            xtype: 'toolbar'
          },
          {
            xtype: 'fieldset',
            instructions: {
              title:
                'You can request to have your username emailed to you ' +
                'and to reset your password if you have forgotten your username or password.<br><br>' +
                'When you fill in your registered email address, you will be sent instructions ' +
                'on how to reset your password.<br><br>',
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
        delegate: '#cancelButton',
        event: 'tap',
        fn: 'onCancelButtonTap'
      }
    ]
  },
  onCancelButtonTap: function() {
    console.log("onCancelButtonTap");
    Ext.Viewport.animateActiveItem({xtype:'loginView'}, ALMITOnTheGo.app.getController('Common').getSlideBottomTransition());
  }
});
