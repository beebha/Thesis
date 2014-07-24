Ext.define('ALMITOnTheGo.view.Analysis', {
  extend: 'Ext.chart.CartesianChart',
  xtype: 'analysisView',
  requires: [
    "Ext.TitleBar",
    "Ext.chart.CartesianChart",
    "Ext.chart.series.Line",
    "Ext.chart.axis.Numeric",
    "Ext.chart.axis.Category",
    "Ext.draw.sprite.Circle"
  ],
  config: {
    width: '100%',
    height: '100%',
    left: '-1.2em',
    innerPadding: 15,
    flex: 1,
    animate: true,
    store: {
      fields: ['term', 'gpa'],
      data: [
        {'term': "Sum '13", 'gpa': 0.67},
        {'term': "Fall '13", 'gpa': 1.27},
        {'term': "Jan '14", 'gpa': 1.67},
        {'term': "Spr '14", 'gpa': 4},
        {'term': "Sum '14", 'gpa': 3.33},
        {'term': "Fall '14", 'gpa': 2.67},
        {'term': "Jan '15", 'gpa': 3.21},
        {'term': "Spr '15", 'gpa': 3.96}
      ]
    },
    axes: [
      {
        type: 'numeric',
        position: 'left',
        fields: ['gpa'],
        title: {
          text: 'GPA',
          fontSize: 12,
          fontWeight: 'bold'
        },
        grid: {
            even: {
              fill: "#D9CFB0"
            },
            odd: {
              fill: "#F8F7F1"
            }
        },
        minimum: 0,
        maximum: 4
      },
      {
        type: 'category',
        position: 'bottom',
        fields: ['term'],
        title: {
          text: 'COURSE TERMS',
          fontSize: 12,
          fontWeight: 'bold',
          titlePadding: 10
        }
      }
    ],
    series: [
      {
        type: 'line',
        highlight: {
          size: 7,
          radius: 7
        },
        style: {
          stroke: '#8D8D8D'
        },
        xField: 'term',
        yField: 'gpa',
        marker: {
          type: 'path',
          path: ['M', -2, 0, 0, 2, 2, 0, 0, -2, 'Z'],
          stroke: '#330000',
          lineWidth: 2
        }
      }
    ]
  }
});
