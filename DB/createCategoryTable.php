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
$dropQuery = "DROP TABLE IF EXISTS category";

mysqli_query($link, $dropQuery);

error_log("Dropped TABLE category");

$createTableSql = "CREATE TABLE category (
                    concentration_id INT(10) UNSIGNED NOT NULL,
                    category_id INT(10) UNSIGNED NOT NULL,
                    category_code VARCHAR(10) NOT NULL,
                    category_label VARCHAR(64) NOT NULL,
                    PRIMARY KEY (category_id)
                    ) ENGINE = InnoDB";

mysqli_query($link, $createTableSql);

error_log("Created TABLE category");