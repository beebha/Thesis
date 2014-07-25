<?php
 
class Analysis
{
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

        if (!empty($authToken)) {
            $query = AnalysisQuery::getGPAByTermsQuery($authToken);
            $results = AnalysisDBUtils::getAllResults($query);
        }

        foreach($results as $gpaResult) {
            $gpaArray = explode(",", $gpaResult['all_gpa']);
            $gpaResult['gpa'] = round(array_sum($gpaArray)/count($gpaArray), 2);
            $gpaResult['gpa_x_label'] = $courseTermLabels[$gpaResult['course_term_id']];
            $gpaByTerms[] = $gpaResult;
        }

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('gpaByTerms' => $gpaByTerms));
    }
}