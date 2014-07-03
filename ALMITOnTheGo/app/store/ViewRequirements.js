Ext.define('ALMITOnTheGo.store.ViewRequirements', {
  extend: 'Ext.data.Store',
  config: {
    storeId: 'viewRequirementsStore',
    fields: ['category_id', 'category_code', 'category_label', 'subText'],
    sorters: ['category_id'],
    data: []
  }
});