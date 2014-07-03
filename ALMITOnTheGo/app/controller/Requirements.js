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
        },
        requirementsView: {
          requirementsNextButtonCommand: 'onRequirementsNextButtonCommand',
          requirementsBackButtonCommand: 'onRequirementsBackButtonCommand'
        }
      }
    },
    onRequirementsBackButtonCommand: function () {
      console.log("onRequirementsBackButtonCommand");
      var rc = this;
      var requirementsView = rc.getRequirementsView();
      requirementsView.down('#requirementsCardPanel').animateActiveItem(0, {type:'slide', direction:'right'});
    },
    onRequirementsViewDetailsCommand: function () {
      console.log("onRequirementsViewDetailsCommand");
      var rc = this;
      var requirementsView = rc.getRequirementsView();

      // if Guest, show initial courses screen
      if (ALMITOnTheGo.app.authToken == null) {
        requirementsView.down('#requirementsCardPanel').animateActiveItem(0, {type:'slide', direction:'left'});
      } else {
        Ext.Ajax.request({
          url: ALMITOnTheGo.app.apiURL+'app.php?action=getCourseCategoryViewDetails',
          method: 'post',
          params: {
            authToken: ALMITOnTheGo.app.authToken,
            concentrationID : null
          },
          success: function (response) {
            var requirementsResponse = Ext.JSON.decode(response.responseText);
            rc.setupRequirementsViewPanel(requirementsView, requirementsResponse);
          }
        });
      }
    },
    onRequirementsNextButtonCommand: function () {
      console.log("onRequirementsNextButtonCommand");
      var rc = this;
      var requirementsView = rc.getRequirementsView();

      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL+'app.php?action=getCourseCategoryViewDetails',
        method: 'post',
        params: {
          authToken: ALMITOnTheGo.app.authToken,
          concentrationID: requirementsView.down('radiofield[name=concentration]').getGroupValue()
        },
        success: function (response) {
          var requirementsResponse = Ext.JSON.decode(response.responseText);
          rc.setupRequirementsViewPanel(requirementsView, requirementsResponse);
        }
      });
    },
    setupRequirementsViewPanel: function(requirementsView, requirementsResponse) {
      console.log("setupRequirementsViewPanel");
      if (requirementsResponse.success === true) {

        var allReqs = requirementsResponse.data.currentReqs;
        ALMITOnTheGo.app.viewRequirementsStore.removeAll();

        for (singleReq in allReqs) {
          ALMITOnTheGo.app.viewRequirementsStore.addData(allReqs[singleReq]);
        }

        requirementsView.down('#viewRequirementsList').setStore(ALMITOnTheGo.app.viewRequirementsStore);
        requirementsView.down('#viewRequirementsList').show();

        ALMITOnTheGo.app.authToken == null ? requirementsView.down('#requirementsBackButton').show() : requirementsView.down('#requirementsBackButton').hide();
        requirementsView.down('#requirementsCardPanel').animateActiveItem(1, {type:'slide', direction:'left'});
      } else {
        // TODO - error handling
      }
    }
  });