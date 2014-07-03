<?php
 
class Grade
{
    public static function getGradeViewDetails($authToken)
    {
        $completedCourses = array();
        $gpa = 0;
        $state = null;

        if (!empty($authToken)) {
            $query = GradeQuery::getGradeViewQuery($authToken);
            $completedCourses = GradeDBUtils::getAllResults($query);
            $gpa = count($completedCourses) > 0 ? $completedCourses[0]['gpa'] : 0;
        }

        // calculate GPA state
        if($gpa >= 3.00) {
            $state = "G";
        } else if ($gpa >= 2.00) {
            $state = "A";
        } else {
            $state = "R";
        }

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('gpa' => $gpa, 'state' => $state, 'completedCourses' => $completedCourses));
    }
}