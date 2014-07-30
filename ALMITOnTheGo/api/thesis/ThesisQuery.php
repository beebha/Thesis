<?php

class ThesisQuery
{
    public static function getThesisInfoQuery()
    {        
        return "SELECT
                DATE(CONCAT('2014-', thesis_graduation_month, '-1')) AS graduation_date,
                DATE(CONCAT('2014-', thesis_proposal_month, '-', thesis_proposal_day)) AS proposal_date,
                DATE(CONCAT('2014-', thesis_due_month, '-', thesis_due_day)) AS due_date,
                DATE(CONCAT('2014-', thesis_grade_month, '-', thesis_grade_day)) AS grade_date,
                DATE(CONCAT('2014-', thesis_bound_month, '-', thesis_bound_day)) AS bound_date
                FROM thesis
                ORDER BY thesis_graduation_month ASC";
    }
}
 