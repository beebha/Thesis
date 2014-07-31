<?php

class ThesisController
{
    public static function getThesisInfo()
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
 