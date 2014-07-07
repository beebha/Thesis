Ext.define('ALMITOnTheGo.view.Register', {
  extend: 'Ext.form.Panel',
  xtype: 'registerView',
  requires: [
    'Ext.form.FieldSet',
    'Ext.Label',
    'Ext.Img',
    'Ext.field.Email',
    'Ext.field.Select'
  ],
  config: {
    title: 'Register',
    items: [
      {
        xtype: 'titlebar',
        title: 'Register',
        docked: 'top'
      },
      {
        xtype: 'label',
        html: 'Registration failed.',
        itemId: 'registrationFailedLabel',
        hidden: true,
        hideAnimation: 'fadeOut',
        showAnimation: 'fadeIn',
        style: 'color:#990000;margin:10px;'
      },
      {
        xtype: 'fieldset',
        title: 'Register New User',
        items: [
          {
            xtype: 'textfield',
            placeHolder: 'Desired Username',
            itemId: 'usernameTextField',
            name: 'usernameTextField',
            required: true,
            autoCapitalize: false,
            minLength: 4,
            maxLength: 20
          },
          {
            xtype: 'emailfield',
            placeHolder: 'Email',
            itemId: 'emailTextField',
            name: 'emailTextField',
            required: true

          },
          {
            xtype: 'passwordfield',
            placeHolder: 'Password',
            itemId: 'passwordTextField',
            name: 'passwordTextField',
            required: true,
            minLength: 4,
            maxLength: 20
          },
          {
            xtype: 'passwordfield',
            placeHolder: 'Confirm Password',
            itemId: 'confirmPasswordTextField',
            name: 'confirmPasswordTextField',
            required: true,
            minLength: 4,
            maxLength: 20
          },
          {
            xtype: 'selectfield',
            label: 'Candidate Type',
            labelWidth: '37%',
            itemId: 'selectRegistrationTypeField',
            name: 'selectRegistrationTypeField',
            options: [
              { text: 'Degree Candidate', value: 'DEGREE' },
              { text: 'Pre-Admission Candidate', value: 'PRE-ADMISSION' }
            ]
          },
          {
            xtype: 'selectfield',
            label: 'Concentration',
            labelWidth: '37%',
            itemId: 'selectConcentrationField',
            name: 'selectConcentrationField',
            options: [
              { text: 'None Selected', value: 0 },
              { text: 'Software Engineering', value: 1 },
              { text: 'Information Management Systems', value: 2 },
              { text: 'Mathematics And Computation', value: 3 },
              { text: 'Digital Media And Instructional Design', value: 4 }
            ]
          }
        ]
      },
      {
        xtype: 'panel',
        layout: { type: 'hbox'},
        items: [
          {
            xtype: 'button',
            itemId: 'registerButton',
            cls: 'modus-button default',
            padding: 10,
            margin: 5,
            text: 'Register',
            flex: 1
          },
          {
            xtype: 'button',
            itemId: 'cancelButton',
            cls: 'modus-button primary',
            padding: 10,
            margin: 5,
            text: 'Cancel',
            flex: 1
          }
        ]
      }
    ],
    listeners: [
      {
        delegate: '#registerButton',
        event: 'tap',
        fn: 'onRegisterButtonTap'
      },
      {
        delegate: '#cancelButton',
        event: 'tap',
        fn: 'onCancelButtonTap'
      }
    ]
  },
  onCancelButtonTap: function () {
    this.fireEvent('cancelRegisterCommand');

  },
  onRegisterButtonTap: function () {
    history.pushState("", document.title, window.location.pathname);

    var me = this;

    var usernameField = me.down('#usernameTextField'),
      emailField = me.down('#emailTextField'),
      passwordField = me.down('#passwordTextField'),
      confirmPasswordField = me.down('#confirmPasswordTextField'),
      registrationTypeField = me.down('#selectRegistrationTypeField'),
      concentrationField = me.down('#selectConcentrationField'),
      registrationFailedLabel = me.down('#registrationFailedLabel');

    registrationFailedLabel.hide();

    var username = usernameField.getValue(),
      email = emailField.getValue(),
      password = passwordField.getValue(),
      confirmPassword = confirmPasswordField.getValue(),
      registrationType = registrationTypeField.getValue(),
      concentration = concentrationField.getValue();

    var task = Ext.create('Ext.util.DelayedTask', function () {
      registrationFailedLabel.setHtml('');
      me.fireEvent('registerCommand', me, email, username, password, confirmPassword, registrationType, concentration);
    });
    task.delay(500);
  },
  showRegistrationFailedMessage: function (message) {
    var label = this.down('#registrationFailedLabel');
    label.setHtml(message);
    label.show();
  }
});