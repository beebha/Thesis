Ext.define('ALMITOnTheGo.controller.Contacts',
  {
    extend: 'Ext.app.Controller',
    config: {
      refs: {
        contactsView: 'contactsView'
      },
      control: {
        mainView: {
          contactsViewDetailsCommand: 'onContactsViewDetailsCommand'
        }
      }
    },
    onContactsViewDetailsCommand: function() {
      console.log("onContactsViewDetailsCommand");

      var cc = this;
      var contactsView = cc.getContactsView();

      if (ALMITOnTheGo.app.authToken == null) {

        var concentrationCode = contactsView.down('#concentrationCode').getValue();

        if(concentrationCode != 'SWE' && concentrationCode != 'IMS' && concentrationCode != 'DGM' ) {
          concentrationCode = ALMITOnTheGo.app.defaultConcentrationCode;
          contactsView.down('#concentrationCode').setValue(concentrationCode);
        }

        Ext.Ajax.request({
          url: ALMITOnTheGo.app.apiURL+'app.php?action=getInstructors',
          method: 'post',
          params: {
            authToken: null,
            concentrationID: ALMITOnTheGo.app.getController('Common').getConcentrationID(concentrationCode)
          },
          success: function (response) {
            var contactsResponse = Ext.JSON.decode(response.responseText);
            console.log(contactsResponse);
            cc.setupContactsViewPanel(contactsResponse);
          }
        });
      } else {
        Ext.Ajax.request({
          url: ALMITOnTheGo.app.apiURL+'app.php?action=getInstructors',
          method: 'post',
          params: {
            authToken: ALMITOnTheGo.app.authToken,
            concentrationID: null
          },
          success: function (response) {
            var contactsResponse = Ext.JSON.decode(response.responseText);
            console.log(contactsResponse);
            cc.setupContactsViewPanel(contactsResponse);
          }
        });
      }
    },
    setupContactsViewPanel: function(contactsResponse) {

      var cc = ALMITOnTheGo.app.getController('Contacts');
      var contactsView = cc.getContactsView();

      ALMITOnTheGo.app.viewInstructorsStore.removeAll();
      ALMITOnTheGo.app.viewInstructorsStore.applyData(contactsResponse.data.instructors);
      contactsView.down('#viewContactsList').setStore(ALMITOnTheGo.app.viewInstructorsStore);
      contactsView.down('#viewContactsList').show();

      if(ALMITOnTheGo.app.authToken == null) {
        contactsView.down('#SWEButton').show();
        contactsView.down('#IMSButton').show();
        contactsView.down('#DGMButton').show();
      }
    }
  });