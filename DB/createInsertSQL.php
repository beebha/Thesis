<?php

include_once 'include/password.php';

if (!$link = mysqli_connect('127.0.0.1', 'root', 'root', 'thesis', 8889, ':/Applications/MAMP/tmp/mysql/mysql.sock')) {
    echo 'Could not connect to mysql';
    exit;
}

if (!((bool)mysqli_query($link, "USE thesis"))) {
    echo 'Could not select database';
    exit;
}
$course_term_key_fileContents = array();
$grade_key_fileContents = array();
$general_course_requirements_fileContents = array();
$course_key_fileContents = array();
$detailed_course_requirements_fileContents = array();
$announcements_fileContents = array();

$SWE_fileContents = array();
$IMS_fileContents = array();
$MAC_fileContents = array();
$DGM_fileContents = array();

$concentrationTableInserts = array();
$concentrationReqsTableInserts = array();
$categoryTableInserts = array();
$categoryReqTableInserts = array();
$courseTableInserts = array();
$courseTermTableInserts = array();
$gradeTableInserts = array();
$announcementsTableInserts = array();

$dir = new RecursiveIteratorIterator(new RecursiveDirectoryIterator(__DIR__));
foreach ($dir as $splFileInfo)
{
    $fileName = $splFileInfo->getRealPath();

    if(strrpos($fileName, "data/course_term_key") !== FALSE) {
        $course_term_key_fileContents[] = file($fileName, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    }

    if(strrpos($fileName, "data/grade_key") !== FALSE) {
        $grade_key_fileContents[] = file($fileName, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    }

    if(strrpos($fileName, "data/general_course_requirements") !== FALSE) {
        $general_course_requirements_fileContents[] = file($fileName, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    }

    if(strrpos($fileName, "data/course_key") !== FALSE) {
        $course_key_fileContents[] = file($fileName, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    }

    if(strrpos($fileName, "data/detailed_course_requirements") !== FALSE) {
        $detailed_course_requirements_fileContents[] = file($fileName, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    }

    if(strrpos($fileName, "data/software_engineering_requirements") !== FALSE) {
        $SWE_fileContents[] = file($fileName, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    }

    if(strrpos($fileName, "data/information_management_systems_requirements") !== FALSE) {
        $IMS_fileContents[] = file($fileName, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    }

    if(strrpos($fileName, "data/mathematics_and_computation_requirements") !== FALSE) {
        $MAC_fileContents[] = file($fileName, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    }

    if(strrpos($fileName, "data/digital_media_arts_and_instructional_design_requirements") !== FALSE) {
        $DGM_fileContents[] = file($fileName, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    }

    if(strrpos($fileName, "data/announcements") !== FALSE) {
        $announcements_fileContents[] = file($fileName, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    }
}

$CONCENTRATION_INFO = array(
    'Software Engineering' => array('id' => 1, 'code' => 'SWE'),
    'Information Management Systems' => array('id' => 2, 'code' => 'IMS'),
    'Mathematics And Computation' => array('id' => 3, 'code' => 'MAC'),
    'Digital Media And Instructional Design' => array('id' => 4, 'code' => 'DGM'),
);

$COURSE_TERM_INFO = array(
    'SUMMER 2013' => 1,
    'FALL 2013' => 2,
    'JANUARY 2014' => 3,
    'SPRING 2014' => 4,
    'SUMMER 2014' => 5,
    'FALL 2014' => 6,
    'JANUARY 2015' => 7,
    'SPRING 2015' => 8
);

foreach($course_term_key_fileContents as $singleFile)
{
    $line = 0;
    foreach($singleFile as $singleLine)
    {
        if ($line == 0) {
            $line++;
            continue;
        }

        $courseTermType = explode(",", $singleLine);

        $courseTermTableInserts[] =
            "INSERT INTO course_terms
                (course_term_id, course_term_label, course_year, start_day, start_month, end_day, end_month, current_course)
                VALUES (". $courseTermType[0].",". $courseTermType[1].",".
                            $courseTermType[2].",". $courseTermType[3].",".
                            $courseTermType[4].",". $courseTermType[5].",".
                            $courseTermType[6].",". $courseTermType[7].");";

        $line++;
    }
}

foreach($grade_key_fileContents as $singleFile)
{
    $line = 0;
    foreach($singleFile as $singleLine)
    {
        if ($line == 0) {
            $line++;
            continue;
        }

        $gradeType = explode(",", $singleLine);

        $gradeTableInserts[] =
            "INSERT INTO grades
                (grade_id, grade_label, gpa)
                VALUES (" .$line. ",". $gradeType[1].",". $gradeType[0].");";

        $line++;
    }
}

foreach($announcements_fileContents as $singleFile)
{
    $line = 0;
    foreach($singleFile as $singleLine)
    {
        if ($line == 0) {
            $line++;
            continue;
        }

        $announcementInfo= explode(",", $singleLine);

        $courseTermID = $COURSE_TERM_INFO[strtoupper($announcementInfo[2])];

        $announcementsTableInserts[] =
            "INSERT INTO announcements
                (registration_type, concentration_id, course_term_id, announcement)
                VALUES ('". $announcementInfo[0]."',". $announcementInfo[1].",
                ". $courseTermID.",'". mysqli_real_escape_string($link, $announcementInfo[3])."');";

        $line++;
    }
}

foreach($general_course_requirements_fileContents as $singleFile)
{
    $line = 0;
    foreach($singleFile as $singleLine)
    {
        if ($line == 0) {
            $line++;
            continue;
        }

        $concentration = explode(",", $singleLine);
        $concentrationInfo = $CONCENTRATION_INFO[$concentration[0]];
        $concentrationID = $concentrationInfo['id'];

        $concentrationReqsTableInserts[] =
            "INSERT INTO concentration_req
                (concentration_id, num_courses, thesis, capstone)
                VALUES (" .$concentrationID. ",".
                $concentration[1].",".
                $concentration[2].",".
                $concentration[3].");";

        if ($line == 1) {
            $concentrationTableInserts[] =
                "INSERT INTO concentration
                (concentration_id, concentration_code, concentration_label)
                VALUES (0,'NCC','No Concentration');";
        } else {
            $concentrationTableInserts[] =
                "INSERT INTO concentration
                (concentration_id, concentration_code, concentration_label)
                VALUES (" .$concentrationInfo['id']. ",'".
                $concentrationInfo['code']."','".
                $concentration[0]."');";
        }
        $line++;
    }
}

foreach($course_key_fileContents as $singleFile)
{
    $line = 0;
    foreach($singleFile as $singleLine)
    {
        if ($line == 0) {
            $line++;
            continue;
        }

        $category = explode(",", $singleLine);
        $concentrationID = $CONCENTRATION_INFO[$category[0]]['id'];

        $categoryTableInserts[] =
            "INSERT INTO category
                (concentration_id, category_id, category_code, category_label)
                VALUES (" .$concentrationID. "," .$line. ",'".
            $category[2]."','".
            $category[1]."');";

        $line++;
    }
}

foreach($detailed_course_requirements_fileContents as $singleFile)
{
    $line = 0;
    foreach($singleFile as $singleLine)
    {
        if ($line == 0) {
            $line++;
            continue;
        }

        $categoryReq = explode(",", $singleLine);
        $concentrationID = $CONCENTRATION_INFO[$categoryReq[0]]['id'];

        $categoryReqTableInserts[] =
            "INSERT INTO category_req
                (concentration_id, category_id, category_count, admission, thesis, capstone)
                VALUES (" .$concentrationID. "," .$categoryReq[1]. ",".
            $categoryReq[3].",".
            $categoryReq[4].",".
            $categoryReq[5].",".
            $categoryReq[6].");";

        $line++;
    }
}

$allCourseContents =  array(
    $SWE_fileContents,
    $IMS_fileContents,
    $MAC_fileContents,
    $DGM_fileContents
);

$concentrationID = 1;
$courseID = 1;

foreach($allCourseContents as $singleFileContents)
{
    foreach($singleFileContents as $singleFile)
    {
        $line = 0;
        foreach($singleFile as $singleLine)
        {
            if ($line == 0) {
                $line++;
                continue;
            }

            $info = explode(",", $singleLine);

            $courseCode = $info[1];
            $courseTitle = $info[2];
            $courseTermID = $COURSE_TERM_INFO[strtoupper($info[0])];
            $courseDay = strtoupper($info[4]) == 'N/A' ? NULL : strtoupper(str_replace("|", ",", $info[4]));
            $courseTime = strtoupper($info[5]) == 'N/A' ? NULL : $info[5];
            $courseType = $info[7];
            $courseLimit = strtoupper($info[8]) == 'NO LIMIT' ? 0 : $info[8];
            $instructor = $info[3];
            $location = strtoupper($info[6]) == 'N/A' ? NULL : $info[6];
            $attributes = strtoupper(str_replace("|", ",", $info[9]));

            $courseTableInserts[] =
                        "INSERT INTO course
                            (concentration_id, course_id, course_code, course_title, course_term_id, course_day,
                            course_time, course_type, course_limit, instructor, location, attributes)
                            VALUES (" .$concentrationID. ",".
                                $courseID. ",'".
                                $courseCode."','".
                                mysqli_real_escape_string($link, $courseTitle)."',".
                                $courseTermID.",'".
                                $courseDay."','".
                                mysqli_real_escape_string($link, $courseTime)."','".
                                $courseType."',".
                                $courseLimit.",'".
                                mysqli_real_escape_string($link, $instructor)."','".
                                mysqli_real_escape_string($link, $location)."','".
                                $attributes."');";

            $line++;
            $courseID++;
        }
    }
    $concentrationID++;
}
// create demo users and mobile auth tokens
//$demoUsers = array();
//$demoMobileAuthTokens = array();
//$concID = 0;
//for($i = 0; $i < 8; $i++)
//{
//    $username = 'demo'.$i;
//    $password = 'test';
//    $email = 'demo'.$i.'@demo.com';
//    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
//    $registrationType = "DEGREE";
//
//    if($i > 3 && $i < 7) {
//        $registrationType = "PRE-ADMISSION";
//        --$concID;
//    } else if ($i >= 7) {
//        $registrationType = "GUEST";
//        $concID = 0;
//    } else {
//        $concID++;
//    }
//
//    $deviceType = $i % 2 == 0 ? "Phone" : "Tablet";
//    $deviceOS = $i % 2 == 0 ? "iOS" : "Android";
//
//    $authToken = md5(uniqid(rand(), true));
//
//    $demoUsers[] = "INSERT INTO users
//                    (username, password_hash, email, registration_type, concentration_id, current_login, last_login, create_date) values ('" .
//                    $username . "','" .
//                    $passwordHash . "','" .
//                    $email . "','" .
//                    $registrationType . "'," .
//                    $concID . ",
//                    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
//
//    $demoMobileAuthTokens[] = "INSERT INTO mobile_auth_token
//                    (user_id, auth_token, device_type, device_os, create_date) values (" .
//                    ($i+1) . ",'" .
//                    $authToken . "','" .
//                    $deviceType . "','" .
//                    $deviceOS . "',
//                    CURRENT_TIMESTAMP)
//                    ON DUPLICATE KEY UPDATE
//                    auth_token = '" .$authToken. "',
//                    modify_date = CURRENT_TIMESTAMP";
//}
// create demo data for degree and pre-admission candidates
//for($i = 0; $i < 8; $i++)
//{
//
//}

$allInserts =  array_merge(
    $courseTermTableInserts,
    $gradeTableInserts,
    $concentrationTableInserts,
    $concentrationReqsTableInserts,
    $categoryTableInserts,
    $categoryReqTableInserts,
    $courseTableInserts,
    $announcementsTableInserts
//    $demoUsers,
//    $demoMobileAuthTokens
);

// drop and create all tables
include 'createCourseTermTable.php';
include 'createGradesTable.php';
include 'createAnnouncementsTable.php';
include 'createConcentrationTable.php';
include 'createConcentrationReqTable.php';
include 'createCategoryTable.php';
include 'createCategoryReqTable.php';
include 'createCourseTable.php';
include 'createUsersTable.php';
include 'createUserCoursesTable.php';
include 'createUserCalendarTable.php';
include 'createMobileAuthTokenTable.php';

foreach ($allInserts as $singleInsert)
{
    echo "Inserting: " .$singleInsert. "\n\n";
    mysqli_query($link, $singleInsert);
}
