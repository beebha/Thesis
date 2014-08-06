<?php

// set the default timezone for the application
date_default_timezone_set('America/New_York');

// require the file that includes all files used in the application
require_once 'common/includes.php';

$result = array();

// based on the action, direct to the appropriate Controller class
try {
    if (isset($_REQUEST['action']) && !is_null($_REQUEST['action']))
    {
        $action = $_REQUEST['action'];

        // redirect to ALMITOnTheGo server file
        if($action == 'getAllStaticInfoForApp') {
            $result = ALMITOnTheGoController::getAllStaticInfoForApp();
        }

        // redirect to login server file
        if($action == 'doLogin') {
            $result = LoginController::doLogin($_POST);
        }

        if($action == 'doLogoff') {
            $result = LoginController::doLogoff($_POST);
        }

        // redirect to register server file
        if($action == 'doRegister') {
            $result = RegisterController::registerNewUser($_POST);
        }

        // redirect to courses server file
        if($action == 'getCourses') {
            $result = CourseController::getCourses($_POST);
        }

        if($action == 'getCourseCategoryViewDetails') {
            $result = CourseController::getCourseCategoryViewDetails($_POST);
        }

        if($action == 'getCourseTermViewDetails') {
            $result = CourseController::getCourseTermViewDetails();
        }

        if($action == 'getCoursesResults') {
            $result = CourseController::getCoursesResults($_POST);
        }

        // redirect to user info server file
        if($action == 'saveUserInfo') {
            $result = UserInfoController::saveUserInfo($_POST);
        }

        if($action == 'getUserInfo') {
            $result = UserInfoController::getUserInfo($_POST);
        }

        if($action == 'forgotRequest') {
            $result = UserInfoController::processForgotRequest($_POST);
        }

        if($action == 'changePassword') {
            $result = UserInfoController::processChangePassword($_POST);
        }

        // redirect to home server file
        if($action == 'getHomeViewDetails') {
            $result = HomeController::getHomeViewDetails($_POST);
        }

        // redirect to grade server file
        if($action == 'getGradeViewDetails') {
            $result = GradeController::getGradeViewDetails($_POST);
        }

        // redirect to calendar server file
        if($action == 'getCalendarViewDetails') {
            $result = CalendarController::getCalendarViewDetails($_POST);
        }

        if($action == 'addCalendarEvents') {
            $result = CalendarController::addCalendarEvents($_POST);
        }

        if($action == 'deleteCalendarEvents') {
            $result = CalendarController::deleteCalendarEvent($_POST);
        }

        // redirect to analysis server file
        if($action == 'getGPAForAllTerms') {
            $result = AnalysisController::getGPAForAllTerms($_POST);
        }

        // redirect to contact server file
        if($action == 'getInstructors') {
            $result = ContactController::getInstructors($_POST);
        }

        // redirect to thesis server file
        if($action == 'getThesisInfo') {
            $result = ThesisController::getThesisInfo();
        }
    }
} catch (APIException $ex) {
    $error = array();
    $error['message'] = $ex->getMessage();
    $result['error'] = $error;
    $result['success'] = FALSE;
}

// set the header content type to JSON, encode the results and return back to client
header("Content-Type: application/json");
header("Content-length: ". strlen(json_encode($result)));
echo json_encode($result);