<?php

class UserInfoQuery
{
    public static function getUserInfoQuery($authToken)
    {
        return "SELECT mat.user_id, u.registration_type, u.gpa,
                u.concentration_id,
                DATE_FORMAT(u.last_login,'%b %d %Y %h:%i %p') last_login, u.username
                FROM mobile_auth_token mat
                INNER JOIN users u ON u.user_id = mat.user_id
                WHERE mat.auth_token = " . UserInfoDBUtils::getDBValue(DBConstants::DB_STRING, $authToken);
    }

    public static function createUpdateUserCoursesQuery($userID, array $courseIDSAndGrades)
    {
        $queriesToBeExecuted = array();
        foreach($courseIDSAndGrades as $courseID => $gradeID)
        {
            $query = "INSERT into users_courses (user_id, course_id, grade_id) VALUES
            (" .UserInfoDBUtils::getDBValue(DBConstants::DB_VALUE, $userID). "," .
            UserInfoDBUtils::getDBValue(DBConstants::DB_VALUE, $courseID). "," .
            UserInfoDBUtils::getDBValue(DBConstants::DB_VALUE, $gradeID). ")
            ON DUPLICATE KEY UPDATE
            grade_id = " .UserInfoDBUtils::getDBValue(DBConstants::DB_VALUE, $gradeID);
            $queriesToBeExecuted[] = $query;
        }

        return $queriesToBeExecuted;
    }

    public static function deleteUserCoursesQuery($userID, array $courseIDS)
    {
        return "DELETE FROM users_courses WHERE user_id = " .
                UserInfoDBUtils::getDBValue(DBConstants::DB_VALUE, $userID). "
                AND course_id NOT IN (". implode(",", $courseIDS) .")";
    }

    public static function updateGPAQuery($userID, $gpa)
    {
        return "UPDATE users SET gpa = " .UserInfoDBUtils::getDBValue(DBConstants::DB_VALUE, $gpa). "
                     WHERE user_id = " .UserInfoDBUtils::getDBValue(DBConstants::DB_VALUE, $userID);
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
                WHERE uc.user_id = " .UserInfoDBUtils::getDBValue(DBConstants::DB_VALUE, $userID). "
                ORDER BY c.course_id ASC";
    }
}
 