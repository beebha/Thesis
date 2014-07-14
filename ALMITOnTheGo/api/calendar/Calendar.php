<?php
 
class Calendar
{
    public static function getCalendarViewDetails($authToken, $concentrationID, $mode, $minDate, $maxDate)
    {
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

        error_log('Start Date: ' . $startDate);
        error_log('End Date: ' . $endDate);

        $query = !empty($authToken)? CalendarQuery::getCalendarViewForUserQuery($authToken) : CalendarQuery::getCalendarViewForGuestQuery($concentrationID, $startDate, $endDate);
        $calendarCourses = CalendarDBUtils::getAllResults($query);

        $calendarEvents = array();

        foreach($calendarCourses as $singleCourse)
        {
            $currentDate = $startDate;
            $courseStartDate = $singleCourse['course_year'] . "-" . $singleCourse['start_month'] . "-" . $singleCourse['start_day'];
            $courseEndDate = $singleCourse['course_year'] . "-" . $singleCourse['end_month'] . "-" . $singleCourse['end_day'];

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
                    $singleCalendarEvent['event'] = $singleCourse['course_time'];
                    $singleCalendarEvent['title'] = $singleCourse['course_code'];
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
                    $calendarEvents[] = $singleCalendarEvent;
                }
                $currentDate = date('Y-n-j', strtotime($currentDate . " +1 day"));
            }
        }

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('calendarEvents' => $calendarEvents));
    }
}