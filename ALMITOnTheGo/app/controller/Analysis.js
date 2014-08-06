Ext.define('ALMITOnTheGo.controller.Analysis',
  {
    extend: 'Ext.app.Controller',
    config: {
      refs: {
        analysisView: 'analysisView'
      },
      control: {
        mainView: {
          analysisViewDetailsCommand: 'onAnalysisViewDetailsCommand'
        }
      }
    },
    onAnalysisViewDetailsCommand: function ()
    {
      var ac = this;
      var analysisView = ac.getAnalysisView();

      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL + 'app.php?action=getGPAForAllTerms',
        method: 'post',
        params: {
          authToken: ALMITOnTheGo.app.authToken
        },
        success: function (response)
        {
          var analysisResponse = Ext.JSON.decode(response.responseText);

          if (analysisResponse.success === true) {
            ALMITOnTheGo.app.allTermsGPA.removeAll();
            ALMITOnTheGo.app.allTermsGPA.applyData(analysisResponse.data.gpaByTerms);
            analysisView.removeAll();
            analysisView.add(
              {
                xtype: 'chart',
                width: '100%',
                height: '100%',
                left: '-1.2em',
                innerPadding: 15,
                flex: 1,
                animate: true,
                store: ALMITOnTheGo.app.allTermsGPA,
                axes: [
                  {
                    type: 'numeric',
                    position: 'left',
                    fields: ['gpa'],
                    title: {
                      text: 'GPA',
                      fontSize: 12,
                      fontWeight: 'bold'
                    },
                    grid: {
                      even: {
                        fill: "#D9CFB0"
                      },
                      odd: {
                        fill: "#F8F7F1"
                      }
                    },
                    minimum: 0,
                    maximum: 4
                  },
                  {
                    type: 'category',
                    position: 'bottom',
                    fields: ['gpa_x_label'],
                    title: {
                      text: 'COURSE TERMS',
                      fontSize: 12,
                      fontWeight: 'bold',
                      titlePadding: 10
                    }
                  }
                ],
                series: [
                  {
                    type: 'line',
                    highlight: {
                      size: 7,
                      radius: 7
                    },
                    style: {
                      stroke: '#8D8D8D'
                    },
                    xField: 'gpa_x_label',
                    yField: 'gpa',
                    marker: {
                      type: 'path',
                      path: ['M', -2, 0, 0, 2, 2, 0, 0, -2, 'Z'],
                      stroke: '#330000',
                      lineWidth: 2
                    }
                  }
                ]
              }
            );
          }
        }
      });
    }
  });