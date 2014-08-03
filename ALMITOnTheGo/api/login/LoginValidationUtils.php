<?php

class LoginValidationUtils extends ValidationUtils
{
    public static function validateLoginParams(array $postVar)
    {
        $errors = array();

        foreach ($postVar as $key => $value)
        {
            $errors[] = parent::checkFieldIsNull($key, $value);
        }

        $username = $postVar['username'];
        $password = $postVar['password'];

        $errors[] = parent::checkFieldLength(ValidationRules::$USERNAME_LENGTH, $username);
        $errors[] = parent::checkFieldChars(ValidationRules::$USERNAME_CHARS, $username);
        $errors[] = parent::checkFieldLength(ValidationRules::$PASSWORD_LENGTH, $password);
        $errors[] = parent::checkFieldChars(ValidationRules::$PASSWORD_CHARS, $password);

        return array_diff($errors, array(""));
    }

    public static function validateUserEmailParams($userEmail)
    {
        $errors = array();
        $errors[] = parent::checkFieldIsNull('email', $userEmail);
        $errors[] = parent::checkFieldFormat(ValidationRules::$EMAIL_FORMAT, $userEmail);

        return array_diff($errors, array(""));
    }
}
 