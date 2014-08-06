<?php
/**
 * Class Login
 *
 * This class is used for logging in a user.
 *
 */
class Login
{
    /**
     * Method that gets an auth token for the
     * current logged in session of a registered user
     *
     * @param $username
     * @param $password
     * @param $deviceType
     * @param $deviceOS
     * @return array
     */
    public static function getAuthToken($username, $password, $deviceType, $deviceOS)
    {
        $query = LoginQuery::getUserDetailsQuery($username);
        $results = DBUtils::getSingleDetailExecutionResult($query);

        if(is_null($results))
        {
            return array("status" => FALSE, "errorMsg" => "Sorry, unrecognized username or password.", "data" => NULL);
        }

        $passwordHash = $results['password_hash'];

        if(!password_verify($password, $passwordHash))
        {
            return array("status" => FALSE, "errorMsg" => "Sorry, unrecognized username or password.", "data" => NULL);
        }

        $forgotPasswordReset = $results['forgot_password'];

        // insert/update mobile_auth_token entry in DB
        $userID = $results['user_id'];
        $authToken = md5(uniqid(rand(), true));

        $query = LoginQuery::getInsertUpdateMobileAuthTokenQuery($userID, $authToken, $deviceType, $deviceOS);
        DBUtils::getInsertUpdateDeleteExecutionResult($query);

        // insert/update last_login entry in DB
        $query = LoginQuery::getUpdateLastLoginQuery($userID);
        DBUtils::getInsertUpdateDeleteExecutionResult($query);

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array
            (
                'authToken' => $authToken,
                'forgotPasswordReset' => $forgotPasswordReset
            )
        );
    }

    /**
     * Method that creates an auth token for the
     * current logged in session of a registered user
     *
     * @param array $postVar - passed values in HTTP POST request
     * @return array
     */
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
        $results = DBUtils::getSingleDetailExecutionResult($query);

        if(!is_null($results))
        {
            return array("status" => FALSE, "errorMsg" => "Username ".$username." already exists.", "data" => NULL);
        }

        // insert user entry in DB
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);

        $query = LoginQuery::getInsertUserQuery($username, $passwordHash, $email, $registrationType, $concentration);
        $userID = DBUtils::getIDAfterInsertResult($query);

        // insert/update mobile_auth_token entry in DB
        $authToken = md5(uniqid(rand(), true));

        $query = LoginQuery::getInsertUpdateMobileAuthTokenQuery($userID, $authToken, $deviceType, $deviceOS);
        DBUtils::getInsertUpdateDeleteExecutionResult($query);

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array(
                "authToken" => $authToken,
                "concentration" => $concentration,
                "registrationType" => $registrationType
            ));
    }

    /**
     * Method that deletes an auth token for the
     * current logged in session of a registered user
     *
     * @param $authToken - registered user's auth token
     * @return array
     */
    public static function deleteAuthToken($authToken)
    {
        $authTokenDeleteResult = false;

        if (!empty($authToken)) {
            $query = LoginQuery::deleteAuthTokenQuery($authToken);
            $authTokenDeleteResult = DBUtils::getInsertUpdateDeleteExecutionResult($query);
        }

        return array(
            "status" => $authTokenDeleteResult,
            "errorMsg" => $authTokenDeleteResult ? "" : "Auth Token was not deleted",
            "data" => NULL);
    }
}