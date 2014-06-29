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
$dropQuery = "DROP TABLE IF EXISTS concentration";

mysqli_query($link, $dropQuery);

error_log("Dropped TABLE concentration");

$createTableSql = "CREATE TABLE concentration (
                    concentration_id INT(10) UNSIGNED NOT NULL,
                    concentration_code VARCHAR(10) NOT NULL,
                    concentration_label VARCHAR(64) NOT NULL,
                    PRIMARY KEY (concentration_id)
                    ) ENGINE = InnoDB";

mysqli_query($link, $createTableSql);

error_log("Created TABLE concentration");