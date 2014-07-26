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
$dropQuery = "DROP TABLE IF EXISTS course";

mysqli_query($link, $dropQuery);

error_log("Dropped TABLE course");

$createTableSql = "CREATE TABLE course (
                    concentration_id INT(10) UNSIGNED NOT NULL,
                    hes_course_id INT(10) UNSIGNED NOT NULL,
                    course_id INT(10) UNSIGNED NOT NULL,
                    course_code VARCHAR(64) NOT NULL,
                    course_title VARCHAR(255) NOT NULL,
                    course_term_id INT(10) UNSIGNED NOT NULL,
                    course_day SET('MON','TUES','WED','THUR','FRI','SAT','SUN') NULL,
                    course_time VARCHAR(64) NOT NULL,
                    course_type VARCHAR(64) NOT NULL,
                    course_limit INT(3) UNSIGNED NULL,
                    instructor VARCHAR(64) NOT NULL,
                    location VARCHAR(64) NULL,
                    attributes SET('TMF','DCOM','DC','SP','SD','WAD','WP','SRM','DM','MGMT','AL','P','AC','LA','CD','DIGM','EID','WDD','CAP','E','DSCI','DCAP') NOT NULL,
                    PRIMARY KEY (course_id)
                    ) ENGINE = InnoDB";

mysqli_query($link, $createTableSql);

error_log("Created TABLE course");