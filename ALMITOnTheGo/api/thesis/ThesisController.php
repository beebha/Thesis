<?php
/**
 * Class ThesisController
 *
 * A controller class that directs calls to @see Thesis
 */
class ThesisController
{
    /**
     * Method executes call in @see Thesis::getThesisInfo
     *
     * @return array
     */
    public static function getThesisInfo()
    {
        $result = array();
        $resultData = null;

        $resultData = Thesis::getThesisInfo();

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 