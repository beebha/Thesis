<?php
 
class Calendar
{
    public static function getCalendarViewDetails($authToken, $concentrationID, $mode, $date)
    {
        $startDate = "";
        $endDate = "";

        $timeStamp = $date == 'current' ? strtotime("now") : strtotime($date);
        $day = date('j', $timeStamp);
        $month = date('n', $timeStamp);
        $year = date('Y', $timeStamp);

        if($mode == 'month') {
            $daysInMonth = date('t', $timeStamp);
            $startDate = $year."-".$month."-1";
            $endDate = $year."-".$month."-".$daysInMonth;
        } else if ($mode == 'week') {
            $mondayDate = date('Y-n-j', strtotime('this week', $timeStamp));
            $startDate = date('Y-n-j', strtotime($mondayDate . " -1 day"));
            $endDate = date('Y-n-j', strtotime($mondayDate . " +5 day"));
        } else if ($mode == 'day') {
            $startDate = date('Y-n-j', $timeStamp);
            $endDate = $startDate;
        }

        error_log('Day: '. $day);
        error_log('Month: '. $month);
        error_log('Year: '. $year);
        error_log('Start Date: ' . $startDate);
        error_log('End Date: ' . $endDate);

        $query = !empty($authToken)? CalendarQuery::getCalendarViewForUserQuery($authToken) : CalendarQuery::getCalendarViewForGuestQuery($concentrationID, $startDate, $endDate);
        $calendarCourses = CalendarDBUtils::getAllResults($query);

        $calendarEvents = array();

        foreach($calendarCourses as $singleCourse)
        {
            error_log(print_r($singleCourse, true));
            $currentDate = $startDate;

            while(strtotime($currentDate) <= strtotime($endDate))
            {
                $textDayOfCurrentDate = strtoupper(date('D', strtotime($currentDate)));

                if(in_array($textDayOfCurrentDate, explode(",", $singleCourse['course_day'])))
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