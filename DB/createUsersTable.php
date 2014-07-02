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
$dropQuery = "DROP TABLE IF EXISTS users";

mysqli_query($link, $dropQuery);

error_log("Dropped TABLE users");

$createTableSql = "CREATE TABLE users (
                    user_id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
                    username VARCHAR(255) NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    registration_type ENUM('DEGREE','PRE-ADMISSION','GUEST') NOT NULL,
                    concentration_id INT(10) UNSIGNED NOT NULL,
                    gpa DECIMAL (3, 2) DEFAULT NULL,
                    current_login DATETIME,
                    last_login DATETIME,
                    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    modify_date DATETIME DEFAULT '0000-00-00 00:00:00' NOT NULL,
                    PRIMARY KEY (user_id)
                    ) ENGINE = InnoDB";

mysqli_query($link, $createTableSql);

error_log("Created TABLE users");