Ext.define('ALMITOnTheGo.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'mainView',
  requires: [
    'Ext.TitleBar'
  ],
  config: {
    tabBar     : {
      docked     : 'bottom',
      scrollable : 'horizontal'
    },
    id: 'mainViewTabPanel',
    listeners: {
      activeitemchange: function (tabPanel, tab, oldTab) {
        Ext.getCmp('mainTitle').setTitle(tab.config.title);

        var me = this;

        if (tab.config.title == 'Courses') {
          console.log("Courses clicked!");
          me.fireEvent('coursesViewDetailsCommand');
        }
        if (tab.config.title == 'Requirements') {
          console.log("Requirements clicked!");
          me.fireEvent('requirementsViewDetailsCommand');
        }
        if (tab.config.title == 'Grades') {
          console.log("Grades clicked!");
          me.fireEvent('gradesViewDetailsCommand');
        }
      },
      show: function () {
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
            xtype: 'button',
            iconCls: 'cogs',
            itemId: 'settingsButton',
            align: 'right',
            hidden: true,
            listeners: {
              tap: function () {
                ALMITOnTheGo.app.getController('Main').onSettingsCommand();
              }
            }
          },
          {
            xtype: 'button',
            iconCls: 'exit',
            itemId: 'logoutButton',
            align: 'right',
            listeners: {
              tap: function () {
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
        iconCls: 'calendar'
      },
      {
        title: 'Grades',
        iconCls: 'trophy',
        items: {
          xtype: 'gradesView'
        }
      },
      {
        title: 'Analysis',
        iconCls: 'stats'
      },
      {
        title: 'Contacts',
        iconCls: 'address-book'
      }
    ]
  },
  getHomeViewDetails: function () {
    var me = this;
    me.fireEvent('homeViewDetailsCommand');
  }
});
