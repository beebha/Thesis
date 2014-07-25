<?php
 
class Analysis
{
    public static function getGPAForAllTerms($authToken)
    {
        $gpaByTerms = array();
        $results = array();

        if (!empty($authToken)) {
            $query = AnalysisQuery::getGPAByTermsQuery($authToken);
            $results = AnalysisDBUtils::getAllResults($query);
        }

        foreach($results as $gpaResult) {
            $gpaArray = explode(",", $gpaResult['all_gpa']);
            $gpaResult['gpa'] = round(array_sum($gpaArray)/count($gpaArray), 2);
            $gpaByTerms[] = $gpaResult;
        }

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('gpaByTerms' => $gpaByTerms));
    }
}