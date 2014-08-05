<?php
/**
 * Class ContactController
 *
 * A controller class that directs calls to @see Contact
 */
class ContactController
{
    /**
     * Method executes call in @see Contact::getInstructors
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     */
    public static function getInstructors($postVar)
    {
        $result = array();
        $resultData = null;

        $resultData = Contact::getInstructors($postVar['authToken'], $postVar['concentrationID']);

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 