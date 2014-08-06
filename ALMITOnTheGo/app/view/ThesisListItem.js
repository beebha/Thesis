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
    thesisGraduation: {
    },
    thesisProposal: {
      label: 'Final thesis proposal submitted to research advisor',
      readOnly: true,
      labelWrap: true,
      labelWidth: '65%',
      width: '95%',
      style: {
        borderTop: '0.1em dotted #330000',
        borderRight: '0.1em dotted #330000',
        borderLeft: '0.1em dotted #330000'
      }
    },
    thesisDue: {
      label: 'Final thesis due to director and research advisor',
      readOnly: true,
      labelWrap: true,
      labelWidth: '65%',
      width: '95%',
      style: {
        borderTop: '0.1em dotted #330000',
        borderRight: '0.1em dotted #330000',
        borderLeft: '0.1em dotted #330000'
      }
    },
    thesisGrade: {
      label: 'Grade submission',
      readOnly: true,
      labelWrap: true,
      labelWidth: '65%',
      width: '95%',
      style: {
        borderTop: '0.1em dotted #330000',
        borderRight: '0.1em dotted #330000',
        borderLeft: '0.1em dotted #330000'
      }
    },
    thesisBound: {
      label: 'Bound thesis due to program office',
      readOnly: true,
      labelWrap: true,
      labelWidth: '65%',
      width: '95%',
      style: {
        borderTop: '0.1em dotted #330000',
        borderRight: '0.1em dotted #330000',
        borderLeft: '0.1em dotted #330000'
      }
    },
    headerDataMap: {
      getThesisGraduation: {
        setHtml: 'thesisGraduation'
      }
    },
    contentDataMap: {
      getThesisProposal: {
        setValue: 'thesisProposal'
      },
      getThesisDue: {
        setValue: 'thesisDue'
      },
      getThesisGrade: {
        setValue: 'thesisGrade'
      },
      getThesisBound: {
        setValue: 'thesisBound'
      }
    }
  },
  /**
   * @param  {Object} config
   */
  applyThesisGraduation: function (config)
  {
    return Ext.factory(config, Ext.Component);
  },
  /**
   * @param  {Ext.Component} newThesisGraduation
   */
  updateThesisGraduation: function (newThesisGraduation)
  {
    if (newThesisGraduation) {
      this.add(newThesisGraduation);
    }
  },
  /**
   * @param  {Object} config
   */
  applyThesisProposal: function (config)
  {
    return Ext.factory(config, Ext.field.Text);
  },
  /**
   * @param  {Ext.Component} newThesisProposal
   */
  updateThesisProposal: function (newThesisProposal)
  {
    if (newThesisProposal) {
      this.add(newThesisProposal);
    }
  },
  /**
   * @param  {Object} config
   */
  applyThesisDue: function (config)
  {
    return Ext.factory(config, Ext.field.Text);
  },
  /**
   * @param  {Ext.Component} newThesisDue
   */
  updateThesisDue: function (newThesisDue)
  {
    if (newThesisDue) {
      this.add(newThesisDue);
    }
  },
  /**
   * @param  {Object} config
   */
  applyThesisGrade: function (config)
  {
    return Ext.factory(config, Ext.field.Text);
  },
  /**
   * @param  {Ext.Component} newThesisGrade
   */
  updateThesisGrade: function (newThesisGrade)
  {
    if (newThesisGrade) {
      this.add(newThesisGrade);
    }
  },
  /**
   * @param  {Object} config
   */
  applyThesisBound: function (config)
  {
    return Ext.factory(config, Ext.field.Text);
  },
  /**
   * @param  {Ext.Component} newThesisBound
   */
  updateThesisBound: function (newThesisBound)
  {
    if (newThesisBound) {
      this.add(newThesisBound);
    }
  }
});
