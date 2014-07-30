<?php
 
class Thesis
{
    public static function getThesisInfo()
    {
        $thesis = array();

        $query = ThesisQuery::getThesisInfoQuery();
        $thesisResults = ThesisDBUtils::getAllResults($query);



        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('thesis' => $thesis));
    }
}