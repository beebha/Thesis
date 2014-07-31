Ext.define('ALMITOnTheGo.store.ViewThesis', {
  extend: 'Ext.data.TreeStore',
  requires: [
    'ALMITOnTheGo.model.Thesis'
  ],
  config: {
    storeId: 'viewThesisStore',
    defaultRootProperty: 'items',
    model: 'ALMITOnTheGo.model.Thesis',
    root: {'items' : [] }
  }
});
