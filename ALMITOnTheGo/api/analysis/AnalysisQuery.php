<?php

class AnalysisQuery
{
    public static function getGPAByTermsQuery($authToken)
    {
        return "SELECT group_concat(g.gpa) as all_gpa, ct.course_term_label, ct.course_term_id
                FROM users_courses uc
                INNER JOIN mobile_auth_token mat ON mat.user_id = uc.user_id
                INNER JOIN users u ON u.user_id = uc.user_id
                INNER JOIN course c ON c.course_id = uc.course_id
                INNER JOIN grades g ON g.grade_id = uc.grade_id
                INNER JOIN course_terms ct ON ct.course_term_id = c.course_term_id
                WHERE mat.auth_token = ".DBUtils::getDBValue(DBConstants::DB_STRING, $authToken)."
                AND uc.grade_id NOT IN (1)
                GROUP BY ct.course_term_id
                ORDER BY ct.course_term_id ASC";
    }
}
 