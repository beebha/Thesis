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
            contactsView.down('#SWEButton').show();
            contactsView.down('#IMSButton').show();
            contactsView.down('#DGMButton').show();
          }
        });
      } else {
        contactsView.down('#allInstructorsButton').show();
      }
    }
  });