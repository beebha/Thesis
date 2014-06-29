<?php

class RegisterController
{
    public static function registerNewUser($postVar)
    {
        $result = array();
        $resultData = null;

        // validate post variables
        $validationErrors = RegisterValidationUtils::validateRegisterParams($postVar);

        if(count($validationErrors) > 0) {
            throw new APIException("<b>Invalid Registration:</b><br>". implode("<br>", $validationErrors));
        }

        // create user and get auth token
        $resultData = Login::createAuthToken($postVar);

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 