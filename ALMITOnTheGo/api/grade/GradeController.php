<?php

class GradeController
{
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
 