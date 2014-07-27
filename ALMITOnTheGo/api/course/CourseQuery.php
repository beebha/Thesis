<?php

class CourseQuery
{
    public static function getCoursesForConcentrationQuery($concentrationID)
    {
        return "SELECT c.course_id, c.attributes, c.course_code,
                c.course_title, ct.course_term_label, 'NONE' as grade_id
                FROM course c
                INNER JOIN course_terms ct ON ct.course_term_id = c.course_term_id
                WHERE concentration_id = " .CourseDBUtils::getDBValue(DBConstants::DB_VALUE, $concentrationID);
    }
    
    public static function getCompletedRequirements($authToken)
    {        
        return "SELECT c.course_id, c.attributes, u.concentration_id, uc.grade_id 
                FROM mobile_auth_token mat
                INNER JOIN users u ON mat.user_id = u.user_id
                LEFT OUTER JOIN users_courses uc ON uc.user_id = u.user_id
                LEFT OUTER JOIN course c ON c.course_id = uc.course_id
                WHERE mat.auth_token = " .CourseDBUtils::getDBValue(DBConstants::DB_STRING, $authToken). "
                ORDER BY c.course_id ASC";
    }

    public static function getCompletedCourses($authToken)
    {
        return "SELECT uc.course_id, u.concentration_id
                FROM mobile_auth_token mat
                INNER JOIN users u ON mat.user_id = u.user_id
                LEFT OUTER JOIN users_courses uc ON uc.user_id = u.user_id
                WHERE mat.auth_token = " .CourseDBUtils::getDBValue(DBConstants::DB_STRING, $authToken). "
                ORDER BY uc.course_id ASC";
    }

    public static function getCourses($concentrationID, $categoryID, $courseTermID)
    {
        $courseTermClause = $courseTermID != 0 ? " AND c.course_term_id = ".CourseDBUtils::getDBValue(DBConstants::DB_VALUE, $courseTermID) : "";
        $categoryClause = $categoryID != 0 ?
            " AND c.attributes LIKE (CONCAT('%', (SELECT category_code FROM category WHERE category_id = ".CourseDBUtils::getDBValue(DBConstants::DB_VALUE, $categoryID).") ,'%')) " : "";

        return "SELECT c.*, ct.course_term_label,
                GROUP_CONCAT(DISTINCT i.instructor_name ORDER BY i.instructor_name ASC) instructors
                FROM course c
                INNER JOIN course_terms ct ON ct.course_term_id = c.course_term_id AND ct.current_course = TRUE
                INNER JOIN instructors_courses ic ON ic.hes_course_id = c.hes_course_id
                INNER JOIN instructors i ON i.instructor_code = ic.instructor_code
                WHERE c.concentration_id = ".CourseDBUtils::getDBValue(DBConstants::DB_VALUE, $concentrationID). $courseTermClause . $categoryClause . "
                GROUP BY ic.hes_course_id";
    }

    public static function getGeneralCourseRequirements($concentrationID)
    {
        return "SELECT * FROM concentration_req WHERE concentration_id = " .CourseDBUtils::getDBValue(DBConstants::DB_VALUE, $concentrationID);
    }

    public static function getCourseRequirements($concentrationID)
    {
        return "SELECT cr.*, ct.category_code, ct.category_label
                FROM category_req cr
                INNER JOIN category ct ON
                ct.concentration_id = cr.concentration_id AND 
                ct.category_id = cr.category_id
                WHERE cr.concentration_id = " .CourseDBUtils::getDBValue(DBConstants::DB_VALUE, $concentrationID). "
                ORDER BY cr.admission DESC, cr.category_id";
    }
}
 