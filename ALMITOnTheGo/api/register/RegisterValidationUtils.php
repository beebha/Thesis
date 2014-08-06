<?php
/**
 * Class RegisterValidationUtils
 *
 * A class that executes validation rules for HTTP Post parameters
 */
class RegisterValidationUtils extends ValidationUtils
{
    public static function validateRegisterParams(array $postVar)
    {
        $errors = array();

        foreach ($postVar as $key => $value)
        {
            $errors[] = parent::checkFieldIsNull($key, $value);
        }

        $email = $postVar['email'];
        $username = $postVar['username'];
        $password = $postVar['password'];
        $confirmPassword = $postVar['confirmPassword'];
        $registrationType = $postVar['registrationType'];
        $concentration = $postVar['concentration'];

        $errors[] = parent::checkFieldFormat(ValidationRules::$EMAIL_FORMAT, $email);
        $errors[] = parent::checkFieldLength(ValidationRules::$USERNAME_LENGTH, $username);
        $errors[] = parent::checkFieldChars(ValidationRules::$USERNAME_CHARS, $username);
        $errors[] = parent::checkFieldLength(ValidationRules::$PASSWORD_LENGTH, $password);
        $errors[] = parent::checkFieldChars(ValidationRules::$PASSWORD_CHARS, $password);
        $errors[] = parent::checkFieldLength(ValidationRules::$PASSWORD_LENGTH, $confirmPassword);
        $errors[] = parent::checkFieldChars(ValidationRules::$PASSWORD_CHARS, $confirmPassword);
        $errors[] = parent::checkFieldValid(ValidationRules::$REGISTRATION_TYPE_VALID, $registrationType);
        $errors[] = parent::checkFieldValid(ValidationRules::$CONCENTRATION_VALID, $concentration);

        if($password !== $confirmPassword)
        {
            $errors[] = "Password doesn't match confirmation.";
        }

        if(($registrationType === DBConstants::DEGREE) && ($concentration == DBConstants::NO_CONC))
        {
            $errors[] = "Concentration is required for Degree Candidates.";
        }

        return array_diff($errors, array(""));
    }
}
 