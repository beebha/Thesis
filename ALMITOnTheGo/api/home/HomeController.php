<?php
/**
 * Class HomeController
 *
 * A controller class that directs calls to @see Home
 */
class HomeController
{
    /**
     * Method executes call in @see Home::getHomeViewDetails
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     */
    public static function getHomeViewDetails($postVar)
    {
        $result = array();
        $resultData = null;

        // get home view details
        $resultData = Home::getHomeViewDetails($postVar['authToken']);

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 