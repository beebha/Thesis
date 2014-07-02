<?php

class LoginQuery
{
    public static function getUserDetailsQuery($username)
    {
        return "SELECT
                u.user_id, u.username, u.password_hash,
                u.registration_type, u.concentration_id, u.last_login
                FROM users u
                WHERE u.username = " . LoginDBUtils::getDBValue(DBConstants::DB_STRING, $username);
    }

    public static function checkUsernameQuery($username)
    {
        return "SELECT u.username
                FROM users u
                WHERE u.username = " . LoginDBUtils::getDBValue(DBConstants::DB_STRING, $username);
    }

    public static function getInsertUpdateMobileAuthTokenQuery($userID, $authToken, $deviceType, $deviceOS)
    {
        return "INSERT INTO mobile_auth_token
                (user_id, auth_token, device_type, device_os, create_date) values (" .
                LoginDBUtils::getDBValue(DBConstants::DB_VALUE, $userID) . "," .
                LoginDBUtils::getDBValue(DBConstants::DB_STRING, $authToken) . "," .
                LoginDBUtils::getDBValue(DBConstants::DB_STRING, $deviceType) . "," .
                LoginDBUtils::getDBValue(DBConstants::DB_STRING, $deviceOS) . ",
                CURRENT_TIMESTAMP)
                ON DUPLICATE KEY UPDATE
                auth_token = " . LoginDBUtils::getDBValue(DBConstants::DB_STRING, $authToken) . ",
                modify_date = CURRENT_TIMESTAMP";
    }

    public static function getInsertUserQuery($username, $passwordHash, $email, $registrationType, $concentration)
    {
        return "INSERT INTO users
                (username, password_hash, email, registration_type, concentration_id, current_login, last_login, create_date) values (" .
                LoginDBUtils::getDBValue(DBConstants::DB_STRING, $username) . "," .
                LoginDBUtils::getDBValue(DBConstants::DB_STRING, $passwordHash) . "," .
                LoginDBUtils::getDBValue(DBConstants::DB_STRING, $email) . "," .
                LoginDBUtils::getDBValue(DBConstants::DB_STRING, $registrationType) . "," .
                LoginDBUtils::getDBValue(DBConstants::DB_VALUE, $concentration) . ",
                CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
    }

    public static function getUpdateLastLoginQuery($userID)
    {
        return "UPDATE users
                SET last_login = current_login, current_login = CURRENT_TIMESTAMP
                WHERE user_id = " . LoginDBUtils::getDBValue(DBConstants::DB_VALUE, $userID);
    }

    public static function deleteAuthTokenQuery($authToken)
    {
        return "DELETE from mobile_auth_token WHERE auth_token = " .
                LoginDBUtils::getDBValue(DBConstants::DB_STRING, $authToken);
    }
}
 