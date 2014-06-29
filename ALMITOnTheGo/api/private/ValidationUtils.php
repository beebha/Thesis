<?php

class ValidationUtils
{
    static function checkFieldLength($validationType, $fieldValue)
    {
        $errorMsg = "";
        $validationRuleAndError = ValidationRules::allValidationRules($validationType);

        if(!self::isFieldLengthValid($validationRuleAndError['validationRule'], $fieldValue)) {
            $errorMsg = $validationRuleAndError['validationError'];
        }
        return $errorMsg;
    }

    static function checkFieldChars($validationType, $fieldValue)
    {
        $errorMsg = "";
        $validationRuleAndError = ValidationRules::allValidationRules($validationType);

        if(!self::isFieldCharactersValid($validationRuleAndError['validationRule'], $fieldValue)) {
            $errorMsg = $validationRuleAndError['validationError'];
        }
        return $errorMsg;
    }

    static function checkFieldFormat($validationType, $fieldValue)
    {
        $errorMsg = "";
        $validationRuleAndError = ValidationRules::allValidationRules($validationType);

        if(!self::isFieldFormatValid($validationRuleAndError['validationRule'], $fieldValue)) {
            $errorMsg = $validationRuleAndError['validationError'];
        }
        return $errorMsg;
    }

    static function checkFieldValid($validationType, $fieldValue)
    {
        $errorMsg = "";
        $validationRuleAndError = ValidationRules::allValidationRules($validationType);

        if(!self::isFieldInValidValues($validationRuleAndError['validationRule'], $fieldValue)) {
            $errorMsg = $validationRuleAndError['validationError'];
        }
        return $errorMsg;
    }

    static function checkFieldIsNull($fieldName, $fieldValue)
    {
        return is_null(self::getFieldValue($fieldValue)) ? ucwords($fieldName). " cannot be null." : "";
    }

    private static function getFieldValue($fieldValue)
    {
        return isset($fieldValue) && !is_null($fieldValue) ? $fieldValue : NULL;
    }

    private static function isFieldLengthValid(array $minMaxLength, $fieldValue)
    {
        $min = $minMaxLength['min'];
        $max = $minMaxLength['max'];

        return (strlen($fieldValue) < $min) || (strlen($fieldValue) > $max) ? FALSE : TRUE;
    }

    private static function isFieldCharactersValid($validCharacterSet, $fieldValue)
    {
        return preg_match($validCharacterSet, $fieldValue) ? FALSE : TRUE;
    }

    private static function isFieldFormatValid($validCharacterSet, $fieldValue)
    {
        return !preg_match($validCharacterSet, $fieldValue) ? FALSE : TRUE;
    }

    private static function isFieldInValidValues(array $validValues, $fieldValue)
    {
        return !in_array($fieldValue, $validValues) ? FALSE : TRUE;
    }
}
 
 