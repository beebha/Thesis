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
$dropQuery = "DROP TABLE IF EXISTS announcements";

mysqli_query($link, $dropQuery);

error_log("Dropped TABLE announcements");

$createTableSql = "CREATE TABLE announcements (
                    announcement_id INT(10) unsigned NOT NULL AUTO_INCREMENT,
                    registration_type ENUM('DEGREE','PRE-ADMISSION','GUEST') NOT NULL,
                    concentration_id INT(10) UNSIGNED NOT NULL,
                    course_term_id INT(10) UNSIGNED NOT NULL,
                    announcement TEXT,
                    PRIMARY KEY (announcement_id)
                    ) ENGINE = InnoDB";

mysqli_query($link, $createTableSql);

error_log("Created TABLE announcements");