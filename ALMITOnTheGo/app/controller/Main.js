Ext.define('ALMITOnTheGo.controller.Main', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      landingView: 'landingView',
      mainView: 'mainView',
      userInformationView: 'userInformationView',
      addCoursesView: 'addCoursesView'
    },
    control: {
      mainView: {
        homeViewDetailsCommand: 'onHomeViewDetailsCommand'
      }
    }
  },
  onHomeViewDetailsCommand: function () {

    console.log("onHomeViewDetailsCommand");

    var mc = this;
    var mainView = mc.getMainView();

    Ext.Ajax.request({
      url: ALMITOnTheGo.app.apiURL+'app.php?action=getHomeViewDetails',
      method: 'post',
      params: {
        authToken: ALMITOnTheGo.app.authToken
      },
      success: function (response) {

        var mainViewResponse = Ext.JSON.decode(response.responseText);

        var welcomeMsg = "";
        var showSettingsBtn = false;
        var showGradesTab = false;
        var showAnalysisTab = false;
        var showThesisTab = false;
        var userInfo = mainViewResponse.data.userInfo;
        var announcements = [];

        if (userInfo.registration_type == 'GUEST') {
          welcomeMsg = "Welcome Guest!!!"
        } else {
          welcomeMsg = "Welcome back " + userInfo.username + "!!!<br>" + "Last Login: " + userInfo.last_login;
          showSettingsBtn = true;
          showGradesTab = true;
          showAnalysisTab = true;
          showThesisTab = userInfo.concentration_id != 2;
        }

        showThesisTab = true;

        var carouselImagesCount = 6;
        var imageNumber = 0;

        for (var i = 0; i < mainViewResponse.data.announcements.length; i++) {
          imageNumber = imageNumber < carouselImagesCount ? imageNumber : 0;
          announcements.push(Ext.create('Ext.Panel',
            {
              items: [
                {
                  html: mainViewResponse.data.announcements[i].announcement + "<br><br>",
                  style: {
                    fontSize: '120%',
                    fontWeight: 'bold'
                  }
                },
                {
                  style: {
                    width: '100%',
                    height: '80%',
                    background: 'url(resources/images/harvard' + imageNumber + '.jpg)',
                    backgroundSize: '100%',
                    backgroundRepeat: 'no-repeat'
                  }
                }
              ]
            }
          ));
          imageNumber++;
        }

        mainView.down('#welcomeLabel').setHtml(welcomeMsg);
        mainView.down('#announcementsCarousel').removeAll();
        mainView.down('#announcementsCarousel').add(announcements);
        mainView.down('#announcementsCarousel').setActiveItem(0);
        showSettingsBtn ? mainView.down('#settingsButton').show() : mainView.down('#settingsButton').hide();
        showGradesTab ?
          Ext.getCmp('mainViewTabPanel').getTabBar().getComponent(ALMITOnTheGo.app.gradesTab).show() :
          Ext.getCmp('mainViewTabPanel').getTabBar().getComponent(ALMITOnTheGo.app.gradesTab).hide();
        showAnalysisTab ?
          Ext.getCmp('mainViewTabPanel').getTabBar().getComponent(ALMITOnTheGo.app.analysisTab).show() :
          Ext.getCmp('mainViewTabPanel').getTabBar().getComponent(ALMITOnTheGo.app.analysisTab).hide();
        showThesisTab ?
          Ext.getCmp('mainViewTabPanel').getTabBar().getComponent(ALMITOnTheGo.app.thesisTab).show() :
          Ext.getCmp('mainViewTabPanel').getTabBar().getComponent(ALMITOnTheGo.app.thesisTab).hide();

        // always set home view upon registering or login
        Ext.getCmp('mainViewTabPanel').setActiveItem(0);
        Ext.getCmp('mainTitle').setTitle("Home");
      }
    });
  },
  onSettingsCommand: function () {
    var mc = this;
    var mainView = mc.getMainView();
    var addCoursesView = mc.getAddCoursesView();

    Ext.Ajax.request({
      url: ALMITOnTheGo.app.apiURL+'app.php?action=getUserInfo',
      method: 'post',
      params: {
        authToken: ALMITOnTheGo.app.authToken
      },
      success: function (response) {

        var settingsResponse = Ext.JSON.decode(response.responseText);

        if (settingsResponse.success === true) {

          mainView.setMasked(false);
          var concentrationID = settingsResponse.data.concentration_id;
          var registrationType = settingsResponse.data.registration_type;

          ALMITOnTheGo.app.addedCoursesStore.removeAll();

          Ext.Array.each(settingsResponse.data.completed, function (record) {
            ALMITOnTheGo.app.addedCoursesStore.addData(record);
          });

          Ext.Array.each(settingsResponse.data.registered, function (record) {
            ALMITOnTheGo.app.addedCoursesStore.addData(record);
          });

          // set data for add courses store and add the store to the list
          ALMITOnTheGo.app.allCoursesStore.applyData(settingsResponse.data.allAvailableCourses);
          addCoursesView.down('#addCoursesList').setStore(ALMITOnTheGo.app.allCoursesStore);

          ALMITOnTheGo.app.getController('UserInformation').populateUserInformation(concentrationID, registrationType);

        }
      }
    });
  },
  onLogoutCommand: function () {
    if(ALMITOnTheGo.app.authToken != null) {
      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL+'app.php?action=doLogoff',
        method: 'post',
        params: {
          authToken: ALMITOnTheGo.app.authToken
        }
      });
    }
    Ext.Viewport.animateActiveItem(this.getLandingView(), ALMITOnTheGo.app.getController('Common').getSlideRightTransition());
    location.reload();
  }
});