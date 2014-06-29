<?php
if (!$link = mysqli_connect('127.0.0.1', 'root', 'root', NULL, 8889, ':/Applications/MAMP/tmp/mysql/mysql.sock')) {
    die('Could not connect: ' . mysqli_error($link));
}

$sql = 'CREATE DATABASE thesis';

if (mysqli_query($link, $sql)) {
    echo "Database thesis created successfully\n";
} else {
    echo 'Error creating database: ' . mysqli_error($link) . "\n";
}