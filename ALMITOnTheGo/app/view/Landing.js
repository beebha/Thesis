Ext.define('ALMITOnTheGo.view.Landing', {
  extend: 'Ext.Panel',
  xtype: 'landingView',
  requires: [
  ],
  config: {
    fullscreen: true,
    scrollable:'false',
    style: 'background:url(resources/images/mobile_bg.jpg);background-repeat:no-repeat;' +
           '-webkit-background-size: cover;-moz-background-size: cover;' +
           '-o-background-size: cover;background-size: cover;',
    items: [
      {
        xtype: 'titlebar',
        docked: 'bottom',
        title: '<p><a href="#registerNewUser"><span style="color:#E1D9C0;">Register</span></a>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
          '<span style="font-size:80%;font-weight:lighter;">or</span>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
          '<a href="#loginUser"><span style="color:#E1D9C0;">Log In</span></a></p>'
      },
      {
        xtype: 'titlebar',
        docked: 'top',
        items: [
          {
            xtype: 'button',
            text: 'LOG IN AS GUEST',
            itemId: 'guestButton',
            align: 'right'
          }
        ]
      }
    ],
    listeners: [
      {
        delegate: '#guestButton',
        event: 'tap',
        fn: 'onGuestButtonTap'
      }
    ]
  },
  onGuestButtonTap: function () {
    ALMITOnTheGo.app.authToken = null;
    var me = this;
    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('guestCommand');
    });

    task.delay(500);
  }
});