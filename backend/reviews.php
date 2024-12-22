<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");

$jsonFile = __DIR__ . "/data/reviews.json";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($jsonFile)) {
        echo file_get_contents($jsonFile);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Файлу з відгуками не знайдено."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Метод запросу не підтримується."]);
}
