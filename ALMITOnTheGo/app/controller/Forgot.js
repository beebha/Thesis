Ext.define('ALMITOnTheGo.controller.Forgot',
  {
    extend: 'Ext.app.Controller',
    config: {
      refs: {
        forgotView: 'forgotView',
        loginView: 'loginView'
      },
      control: {
        forgotView: {
          requestCommand: 'onRequestCommand',
          cancelCommand: 'onCancelCommand'
        }
      }
    },
    // function to hide forgot username/password view when cancel button is clicked
    onCancelCommand: function ()
    {
      var fc = this;
      var loginView = fc.getLoginView();

      Ext.Viewport.animateActiveItem(
        loginView,
        ALMITOnTheGo.app.getController('Common').getSlideBottomTransition()
      );
    },
    // function to send email in forgot username/password view when request button is clicked
    onRequestCommand: function (userEmail)
    {
      var fc = this;
      var forgotView = fc.getForgotView();
      var loginView = fc.getLoginView();

      if (userEmail.length === 0) {
        forgotView.showInvalidEmailMessage('Please enter your email.');
        return;
      }

      forgotView.setMasked({
        xtype: 'loadmask',
        message: '&nbsp;'
      });

      Ext.Ajax.request({
        url: ALMITOnTheGo.app.apiURL + 'app.php?action=forgotRequest',
        method: 'post',
        params: {
          userEmail: userEmail
        },
        success: function (response)
        {
          var emailResponse = Ext.JSON.decode(response.responseText);
          forgotView.setMasked(false);

          if (emailResponse.success === true) {
            Ext.Msg.show({
              title: 'Forgot Request',
              message: "Your username and new password has been sent to the registered email address.<br><br>" +
                "Upon logging in with the new password, you will be asked to set a new password.",
              width: 210,
              height: 200,
              style: {
                fontSize: '80%'
              },
              fn: function (btn)
              {
                loginView.down('#loginFailedLabel').setHtml("");
                loginView.down('#usernameTextField').setValue("");
                loginView.down('#passwordTextField').setValue("");

                Ext.Viewport.animateActiveItem(
                  loginView,
                  ALMITOnTheGo.app.getController('Common').getSlideBottomTransition()
                );
              }
            });
          } else {
            forgotView.showInvalidEmailMessage(emailResponse.error.message);
          }
        }
      });
    }
  });