<?php

class CalendarQuery
{
    public static function getCalendarViewForUserQuery($authToken)
    {
        return "";
    }

    public static function getCalendarViewForGuestQuery($concentrationID, $startDate, $endDate)
    {
        return "SELECT conc.concentration_code, c.course_id, c.course_code, c.course_title, c.attributes,
                c.course_term_id, ct.course_term_label, c.course_day, c.course_time, ct.course_year,
                ct.start_month, ct.start_day, ct.end_month, ct.end_day
                FROM course c
                INNER JOIN concentration conc ON conc.concentration_id = c.concentration_id
                INNER JOIN course_terms ct ON ct.course_term_id = c.course_term_id
                AND ct.current_course = true
                WHERE c.concentration_id =".CalendarDBUtils::getDBValue(DBConstants::DB_VALUE, $concentrationID)."
                AND c.course_day != ''
                ORDER BY c.course_term_id ASC";
    }
}
 