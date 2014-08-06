<?php
/**
 * Class GradeQuery
 *
 * A class that builds queries to be executed for the Grades view
 */
class GradeQuery
{
    public static function getGradeViewQuery($authToken)
    {
        return "SELECT u.gpa, c.course_code, c.course_title, g.grade_label, ct.course_term_label
                FROM users_courses uc
                INNER JOIN mobile_auth_token mat ON mat.user_id = uc.user_id
                INNER JOIN users u ON u.user_id = uc.user_id
                INNER JOIN course c ON c.course_id = uc.course_id
                INNER JOIN grades g ON g.grade_id = uc.grade_id
                INNER JOIN course_terms ct ON ct.course_term_id = c.course_term_id
                WHERE mat.auth_token = " .DBUtils::getDBValue(DBConstants::DB_STRING, $authToken). "
                AND uc.grade_id NOT IN (1)
                ORDER BY ct.course_term_id, c.course_code ASC";
    }
}
 