<?php
/**
 * Class CalendarController
 *
 * A controller class that directs calls to @see Calendar
 */
class CalendarController
{
    /**
     * Method executes call in @see Calendar::getCalendarViewDetails
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     */
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

    /**
     * Method executes call in @see Calendar::addCalendarEvents
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     */
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

    /**
     * Method executes call in @see Calendar::deleteCalendarEvent
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     */
    public static function deleteCalendarEvent($postVar)
    {
        $result = array();
        $resultData = null;

        // add calendar events
        $resultData = Calendar::deleteCalendarEvent($postVar['authToken'], $postVar['courseID']);

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 