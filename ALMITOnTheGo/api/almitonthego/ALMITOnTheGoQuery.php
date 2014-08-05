<?php
/**
 * Class ALMITOnTheGoQuery
 *
 * A class that builds queries to be executed
 */
class ALMITOnTheGoQuery
{
    public static function getGradesQuery()
    {
        return "SELECT g.*
                FROM grades g
                ORDER BY g.grade_id ASC";
    }

    public static function getConcentrationsQuery()
    {
        return "SELECT c.concentration_id, c.concentration_label
                FROM concentration c
                ORDER BY c.concentration_id ASC";
    }

    public static function getCourseTermsQuery()
    {
        return "SELECT *
                FROM course_terms
                WHERE current_course = 1
                ORDER BY course_term_id";
    }

    public static function getCategoriesQuery()
    {
        return "SELECT *
                FROM category
                ORDER BY concentration_id, category_id ASC";

    }
}
 