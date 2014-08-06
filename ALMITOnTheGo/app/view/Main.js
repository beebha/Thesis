Ext.define('ALMITOnTheGo.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'mainView',
  requires: [
    'Ext.TitleBar'
  ],
  config: {
    tabBar: {
      docked: 'bottom',
      scrollable: 'horizontal'
    },
    id: 'mainViewTabPanel',
    listeners: {
      activeitemchange: function (tabPanel, tab, oldTab)
      {
        Ext.getCmp('mainTitle').setTitle(tab.config.title);

        var me = this;

        if (tab.config.title == 'Courses') {
          me.fireEvent('coursesViewDetailsCommand');
        }
        if (tab.config.title == 'Requirements') {
          me.fireEvent('requirementsViewDetailsCommand');
        }
        if (tab.config.title == 'Calendar') {
          me.fireEvent('calendarViewDetailsCommand', 'month', 'current', 'current');
        }
        if (tab.config.title == 'Grades') {
          me.fireEvent('gradesViewDetailsCommand');
        }
        if (tab.config.title == 'Analysis') {
          me.fireEvent('analysisViewDetailsCommand');
        }
        if (tab.config.title == 'Contacts') {
          me.fireEvent('contactsViewDetailsCommand');
        }
        if (tab.config.title == 'Thesis') {
          me.fireEvent('thesisViewDetailsCommand');
        }
      },
      show: function ()
      {
        this.getHomeViewDetails();
      }
    },
    items: [
      {
        docked: 'top',
        xtype: 'titlebar',
        id: 'mainTitle',
        items: [
          {
            xtype: 'fixedbutton',
            iconCls: 'users',
            itemId: 'settingsButton',
            align: 'left',
            style: {
              color: '#E1D9C0'
            },
            hidden: true,
            listeners: {
              tap: function ()
              {
                ALMITOnTheGo.app.getController('Main').onSettingsCommand();
              }
            }
          },
          {
            xtype: 'fixedbutton',
            iconCls: 'exit',
            itemId: 'logoutButton',
            align: 'right',
            style: {
              color: '#E1D9C0'
            },
            listeners: {
              tap: function ()
              {
                ALMITOnTheGo.app.getController('Main').onLogoutCommand();
              }
            }
          }
        ]
      },
      {
        title: 'Home',
        iconCls: 'home',
        items: {
          xtype: 'homeView'
        }
      },
      {
        title: 'Courses',
        iconCls: 'stackoverflow',
        items: {
          xtype: 'coursesView'
        }
      },
      {
        title: 'Requirements',
        iconCls: 'signup',
        items: {
          xtype: 'requirementsView'
        }
      },
      {
        title: 'Calendar',
        iconCls: 'calendar',
        items: {
          xtype: 'calendarView'
        }
      },
      {
        title: 'Grades',
        iconCls: 'trophy',
        hidden: true,
        items: {
          xtype: 'gradesView'
        }
      },
      {
        title: 'Analysis',
        iconCls: 'stats',
        hidden: true,
        items: {
          xtype: 'analysisView'
        }
      },
      {
        title: 'Contacts',
        iconCls: 'address-book',
        items: {
          xtype: 'contactsView'
        }
      },
      {
        title: 'Thesis',
        iconCls: 'checkmark-cir',
        hidden: true,
        items: {
          xtype: 'thesisView'
        }
      }
    ]
  },
  getHomeViewDetails: function ()
  {
    var me = this;
    me.fireEvent('homeViewDetailsCommand');
  }
});
