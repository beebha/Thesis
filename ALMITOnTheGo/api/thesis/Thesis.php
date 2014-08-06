<?php
/**
 * Class Thesis
 *
 * This class is used for
 * retrieving thesis information
 * to display in the Thesis view.
 *
 */
class Thesis
{
    /**
     * Method that retrieves all thesis dates information
     *
     * @return array
     */
    public static function getThesisInfo()
    {
        $thesis = array();

        $query = ThesisQuery::getThesisInfoQuery();
        $thesisResults = DBUtils::getAllResults($query);

        foreach($thesisResults as $singleThesis) {
            $thesisInfo['graduation_date'] = date("F jS", strtotime($singleThesis['graduation_date']));
            $thesisInfo['proposal_date'] = date("F jS", strtotime($singleThesis['proposal_date']));
            $thesisInfo['due_date'] = date("F jS", strtotime($singleThesis['due_date']));
            $thesisInfo['grade_date'] = date("F jS", strtotime($singleThesis['grade_date']));
            $thesisInfo['bound_date'] = date("F jS", strtotime($singleThesis['bound_date']));
            $thesis[] = array(
                        'thesisGraduation' => $thesisInfo['graduation_date'],
                        'thesisProposal' => $thesisInfo['proposal_date'],
                        'thesisDue' => $thesisInfo['due_date'],
                        'thesisGrade' => $thesisInfo['grade_date'],
                        'thesisBound' => $thesisInfo['bound_date']
            );
        }

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('thesis' => $thesis));
    }
}