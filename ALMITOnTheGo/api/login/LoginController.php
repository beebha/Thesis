<?php
/**
 * Class LoginController
 *
 * A controller class that directs calls to @see Login
 */
class LoginController
{
    /**
     * Method executes call in @see Login::getAuthToken
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     * @throws APIException
     */
    public static function doLogin($postVar)
    {
        $result = array();
        $resultData = null;

        $username = $postVar['username'];
        $password = $postVar['password'];
        $deviceType = $postVar['deviceType'];
        $deviceOS = $postVar['deviceOS'];

        // validate username and password
        $validationErrors = LoginValidationUtils::validateLoginParams($postVar);

        if(count($validationErrors) > 0) {
            throw new APIException("<b>Invalid Login:</b><br>". implode("<br>", $validationErrors));
        }

        // get auth token
        $resultData = Login::getAuthToken($username, $password, $deviceType, $deviceOS);

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }

    /**
     * Method executes call in @see Login::deleteAuthToken
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     */
    public static function doLogoff($postVar)
    {
        $result = array();
        $resultData = null;

        // get grade view details
        $resultData = Login::deleteAuthToken($postVar['authToken']);

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 