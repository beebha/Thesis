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
                  labelWidth: '85%'
                },
                centered: true,
                items: [
                  {
                    xtype: 'radiofield',
                    name: 'concentration',
                    value: 1,
                    label: 'Software Engineering',
                    checked: true
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
                    label: 'Mathematics & Computation'
                  },
                  {
                    xtype: 'radiofield',
                    name: 'concentration',
                    value: 4,
                    label: 'Digital Media & Instructional Design'
                  },
                  {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Select Concentration',
                    style: {
                      fontSize: '80%'
                    }
                  },
                  {
                    docked: 'bottom',
                    xtype: 'titlebar',
                    items: [
                      {
                        xtype: 'button',
                        iconCls: 'arrow_right',
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
                defaults: {
                  labelWidth: '85%'
                },
                centered: true,
                items: [
                  {
                    xtype: 'label',
                    itemId: 'requirementsSearchLabel',
                    style: {
                      fontWeight: 'bold',
                      fontSize: '80%',
                      padding: '0.5em',
                      textAlign: 'left'
                    }
                  },
                  {
                    xtype: 'list',
                    itemId: 'viewRequirementsList',
                    hidden: true,
                    height: window.innerHeight / 2,
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
                    title: 'Requirements',
                    style: {
                      fontSize: '80%'
                    }
                  },
                  {
                    docked: 'bottom',
                    xtype: 'titlebar',
                    items: [
                      {
                        xtype: 'button',
                        iconCls: 'arrow_left',
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
