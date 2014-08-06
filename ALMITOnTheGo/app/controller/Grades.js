Ext.define('ALMITOnTheGo.controller.Grades',
  {
    extend: 'Ext.app.Controller',
    config: {
      refs: {
        gradesView: 'gradesView'
      },
      control: {
        mainView: {
          gradesViewDetailsCommand: 'onGradesViewDetailsCommand'
        }
      }
    },
    onGradesViewDetailsCommand: function ()
    {
      var gc = this;
      var gradesView = gc.getGradesView();

      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL + 'app.php?action=getGradeViewDetails',
        method: 'post',
        params: {
          authToken: ALMITOnTheGo.app.authToken
        },
        success: function (response)
        {
          var gradesResponse = Ext.JSON.decode(response.responseText);

          if (gradesResponse.success === true) {
            if (gradesResponse.data.gpa == null) {
              gradesView.down('#userGPAFieldSet').hide();
            } else {
              gradesView.down('#userGPAFieldSet').show();
              if (gradesResponse.data.state == "G") {
                gradesView.down('#userGPA').setInputCls("gpa-green");
              } else if (gradesResponse.data.state == "A") {
                gradesView.down('#userGPA').setInputCls("gpa-orange");
              } else if (gradesResponse.data.state == "R") {
                gradesView.down('#userGPA').setInputCls("gpa-red");
              }

              gradesView.down('#userGPA').setValue(gradesResponse.data.gpa);
              Ext.getStore('gradesCoursesStore').applyData(gradesResponse.data.completedCourses);
            }
          }
        }
      });
    }
  });