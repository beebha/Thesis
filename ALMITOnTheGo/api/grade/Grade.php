<?php
/**
 * Class Grade
 *
 * This class is used for
 * retrieving GPA information
 * to display in the Grade view.
 *
 */
class Grade
{
    /**
     * Method that retrieves all grades
     * for completed courses of a registered user
     *
     * @param $authToken - registered user's auth token
     * @return array
     */
    public static function getGradeViewDetails($authToken)
    {
        $completedCourses = array();
        $gpa = 0;
        $state = null;

        if (!empty($authToken)) {
            $query = GradeQuery::getGradeViewQuery($authToken);
            $completedCourses = DBUtils::getAllResults($query);
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