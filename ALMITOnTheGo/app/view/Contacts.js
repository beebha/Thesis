Ext.define('ALMITOnTheGo.view.Contacts', {
  extend: 'Ext.Panel',
  xtype: 'contactsView',
  requires: [
    'Ext.field.Hidden',
    'Ext.List',
    'Ext.Anim'
  ],
  config: {
    width: '100%',
    height: '100%',
    itemId: 'contactsViewPanel',
    items: [
      {
        xtype: 'container',
        itemId: 'contactsViewContainer',
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
              {
                xtype: 'fixedbutton',
                itemId: 'SWEButton',
                text: 'SWE&nbsp;<span class="squarebox SWE">&nbsp;&nbsp;</span>',
                align: 'right',
                hidden: true,
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('SWE button tapped');
                  }
                }
              },
              {
                xtype: 'fixedbutton',
                itemId: 'IMSButton',
                text: 'IMS&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>',
                align: 'right',
                hidden: true,
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('IMS button tapped');
                  }
                }
              },
              {
                xtype: 'fixedbutton',
                itemId: 'DGMButton',
                text: 'DGM&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>',
                align: 'right',
                hidden: true,
                listeners : {
                  tap : function(button, e, eOpts) {
                    console.log('DGM button tapped');
                  }
                }
              }
            ]
          },
          {
            xtype: 'list',
            itemId: 'viewCoursesList',
            hidden: true,
            height: '95%',
            itemTpl: new Ext.XTemplate(
              '<p><span style="font-weight: bold;">{instructor_name}</span></p>',
              '<p><span style="font-size: 80%;">{instructor_url}</span></p>',
              '<p><span style="font-size: 80%;">{instructor_email}</span></p>',
              '<p>',
              '<tpl for="courses_array">',
              '<span>{.}</span>&nbsp;&nbsp;',
              '</tpl>',
              '</p>'),
            store: null,
            useSimpleItems: true,
            indexBar: true,
            disableSelection: true,
            onItemDisclosure: false
          },
          {
            xtype: 'hiddenfield',
            itemId: 'concentrationCode'
          }
        ]
      }
    ],
    listeners: [
    ]
  }
});
