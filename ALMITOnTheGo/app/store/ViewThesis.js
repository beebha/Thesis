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
          "text": "Project A",
          "items": [
            {
              "limit": "2013/07/28",
              "message": "beebha 1",
              "leaf": true
            }
          ]
        },
        {
          "text": "Project B",
          "items": [
            {
              "limit": "2013/08/28",
              "message": "beebha 2",
              "leaf": true
            }
          ]
        },
        {
          "text": "Project C",
          "items": [
            {
              "limit": "2013/09/28",
              "message": "beebha 3",
              "leaf": true
            }
          ]
        }
      ]
    }
  }
});
