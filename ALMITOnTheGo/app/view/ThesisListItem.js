Ext.define('ALMITOnTheGo.view.ThesisListItem', {
  extend: 'Ext.ux.AccordionListItem',
  xtype: 'thesislistitem',

  requires: [
    'Ext.field.Text'
  ],

  config: {
    layout: {
      type: 'vbox'
    },
    text: {
    },
    button: null,
    message: {
      docked: 'bottom',
      label: 'message'
    },
    thesisProposal: {
      docked: 'top',
      label: 'Final thesis proposal submitted to research advisor',
      readOnly: true
    },

    headerDataMap: {
      getText: {
        setHtml: 'text'
      },
      getButton: {
        setIconCls: 'icon'
      }
    },
    contentDataMap: {
      getThesisProposal: {
        setValue: 'thesisProposal'
      },
      getMessage: {
        setValue: 'message'
      }
    }
  },

  /**
   * @param  {Object} config
   */
  applyText: function (config) {
    return Ext.factory(config, Ext.Component);
  },

  /**
   * @param  {Ext.Component} newText
   */
  updateText: function (newText) {
    if (newText) {
      this.add(newText);
    }
  },

  /**
   * @param  {Object} config
   */
  applyButton: function (config) {
    return Ext.factory(config, Ext.Button);
  },

  /**
   * @param  {Ext.Component} newButton
   */
  updateButton: function (newButton) {
    if (newButton) {
      this.add(newButton);
    }
  },

  /**
   * @param  {Object} config
   */
  applyThesisProposal: function (config) {
    return Ext.factory(config, Ext.field.Text);
  },

  /**
   * @param  {Ext.Component} newThesisProposal
   */
  updateThesisProposal: function (newThesisProposal) {
    if (newThesisProposal) {
      this.add(newThesisProposal);
    }
  },

  /**
   * @param  {Object} config
   */
  applyMessage: function (config) {
    return Ext.factory(config, Ext.field.TextArea);
  },

  /**
   * @param  {Ext.Component} newMessage
   */
  updateMessage: function (newMessage) {
    if (newMessage) {
      this.add(newMessage);
    }
  }

});
