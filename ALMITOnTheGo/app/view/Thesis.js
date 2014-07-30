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
                xtype: 'segmentedbutton',
                centered: true,
                items: [
                  {
                    text: 'Expand',
                    action: 'expand',
                    listeners: {
                      tap: function() {
                        this.up('#thesisViewContainer').down('#thesisAccordionList').doAllExpand();
                      }
                    }
                  },
                  {
                    text: 'Collapse',
                    action: 'collapse',
                    listeners: {
                      tap: function() {
                        this.up('#thesisViewContainer').down('#thesisAccordionList').doAllCollapse();
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
