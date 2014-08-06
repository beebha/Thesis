Ext.define('ALMITOnTheGo.model.Thesis', {
  extend: 'Ext.data.Model',
  config: {
    fields: [
      { name: 'thesisGraduation', type: 'string' },
      { name: 'thesisProposal', type: 'string' },
      { name: 'thesisDue', type: 'string' },
      { name: 'thesisGrade', type: 'string' },
      { name: 'thesisBound', type: 'string' }
    ]
  }
});
