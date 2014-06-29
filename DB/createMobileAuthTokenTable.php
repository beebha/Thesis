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
$dropQuery = "DROP TABLE IF EXISTS mobile_auth_token";

mysqli_query($link, $dropQuery);

error_log("Dropped TABLE mobile_auth_token");

$createTableSql = "CREATE TABLE mobile_auth_token (
                    user_id INT(10) UNSIGNED NOT NULL,
                    auth_token VARCHAR(255) NOT NULL,
                    device_type VARCHAR(32) NOT NULL,
                    device_os VARCHAR(32) NOT NULL,
                    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    modify_date DATETIME DEFAULT '0000-00-00 00:00:00' NOT NULL,
                    PRIMARY KEY (user_id, device_type, device_os)
                    ) ENGINE = InnoDB";

mysqli_query($link, $createTableSql);

error_log("Created TABLE mobile_auth_token");