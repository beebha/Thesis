<?php

/**
 * Class ALMITOnTheGoController
 *
 * A controller class that directs calls to @see ALMITOnTheGo
 */
class ALMITOnTheGoController
{
    /**
     * Method executes call in @see ALMITOnTheGo @method getAllStaticInfo
     * @return array
     */
    public static function getAllStaticInfoForApp()
    {
        $result = array();
        $resultData = null;

        $resultData = ALMITOnTheGo::getAllStaticInfo();

        // return a response array that's decoded to JSON before returning to the client
        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 