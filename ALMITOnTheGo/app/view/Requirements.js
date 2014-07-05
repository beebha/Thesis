Ext.define('ALMITOnTheGo.view.Requirements', {
  extend: 'Ext.Panel',
  xtype: 'requirementsView',
  requires: [
    'Ext.field.Radio'
  ],
  config: {
    width: '100%',
    height: '100%',
    itemId: 'requirementsViewPanel',
    items: [
      {
        xtype: 'panel',
        itemId: 'requirementsCardPanel',
        layout:{
          type:'card',
          animation:{
            type:'slide',
            direction: 'left'
          }
        },
        width: '100%',
        height: '100%',
        items: [
          {
            xtype: 'panel',
            itemId: 'selectReqConcentrationPanel',
            hidden: true,
            layout: 'vbox',
            items: [
              {
                xtype: 'fieldset',
                itemId: 'selectReqConcentrationFieldSet',
                width: '95%',
                defaults: {
                  labelWidth: '88%'
                },
                centered: true,
                items: [
                  {
                    xtype: 'radiofield',
                    name: 'concentration',
                    value: 1,
                    label: 'Software Engineering'
                  },
                  {
                    xtype: 'radiofield',
                    name: 'concentration',
                    value: 2,
                    label: 'Information Management Systems'
                  },
                  {
                    xtype: 'radiofield',
                    name: 'concentration',
                    value: 3,
                    label: 'Mathematics And Computation'
                  },
                  {
                    xtype: 'radiofield',
                    name: 'concentration',
                    value: 4,
                    label: 'Digital Media And Instructional Design'
                  },
                  {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Select Concentration',
                    cls: 'inner-toolbar',
                    style: {
                      border: 'none'
                    }
                  },
                  {
                    docked: 'bottom',
                    xtype: 'titlebar',
                    cls: 'inner-toolbar',
                    style: {
                      border: 'none'
                    },
                    items: [
                      {
                        xtype: 'button',
                        iconCls: 'arrow_right inner-toolbar-button',
                        iconMask: true,
                        itemId: 'requirementsNextButton',
                        align: 'right'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            xtype: 'panel',
            itemId: 'viewRequirementsPanel',
            hidden: true,
            layout: 'vbox',
            items: [
              {
                xtype: 'fieldset',
                itemId: 'viewRequirementsFieldSet',
                width: '95%',
                height:'95%',
                defaults: {
                  labelWidth: '88%'
                },
                centered: true,
                items: [
                  {
                    xtype: 'list',
                    itemId: 'viewRequirementsList',
                    hidden: true,
                    height: '100%',
                    itemTpl: new Ext.XTemplate(
                      '<p><b>{category_label}</b></p>',
                      '<p><span style="font-weight:normal;font-size: 90%;">{subText}</span></p>',
                      '<p style="margin-top:0.2em;">',
                      '<span class="squarebox {category_code}">{category_code}</span>',
                      '</p>'),
                    store: null,
                    useSimpleItems: true,
                    disableSelection: true
                  },
                  {
                    docked: 'top',
                    xtype: 'titlebar',
                    itemId: 'viewRequirementsTitle',
                    cls: 'inner-toolbar',
                    style: {
                      border: 'none'
                    }
                  },
                  {
                    docked: 'bottom',
                    xtype: 'titlebar',
                    cls: 'inner-toolbar',
                    style: {
                      border: 'none'
                    },
                    items: [
                      {
                        xtype: 'button',
                        iconCls: 'arrow_left inner-toolbar-button',
                        iconMask: true,
                        itemId: 'requirementsBackButton',
                        align: 'left',
                        hidden: true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    listeners: [
      {
        delegate: '#requirementsNextButton',
        event: 'tap',
        fn: 'onRequirementsNextButton'
      },
      {
        delegate: '#requirementsBackButton',
        event: 'tap',
        fn: 'onRequirementsBackButton'
      }
    ]
  },
  onRequirementsNextButton: function () {
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('requirementsNextButtonCommand');
    });

    task.delay(500);
  },
  onRequirementsBackButton: function () {
    var me = this;

    var task = Ext.create('Ext.util.DelayedTask', function () {
      me.fireEvent('requirementsBackButtonCommand');
    });

    task.delay(500);
  }
});
