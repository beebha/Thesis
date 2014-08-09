<?php
/**
 * Class ContactQuery
 *
 * A class that builds queries to be executed for the Contact view
 */
class ContactQuery
{
    public static function getInstructorsQuery($concentrationID)
    {        
        return "SELECT i.*,
                    group_concat(ic.hes_course_id ORDER BY c.course_term_id ASC, c.hes_course_id ASC) as hes_course_ids,
                    group_concat(c.course_code ORDER BY c.course_term_id ASC, c.hes_course_id ASC) as course_codes,
                    group_concat(c.course_title ORDER BY c.course_term_id ASC, c.hes_course_id ASC) as course_titles,
                    group_concat(c.course_url ORDER BY c.course_term_id ASC, c.hes_course_id ASC) as course_urls,
                    group_concat(c.course_term_id ORDER BY c.course_term_id ASC, c.hes_course_id ASC) as course_term_ids,
                    group_concat(ct.course_term_label ORDER BY c.course_term_id ASC, c.hes_course_id ASC) as course_term_labels
                FROM instructors i
                INNER JOIN instructors_courses ic ON ic.instructor_code = i.instructor_code
                INNER JOIN course c ON c.hes_course_id = ic.hes_course_id
                INNER JOIN course_terms ct ON ct.course_term_id = c.course_term_id
                WHERE c.concentration_id = ".DBUtils::getDBValue(DBConstants::DB_VALUE, $concentrationID)."
                GROUP BY ic.instructor_code
                ORDER BY ic.instructor_code ASC";
    }
}
 