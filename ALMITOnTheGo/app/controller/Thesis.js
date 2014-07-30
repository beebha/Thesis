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

      if(!thesisView.down('#thesisAccordionList')) {
        thesisView.down('#thesisViewContainer').add(
          {
            xtype: 'accordionlist',
            itemId: 'thesisAccordionList',
            store: ALMITOnTheGo.app.viewThesisStore,
            width: '100%',
            height: '100%',
            indent: true,
            useComponents: true,
            defaultType: 'thesislistitem'
          }
        );
      }
    }
  });