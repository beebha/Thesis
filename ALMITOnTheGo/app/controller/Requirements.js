Ext.define('ALMITOnTheGo.controller.Requirements',
  {
    extend: 'Ext.app.Controller',
    config: {
      refs: {
        requirementsView: 'requirementsView'
      },
      control: {
        mainView: {
          requirementsViewDetailsCommand: 'onRequirementsViewDetailsCommand'
        }
      }
    },
    onRequirementsViewDetailsCommand: function () {
      console.log("onRequirementsViewDetailsCommand");
      var rc = this;
      var requirementsView = rc.getRequirementsView();
    }
  });