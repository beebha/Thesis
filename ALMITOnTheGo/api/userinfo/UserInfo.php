<?php
 
class UserInfo
{
    public static function createUserInfo(array $userInfoData)
    {
        $authToken = $userInfoData['authToken'];
        $registrationType = $userInfoData['registrationType'];
        $concentrationID = $userInfoData['concentrationID'];

        $query = UserInfoQuery::getUserInfoQuery($authToken);
        $userResults = UserInfoDBUtils::getSingleDetailExecutionResult($query);

        if($userResults['registration_type'] != $registrationType || $userResults['concentration_id'] != $concentrationID)
        {
            return array("status" => FALSE, "errorMsg" => "Sorry, registration/concentration do not match DB records", "data" => NULL);
        }

        // save all courses and associated grades
        $completedCourses = $userInfoData['completedCourses'];
        $registeredCourses = $userInfoData['registeredCourses'];
        $allCourseIDsAndGrades = array();

        foreach($completedCourses as $singleCompletedCourse )
        {
            $courseID = $singleCompletedCourse['course_id'];
            $courseGradeID = $singleCompletedCourse['grade_id'];
            $allCourseIDsAndGrades[$courseID] = $courseGradeID;
        }

        foreach($registeredCourses as $singleRegisteredCourse )
        {
            $courseID = $singleRegisteredCourse['course_id'];
            $courseGradeID = $singleRegisteredCourse['grade_id'];
            $allCourseIDsAndGrades[$courseID] = $courseGradeID;
        }

        $userID = $userResults['user_id'];
        $currentGPA = $userInfoData['currentGPA'];

        if(count($allCourseIDsAndGrades) > 0) {
            $createUserCoursesQuery = UserInfoQuery::createUpdateUserCoursesQuery($userID, $allCourseIDsAndGrades);
            $createUserCoursesResults = UserInfoDBUtils::getInsertUpdateDeleteBulkExecutionResult($createUserCoursesQuery);

            if(!$createUserCoursesResults) {
                return array("status" => FALSE, "errorMsg" => "DB Error", "data" => NULL);
            }
        }

        if(is_numeric($currentGPA)) {
            $updateGPAQuery = UserInfoQuery::updateGPAQuery($userID, $currentGPA);
            $updateGPAResults = UserInfoDBUtils::getInsertUpdateDeleteExecutionResult($updateGPAQuery);

            if(!$updateGPAResults) {
                return array("status" => FALSE, "errorMsg" => "DB Error", "data" => NULL);
            }
        }

        return array( "status" => TRUE, "errorMsg" => "", "data" => NULL);
    }

    public static function getUserInfoDetails($authToken)
    {
        if (!empty($authToken))
        {
            $query = UserInfoQuery::getUserInfoQuery($authToken);
            $userResults = UserInfoDBUtils::getSingleDetailExecutionResult($query);

            if(is_null($userResults)) {
                return array("status" => FALSE, "errorMsg" => "DB Error", "data" => NULL);
            }

            $userID = $userResults['user_id'];
            $userCoursesQuery = UserInfoQuery::getUserCoursesQuery($userID);
            $userCoursesResults = UserInfoDBUtils::getAllResults($userCoursesQuery);

            $registeredCourses = array();
            $completedCourses = array();

            foreach($userCoursesResults as $singleUserCourse)
            {
                if($singleUserCourse['grade_id'] == 1) {
                    $registeredCourses[] = $singleUserCourse;
                } else {
                    $completedCourses[] = $singleUserCourse;
                }
            }
            $userResults['registered'] = $registeredCourses;
            $userResults['completed'] = $completedCourses;

            $allAvailableCourses = Course::getCoursesForConcentration($userResults['concentration_id']);
            $userResults['allAvailableCourses'] = $allAvailableCourses['data'];

            return array( "status" => TRUE, "errorMsg" => "", "data" => $userResults);
        }
    }
}