<?php
 
class Home
{
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
        $announcements = HomeDBUtils::getAllResults($query);

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('userInfo' => $userIDResults, 'announcements' => $announcements));
    }
}