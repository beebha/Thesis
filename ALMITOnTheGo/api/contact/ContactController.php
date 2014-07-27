<?php

class ContactController
{
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
 