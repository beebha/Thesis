<?php
/**
 * Class DBUtils
 *
 * A database utility class with methods
 * to get a connection and execute queries
 */
class DBUtils
{
    // LOCAL DEV SETTINGS
//    const DB_HOST = "127.0.0.1";
//    const DB_USERNAME = "root";
//    const DB_PASSWORD = "root";
//    const DB_NAME = "thesis";
//    const DB_PORT = 8889;
//    const DB_SOCKET = ":/Applications/MAMP/tmp/mysql/mysql.sock";

    // CLOUD SETTINGS
    const DB_HOST = "localhost";
    const DB_USERNAME = "root";
    const DB_PASSWORD = "Beebs126";
    const DB_NAME = "thesis";
    const DB_PORT = 3306;
    const DB_SOCKET = "";

    static function getInsertUpdateDeleteBulkExecutionResult(array $queries)
    {
        $bulkExecute = true;
        foreach($queries as $singleQuery)
        {
            $result = self::getConnectionAndExecuteQuery($singleQuery)['results'];;
            if(!$result) {
                $bulkExecute = false;
            }
        }
        return $bulkExecute;
    }

    static function getInsertUpdateDeleteExecutionResult($query)
    {
        $result = self::getConnectionAndExecuteQuery($query)['results'];
        return $result;
    }

    static function getSingleDetailExecutionResult($query)
    {
        $result = NULL;
        $rs = self::getConnectionAndExecuteQuery($query)['results'];
        if ($rs && ($row = mysqli_fetch_assoc($rs))) {
            $result = $row;
        }
        return $result;
    }

    static function getIDAfterInsertResult($query)
    {
        $id = self::getConnectionAndExecuteQuery($query)['id'];
        return $id;
    }

    static function getAllResults($query)
    {
        $results = array();

        $rs = self::getConnectionAndExecuteQuery($query)['results'];

        while ($rs && $row = mysqli_fetch_assoc($rs))
        {
            array_push($results, $row);
        }

        return $results;
    }

    static function getDBValue($type, $value)
    {
        $dbValue = NULL;

        if ($type == DBConstants::DB_STRING) {
            $dbValue = (is_null($value)) ? "NULL" : "'" . mysqli_real_escape_string(self::getConnectionLink(), $value) . "'";
        }

        if($type == DBConstants::DB_VALUE)
        {
            $dbValue = (is_null($value)) ? "NULL" : ($value == 0 && is_numeric($value) ? 0 : $value);
        }

        return $dbValue;
    }

    private static function getConnectionLink()
    {
        if (!$link =
            mysqli_connect
            (
                self::DB_HOST,
                self::DB_USERNAME,
                self::DB_PASSWORD,
                self::DB_NAME,
                self::DB_PORT,
                self::DB_SOCKET
            )) {
            echo 'Could not connect to mysql';
            exit;
        }

        if (!((bool)mysqli_query($link, "USE thesis"))) {
            echo 'Could not select database';
            exit;
        }

        return $link;
    }

    private static function getConnectionAndExecuteQuery($query)
    {
        $mysqli = new mysqli
        (
            self::DB_HOST,
            self::DB_USERNAME,
            self::DB_PASSWORD,
            self::DB_NAME,
            self::DB_PORT,
            self::DB_SOCKET
        );

        if (mysqli_connect_errno()) {
            throw new APIException("Connect failed: ". mysqli_connect_error());
        }

        $executeResult = $mysqli->query($query);
        $id = $mysqli->insert_id;

        return array('results' => $executeResult, 'id' => $id);
    }
}
 