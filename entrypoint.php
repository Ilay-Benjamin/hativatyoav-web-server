<?php


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


define("CONFIG_FILE", $_SERVER['DOCUMENT_ROOT'] . "/../private/landing/appdata/api/config/config.json");


echo "<br><br><br>DOCUMENT_ROOT: <br>" . $_SERVER['DOCUMENT_ROOT'] . "<br><br><br>";
echo "<br><br><br>__DIR__: <br>" . __DIR__ . "<br><br><br>";



function loadConfig() {
    if (!file_exists(CONFIG_FILE)) {
        throw new Exception("Configuration file not found");
    }
    $configContent = file_get_contents(CONFIG_FILE);
    return json_decode($configContent);
}


function getFirebaseConfigs() {
     $config = loadConfig();
     $firebaseConfigs = $config->firebaseConfigs;
     return $firebaseConfigs;
}


function getActions() {
     $config = loadConfig();
     $actions = $config->actions;
     return $actions;
}



function preValidation() {
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
         http_response_code(405); // Method Not Allowed
         $res = new stdClass();
         $res->error = "Only GET requests are allowed";
         echo json_encode($res);
         exit;
    }
}


function validation() {
    return true;
}


function processRequest() {
     preValidation(); // Pre-validation checks
     
     $res = new stdClass();

    if (!validation()) {
        http_response_code(400); // Bad Request
        $res->error = "Invalid Request";
        echo json_encode($res);
        return;
    }

    $action = $_GET['action'] ?? null;

    if ($action === 'getFirebaseConfigs') {
        $firebaseConfigs = getFirebaseConfigs();
        http_response_code(200); // OK
        $res->status = "success";
        $res->firebaseConfigs = $firebaseConfigs;
        echo json_encode($res);
    }

    elseif ($action === 'getActions') {
        $actions = getActions();
        http_response_code(200); // OK
        $res->status = "success";
        $res->actions = $actions;
        echo json_encode($res);
    } else {
        http_response_code(400); // Bad Request
        $res->error = "Invalid Request";
        echo json_encode($res);
    }
}



processRequest();



?>