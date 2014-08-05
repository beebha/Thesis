<?php
/**
 * Class CalendarQuery
 *
 * A class that builds queries to be executed for the Calendar view
 */
class CalendarQuery
{
    public static function getCalendarViewQuery($concentrationID)
    {
        return "SELECT conc.concentration_code, c.course_id, c.course_code, c.course_title, c.attributes,
                    c.course_term_id, ct.course_term_label, c.course_day, c.course_time,
                    c.course_type, c.location,
                    ct.course_year, ct.start_month, ct.start_day, ct.end_month, ct.end_day,
                    group_concat(DISTINCT i.instructor_name ORDER BY i.instructor_name ASC) instructors
                    FROM course c
                    INNER JOIN concentration conc ON conc.concentration_id = c.concentration_id
                    INNER JOIN course_terms ct ON ct.course_term_id = c.course_term_id
                    INNER JOIN instructors_courses ic ON ic.hes_course_id = c.hes_course_id
                    INNER JOIN instructors i ON i.instructor_code = ic.instructor_code
                    AND ct.current_course = true
                    AND c.course_day <> ''
                    WHERE c.concentration_id = ".DBUtils::getDBValue(DBConstants::DB_VALUE, $concentrationID)."
                    GROUP BY ic.hes_course_id
                    ORDER BY c.course_term_id ASC";
    }

    public static function createUserCalendarQuery($userID, $courseIDs)
    {
        $queriesToBeExecuted = array();
        for($i = 0; $i < count($courseIDs); $i++)
        {
            $query = "INSERT IGNORE into users_calendar (user_id, course_id) VALUES
            (" .DBUtils::getDBValue(DBConstants::DB_VALUE, $userID). "," .
                DBUtils::getDBValue(DBConstants::DB_VALUE, $courseIDs[$i]). ")";
            $queriesToBeExecuted[] = $query;
        }

        return $queriesToBeExecuted;
    }

    public static function deleteUserCalendarQuery($userID, $courseID)
    {
        return "DELETE from users_calendar
                WHERE user_id = " .DBUtils::getDBValue(DBConstants::DB_VALUE, $userID). "
                AND course_id = " . DBUtils::getDBValue(DBConstants::DB_VALUE, $courseID);
    }

    public static function getUserCalendarQuery($userID)
    {
        return "SELECT group_concat(course_id) allCourseIDs
                FROM users_calendar
                WHERE users_calendar.user_id = " .DBUtils::getDBValue(DBConstants::DB_VALUE, $userID);
    }
}
 