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
$dropQuery = "DROP TABLE IF EXISTS instructors";

mysqli_query($link, $dropQuery);

error_log("Dropped TABLE instructors");

$createTableSql = "CREATE TABLE instructors (
                    instructor_id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
                    instructor_code VARCHAR(64) NOT NULL,
                    instructor_name VARCHAR(255) NOT NULL,
                    instructor_url VARCHAR(255) NULL,
                    instructor_email VARCHAR(255) NULL,
                    PRIMARY KEY (instructor_id)
                    ) ENGINE = InnoDB";

mysqli_query($link, $createTableSql);

error_log("Created TABLE instructors");