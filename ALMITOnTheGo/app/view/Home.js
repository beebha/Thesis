Ext.define('ALMITOnTheGo.view.Home', {
  extend: 'Ext.Panel',
  xtype: 'homeView',
  requires: [
    'Ext.carousel.Carousel'
  ],
  config: {
    width: '100%',
    height: '100%',
    layout: 'vbox',
    items: [
      {
        xtype: 'label',
        itemId: 'welcomeLabel',
        height: '10%',
        style: {
          fontWeight: 'bold',
          padding: '0.5em'
        }
      },
      {
        xtype: 'carousel',
        itemId: 'announcementsCarousel',
        defaults: {
          styleHtmlContent: true
        },
        centered: true,
        width: '95%',
        height: '70%',
        style: {
          border: '0.1em solid #330000'
        },
        items: []
      }
    ]
  }
});
