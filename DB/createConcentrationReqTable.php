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
$dropQuery = "DROP TABLE IF EXISTS concentration_req";

mysqli_query($link, $dropQuery);

error_log("Dropped TABLE concentration_req");

$createTableSql = "CREATE TABLE concentration_req (
                    concentration_id INT(10) UNSIGNED NOT NULL,
                    num_courses INT(10) UNSIGNED NOT NULL,
                    thesis TINYINT(1) NOT NULL,
                    capstone TINYINT(1) NOT NULL
                    ) ENGINE = InnoDB";

mysqli_query($link, $createTableSql);

error_log("Created TABLE concentration_req");