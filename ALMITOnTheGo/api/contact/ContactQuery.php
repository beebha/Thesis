<?php

class ContactQuery
{
    public static function getInstructorsQuery($concentrationID)
    {
        return "SELECT i.*,
                group_concat(c.course_code ORDER BY c.course_id ASC)  course_codes,
                group_concat(c.course_title ORDER BY c.course_id ASC) course_titles,
                group_concat(c.course_term_id ORDER BY c.course_id ASC) course_terms,
                group_concat(c.course_url ORDER BY c.course_id ASC) course_urls
                FROM thesis.course c
                INNER JOIN thesis.course_terms ct ON ct.course_term_id = c.course_term_id
                INNER JOIN thesis.instructors_courses ic ON ic.hes_course_id = c.hes_course_id
                INNER JOIN thesis.instructors i ON i.instructor_code = ic.instructor_code
                WHERE c.concentration_id = ".CalendarDBUtils::getDBValue(DBConstants::DB_VALUE, $concentrationID)."
                AND ct.current_course = TRUE
                GROUP BY i.instructor_id
                ORDER BY ct.course_term_id ASC, c.course_id ASC, i.instructor_name ASC";
    }

    public static function getSummerInstructorsQuery($concentrationID)
    {

    }
}
 