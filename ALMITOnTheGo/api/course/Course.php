<?php
 
class Course
{
    public static function getCoursesForConcentration($concentrationID)
    {
        $query = CourseQuery::getCoursesForConcentrationQuery($concentrationID);
        $courses = CourseDBUtils::getAllResults($query);

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => $courses);
    }

    public static function getCourseCategoryViewDetails($authToken, $concentrationID)
    {
        $completedRequirementsResults = array();
        $currentRequirementsResults = array();

        if (!empty($authToken)) {
            $query = CourseQuery::getCompletedRequirements($authToken);
            $completedRequirementsResults = CourseDBUtils::getAllResults($query);
            $concentrationID = $completedRequirementsResults[0]['concentration_id'];
        }

        $courseRequirementsQuery = CourseQuery::getCourseRequirements($concentrationID);
        $courseRequirementsResults = CourseDBUtils::getAllResults($courseRequirementsQuery);

        // manipulate results
        foreach($courseRequirementsResults as $singleReq)
        {
            $categoryCode = $singleReq['category_code'];
            $categoryCount = $singleReq['category_count'];
            $singleReq['registered'] = 0;
            $singleReq['completed'] = 0;

            foreach($completedRequirementsResults as $completedReq)
            {
                $attributeCompleted = explode(",", $completedReq['attributes']);
                $grade = $completedReq['grade_id'];
                $countHasBeenMet = ($singleReq['registered'] + $singleReq['completed']) >= $categoryCount;

                if (in_array($categoryCode, $attributeCompleted) && !$countHasBeenMet) {

                    // check if non elective requirement has been mets
                    $nonElectivesMet = TRUE;

                    if($categoryCode == "E") {
                        foreach($attributeCompleted as $singleAttribute) {
                            if($singleAttribute != "E") {
                                $currentCategoryReqCount = $currentRequirementsResults[$singleAttribute]['registered'] + $currentRequirementsResults[$singleAttribute]['completed'];
                                if($categoryCount != $currentCategoryReqCount) {
                                    $nonElectivesMet = FALSE;
                                    break;
                                }
                            }
                        }
                    }

                    if($nonElectivesMet) {
                        error_log("non electives met for : ");
                        $grade == 1 ? ++$singleReq['registered'] : ++$singleReq['completed'];
                    }
                }
            }

            $singleReq['subText'] = self::getSubTextForCategory($singleReq);
            $currentRequirementsResults[$categoryCode] = $singleReq;
        }

        error_log(print_r($currentRequirementsResults, true));

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('currentReqs' => $currentRequirementsResults));
    }

    public static function getCourseTermViewDetails()
    {
        $courseTermsQuery = ALMITOnTheGoQuery::getCourseTermsQuery();
        $courseTermsResults = CourseDBUtils::getAllResults($courseTermsQuery);

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('currentCourseTerms' => $courseTermsResults));
    }

    public static function getCoursesResults($authToken, $concentrationID, $categoryID, $courseTermID)
    {
        $coursesResults = array();

        if (!empty($authToken)) {
            $query = CourseQuery::getCompletedCourses($authToken);
            $completedCoursesResults = CourseDBUtils::getAllResults($query);
            $concentrationID = $completedCoursesResults[0]['concentration_id'];
        }

        $coursesQuery = CourseQuery::getCourses($concentrationID, $categoryID, $courseTermID);
        $results = CourseDBUtils::getAllResults($coursesQuery);

        foreach($results as $singleResult)
        {
            $singleResult['attributes_array'] = explode(",", $singleResult['attributes']);
            $singleResult['course_day'] = str_replace(" ", ", ", ucwords(str_replace(",", " ", strtolower($singleResult['course_day']))));
            $coursesResults[] = $singleResult;
        }

        return array(
            "status" => TRUE,
            "errorMsg" => "",
            "data" => array('concentrationID'=> $concentrationID, 'coursesResults' => $coursesResults));
    }

    private static function getSubTextForCategory($req)
    {
        $categoryCount = $req['category_count'];
        $registeredCount = isset($req['registered']) ? $req['registered'] : 0;
        $completedCount = isset($req['completed']) ? $req['completed'] : 0;

        $text = $req['admission'] ? "Required for Admission" : $categoryCount . " course" . ($categoryCount > 1 ? "s" : "");
        $text .= $registeredCount > 0 || $completedCount > 0 ? " (" : "";
        $text .= $registeredCount > 0 ? $registeredCount . " registered" : "";
        $text .= $registeredCount > 0 && $completedCount > 0 ? ", " : "";
        $text .= $completedCount > 0 ? $completedCount . " completed" : "";
        $text .= $registeredCount > 0 || $completedCount > 0 ? ")" : "";

        return $text;
    }
}