Ext.define('ALMITOnTheGo.controller.Password',
  {
    extend: 'Ext.app.Controller',
    config: {
      refs: {
        passwordView: 'passwordView',
        mainView: 'mainView'
      },
      control: {
        passwordView: {
          changePwdCommand: 'onChangePwdCommand',
          cancelCommand: 'onCancelCommand'
        }
      }
    },
    onCancelCommand:function()
    {
      console.log("onCancelCommand");
      var pc = this;
      var mainView = pc.getMainView();

      Ext.Viewport.animateActiveItem(
        mainView,
        ALMITOnTheGo.app.getController('Common').getSlideBottomTransition()
      );
    },
    onChangePwdCommand: function (password, confirmPassword)
    {
      var pc = this;
      var passwordView = pc.getPasswordView();
      var mainView = pc.getMainView();

      console.log(password);
      console.log(confirmPassword);

      console.log("onChangePwdCommand");
      if (password.length === 0 || confirmPassword.length === 0) {
        passwordView.showInvalidPasswordMessage('Please enter password.');
        return;
      }

      passwordView.setMasked({
        xtype: 'loadmask',
        message: '&nbsp;'
      });

      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL+'app.php?action=changePassword',
        method: 'post',
        params: {
          authToken: ALMITOnTheGo.app.authToken,
          password: password,
          confirmPassword: confirmPassword
        },
        success: function (response) {

          var changePwdResponse = Ext.JSON.decode(response.responseText);
          passwordView.setMasked(false);

          if (changePwdResponse.success === true) {
            Ext.Msg.show({
              title: 'Change Password',
              message:
                "Congratulations!<br><br>You have successfully changed your password.",
              width: 210,
              height: 200,
              style: {
                fontSize: '80%'
              },
              fn:function(btn) {
                Ext.Viewport.animateActiveItem(
                  mainView,
                  ALMITOnTheGo.app.getController('Common').getSlideBottomTransition()
                );
              }
            });
          } else {
            passwordView.showInvalidPasswordMessage(changePwdResponse.error.message);
          }
        }
      });
    }
  });