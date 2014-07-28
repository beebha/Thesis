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
        $instructorResults = ContactDBUtils::getAllResults($query);

        foreach($instructorResults as $singleInstructor) {
            $coursesDetails = array();
            $HESCourseIDs = explode(",", $singleInstructor['hes_course_ids']);
            $courseCodes = explode(",", $singleInstructor['course_codes']);
            $courseTitles= explode(",", $singleInstructor['course_titles']);
            $courseUrls = explode(",", $singleInstructor['course_urls']);
            $courseTermLabels = explode(",", $singleInstructor['course_term_labels']);

            for($i = 0; $i < count($HESCourseIDs); $i++) {
                $coursesDetails[] = '<p style="font-size: 70%;font-weight:lighter;">'. $courseCodes[$i]. '<a href="'.$courseUrls[$i].'" target="_blank">'.
                                    '&nbsp;<span style="font-family:\'Pictos\';">A</span></a></p>'.
                                    '<p style="font-size: 70%;font-weight:lighter;">' . $courseTitles[$i] . '</p>' .
                                    '<p style="font-size: 70%;font-weight:lighter;">' . $courseTermLabels[$i] . '</p>';
            }

            $singleInstructor['courses_details'] = $coursesDetails;
            $instructors[] = $singleInstructor;
        }

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('instructors' => $instructors));
    }
}