Ext.define('ALMITOnTheGo.store.ViewThesis', {
  extend: 'Ext.data.TreeStore',
  requires: [
    'ALMITOnTheGo.model.Thesis'
  ],
  config: {
    storeId: 'viewThesisStore',
    defaultRootProperty: 'items',
    model: 'ALMITOnTheGo.model.Thesis',
    root: {
      "items": [
        {
          "thesisGraduation": "Project A",
          "items": [
            {
              "thesisProposal": "2013/07/28",
              "thesisDue": "2013/07/28",
              "thesisGrade": "2013/07/28",
              "thesisBound": "2013/07/28",
              "leaf": true
            }
          ]
        },
        {
          "thesisGraduation": "Project B",
          "items": [
            {
              "thesisProposal": "2013/06/27",
              "thesisDue": "2013/06/27",
              "thesisGrade": "2013/06/27",
              "thesisBound": "2013/06/27",
              "leaf": true
            }
          ]
        },
        {
          "thesisGraduation": "Project C",
          "items": [
            {
              "thesisProposal": "2014/01/11",
              "thesisDue": "2014/01/11",
              "thesisGrade": "2014/01/11",
              "thesisBound": "2014/01/11",
              "leaf": true
            }
          ]
        }
      ]
    }
  }
});
