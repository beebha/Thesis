Ext.define('ALMITOnTheGo.model.Thesis', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'text', type: 'string' },
            { name: 'icon', type: 'string' },
            { name: 'message', type: 'string' },
            { name: 'limit', type: 'string' }
        ]
    }
});
