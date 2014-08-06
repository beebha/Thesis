<?php
/**
 * Class HomeQuery
 *
 * A class that builds queries to be executed for the Home view
 */
class HomeQuery
{
    public static function getHomeView($concentrationID, $registrationType)
    {
        return "SELECT announcement
                FROM announcements
                WHERE concentration_id IN (0, " .$concentrationID. ")
                AND registration_type = " .DBUtils::getDBValue(DBConstants::DB_STRING, $registrationType). "
                ORDER BY announcement_id ASC";
    }
}
 