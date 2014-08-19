<?php
/**
 * Class Calendar
 *
 * This class is used for
 * adding calendar events, deleting calendar events,
 * getting calendar view details
 * to display in the Calendar view.
 *
 */
class Calendar
{
    /**
     * Method that allows a registered user to add calendar events
     *
     * @param $authToken - registered user's auth token
     * @param $allCheckedCourses - course IDs of checked courses to add
     * @return array
     */
    public static function addCalendarEvents($authToken, $allCheckedCourses)
    {
        $existingCourseCodes = array();

        // execute query only for registered user
        if(!empty($authToken))
        {
            $query = UserInfoQuery::getUserInfoQuery($authToken);
            $userResults = DBUtils::getSingleDetailExecutionResult($query);

            $userID = $userResults['user_id'];
            $courseIDs = array();
            $userCalendarEvents = array();

            for($i = 0; $i < count($allCheckedCourses); $i++) {
                $courseIDs[] = $allCheckedCourses[$i]['course_id'];
            }

            // get list of courses already added to calendar
            $userCalendarQuery = CalendarQuery::getUserCalendarQuery($userID);
            $userCalendarResults = DBUtils::getSingleDetailExecutionResult($userCalendarQuery);

            if(!is_null($userCalendarResults['allCourseIDs'])) {
                $userCalendarEvents = explode(",", $userCalendarResults['allCourseIDs']);
            }

            $createUserCalendarQuery = CalendarQuery::createUserCalendarQuery($userID, $courseIDs);
            $createUserCalendarResults = DBUtils::getInsertUpdateDeleteBulkExecutionResult($createUserCalendarQuery);


            if(!$createUserCalendarResults) {
                return array("status" => FALSE, "errorMsg" => "DB Error", "data" => NULL);
            }

            // get list of courses that already had been added
            $existingCourseIDs = array_intersect($userCalendarEvents, $courseIDs);

            if(count($existingCourseIDs) > 0) {
                $courseCodeQuery = CalendarQuery::getCourseCodeQuery($existingCourseIDs);
                $existingCourseCodes = DBUtils::getSingleDetailExecutionResult($courseCodeQuery);
            }
        }

        // return a results array
        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('existingCourseCodes' => count($existingCourseCodes) > 0 ? explode(",", $existingCourseCodes['existingCourseCodes']) : ""));
    }

    /**
     * Method that allows a registered user to delete calendar events
     *
     * @param $authToken - registered user's auth token
     * @param $courseID - ID of course to be deleted
     * @return array
     */
    public static function deleteCalendarEvent($authToken, $courseID)
    {
        // execute query only for registered user
        if(!empty($authToken))
        {
            $query = UserInfoQuery::getUserInfoQuery($authToken);
            $userResults = DBUtils::getSingleDetailExecutionResult($query);

            $userID = $userResults['user_id'];

            $deleteUserCalendarQuery = CalendarQuery::deleteUserCalendarQuery($userID, $courseID);
            $deleteUserCalendarResults = DBUtils::getInsertUpdateDeleteExecutionResult($deleteUserCalendarQuery);

            if(!$deleteUserCalendarResults) {
                return array("status" => FALSE, "errorMsg" => "DB Error", "data" => NULL);
            }
        }

        // return a results array
        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => NULL);
    }

    /**
     * Method that allows a registered user or guest to view calendar events
     *
     * @param $authToken - registered user's auth token
     * @param $concentrationID - ID of concentration
     * @param $mode - month/week
     * @param $minDate - start date of month/wek
     * @param $maxDate - end date of month/week
     * @return array
     */
    public static function getCalendarViewDetails($authToken, $concentrationID, $mode, $minDate, $maxDate)
    {
        $userCalendarEvents = array();
        $startDate = "";
        $endDate = "";

        // define start and end date for mode if value is current
        if($minDate == 'current' && $maxDate == 'current') {
            $timeStamp = strtotime("now");
            if($mode == 'MONTH') {
                $daysInMonth = date('t', $timeStamp);
                $startDate = date('Y', $timeStamp)."-".date('n', $timeStamp)."-1";
                $endDate = date('Y', $timeStamp)."-".date('n', $timeStamp)."-".$daysInMonth;
            } else if ($mode == 'WEEK') {
                $mondayDate = date('Y-n-j', strtotime('this week', $timeStamp));
                $startDate = date('Y-n-j', strtotime($mondayDate . " -1 day"));
                $endDate = date('Y-n-j', strtotime($mondayDate . " +5 day"));
            } else if ($mode == 'DAY') {
                $startDate = date('Y-n-j', $timeStamp);
                $endDate = $startDate;
            }
        } else {
            $startDate = $minDate;
            $endDate = $maxDate;
        }

        // execute query only for registered user
        if(!empty($authToken)) {
            $userInfoQuery = UserInfoQuery::getUserInfoQuery($authToken);
            $userResults = DBUtils::getSingleDetailExecutionResult($userInfoQuery);

            $userID = $userResults['user_id'];
            $concentrationID = $userResults['concentration_id'];

            $userCalendarQuery = CalendarQuery::getUserCalendarQuery($userID);
            $userCalendarResults = DBUtils::getSingleDetailExecutionResult($userCalendarQuery);

            if(!is_null($userCalendarResults['allCourseIDs'])) {
                $userCalendarEvents = explode(",", $userCalendarResults['allCourseIDs']);
            }
        }

        // get all calendar events for selected concentration
        $query = CalendarQuery::getCalendarViewQuery($concentrationID);
        $calendarCourses = DBUtils::getAllResults($query);

        $calendarEvents = array();
        $userAddedCalendarCourses = array();

        // loop through calendar events and indicate of user has added to schedule
        foreach($calendarCourses as $singleCourse)
        {
            $currentDate = $startDate;
            $courseStartDate = $singleCourse['course_year'] . "-" . $singleCourse['start_month'] . "-" . $singleCourse['start_day'];
            $courseEndDate = $singleCourse['course_year'] . "-" . $singleCourse['end_month'] . "-" . $singleCourse['end_day'];
            $singleCourse['instructors'] = str_replace(",", " & ", $singleCourse['instructors']);

            while(strtotime($currentDate) <= strtotime($endDate))
            {
                $textDayOfCurrentDate = strtoupper(date('D', strtotime($currentDate)));

                if($textDayOfCurrentDate == 'TUE') {
                    $textDayOfCurrentDate = 'TUES';
                } else if($textDayOfCurrentDate == 'THU') {
                    $textDayOfCurrentDate = 'THUR';
                }

                if(in_array($textDayOfCurrentDate, explode(",", $singleCourse['course_day'])) &&
                    strtotime($currentDate) >= strtotime($courseStartDate) &&
                    strtotime($currentDate) <= strtotime($courseEndDate))
                {
                    $calendarTime = array_map("trim", explode("-", $singleCourse['course_time']));
                    $startTime = $calendarTime[0];
                    $endTime = $calendarTime[1];
                    $AMorPM = strpos($endTime, "am") === FALSE ? "PM" : "AM";

                    if (strpos($calendarTime[0], "am") === FALSE && strpos($calendarTime[0], "pm") === FALSE) {
                        $startTime = $calendarTime[0] . " " . $AMorPM;
                    }

                    $currentTimeStamp = strtotime($currentDate);
                    $currentDay = date('j', $currentTimeStamp);
                    $currentMonth = date('n', $currentTimeStamp);
                    $currentYear = date('Y', $currentTimeStamp);
                    $currentStartHour = date("G", strtotime($startTime));
                    $currentStartMin = date("i", strtotime($startTime));
                    $currentEndHour = date("G", strtotime($endTime));
                    $currentEndMin = date("i", strtotime($endTime));

                    $singleCalendarEvent = array();
                    $singleCalendarEvent['event'] = str_replace("pm -", " -", str_replace("am -", " -",$singleCourse['course_time']));
                    $singleCalendarEvent['title'] = $singleCourse['course_code'];
                    $singleCalendarEvent['singleDateDay'] = $currentDay;
                    $singleCalendarEvent['singleDate'] = date('d', $currentTimeStamp) . '-' . date('m', $currentTimeStamp) . '-' . date('Y', $currentTimeStamp);
                    $singleCalendarEvent['startDate'] = array(
                                                        'year' => $currentYear,
                                                        'month' => $currentMonth,
                                                        'day' => $currentDay,
                                                        'hour' => $currentStartHour,
                                                        'min' => $currentStartMin
                                                    );
                    $singleCalendarEvent['endDate'] = array(
                                                        'year' => $currentYear,
                                                        'month' => $currentMonth,
                                                        'day' => $currentDay,
                                                        'hour' => $currentEndHour,
                                                        'min' => $currentEndMin
                                                    );
                    $singleCalendarEvent['css'] = $singleCourse['concentration_code'];
                    $singleCalendarEvent['day'] = $textDayOfCurrentDate;
                    $singleCalendarEvent['courseID'] = $singleCourse['course_id'];
                    $singleCalendarEvent['userAddedCourse'] = in_array($singleCourse['course_id'], $userCalendarEvents);
                    $calendarEvents[] = $singleCalendarEvent;
                }
                $currentDate = date('Y-n-j', strtotime($currentDate . " +1 day"));
            }

            if(in_array($singleCourse['course_id'], $userCalendarEvents)) {
                $singleCourse['attributes_array'] = explode(",", $singleCourse['attributes']);
                $singleCourse['course_day'] = str_replace(" ", ", ", ucwords(str_replace(",", " ", strtolower($singleCourse['course_day']))));
                $userAddedCalendarCourses[] = $singleCourse;
            }
        }

        // return a results array
        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('calendarEvents' => $calendarEvents, 'userAddedCalendarCourses' => $userAddedCalendarCourses));
    }
}