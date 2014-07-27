<?php

if (!$link = mysqli_connect('127.0.0.1', 'root', 'root', 'thesis', 8889, ':/Applications/MAMP/tmp/mysql/mysql.sock')) {
    echo 'Could not connect to mysql';
    exit;
}

if (!((bool)mysqli_query($link, "USE thesis"))) {
    echo 'Could not select database';
    exit;
}

// delete all existing data
$dropQuery = "DROP TABLE IF EXISTS instructors_courses";

mysqli_query($link, $dropQuery);

error_log("Dropped TABLE instructors_courses");

$createTableSql = "CREATE TABLE instructors_courses (
                    hes_course_id INT(10) UNSIGNED NOT NULL,
                    instructor_code VARCHAR(64) NOT NULL,
                    PRIMARY KEY (hes_course_id, instructor_code)
                    ) ENGINE = InnoDB";

mysqli_query($link, $createTableSql);

error_log("Created TABLE instructors_courses");