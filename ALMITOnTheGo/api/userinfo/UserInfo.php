<?php
 
class UserInfo
{
    public static function saveUserInfo(array $userInfoData)
    {
        $authToken = $userInfoData['authToken'];
        $registrationType = $userInfoData['registrationType'];
        $concentrationID = $userInfoData['concentrationID'];

        $query = UserInfoQuery::getUserInfoQuery($authToken);
        $userResults = UserInfoDBUtils::getSingleDetailExecutionResult($query);

        if($userResults['registration_type'] != $registrationType || $userResults['concentration_id'] != $concentrationID)
        {
            return array
            (
                "status" => FALSE,
                "errorMsg" => "Sorry, registration/concentration do not match our records",
                "data" => NULL
            );
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

            if(count(array_keys($allCourseIDsAndGrades)) > 0) {
                $deleteUserCoursesQuery = UserInfoQuery::deleteUserCoursesQuery($userID, array_keys($allCourseIDsAndGrades));
                $deleteUserCoursesResults = UserInfoDBUtils::getInsertUpdateDeleteExecutionResult($deleteUserCoursesQuery);

                if(!$deleteUserCoursesResults) {
                    return array("status" => FALSE, "errorMsg" => "DB Error", "data" => NULL);
                }
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

    public static function processForgotRequest($userEmail)
    {
        // validate email
        $validationErrors = LoginValidationUtils::validateUserEmailParams($userEmail);

        if(count($validationErrors) > 0) {
            throw new APIException("<b>Invalid Email:</b><br>". implode("<br>", $validationErrors));
        }

        // check if email exists
        $query = UserInfoQuery::getUserInfoFromEmailQuery($userEmail);
        $userEmailResults = UserInfoDBUtils::getSingleDetailExecutionResult($query);

        if(is_null($userEmailResults))
        {
            return array
            (
                "status" => FALSE,
                "errorMsg" => "Sorry, email address does not exist in our records.",
                "data" => NULL
            );
        }

        $userID = $userEmailResults['user_id'];
        $username = $userEmailResults['username'];
        $password = self::randomPassword();
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);

        error_log("Password : " . $password);
        error_log("Password Hash: " . $passwordHash);
        error_log("User ID: " . $userID);
        error_log("User Name: " . $username);
        error_log("User Email: " . $userEmail);

        // send email to user with username and password
        $message = "Dear ".$username." <br>,
                    As you requested, your password has now been reset.<br>
                    Your new details are as follows:<br>
                    Username: ".$username."<br>
                    Password: ".$password."<br>
                    To change your password, please login to the ALM IT On-The-Go application.<br><br>
                    Cheers ALM IT On-The-Go Bot :)";

        // To send HTML mail, the Content-type header must be set
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'From: ALM IT On-The-Go Bot <almitonthego@bot.com>' . "\r\n";

        $sentEmail = mail($userEmail,'Your new password for ALM IT On-The-Go', $message, $headers);

        if(!$sentEmail) {
            return array
            (
                "status" => FALSE,
                "errorMsg" => "Sorry, email with reset instructions was not successfully sent.",
                "data" => NULL
            );
        }

        // update with new password hash and set forgot password flag to true
        $updateQuery = LoginQuery::getUpdatePasswordQuery($userID, $passwordHash);
        UserInfoDBUtils::getInsertUpdateDeleteExecutionResult($updateQuery);

        return array( "status" => TRUE, "errorMsg" => "", "data" => NULL);
    }

    private static function randomPassword()
    {
        $character_set_array = array();
        $character_set_array[] = array('count' => 2, 'characters' => 'abcdefghijklmnopqrstuvwxyz');
        $character_set_array[] = array('count' => 2, 'characters' => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        $character_set_array[] = array('count' => 2, 'characters' => '0123456789');

        $temp_array = array();
        foreach ($character_set_array as $character_set) {
            for ($i = 0; $i < $character_set['count']; $i++) {
                $temp_array[] = $character_set['characters'][rand(0, strlen($character_set['characters']) - 1)];
            }
        }
        shuffle($temp_array);
        return implode('', $temp_array);
    }
}