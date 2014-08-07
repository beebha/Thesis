Ext.define('ALMITOnTheGo.view.Thesis', {
  extend: 'Ext.Panel',
  xtype: 'thesisView',
  requires: [
    'Ext.ux.AccordionList',
    'Ext.SegmentedButton'
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
            xtype: 'toolbar',
            cls: 'inner-toolbar',
            style: {
              border: 'none'
            },
            items: [
              {
                xtype: 'fixedbutton',
                centered: true,
                text: 'Expand All Thesis Info',
                listeners: {
                  tap: function ()
                  {
                    if(this.getText() == 'Expand All Thesis Info') {
                      this.up('#thesisViewContainer').down('#thesisAccordionList').doAllExpand();
                      this.setText("Collapse All Thesis Info");
                    } else {
                      this.up('#thesisViewContainer').down('#thesisAccordionList').doAllCollapse();
                      this.setText("Expand All Thesis Info");
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  }
});
