<?php
/**
 * Class ALMITOnTheGo
 *
 * This class is used for
 * pre-populating static data upon
 * the applications's initialization.
 *
 */
class ALMITOnTheGo
{
    /**
     * Method that returns all relevant static info
     * required for bootstrapping the application
     *
     * @return array
     */
    public static function getAllStaticInfo()
    {
        // get all grades defined for this application
        $query = ALMITOnTheGoQuery::getGradesQuery();
        $gradesResults = DBUtils::getAllResults($query);

        // get all concentrations defined for this application
        $query = ALMITOnTheGoQuery::getConcentrationsQuery();
        $concentrationResults = DBUtils::getAllResults($query);

        // get all categories defined for this application
        $query = ALMITOnTheGoQuery::getCategoriesQuery();
        $categoriesResults = DBUtils::getAllResults($query);

        // get all course terms defined for this application
        $query = ALMITOnTheGoQuery::getCourseTermsQuery();
        $courseTermsResults = DBUtils::getAllResults($query);

        $allConcentrations = array();
        $allCategories = array();
        $allCourseTerms = array();

        // loop through all the results and build an results array
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

        // return a results array
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