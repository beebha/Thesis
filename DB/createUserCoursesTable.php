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
$dropQuery = "DROP TABLE IF EXISTS users_courses";

mysqli_query($link, $dropQuery);

error_log("Dropped TABLE users_courses");

$createTableSql = "CREATE TABLE users_courses (
                    user_id INT(10) UNSIGNED NOT NULL,
                    course_id INT(10) UNSIGNED NOT NULL,
                    grade_id INT(10) UNSIGNED NOT NULL,
                    PRIMARY KEY (user_id, course_id)
                    ) ENGINE = InnoDB";

mysqli_query($link, $createTableSql);

error_log("Created TABLE users_courses");