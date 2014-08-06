<?php
/**
 * Class ValidationRules
 *
 * A custom validation class that defines rules for the ALMITOnTheGo application
 */
class ValidationRules
{
    static $USERNAME_LENGTH = "username_length";
    static $PASSWORD_LENGTH = "password_length";
    static $USERNAME_CHARS = "username_chars";
    static $PASSWORD_CHARS = "password_chars";
    static $EMAIL_FORMAT = "email_format";
    static $REGISTRATION_TYPE_VALID = "registration_type_valid";
    static $CONCENTRATION_VALID = "concentration_valid";

    static $USERNAME_VALID_LENGTH =  array("min" => 4, "max" => 20);
    static $USERNAME_VALID_CHARS = "/[^a-zA-Z0-9]/";
    static $PASSWORD_VALID_LENGTH =  array("min" => 4, "max" => 20);
    static $PASSWORD_VALID_CHARS = "/[^a-zA-Z0-9]/";
    static $EMAIL_VALID_FORMAT = '^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]^';
    static $REGISTRATION_TYPE_VALID_VALUES = array(DBConstants::DEGREE, DBConstants::PRE_ADMISSION);
    static $CONCENTRATION_VALID_VALUES = array(
        DBConstants::NO_CONC, DBConstants::SOFTWARE_CONC,
        DBConstants::INFO_MGMT_CONC, DBConstants::MATH_COMPT_CONC,
        DBConstants::DIGM_INSTR_CONC
    );

    public static function allValidationRules($validationType)
    {
        $validationRule = null;
        $validationError = "";

        switch($validationType)
        {
            case self::$USERNAME_LENGTH:
                $validationRule = self::$USERNAME_VALID_LENGTH;
                $validationError = "Username doesn't meet length requirements.";
                break;
            case self::$PASSWORD_LENGTH:
                $validationRule = self::$PASSWORD_VALID_LENGTH;
                $validationError = "Password doesn't meet length requirements.";
                break;
            case self::$USERNAME_CHARS:
                $validationRule = self::$USERNAME_VALID_CHARS;
                $validationError = "Username contains invalid characters.";
                break;
            case self::$PASSWORD_CHARS:
                $validationRule = self::$PASSWORD_VALID_CHARS;
                $validationError = "Password contains invalid characters.";
                break;
            case self::$EMAIL_FORMAT:
                $validationRule = self::$EMAIL_VALID_FORMAT;
                $validationError = "Invalid Email format.";
                break;
            case self::$REGISTRATION_TYPE_VALID:
                $validationRule = self::$REGISTRATION_TYPE_VALID_VALUES;
                $validationError = "Invalid Registration Type Value.";
                break;
            case self::$CONCENTRATION_VALID:
                $validationRule = self::$CONCENTRATION_VALID_VALUES;
                $validationError = "Invalid Concentration Value.";
                break;
        }

        return array("validationRule"=>$validationRule, "validationError"=>$validationError);
    }
}
 