Ext.define('ALMITOnTheGo.controller.Thesis',
  {
    extend: 'Ext.app.Controller',
    config: {
      refs: {
        thesisView: 'thesisView'
      },
      control: {
        mainView: {
          thesisViewDetailsCommand: 'onThesisViewDetailsCommand'
        }
      }
    },
    onThesisViewDetailsCommand: function() {
      console.log("onThesisViewDetailsCommand");

      var tc = this;
      var thesisView = tc.getThesisView();

    }
  });