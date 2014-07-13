<?php

class CalendarController
{
    public static function getCalendarViewDetails($postVar)
    {
        $result = array();
        $resultData = null;

        // get calendar view details
        $resultData = Calendar::getCalendarViewDetails($postVar['authToken'], $postVar['concentrationID'], $postVar['mode'], $postVar['date']);

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 