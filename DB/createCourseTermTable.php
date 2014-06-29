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
$dropQuery = "DROP TABLE IF EXISTS course_terms";

mysqli_query($link, $dropQuery);

error_log("Dropped TABLE course_terms");

$createTableSql = "CREATE TABLE course_terms (
                    course_term_id INT(10) UNSIGNED NOT NULL,
                    course_term_label VARCHAR(64) NOT NULL,
                    current_course TINYINT(1) NOT NULL,
                    PRIMARY KEY (course_term_id)
                    ) ENGINE = InnoDB";

mysqli_query($link, $createTableSql);

error_log("Created TABLE course_terms");