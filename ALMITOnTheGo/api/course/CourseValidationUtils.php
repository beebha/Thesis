<?php
/**
 * Class CourseValidationUtils
 *
 * A class that executes validation rules for HTTP Post parameters
 */
class CourseValidationUtils extends ValidationUtils
{
    public static function validateCoursesParams(array $postVar)
    {
        $errors = array();
        $concentration = $postVar['concentration'];
        $errors[] = parent::checkFieldIsNull('concentration', $concentration);
        $errors[] = parent::checkFieldValid(ValidationRules::$CONCENTRATION_VALID, $concentration);

        return array_diff($errors, array(""));
    }
}
 