Ext.define('ALMITOnTheGo.view.Thesis', {
  extend: 'Ext.Panel',
  xtype: 'thesisView',
  requires: [
    'Ext.List',
    'Ext.Anim'
  ],
  config: {
    width: '100%',
    height: '100%',
    itemId: 'thesisViewPanel',
    items: [
      {
        xtype: 'container',
        itemId: 'thesisViewContainer',
        layout: {
          type: 'vbox',
          align: 'center'
        },
        width: '100%',
        height: '100%',
        items: [
          {
            docked: 'top',
            xtype: 'titlebar',
            cls: 'inner-toolbar',
            style: {
              border: 'none'
            },
            items:
            [

            ]
          }
        ]
      }
    ]
  }
});
