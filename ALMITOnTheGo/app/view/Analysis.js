Ext.define('ALMITOnTheGo.view.Analysis', {
  extend: 'Ext.Panel',
  xtype: 'analysisView',
  requires: [
    'Ext.TitleBar',
    'Ext.chart.CartesianChart',
    'Ext.chart.series.Line',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category',
    'Ext.draw.sprite.Circle'
  ],
  config: {
    width: '100%',
    height: '100%',
    layout: 'fit'
  }
});
