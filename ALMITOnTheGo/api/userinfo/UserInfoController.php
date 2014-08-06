<?php
/**
 * Class UserInfoController
 *
 * A controller class that directs calls to @see UserInfo
 */
class UserInfoController
{
    /**
     * Method executes call in @see UserInfo::saveUserInfo
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     */
    public static function saveUserInfo($postVar)
    {
        $result = array();
        $resultData = null;

        // create user info
        $resultData = UserInfo::saveUserInfo(json_decode($postVar['data'], true));

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }

    /**
     * Method executes call in @see UserInfo::getUserInfo
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     */
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

    /**
     * Method executes call in @see UserInfo::processForgotRequest
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     */
    public static function processForgotRequest($postVar)
    {
        $result = array();
        $resultData = null;

        $resultData = UserInfo::processForgotRequest($postVar['userEmail']);

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }

    /**
     * Method executes call in @see UserInfo::processChangePassword
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     */
    public static function processChangePassword($postVar)
    {
        $result = array();
        $resultData = null;

        $resultData = UserInfo::processChangePassword(
            $postVar['authToken'],
            $postVar['password'],
            $postVar['confirmPassword']
        );

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 