Ext.define('ALMITOnTheGo.view.AddCourses', {
  extend: 'Ext.Panel',
  xtype: 'addCoursesView',
  requires: [
    'Ext.TitleBar',
    'Ext.Toolbar',
    'Ext.Panel',
    'Ext.field.Search',
    'Ext.List',
    'Ext.plugin.SlideToRemove',
    'Ext.Anim',
    'Ext.field.Hidden'
  ],
  config: {
    items: [
      {
        docked: 'top',
        xtype: 'titlebar',
        title: 'Courses',
        items: [
          {
            xtype: 'button',
            iconCls: 'add',
            itemId: 'addButton',
            align: 'right',
            hidden: true
          }
        ]
      },
      {
        xtype: 'panel',
        itemId: 'registrationMsgPanel',
        modal: true,
        hideOnMaskTap: true,
        showAnimation: {
          type: 'popIn',
          duration: 250,
          easing: 'ease-out'
        },
        hideAnimation: {
          type: 'popOut',
          duration: 250,
          easing: 'ease-out'
        },
        centered: true,
        width: 300,
        height: 300,
        styleHtmlContent: true,
        html: '<p><b>Successful Registration!!!</b><br><br>' +
          'Please add all completed/currently registered courses or revisit this step later.<br><br>' +
          'Tap anywhere outside this alert to dismiss this message.</p>',
        items: [
          {
            docked: 'top',
            xtype: 'toolbar',
            title: 'Add Courses'
          }
        ]
      },
      {
        xtype: 'panel',
        hidden: true,
        itemId: 'addCoursesListPanel',
        style: {
          fontSize: '80%'
        },
        height: '80%',
        width: '70%',
        centered: true,
        showAnimation: 'slideIn',
        hideAnimation: 'slideOut',
        modal: true,
        hideOnMaskTap: false,
        layout: 'fit',
        items: [
          {
            xtype: 'list',
            itemId: 'addCoursesList',
            ui: 'round',
            pinHeaders: false,
            grouped: true,
            indexBar: true,
            mode: 'MULTI',
            itemTpl: '<div><b>{course_code}</b><br>' +
              '<span style="font-size: 80%">' +
              '{course_title} [{course_term_label}]</span></div>',
            store: null,
            useSimpleItems: true,
            emptyText: '<div style="margin-top: 15px; text-align: center">No Matching Items</div>',
            disableSelection: false,
            items: [
              {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                  { xtype: 'spacer' },
                  {
                    xtype: 'searchfield',
                    placeHolder: 'Search...',
                    itemId: 'addCoursesSearchField'
                  },
                  { xtype: 'spacer' },
                  {
                    xtype: 'button',
                    itemId: 'closeButton',
                    text: 'X',
                    ui: 'plain',
                    align: 'right',
                    style: {
                      padding: 5
                    }
                  }
                ]
              },
              {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                  { xtype: 'spacer' },
                  {
                    xtype: 'button',
                    itemId: 'addSelectedCoursesButton',
                    text: 'Add Courses',
                    align: 'center'
                  },
                  { xtype: 'spacer' }
                ]
              }
            ]
          },
          {
            xtype: 'hiddenfield',
            itemId: 'concentrationID'
          },
          {
            xtype: 'hiddenfield',
            itemId: 'registrationType'
          }
        ]
      },
      {
        docked: 'bottom',
        xtype: 'titlebar',
        items: [
          {
            xtype: 'button',
            text: 'Next',
            itemId: 'nextButton',
            align: 'right',
            hidden: true
          }
        ]
      }
    ],
    listeners: [
      {
        delegate: '#addButton',
        event: 'tap',
        fn: 'onAddButtonTap'
      },
      {
        delegate: '#nextButton',
        event: 'tap',
        fn: 'onNextButtonTap'
      },
      {
        delegate: '#closeButton',
        event: 'tap',
        fn: 'onCloseButtonTap'
      },
      {
        delegate: '#addCoursesSearchField',
        event: 'clearicontap',
        fn: 'onSearchClearIconTap'
      },
      {
        delegate: '#addCoursesSearchField',
        event: 'keyup',
        fn: 'onSearchKeyUp'
      },
      {
        delegate: '#addSelectedCoursesButton',
        event: 'tap',
        fn: 'onAddSelectedCoursesButtonTap'
      },
      {
        delegate: '#addedCoursesList',
        event: 'itemtap',
        fn: 'onAddedCoursesListItemTap'
      },
      {
        delegate: '#selectGradesList',
        event: 'itemtap',
        fn: 'onSelectGradesListItemTap'
      },
      {
        delegate: '#registrationMsgPanel',
        event: 'hide',
        fn: 'onRegistrationMsgPanelHide'
      }
    ]
  },
  onRegistrationMsgPanelHide: function () {
    console.log("onRegistrationMsgPanelHide");

    console.log(this.down('#concentrationID').getValue());
    console.log(this.down('#registrationType').getValue());

    this.remove(this.down('#registrationMsgPanel'), true);

    this.down('#addButton').show();
    this.down('#nextButton').show();

    this.add({
      xtype: 'container',
      itemId: 'addedCoursesContainer',
      height: '80%',
      width: '90%',
      centered: true,
      layout: 'fit',
      items: [
        {
          xtype: 'list',
          itemId: 'addedCoursesList',
          itemTpl: new Ext.XTemplate(
            '<div style="font-weight: bold;">{course_code}',
            '<span style="float: right; font-size: 80%; padding-right:3em;">',
            '<i><span id="courseStatusText{course_id}">',
            "<tpl if='grade_id !== \"NONE\"'>",
            '{grade_label}',
            '<tpl else>',
            'No Grade/Registration Selected',
            '</tpl>',
            '</span></i>',
            '</span>',
            '</div>',
            '<div style="font-weight: lighter; font-size: 80%">{course_title} [{course_term_label}]</div>'
          ),
          onItemDisclosure: true,
          store: ALMITOnTheGo.app.addedCoursesStore,
          emptyText: '<div style="font-size: 120%; color: grey">No Courses Added</div>',
          disableSelection: false,
          plugins: {
            xclass: 'Ext.plugin.SlideToRemove'
          }
        },
        {
          xtype: 'panel',
          itemId: 'selectGradesPanel',
          hidden: true,
          modal: true,
          hideOnMaskTap: false,
          showAnimation: {
            type: 'popIn',
            duration: 250,
            easing: 'ease-out'
          },
          hideAnimation: {
            type: 'popOut',
            duration: 250,
            easing: 'ease-out'
          },
          centered: true,
          width: 300,
          height: 300,
          layout: 'fit',
          items: [
            {
              xtype: 'list',
              itemId: 'selectGradesList',
              itemTpl: '{grade_label}',
              store: {
                model: 'ALMITOnTheGo.model.Grade',
                data: ALMITOnTheGo.app.allGrades
              }
            }
          ]
        }
      ]
    });
  },
  onAddedCoursesListItemTap: function () {
    console.log("onAddedCoursesListItemTap");
    var me = this;
    var selectGradesPanel = me.down('#selectGradesPanel');
    var selectGradesList = me.down('#selectGradesList');
    selectGradesList.deselectAll();
    selectGradesPanel.show();
  },
  onSelectGradesListItemTap: function (dataview, index, target, record, e, eOpts) {
    console.log("onSelectGradesListItemTap");
    var me = this;
    var addedCoursesList = me.down('#addedCoursesList');
    var selectGradesPanel = me.down('#selectGradesPanel');
    var selectedCourseRow = addedCoursesList.getSelection()[0];
    var courseID = selectedCourseRow.data.course_id;

    Ext.get('courseStatusText' + courseID).setHtml(record.data.grade_label);
    selectedCourseRow.data.grade_id = record.data.grade_id;
    selectedCourseRow.data.grade_label = record.data.grade_label;
    selectedCourseRow.data.gpa = record.data.gpa;

    var selectedIdx = ALMITOnTheGo.app.addedCoursesStore.indexOf(addedCoursesList.getSelection()[0]);
    addedCoursesList.getItemAt(selectedIdx).setStyle('background-color:transparent');

    addedCoursesList.deselectAll();
    selectGradesPanel.hide();
  },
  onAddSelectedCoursesButtonTap: function () {
    console.log("onAddSelectedCoursesButtonTap");
    var addCoursesList = this.down('#addCoursesList');
    Ext.Array.each(addCoursesList.getSelection(), function (record) {
      // check if course has already been added
      var existingRecord = ALMITOnTheGo.app.addedCoursesStore.findRecord('course_id', record.data.course_id);
      if (existingRecord == null) {
        ALMITOnTheGo.app.addedCoursesStore.addData(record.data);
      }
    });
    this.onCloseButtonTap();
  },
  onAddButtonTap: function () {
    console.log("onAddButtonTap");
    var me = this;
    var addCoursesListPanel = me.down('#addCoursesListPanel');
    var addedCoursesContainer = me.down('#addedCoursesContainer');
    var addCoursesList = me.down('#addCoursesList');

    addedCoursesContainer.hide();
    addCoursesList.deselectAll();
    addCoursesListPanel.show();
  },
  onNextButtonTap: function () {
    console.log("onNextButtonTap");
    var me = this;
    var addedCoursesList = me.down('#addedCoursesList');
    var isAllGradeStatusSet = true;
    var itemsWithNoGradeStatus = [];

    ALMITOnTheGo.app.addedCoursesStore.each(function (item, index, length) {
      if (item.get('grade_id') == 'NONE') {
        isAllGradeStatusSet = false;
        itemsWithNoGradeStatus.push(index);
      }
    });

    if (isAllGradeStatusSet) {
      var task = Ext.create('Ext.util.DelayedTask', function () {
        me.fireEvent('nextViewCommand', ALMITOnTheGo.app.addedCoursesStore.getCount());
      });
      task.delay(500);

    } else {
      Ext.Msg.alert(
        'Courses Grades/Registration Status',
        'Please set the grades/registration for the highlighted courses.',
        function () {
          Ext.Array.each(itemsWithNoGradeStatus, function (index) {
            addedCoursesList.getItemAt(index).setStyle('background-color:#C24641');
          });
        }
      );
    }
  },
  onCloseButtonTap: function () {
    console.log("onCloseButtonTap");
    var me = this;
    var addCoursesListPanel = me.down('#addCoursesListPanel');
    var addedCoursesContainer = me.down('#addedCoursesContainer');

    addCoursesListPanel.hide();
    addedCoursesContainer.show();
  },
  onSearchKeyUp: function (field) {
    var value = field.getValue(),
      store = ALMITOnTheGo.app.allCoursesStore;

    store.clearFilter(!!value);

    if (value) {
      var searches = value.split(','),
        regexps = [],
        i, regex;

      for (i = 0; i < searches.length; i++) {
        if (!searches[i]) continue;

        regex = searches[i].trim();
        regex = regex.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        regexps.push(new RegExp(regex.trim(), 'i'));
      }

      store.filter(function (record) {
        var matched = [];
        for (i = 0; i < regexps.length; i++) {
          var search = regexps[i],
            didMatch = search.test(record.get('course_code') + ' ' + record.get('course_title'));

          matched.push(didMatch);
        }

        return (regexps.length && matched.indexOf(true) !== -1);
      });
    }
  },
  onSearchClearIconTap: function () {
    ALMITOnTheGo.app.allCoursesStore.clearFilter();
  }
});
