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
    // function to bring user back to concentration screen for a guest when back button is clicked
    onRequirementsBackButtonCommand: function ()
    {
      var rc = this;
      var requirementsView = rc.getRequirementsView();
      requirementsView.down('radiofield[name=concentration]').setGroupValue(1);
      requirementsView.down('#requirementsCardPanel').animateActiveItem(0, {type: 'slide', direction: 'right'});
    },
    // function to get data to build initial requirements view
    onRequirementsViewDetailsCommand: function ()
    {
      var rc = this;
      var requirementsView = rc.getRequirementsView();

      requirementsView.down('#requirementsCardPanel').hide();

      // if Guest, show initial courses screen
      if (ALMITOnTheGo.app.authToken == null) {
        requirementsView.down('#requirementsCardPanel').show();
        requirementsView.down('radiofield[name=concentration]').setGroupValue(1);
        requirementsView.down('#requirementsCardPanel').animateActiveItem(0, {type: 'slide', direction: 'left'});
      } else {

        requirementsView.setMasked({
          xtype: 'loadmask',
          message: '&nbsp;'
        });

        Ext.Ajax.request({
          url: ALMITOnTheGo.app.apiURL + 'app.php?action=getCourseCategoryViewDetails',
          method: 'post',
          params: {
            authToken: ALMITOnTheGo.app.authToken,
            concentrationID: null
          },
          success: function (response)
          {
            var requirementsResponse = Ext.JSON.decode(response.responseText);
            rc.setupRequirementsViewPanel(requirementsView, requirementsResponse);
          }
        });
      }
    },
    // function to bring user to category requirements screen
    onRequirementsNextButtonCommand: function ()
    {
      var rc = this;
      var requirementsView = rc.getRequirementsView();

      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL + 'app.php?action=getCourseCategoryViewDetails',
        method: 'post',
        params: {
          authToken: ALMITOnTheGo.app.authToken,
          concentrationID: requirementsView.down('radiofield[name=concentration]').getGroupValue()
        },
        success: function (response)
        {
          var requirementsResponse = Ext.JSON.decode(response.responseText);
          rc.setupRequirementsViewPanel(requirementsView, requirementsResponse);
        }
      });
    },
    // function to set data to build requirements view
    setupRequirementsViewPanel: function (requirementsView, requirementsResponse)
    {
      if (requirementsResponse.success === true) {

        var allReqs = requirementsResponse.data.currentReqs;
        ALMITOnTheGo.app.viewRequirementsStore.removeAll();

        for (singleReq in allReqs) {
          ALMITOnTheGo.app.viewRequirementsStore.addData(allReqs[singleReq]);
        }

        requirementsView.down('#requirementsCardPanel').show();

        requirementsView.down('#viewRequirementsList').setStore(ALMITOnTheGo.app.viewRequirementsStore);
        requirementsView.down('#viewRequirementsList').show();

        var titleText = ALMITOnTheGo.app.getController('Common').getConcentrationText(requirementsResponse.data.concentrationID);
        requirementsView.down('#viewRequirementsTitle').setTitle(titleText);

        ALMITOnTheGo.app.authToken == null ? requirementsView.down('#requirementsBackButton').show() : requirementsView.down('#requirementsBackButton').hide();
        requirementsView.down('#requirementsCardPanel').animateActiveItem(1, {type: 'slide', direction: 'left'});
        requirementsView.setMasked(false);
      }
    }
  });