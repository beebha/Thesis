<?php

class UserInfoController
{
    public static function saveUserInfo($postVar)
    {
        $result = array();
        $resultData = null;

        // create user info
        $resultData = UserInfo::createUserInfo(json_decode($postVar['data'], true));

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }

    public static function getUserInfo($postVar)
    {
        $result = array();
        $resultData = null;

        // get user info details
        $resultData = UserInfo::getUserInfoDetails($postVar['authToken']);

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 