Ext.define('ALMITOnTheGo.view.AddCourses', {
  extend: 'Ext.Panel',
  xtype: 'addCoursesView',
  requires: [
    'Ext.TitleBar',
    'Ext.Toolbar',
    'Ext.Panel',
    'Ext.field.Search',
    'Ext.List',
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
            xtype: 'fixedbutton',
            iconCls: 'add',
            itemId: 'addButton',
            align: 'right',
            hidden: true
          },
          {
            xtype: 'fixedbutton',
            iconCls: 'trash',
            iconAlign: 'right',
            text: 'Switch to',
            itemId: 'editButton',
            align: 'left',
            hidden: true
          }
        ]
      },
      {
        xtype: 'hiddenfield',
        itemId: 'editMode',
        value: 'NORMAL'
      },
      {
        xtype: 'panel',
        hidden: true,
        itemId: 'addCoursesListPanel',
        height: '95%',
        width: '95%',
        centered: true,
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
            itemTpl:  '<p><b>{course_code}</b></p>' +
                      '<p style="font-size: 80%">{course_title}</p>'+
                      '<p style="font-size: 80%"><i>{course_term_label}</i></p>',
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
                    placeHolder: 'Search',
                    itemId: 'addCoursesSearchField'
                  },
                  { xtype: 'spacer' },
                  {
                    xtype: 'fixedbutton',
                    itemId: 'closeButton',
                    text: 'X',
                    ui: 'plain',
                    align: 'right',
                    style: {
                      padding: 10
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
                    xtype: 'fixedbutton',
                    itemId: 'addSelectedCoursesButton',
                    text: 'ADD COURSES',
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
            xtype: 'fixedbutton',
            text: 'NEXT',
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
        delegate: '#editButton',
        event: 'tap',
        fn: 'onEditButtonTap'
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
      }
    ]
  },
  onRegistrationMsgPanelHide: function ()
  {
    Ext.each(Ext.query("*[id^=courseDelete]"), function(item) {
      var courseID = item.id.replace("courseDelete", "");
        Ext.get("courseDelete"+courseID).hide();
        Ext.get("courseGrade"+courseID).show();
    });

    this.down('#editMode').setValue('NORMAL');
    this.down('#editButton').setIconCls('trash');

    this.down('#addButton').show();
    this.down('#editButton').show();
    this.down('#nextButton').show();

    if(!this.down('#addedCoursesContainer')) {
      this.add({
        xtype: 'container',
        itemId: 'addedCoursesContainer',
        height: '80%',
        width: '95%',
        centered: true,
        layout: 'fit',
        style: {
          border: '0.1em solid black'
        },
        items: [
          {
            xtype: 'list',
            itemId: 'addedCoursesList',
            itemTpl: new Ext.XTemplate(
              '<p><b>{course_code}</b></p>',
              '<p><span style="font-size: 80%">{course_title}</span></p>',
              '<p><span style="font-size: 80%;"><i>{course_term_label}</i>',
              '<span id="courseGrade{course_id}" style="float:right;" class="fake-disclosure">]</span>',
              '<span id="courseDelete{course_id}" style="float:right;display:none;" class="fake-trash">#</span>',
              '</span></p>',
              '<p><span style="font-size: 80%;font-weight:bold;">',
              '<i><span id="courseStatusText{course_id}">',
              "<tpl if='grade_id !== \"NONE\"'>",
              'Grade: <span style="height:1.6em;" class="squarebox grade">{grade_label}</span>',
              '<tpl else>',
              'No Grade/Registration Selected',
              '</tpl>',
              '</span></i></span></p>'
            ),
            store: ALMITOnTheGo.app.addedCoursesStore,
            emptyText: '<div style="font-size: 120%; color: grey">No Courses Added</div>',
            disableSelection: false
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
    }
  },
  onAddedCoursesListItemTap: function (list, index, target, record, e)
  {
    if (!e.getTarget('.x-list-disclosure')) {
      var me = this;
      var inDeleteMode = me.down('#editMode').getValue() == 'DELETE';
      if(inDeleteMode) {
        ALMITOnTheGo.app.addedCoursesStore.remove(record);
        Ext.each(Ext.query("*[id^=courseDelete]"), function(item) {
          var courseID = item.id.replace("courseDelete", "");
          Ext.get("courseDelete"+courseID).show();
          Ext.get("courseGrade"+courseID).hide();
        });
      } else {
        var selectGradesPanel = me.down('#selectGradesPanel');
        var selectGradesList = me.down('#selectGradesList');
        selectGradesList.deselectAll();
        selectGradesPanel.show();
      }
    }
  },
  onSelectGradesListItemTap: function (dataview, index, target, record, e, eOpts)
  {
    var me = this;
    var addedCoursesList = me.down('#addedCoursesList');
    var selectGradesPanel = me.down('#selectGradesPanel');
    var selectedCourseRow = addedCoursesList.getSelection()[0];
    var courseID = selectedCourseRow.data.course_id;

    Ext.get('courseStatusText' + courseID).setHtml("Grade: <span style='height:1.6em;' class='squarebox grade'>"+record.data.grade_label+ "</span>");
    selectedCourseRow.data.grade_id = record.data.grade_id;
    selectedCourseRow.data.grade_label = record.data.grade_label;
    selectedCourseRow.data.gpa = record.data.gpa;

    var selectedIdx = ALMITOnTheGo.app.addedCoursesStore.indexOf(addedCoursesList.getSelection()[0]);
    addedCoursesList.getItemAt(selectedIdx).setStyle('background-color:transparent');

    addedCoursesList.deselectAll();
    selectGradesPanel.hide();
  },
  onAddSelectedCoursesButtonTap: function ()
  {
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
  onAddButtonTap: function ()
  {
    var me = this;
    var addCoursesListPanel = me.down('#addCoursesListPanel');
    var addedCoursesContainer = me.down('#addedCoursesContainer');
    var addCoursesList = me.down('#addCoursesList');

    addedCoursesContainer.hide();
    me.down('#nextButton').hide();
    me.down('#editButton').hide();
    me.down('#addButton').hide();
    addCoursesList.deselectAll();
    addCoursesListPanel.show();
  },
  onEditButtonTap: function()
  {
    var inDeleteMode = this.down('#editMode').getValue() == 'DELETE';

    console.log(this.down('#editMode').getValue());

    Ext.each(Ext.query("*[id^=courseDelete]"), function(item) {
      var courseID = item.id.replace("courseDelete", "");
      if (inDeleteMode) {
        Ext.get("courseDelete"+courseID).hide();
        Ext.get("courseGrade"+courseID).show();
      } else {
        Ext.get("courseDelete"+courseID).show();
        Ext.get("courseGrade"+courseID).hide();
      }
    });

    inDeleteMode ? this.down('#editMode').setValue('NORMAL') : this.down('#editMode').setValue('DELETE');
    inDeleteMode ? this.down('#editButton').setIconCls('trash') : this.down('#editButton').setIconCls('compose');
  },
  onNextButtonTap: function ()
  {
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
        'Courses Status',
        'Please set the grades/registration for the highlighted courses.',
        function () {
          Ext.Array.each(itemsWithNoGradeStatus, function (index) {
            addedCoursesList.getItemAt(index).setStyle('background-color:#C24641');
          });
        }
      );
    }
  },
  onCloseButtonTap: function ()
  {
    var me = this;
    var addCoursesListPanel = me.down('#addCoursesListPanel');
    var addedCoursesContainer = me.down('#addedCoursesContainer');

    addCoursesListPanel.hide();
    me.down('#nextButton').show();
    me.down('#editButton').show();
    me.down('#addButton').show();
    addedCoursesContainer.show();
  },
  onSearchKeyUp: function (field)
  {
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
  onSearchClearIconTap: function ()
  {
    ALMITOnTheGo.app.allCoursesStore.clearFilter();
  }
});
