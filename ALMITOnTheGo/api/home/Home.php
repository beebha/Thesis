<?php
/**
 * Class Home
 *
 * This class is used for
 * retrieving announcements
 * to display in the Home view.
 *
 */
class Home
{
    /**
     * Method that retrieves all announcements
     * for the concentration of a registered user
     *
     * @param $authToken - registered user's auth token
     * @return array
     */
    public static function getHomeViewDetails($authToken)
    {
        $userIDResults = array();

        if (!empty($authToken)) {
            $query = UserInfoQuery::getUserInfoQuery($authToken);
            $userIDResults = UserInfoDBUtils::getSingleDetailExecutionResult($query);
        } else {
            $userIDResults['registration_type'] = 'GUEST';
        }

        $concentrationID = !empty($authToken) ? $userIDResults['concentration_id'] : 0;
        $registrationType = !empty($authToken) ? $userIDResults['registration_type'] : 'GUEST';

        $query = HomeQuery::getHomeView($concentrationID, $registrationType);
        $announcements = DBUtils::getAllResults($query);

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('userInfo' => $userIDResults, 'announcements' => $announcements));
    }
}