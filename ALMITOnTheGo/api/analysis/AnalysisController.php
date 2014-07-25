<?php

class AnalysisController
{
    public static function getGPAForAllTerms($postVar)
    {
        $result = array();
        $resultData = null;

        $resultData = Analysis::getGPAForAllTerms($postVar['authToken']);

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 