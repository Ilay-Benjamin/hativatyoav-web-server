<?php

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Path to the config file for the Backend app
define("CONFIG_FILE", $_SERVER['DOCUMENT_ROOT'] . "/../private/landing/appdata/api/config/config.json");

// Load the configuration file for the Backend app
function loadConfig() {
    if (!file_exists(CONFIG_FILE)) {
        throw new Exception("Configuration file not found");
    }
    $configContent = file_get_contents(CONFIG_FILE);
    return json_decode($configContent, true); // Decoding as associative array
}

// Get Firebase Configurations from config
function getFirebaseConfigs() {
    $config = loadConfig();
    return $config['firebaseConfigs'];
}

// Pre-validation for handling requests
function preValidation() {
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Only GET requests are allowed']);
        exit;
    }
}

// Validate the request (can add additional validation here if needed)
function validation() {
    return true;
}

// Main function to handle incoming requests
function processRequest() {
    preValidation(); // Pre-validation checks
    
    if (!validation()) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Invalid request']);
        return;
    }

    $action = $_GET['action'] ?? null;

    if ($action === 'getFirebaseConfigs') {
        $firebaseConfigs = getFirebaseConfigs();
        http_response_code(200); // OK
        echo json_encode([
            'status' => 'success',
            'firebaseConfigs' => $firebaseConfigs
        ]);
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Invalid action']);
    }
}

// Execute the request handling
processRequest();

?>
