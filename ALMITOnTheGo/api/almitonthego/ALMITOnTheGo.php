<?php
 
class ALMITOnTheGo
{
    public static function getAllStaticInfo()
    {
        $query = ALMITOnTheGoQuery::getGradesQuery();
        $gradesResults = ALMITOnTheGoDBUtils::getAllResults($query);

        $query = ALMITOnTheGoQuery::getConcentrationsQuery();
        $concentrationResults = ALMITOnTheGoDBUtils::getAllResults($query);

        $query = ALMITOnTheGoQuery::getCategoriesQuery();
        $categoriesResults = ALMITOnTheGoDBUtils::getAllResults($query);

        $query = ALMITOnTheGoQuery::getCourseTermsQuery();
        $courseTermsResults = ALMITOnTheGoDBUtils::getAllResults($query);

        $allConcentrations = array();
        $allCategories = array();
        $allCourseTerms = array();

        foreach($concentrationResults as $singleConcentration)
        {
            $allConcentrations[intval($singleConcentration['concentration_id'])] = $singleConcentration['concentration_label'];
        }

        foreach($categoriesResults as $singleCategory)
        {
            $allCategories[intval($singleCategory['category_id'])] = $singleCategory['category_label'];
        }

        foreach($courseTermsResults as $singleCourseTerm)
        {
            $allCourseTerms[intval($singleCourseTerm['course_term_id'])] = $singleCourseTerm['course_term_label'];
        }

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array(
                'allGrades' => $gradesResults,
                'allConcentrations' => $allConcentrations,
                'allCategories' => $allCategories,
                'allCourseTerms' => $allCourseTerms
        ));
    }
}