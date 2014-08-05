<?php
/**
 * Class CourseController
 *
 * A controller class that directs calls to @see Course
 */
class CourseController
{
    /**
     * Method executes call in @see Course::getCoursesForConcentration
     * after parameter validation
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     * @throws APIException
     */
    public static function getCourses($postVar)
    {
        $result = array();
        $resultData = null;

        // validate post variables
        $validationErrors = CourseValidationUtils::validateCoursesParams($postVar);

        if(count($validationErrors) > 0) {
            throw new APIException("<b>Invalid Courses Param:</b><br>". implode("<br>", $validationErrors));
        }

        // get courses based on concentration
        $resultData = Course::getCoursesForConcentration($postVar['concentration']);

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }

    /**
     * Method executes call in @see Course::getCourseCategoryViewDetails
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     */
    public static function getCourseCategoryViewDetails($postVar)
    {
        $result = array();
        $resultData = null;

        $resultData = Course::getCourseCategoryViewDetails(
            $postVar['authToken'],
            $postVar['concentrationID']
        );

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }

    /**
     * Method executes call in @see Course::getCourseTermViewDetails
     *
     * @return array
     */
    public static function getCourseTermViewDetails()
    {
        $result = array();
        $resultData = null;

        $resultData = Course::getCourseTermViewDetails();

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }

    /**
     * Method executes call in @see Course::getCoursesResults
     *
     * @param $postVar - post variables in HTTP Request
     * @return array
     */
    public static function getCoursesResults($postVar)
    {
        $result = array();
        $resultData = null;

        $resultData = Course::getCoursesResults(
            $postVar['authToken'],
            $postVar['concentrationID'],
            $postVar['categoryID'],
            $postVar['courseTermID']
        );

        $result['success'] = $resultData['status'];
        $result['error']['message'] = $resultData['errorMsg'];
        $result['data'] = $resultData['data'];
        return $result;
    }
}
 