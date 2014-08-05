<?php
/**
 * Class Analysis
 *
 * This class that is used for
 * getting GPA data for a registered user
 * to display in the Analysis view.
 *
 */
class Analysis
{
    /**
     * Method that returns all relevant GPA info
     * required for displaying analysis graph
     *
     * @param $authToken - registered user's auth token
     * @return array
     */
    public static function getGPAForAllTerms($authToken)
    {
        $gpaByTerms = array();
        $results = array();
        $courseTermLabels = array(
            1 => 'Sum 13',
            2 => 'Fall 13',
            3 => 'Jan 14',
            4 => 'Spr 14',
            5 => 'Sum 14',
            6 => 'Fall 14',
            7 => 'Jan 15',
            8 => 'Spr 15',
        );

        // execute query only for registered user
        if (!empty($authToken)) {
            $query = AnalysisQuery::getGPAByTermsQuery($authToken);
            $results = DBUtils::getAllResults($query);
        }

        // loop through and build result set
        foreach($results as $gpaResult) {
            $gpaArray = explode(",", $gpaResult['all_gpa']);
            $gpaResult['gpa'] = round(array_sum($gpaArray)/count($gpaArray), 2);
            $gpaResult['gpa_x_label'] = $courseTermLabels[$gpaResult['course_term_id']];
            $gpaByTerms[] = $gpaResult;
        }

        // return a results array
        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('gpaByTerms' => $gpaByTerms));
    }
}