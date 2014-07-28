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
                    button.up('#contactsViewContainer').down('#concentrationCode').setValue('SWE');
                    button.setText('SWE&nbsp;<span class="squarebox SWE">&nbsp;&nbsp;</span>');
                    button.up('#contactsViewContainer').down('#IMSButton').setText('IMS&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>');
                    button.up('#contactsViewContainer').down('#DGMButton').setText('DGM&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>');
                    ALMITOnTheGo.app.getController('Contacts').onContactsViewDetailsCommand();
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
                    button.up('#contactsViewContainer').down('#concentrationCode').setValue('IMS');
                    button.setText('IMS&nbsp;<span class="squarebox IMS">&nbsp;&nbsp;</span>');
                    button.up('#contactsViewContainer').down('#SWEButton').setText('SWE&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>');
                    button.up('#contactsViewContainer').down('#DGMButton').setText('DGM&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>');
                    ALMITOnTheGo.app.getController('Contacts').onContactsViewDetailsCommand();
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
                    button.up('#contactsViewContainer').down('#concentrationCode').setValue('DGM');
                    button.setText('DGM&nbsp;<span class="squarebox DGM">&nbsp;&nbsp;</span>');
                    button.up('#contactsViewContainer').down('#SWEButton').setText('SWE&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>');
                    button.up('#contactsViewContainer').down('#IMSButton').setText('IMS&nbsp;<span class="squarebox NONE">&nbsp;&nbsp;</span>');
                    ALMITOnTheGo.app.getController('Contacts').onContactsViewDetailsCommand();
                  }
                }
              }
            ]
          },
          {
            xtype: 'list',
            itemId: 'viewContactsList',
            hidden: true,
            width: '100%',
            height: '100%',
            ui: 'round',
            style: {
              color: '#FFFFFF',
              backgroundColor: '#330000'
            },
            itemTpl: new Ext.XTemplate(
              '<p><span style="font-weight: bold;">{instructor_name}</span></p>',
              '<p><span style="font-size: 80%;">{instructor_url}</span></p>',
              '<p><span style="font-size: 80%;">{instructor_email}</span></p>'
//              '<p>',
//              '<tpl for="hes_course_ids">',
//              '<span>{.}</span>&nbsp;&nbsp;',
//              '</tpl>',
//              '</p>'
            ),
            useSimpleItems: true,
            indexBar: true,
            disableSelection: true,
            onItemDisclosure: false,
            grouped: true
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
