<?php
 
class Login
{
    public static function getAuthToken($username, $password, $deviceType, $deviceOS)
    {
        $query = LoginQuery::getUserDetailsQuery($username);
        $results = LoginDBUtils::getSingleDetailExecutionResult($query);

        if(is_null($results))
        {
            return array("status" => FALSE, "errorMsg" => "Sorry, unrecognized username or password.", "data" => NULL);
        }

        $passwordHash = $results['password_hash'];

        if(!password_verify($password, $passwordHash))
        {
            return array("status" => FALSE, "errorMsg" => "Sorry, unrecognized username or password.", "data" => NULL);
        }

        // insert/update mobile_auth_token entry in DB
        $userID = $results['user_id'];
        $authToken = md5(uniqid(rand(), true));

        $query = LoginQuery::getInsertUpdateMobileAuthTokenQuery($userID, $authToken, $deviceType, $deviceOS);
        LoginDBUtils::getInsertUpdateDeleteExecutionResult($query);

        return array("status" => TRUE, "errorMsg" => "", "data" => $authToken);
    }

    public static function createAuthToken(array $postVar)
    {
        $email = $postVar['email'];
        $username = $postVar['username'];
        $password = $postVar['password'];
        $registrationType = $postVar['registrationType'];
        $concentration = $postVar['concentration'];
        $deviceType = $postVar['deviceType'];
        $deviceOS = $postVar['deviceOS'];

        $query = LoginQuery::getUserDetailsQuery($username);
        $results = LoginDBUtils::getSingleDetailExecutionResult($query);

        if(!is_null($results))
        {
            return array("status" => FALSE, "errorMsg" => "Username ".$username." already exists.", "data" => NULL);
        }

        // insert user entry in DB
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        $query = LoginQuery::getInsertUserQuery($username, $passwordHash, $email, $registrationType, $concentration);
        $userID = LoginDBUtils::getIDAfterInsertResult($query);

        // insert/update mobile_auth_token entry in DB
        $authToken = md5(uniqid(rand(), true));

        $query = LoginQuery::getInsertUpdateMobileAuthTokenQuery($userID, $authToken, $deviceType, $deviceOS);
        LoginDBUtils::getInsertUpdateDeleteExecutionResult($query);

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array(
                "authToken" => $authToken,
                "concentration" => $concentration,
                "registrationType" => $registrationType
            ));
    }

    public static function deleteAuthToken($authToken)
    {
        $authTokenDeleteResult = false;

        if (!empty($authToken)) {
            $query = LoginQuery::deleteAuthTokenQuery($authToken);
            $authTokenDeleteResult = LoginDBUtils::getInsertUpdateDeleteExecutionResult($query);
        }

        return array(
            "status" => $authTokenDeleteResult,
            "errorMsg" => $authTokenDeleteResult ? "" : "Auth Token was not deleted",
            "data" => NULL);
    }
}