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

        Ext.Ajax.request({
          url: ALMITOnTheGo.app.apiURL+'app.php?action=getThesisInfo',
          method: 'post',
          success: function (response) {

            var thesisResponse = Ext.JSON.decode(response.responseText);

            if (thesisResponse.success === true)
            {
              // format thesis data
              var jsonThesisArr = [];
              for(var i=0; i < thesisResponse.data.thesis.length; i++ )
              {
                var thesisObj = thesisResponse.data.thesis[i];
                jsonThesisArr.push({
                  "thesisGraduation": "Graduation: " + thesisObj.thesisGraduation,
                  "items": [{
                              "thesisProposal": thesisObj.thesisGraduation,
                              "thesisDue": thesisObj.thesisDue,
                              "thesisGrade": thesisObj.thesisGrade,
                              "thesisBound": thesisObj.thesisBound,
                              "leaf": true
                            }]
                });
              }

              ALMITOnTheGo.app.viewThesisStore.applyData({"items":jsonThesisArr});

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
      }
    }
  });