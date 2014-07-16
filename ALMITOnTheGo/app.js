/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'ALMITOnTheGo',
    authToken: null,
//    apiURL: "http://localhost:8090/api/",
    apiURL: 'http://54.191.50.10/almitonthego/api/',
    allGrades: null,
    allConcentrations: null,
    allCategories: null,
    allCourseTerms: null,
    allCoursesStore: null,
    allEventsStore: null,
    addedCoursesStore: null,
    viewCoursesStore: null,
    viewRequirementsStore:null,
    homeTab: 0,
    coursesTab: 1,
    requirementsTab: 2,
    calendarTab: 3,
    gradesTab: 4,
    analysisTab: 5,
    contactsTab: 6,
    thesisTab: 7,
    defaultConcentrationCode: 'SWE',
    requires: [
        'Ext.MessageBox'
    ],
    controllers: [
      'Landing', 'Common', 'Login', 'Register', 'Main', 'AddCourses', 'UserInformation', 'Courses', 'Grades', 'Requirements', 'Calendar'
    ],

    views: [
      'Landing', 'Home', 'Login', 'Register', 'Main', 'AddCourses', 'UserInformation', 'Courses', 'Grades', 'Requirements', 'Calendar'
    ],

    models: [
      'Grade', 'CalendarEvent'
    ],

    stores: [
      'AddedCourses', 'AllCourses', 'ViewCourses', 'ViewRequirements', 'CourseCalendarEvents'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
      ALMITOnTheGo.app.applyToken = null;
      ALMITOnTheGo.app.allGrades = null;
      ALMITOnTheGo.app.allConcentrations = null;
      ALMITOnTheGo.app.allCategories = null;
      ALMITOnTheGo.app.allCourseTerms = null;
      ALMITOnTheGo.app.allCoursesStore = null;
      ALMITOnTheGo.app.addedCoursesStore = null;
      ALMITOnTheGo.app.viewCoursesStore = null;
      ALMITOnTheGo.app.viewRequirementsStore = null;
      ALMITOnTheGo.app.allEventsStore = null;

      // Destroy the #appLoadingIndicator element
      Ext.fly('appLoadingIndicator').destroy();

      // Initialize the login view
      Ext.Viewport.add([
        { xtype: 'landingView' },
        { xtype: 'mainView' },
        { xtype: 'registerView' },
        { xtype: 'loginView' },
        { xtype: 'addCoursesView' },
        { xtype: 'userInformationView' }
      ]);

      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL+'app.php?action=getAllStaticInfoForApp',
        method: 'get',
        success: function(response) {
          var appResponse = Ext.JSON.decode(response.responseText);

          if (appResponse.success === true) {
            ALMITOnTheGo.app.allGrades = appResponse.data.allGrades;
            ALMITOnTheGo.app.allConcentrations = appResponse.data.allConcentrations;
            ALMITOnTheGo.app.allCategories = appResponse.data.allCategories;
            ALMITOnTheGo.app.allCourseTerms = appResponse.data.allCourseTerms;
            ALMITOnTheGo.app.allCoursesStore = Ext.getStore('allCoursesStore');
            ALMITOnTheGo.app.addedCoursesStore = Ext.getStore('addedCoursesStore');
            ALMITOnTheGo.app.viewCoursesStore = Ext.getStore('viewCoursesStore');
            ALMITOnTheGo.app.viewRequirementsStore = Ext.getStore('viewRequirementsStore');
            ALMITOnTheGo.app.allEventsStore = Ext.getStore('allEventsStore');

          } else {
            // TODO - implementation
          }
        }
      });
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
