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
              '<p><span style="font-weight:bold;color:#330000">',
              '<a href="#" onclick="window.open(\'{instructor_url}\',\'_self\', \'location=yes\')">{instructor_name}&nbsp;',
              '<span style="font-family:\'Pictos\';">A</span></a></span></p>',
              '<p><span style="font-size: 80%;">',
              '<a href="#" onclick="window.open(\'mailto:{instructor_email}?subject=Course Query\')">',
              '{instructor_email}&nbsp;<span style="font-family:\'Pictos\';">M</span></a></span></p>',
              '<p>',
              '<tpl for="courses_details">',
              '<br>{.}',
              '</tpl>',
              '</p>'
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
