<?php

class ThesisController
{
    public static function getThesisInfo($postVar)
    {
        $result = array();
        $resultData = null;

        $resultData = Thesis::getThesisInfo();

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 