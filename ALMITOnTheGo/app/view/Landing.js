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
        docked: 'top',
        items: [
          {
            xtype: 'button',
            text: 'LOG IN AS GUEST',
            itemId: 'guestButton',
            align: 'right',
            style: {
              color: '#E1D9C0'
            }
          }
        ]
      },
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
        xtype: 'panel',
        layout: {
          type: 'vbox',
          align:'center'
        },
        items: [
          {
            xtype: 'image',
            src: 'resources/images/ALMITOnTheGo_logo.png',
            width: 290,
            height: 165
          },
          {
            xtype: 'carousel',
            defaults: {
              styleHtmlContent: true
            },
            width: '75%',
            height: 250,
            style: {
              border: '0.2em solid #A4946D',
              borderRadius: '0.5em'
            },
            items: [
              {
                html: '<center>' +
                      '<span style ="font-size:120%;color:#A4946D;font-weight:bold;">' +
                      '<br><br>ALM IT On The Go<br>' +
                      'A personal assistant mobile application for ALM IT Graduate Program candidates.' +
                      '</span>' +
                      '</center>'
              },
              {
                html: '<span style ="font-size:110%;color:#A4946D;">' +
                      'A one-stop mobile application that allows <B>Registered</B> users to:<br><br>' +
                      'View & Schedule Courses<br>' +
                      'View Courses Conflicts<br>' +
                      'View Requirements<br>' +
                      'View User Information<br>' +
                      'View GPA & Analysis<br>' +
                      'View Contacts<br>' +
                      'View Thesis Info<br>' +
                      'View Announcements<br>' +
                      '</span>'
              },
              {
                html: '<span style ="font-size:110%;color:#A4946D;">' +
                      'A one-stop mobile application that allows <B>Guest</B> users to:<br><br>' +
                      'View Courses<br>' +
                      'View Courses Conflicts<br>' +
                      'View Requirements<br>' +
                      'View Contacts<br>' +
                      'View Thesis Info<br>' +
                      'View Announcements<br>' +
                      '</span>'
              }
            ]
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