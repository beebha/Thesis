<?php

class CalendarQuery
{
    public static function getCalendarViewQuery($concentrationID)
    {
        return "SELECT conc.concentration_code, c.course_id, c.course_code, c.course_title, c.attributes,
                c.course_term_id, ct.course_term_label, c.course_day, c.course_time, ct.course_year,
                ct.start_month, ct.start_day, ct.end_month, ct.end_day
                FROM course c
                INNER JOIN concentration conc ON conc.concentration_id = c.concentration_id
                INNER JOIN course_terms ct ON ct.course_term_id = c.course_term_id
                AND ct.current_course = true
                AND c.course_day != ''
                WHERE c.concentration_id =".CalendarDBUtils::getDBValue(DBConstants::DB_VALUE, $concentrationID)."
                ORDER BY c.course_term_id ASC";
    }

    public static function createUserCalendarQuery($userID, $courseIDs)
    {
        $queriesToBeExecuted = array();
        for($i = 0; $i < count($courseIDs); $i++)
        {
            $query = "INSERT IGNORE into users_calendar (user_id, course_id) VALUES
            (" .CalendarDBUtils::getDBValue(DBConstants::DB_VALUE, $userID). "," .
                CalendarDBUtils::getDBValue(DBConstants::DB_VALUE, $courseIDs[$i]). ")";
            $queriesToBeExecuted[] = $query;
        }

        return $queriesToBeExecuted;
    }

    public static function getUserCalendarQuery($userID)
    {
        return "SELECT group_concat(course_id) allCourseIDs
                FROM users_calendar
                WHERE users_calendar.user_id = " .CalendarDBUtils::getDBValue(DBConstants::DB_VALUE, $userID);
    }
}
 