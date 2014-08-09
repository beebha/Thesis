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
    // function to populate details for contacts view
    onContactsViewDetailsCommand: function ()
    {
      var cc = this;
      var contactsView = cc.getContactsView();

      contactsView.setMasked({
        xtype: 'loadmask',
        message: '&nbsp;'
      });

      if (ALMITOnTheGo.app.authToken == null) {

        var concentrationCode = contactsView.down('#concentrationCode').getValue();

        if (concentrationCode != 'SWE' && concentrationCode != 'IMS' && concentrationCode != 'DGM') {
          concentrationCode = ALMITOnTheGo.app.defaultConcentrationCode;
          contactsView.down('#concentrationCode').setValue(concentrationCode);
        }

        cc.setupContactsViewPanel(null, ALMITOnTheGo.app.getController('Common').getConcentrationID(concentrationCode));

      } else {

        cc.setupContactsViewPanel(ALMITOnTheGo.app.authToken, null);
      }
    },
    // function to get data to populate lecturers details
    setupContactsViewPanel: function (authToken, concentrationID)
    {
      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL + 'app.php?action=getInstructors',
        method: 'post',
        params: {
          authToken: authToken != null ? authToken : null,
          concentrationID: concentrationID != null ? concentrationID : null
        },
        success: function (response)
        {
          var contactsResponse = Ext.JSON.decode(response.responseText);

          var cc = ALMITOnTheGo.app.getController('Contacts');
          var contactsView = cc.getContactsView();

          ALMITOnTheGo.app.viewInstructorsStore.removeAll();
          ALMITOnTheGo.app.viewInstructorsStore.applyData(contactsResponse.data.instructors);
          contactsView.down('#viewContactsList').setStore(ALMITOnTheGo.app.viewInstructorsStore);
          contactsView.down('#viewContactsList').show();

          if (ALMITOnTheGo.app.authToken == null) {
            contactsView.down('#SWEButton').show();
            contactsView.down('#IMSButton').show();
            contactsView.down('#DGMButton').show();
          }

          contactsView.setMasked(false);
        }
      });
    }
  });