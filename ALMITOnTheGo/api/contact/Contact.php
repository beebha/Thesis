<?php
 
class Contact
{
    public static function getInstructors($authToken, $concentrationID)
    {
        $instructors = array();

        if(!empty($authToken)) {
            $userInfoQuery = UserInfoQuery::getUserInfoQuery($authToken);
            $userResults = ContactDBUtils::getSingleDetailExecutionResult($userInfoQuery);
            $concentrationID = $userResults['concentration_id'];
        }

        $query = ContactQuery::getInstructorsQuery($concentrationID);
        $instructors = ContactDBUtils::getAllResults($query);

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('instructors' => $instructors));
    }
}