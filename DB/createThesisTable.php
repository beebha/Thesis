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
$dropQuery = "DROP TABLE IF EXISTS thesis";

mysqli_query($link, $dropQuery);

error_log("Dropped TABLE thesis");

$createTableSql = "CREATE TABLE thesis (
                    thesis_id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
                    thesis_graduation_month INT(10) UNSIGNED NOT NULL,
                    thesis_proposal_month INT(10) UNSIGNED NOT NULL,
                    thesis_proposal_day INT(10) UNSIGNED NOT NULL,
                    thesis_due_month INT(10) UNSIGNED NOT NULL,
                    thesis_due_day INT(10) UNSIGNED NOT NULL,
                    thesis_grade_month INT(10) UNSIGNED NOT NULL,
                    thesis_grade_day INT(10) UNSIGNED NOT NULL,
                    thesis_bound_month INT(10) UNSIGNED NOT NULL,
                    thesis_bound_day INT(10) UNSIGNED NOT NULL,
                    PRIMARY KEY (thesis_id)
                    ) ENGINE = InnoDB";

mysqli_query($link, $createTableSql);

error_log("Created TABLE thesis");