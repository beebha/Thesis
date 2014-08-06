<?php
/**
 * Class LoginQuery
 *
 * A class that builds queries to be executed for the Login view
 */
class LoginQuery
{
    public static function getUserDetailsQuery($username)
    {
        return "SELECT
                u.user_id, u.username, u.password_hash,
                u.registration_type, u.concentration_id,
                u.last_login, u.forgot_password
                FROM users u
                WHERE u.username = " . DBUtils::getDBValue(DBConstants::DB_STRING, $username);
    }

    public static function checkUsernameQuery($username)
    {
        return "SELECT u.username
                FROM users u
                WHERE u.username = " . DBUtils::getDBValue(DBConstants::DB_STRING, $username);
    }

    public static function getInsertUpdateMobileAuthTokenQuery($userID, $authToken, $deviceType, $deviceOS)
    {
        return "INSERT INTO mobile_auth_token
                (user_id, auth_token, device_type, device_os, create_date) values (" .
                DBUtils::getDBValue(DBConstants::DB_VALUE, $userID) . "," .
                DBUtils::getDBValue(DBConstants::DB_STRING, $authToken) . "," .
                DBUtils::getDBValue(DBConstants::DB_STRING, $deviceType) . "," .
                DBUtils::getDBValue(DBConstants::DB_STRING, $deviceOS) . ",
                CURRENT_TIMESTAMP)
                ON DUPLICATE KEY UPDATE
                auth_token = " . DBUtils::getDBValue(DBConstants::DB_STRING, $authToken) . ",
                modify_date = CURRENT_TIMESTAMP";
    }

    public static function getInsertUserQuery($username, $passwordHash, $email, $registrationType, $concentration)
    {
        return "INSERT INTO users
                (username, password_hash, email, registration_type, concentration_id, current_login, last_login, create_date) values (" .
                DBUtils::getDBValue(DBConstants::DB_STRING, $username) . "," .
                DBUtils::getDBValue(DBConstants::DB_STRING, $passwordHash) . "," .
                DBUtils::getDBValue(DBConstants::DB_STRING, $email) . "," .
                DBUtils::getDBValue(DBConstants::DB_STRING, $registrationType) . "," .
                DBUtils::getDBValue(DBConstants::DB_VALUE, $concentration) . ",
                CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
    }

    public static function getUpdatePasswordQuery($userID, $passwordHash, $forgotPasswordFlag)
    {
        return "UPDATE users
                SET forgot_password = ".DBUtils::getDBValue(DBConstants::DB_VALUE, $forgotPasswordFlag).",
                password_hash = ".DBUtils::getDBValue(DBConstants::DB_STRING, $passwordHash)."
                WHERE user_id = " .DBUtils::getDBValue(DBConstants::DB_VALUE, $userID);
    }

    public static function getUpdateLastLoginQuery($userID)
    {
        return "UPDATE users
                SET last_login = current_login, current_login = CURRENT_TIMESTAMP
                WHERE user_id = " . DBUtils::getDBValue(DBConstants::DB_VALUE, $userID);
    }

    public static function deleteAuthTokenQuery($authToken)
    {
        return "DELETE from mobile_auth_token WHERE auth_token = " .
                DBUtils::getDBValue(DBConstants::DB_STRING, $authToken);
    }
}
 