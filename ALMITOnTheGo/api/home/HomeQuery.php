<?php

class HomeQuery
{
    public static function getHomeView($concentrationID, $registrationType)
    {
        return "SELECT announcement
                FROM announcements
                WHERE concentration_id IN (0, " .$concentrationID. ")
                AND registration_type = " .HomeDBUtils::getDBValue(DBConstants::DB_STRING, $registrationType). "
                ORDER BY announcement_id ASC";
    }
}
 