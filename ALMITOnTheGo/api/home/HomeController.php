<?php

class HomeController
{
    public static function getHomeViewDetails($postVar)
    {
        $result = array();
        $resultData = null;

        // get home view details
        $resultData = Home::getHomeViewDetails($postVar['authToken']);

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 