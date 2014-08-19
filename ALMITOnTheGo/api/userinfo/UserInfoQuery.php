<?php
/**
 * Class UserInfoQuery
 *
 * A class that builds queries to be executed for the User Information view
 */
class UserInfoQuery
{
    public static function getUserInfoQuery($authToken)
    {
        return "SELECT mat.user_id, u.registration_type, u.gpa,
                u.concentration_id,
                DATE_FORMAT(u.last_login,'%b %d %Y %h:%i %p') last_login, u.username
                FROM mobile_auth_token mat
                INNER JOIN users u ON u.user_id = mat.user_id
                WHERE mat.auth_token = " . DBUtils::getDBValue(DBConstants::DB_STRING, $authToken);
    }

    public static function getUserInfoFromEmailQuery($userEmail)
    {
        return "SELECT user_id, username
                FROM users
                WHERE email = ".
                DBUtils::getDBValue(DBConstants::DB_STRING, $userEmail);
    }

    public static function createUpdateUserCoursesQuery($userID, array $courseIDsAndGrades)
    {
        $queriesToBeExecuted = array();
        foreach($courseIDsAndGrades as $courseID => $gradeID)
        {
            $query = "INSERT into users_courses (user_id, course_id, grade_id) VALUES
            (" .DBUtils::getDBValue(DBConstants::DB_VALUE, $userID). "," .
            DBUtils::getDBValue(DBConstants::DB_VALUE, $courseID). "," .
            DBUtils::getDBValue(DBConstants::DB_VALUE, $gradeID). ")
            ON DUPLICATE KEY UPDATE
            grade_id = " .DBUtils::getDBValue(DBConstants::DB_VALUE, $gradeID);
            $queriesToBeExecuted[] = $query;
        }

        return $queriesToBeExecuted;
    }

    public static function deleteUserCoursesQuery($userID, array $courseIDs)
    {
        $coursesClause = count($courseIDs) > 0 ? " AND course_id NOT IN (". implode(",", $courseIDs) .")" : "";

        return "DELETE FROM users_courses WHERE user_id = " .
                DBUtils::getDBValue(DBConstants::DB_VALUE, $userID). $coursesClause;
    }

    public static function updateGPAQuery($userID, $gpa)
    {
        return "UPDATE users SET gpa = " .DBUtils::getDBValue(DBConstants::DB_VALUE, $gpa). "
                     WHERE user_id = " .DBUtils::getDBValue(DBConstants::DB_VALUE, $userID);
    }

    public static function getUserCoursesQuery($userID)
    {
        return "SELECT c.course_id, c.course_code,
                ct.course_term_label, c.course_title,
                g.grade_id, g.grade_label, g.gpa
                FROM users_courses uc
                INNER JOIN course c ON c.course_id = uc.course_id
                INNER JOIN grades g ON g.grade_id = uc.grade_id
                INNER JOIN course_terms ct ON ct.course_term_id = c.course_term_id
                WHERE uc.user_id = " .DBUtils::getDBValue(DBConstants::DB_VALUE, $userID). "
                ORDER BY c.course_id ASC";
    }
}
 