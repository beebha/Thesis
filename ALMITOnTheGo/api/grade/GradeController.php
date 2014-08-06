<?php
/**
 * Class GradeController
 *
 * A controller class that directs calls to @see Grade
 */
class GradeController
{
    /**
     * Method executes call in @see Grade::getGradeViewDetails
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     */
    public static function getGradeViewDetails($postVar)
    {
        $result = array();
        $resultData = null;

        // get grade view details
        $resultData = Grade::getGradeViewDetails($postVar['authToken']);

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 