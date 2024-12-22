<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/config/config.php";
use Config\SettingsManager;

$settingsManager = SettingsManager::getInstance();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($settingsManager->getSettings());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['key']) && isset($data['value'])) {
        $settingsManager->updateSetting($data['key'], $data['value']);
        echo json_encode(["message" => "Налаштування оновлено успішно"]);
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Некоректні данні"]);
    }
}
