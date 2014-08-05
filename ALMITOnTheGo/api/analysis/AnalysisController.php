<?php
/**
 * Class AnalysisController
 *
 * A controller class that directs calls to @see Analysis
 */
class AnalysisController
{
    /**
     * Method executes call in @see Analysis::getGPAForAllTerms
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     */
    public static function getGPAForAllTerms($postVar)
    {
        $result = array();
        $resultData = null;

        $resultData = Analysis::getGPAForAllTerms($postVar['authToken']);

        // return a response array that's decoded to JSON before returning to the client
        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 