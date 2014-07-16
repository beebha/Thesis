<?php

class CalendarController
{
    public static function getCalendarViewDetails($postVar)
    {
        $result = array();
        $resultData = null;

        // get calendar view details
        $resultData = Calendar::getCalendarViewDetails(
                        $postVar['authToken'],
                        $postVar['concentrationID'],
                        $postVar['mode'],
                        $postVar['minDate'],
                        $postVar['maxDate']);

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }

    public static function addCalendarEvents($postVar)
    {
        $result = array();
        $resultData = null;

        // add calendar events
        $resultData = Calendar::addCalendarEvents($postVar['authToken'], json_decode($postVar['allCheckedCourses'], true));

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 