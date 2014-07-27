<?php
 
class Calendar
{
    public static function addCalendarEvents($authToken, $allCheckedCourses)
    {
        if(!empty($authToken))
        {
            $query = UserInfoQuery::getUserInfoQuery($authToken);
            $userResults = CalendarDBUtils::getSingleDetailExecutionResult($query);

            $userID = $userResults['user_id'];
            $courseIDs = array();

            for($i = 0; $i < count($allCheckedCourses); $i++) {
                $courseIDs[] = $allCheckedCourses[$i]['course_id'];
            }

            $createUserCalendarQuery = CalendarQuery::createUserCalendarQuery($userID, $courseIDs);
            $createUserCalendarResults = CalendarDBUtils::getInsertUpdateDeleteBulkExecutionResult($createUserCalendarQuery);

            if(!$createUserCalendarResults) {
                return array("status" => FALSE, "errorMsg" => "DB Error", "data" => NULL);
            }
        }

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => NULL);
    }

    public static function deleteCalendarEvent($authToken, $courseID)
    {
        if(!empty($authToken))
        {
            $query = UserInfoQuery::getUserInfoQuery($authToken);
            $userResults = CalendarDBUtils::getSingleDetailExecutionResult($query);

            $userID = $userResults['user_id'];

            $deleteUserCalendarQuery = CalendarQuery::deleteUserCalendarQuery($userID, $courseID);
            $deleteUserCalendarResults = CalendarDBUtils::getInsertUpdateDeleteExecutionResult($deleteUserCalendarQuery);

            if(!$deleteUserCalendarResults) {
                return array("status" => FALSE, "errorMsg" => "DB Error", "data" => NULL);
            }
        }

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => NULL);
    }

    public static function getCalendarViewDetails($authToken, $concentrationID, $mode, $minDate, $maxDate)
    {
        $userCalendarEvents = array();
        $startDate = "";
        $endDate = "";

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

        if(!empty($authToken)) {
            $userInfoQuery = UserInfoQuery::getUserInfoQuery($authToken);
            $userResults = CalendarDBUtils::getSingleDetailExecutionResult($userInfoQuery);

            $userID = $userResults['user_id'];
            $concentrationID = $userResults['concentration_id'];

            $userCalendarQuery = CalendarQuery::getUserCalendarQuery($userID);
            $userCalendarResults = CalendarDBUtils::getSingleDetailExecutionResult($userCalendarQuery);

            if(!is_null($userCalendarResults['allCourseIDs'])) {
                $userCalendarEvents = explode(",", $userCalendarResults['allCourseIDs']);
            }
        }

        $query = CalendarQuery::getCalendarViewQuery($concentrationID);
        $calendarCourses = CalendarDBUtils::getAllResults($query);

        $calendarEvents = array();
        $userAddedCalendarCourses = array();

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

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('calendarEvents' => $calendarEvents, 'userAddedCalendarCourses' => $userAddedCalendarCourses));
    }
}