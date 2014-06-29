<?php

class ALMITOnTheGoController
{
    public static function getAllStaticInfoForApp()
    {
        $result = array();
        $resultData = null;

        $resultData = ALMITOnTheGo::getAllStaticInfo();

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 