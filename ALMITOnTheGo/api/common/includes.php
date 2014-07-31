<?php

// private files
require_once(dirname(__FILE__) . '/../private/ValidationUtils.php');
require_once(dirname(__FILE__) . '/../private/ValidationRules.php');
require_once(dirname(__FILE__) . '/../private/DBUtils.php');
require_once(dirname(__FILE__) . '/../private/APIException.php');
require_once(dirname(__FILE__) . '/../private/Password.php');

// defines files
require_once(dirname(__FILE__) . '/../defines/DBConstants.php');

// ALMITOnTheGo files
require_once(dirname(__FILE__) . '/../almitonthego/ALMITOnTheGo.php');
require_once(dirname(__FILE__) . '/../almitonthego/ALMITOnTheGoController.php');
require_once(dirname(__FILE__) . '/../almitonthego/ALMITOnTheGoDBUtils.php');
require_once(dirname(__FILE__) . '/../almitonthego/ALMITOnTheGoQuery.php');

// Login files
require_once(dirname(__FILE__) . '/../login/Login.php');
require_once(dirname(__FILE__) . '/../login/LoginController.php');
require_once(dirname(__FILE__) . '/../login/LoginQuery.php');
require_once(dirname(__FILE__) . '/../login/LoginDBUtils.php');
require_once(dirname(__FILE__) . '/../login/LoginValidationUtils.php');

// Register files
require_once(dirname(__FILE__) . '/../register/RegisterController.php');
require_once(dirname(__FILE__) . '/../register/RegisterValidationUtils.php');

// Course files
require_once(dirname(__FILE__) . '/../course/CourseController.php');
require_once(dirname(__FILE__) . '/../course/Course.php');
require_once(dirname(__FILE__) . '/../course/CourseDBUtils.php');
require_once(dirname(__FILE__) . '/../course/CourseQuery.php');
require_once(dirname(__FILE__) . '/../course/CourseValidationUtils.php');

// User Info files
require_once(dirname(__FILE__) . '/../userinfo/UserInfoController.php');
require_once(dirname(__FILE__) . '/../userinfo/UserInfo.php');
require_once(dirname(__FILE__) . '/../userinfo/UserInfoDBUtils.php');
require_once(dirname(__FILE__) . '/../userinfo/UserInfoQuery.php');

// Home files
require_once(dirname(__FILE__) . '/../home/HomeController.php');
require_once(dirname(__FILE__) . '/../home/Home.php');
require_once(dirname(__FILE__) . '/../home/HomeDBUtils.php');
require_once(dirname(__FILE__) . '/../home/HomeQuery.php');

// Grade files
require_once(dirname(__FILE__) . '/../grade/GradeController.php');
require_once(dirname(__FILE__) . '/../grade/Grade.php');
require_once(dirname(__FILE__) . '/../grade/GradeDBUtils.php');
require_once(dirname(__FILE__) . '/../grade/GradeQuery.php');

// Calendar files
require_once(dirname(__FILE__) . '/../calendar/CalendarController.php');
require_once(dirname(__FILE__) . '/../calendar/Calendar.php');
require_once(dirname(__FILE__) . '/../calendar/CalendarDBUtils.php');
require_once(dirname(__FILE__) . '/../calendar/CalendarQuery.php');

// Analysis files
require_once(dirname(__FILE__) . '/../analysis/AnalysisController.php');
require_once(dirname(__FILE__) . '/../analysis/Analysis.php');
require_once(dirname(__FILE__) . '/../analysis/AnalysisDBUtils.php');
require_once(dirname(__FILE__) . '/../analysis/AnalysisQuery.php');

// Contact files
require_once(dirname(__FILE__) . '/../contact/ContactController.php');
require_once(dirname(__FILE__) . '/../contact/Contact.php');
require_once(dirname(__FILE__) . '/../contact/ContactDBUtils.php');
require_once(dirname(__FILE__) . '/../contact/ContactQuery.php');

// Thesis files
require_once(dirname(__FILE__) . '/../thesis/ThesisController.php');
require_once(dirname(__FILE__) . '/../thesis/Thesis.php');
require_once(dirname(__FILE__) . '/../thesis/ThesisDBUtils.php');
require_once(dirname(__FILE__) . '/../thesis/ThesisQuery.php');