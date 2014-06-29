<?php

date_default_timezone_set('America/New_York');

require_once 'common/includes.php';

$result = array();

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

        // redirect to home server file
        if($action == 'getHomeViewDetails') {
            $result = HomeController::getHomeViewDetails($_POST);
        }

        // redirect to grade server file
        if($action == 'getGradeViewDetails') {
            $result = GradeController::getGradeViewDetails($_POST);
        }
    }
} catch (APIException $ex) {
    $error = array();
    $error['message'] = $ex->getMessage();
    $result['error'] = $error;
    $result['success'] = FALSE;
}

header("Content-Type: application/json");
header("Content-length: ". strlen(json_encode($result)));
echo json_encode($result);