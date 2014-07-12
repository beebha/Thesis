<?php
 
class Calendar
{
    public static function getCalendarViewDetails($authToken)
    {
        $completedCourses = array();
        $gpa = 0;
        $state = null;

        if (!empty($authToken)) {
            $query = CalendarQuery::getCalendarViewQuery($authToken);
            $calendarCourses = CalendarDBUtils::getAllResults($query);
        }

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('gpa' => $gpa, 'state' => $state, 'completedCourses' => $completedCourses));
    }
}