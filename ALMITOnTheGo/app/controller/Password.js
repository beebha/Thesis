Ext.define('ALMITOnTheGo.controller.Password',
  {
    extend: 'Ext.app.Controller',
    config: {
      refs: {
        passwordView: 'passwordView',
        mainView: 'mainView',
        userInformationView: 'userInformationView'
      },
      control: {
        passwordView: {
          changePwdCommand: 'onChangePwdCommand',
          cancelCommand: 'onCancelCommand'
        }
      }
    },
    onCancelCommand: function ()
    {
      var pc = this;
      var passwordView = pc.getPasswordView();
      var userInformationView = pc.getUserInformationView();

      passwordView.down('#invalidPasswordLabel').setHtml("");
      passwordView.down('#passwordTextField').setValue("");
      passwordView.down('#confirmPasswordTextField').setValue("");

      Ext.Viewport.animateActiveItem(
        userInformationView,
        ALMITOnTheGo.app.getController('Common').getSlideBottomTransition()
      );
    },
    onChangePwdCommand: function (password, confirmPassword)
    {
      var pc = this;
      var passwordView = pc.getPasswordView();
      var mainView = pc.getMainView();
      var userInformationView = pc.getUserInformationView();

      if (password.length === 0 || confirmPassword.length === 0) {
        passwordView.showInvalidPasswordMessage('Please enter password.');
        return;
      }

      passwordView.setMasked({
        xtype: 'loadmask',
        message: '&nbsp;'
      });

      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL + 'app.php?action=changePassword',
        method: 'post',
        params: {
          authToken: ALMITOnTheGo.app.authToken,
          password: password,
          confirmPassword: confirmPassword
        },
        success: function (response)
        {
          var changePwdResponse = Ext.JSON.decode(response.responseText);

          passwordView.setMasked(false);
          passwordView.down('#passwordTextField').setValue("");
          passwordView.down('#confirmPasswordTextField').setValue("");

          if (changePwdResponse.success === true) {
            Ext.Msg.show({
              title: 'Change Password',
              message: "Congratulations!<br><br>You have successfully changed your password.",
              width: 210,
              height: 200,
              style: {
                fontSize: '80%'
              },
              fn: function (btn)
              {
                // if cancel button is visible, change password from User Information vs Reset
                passwordView.down('#cancelButton').isHidden() ?
                  Ext.Viewport.animateActiveItem(
                    mainView,
                    ALMITOnTheGo.app.getController('Common').getSlideBottomTransition()
                  ) :
                  Ext.Viewport.animateActiveItem(
                    userInformationView,
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