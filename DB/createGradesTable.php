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
$dropQuery = "DROP TABLE IF EXISTS grades";

mysqli_query($link, $dropQuery);

error_log("Dropped TABLE grades");

$createTableSql = "CREATE TABLE grades (
                    grade_id INT(10) UNSIGNED NOT NULL,
                    grade_label VARCHAR(64) NOT NULL,
                    gpa DECIMAL (3, 2) NOT NULL,
                    PRIMARY KEY (grade_id)
                    ) ENGINE = InnoDB";

mysqli_query($link, $createTableSql);

error_log("Created TABLE grades");