<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/strategies/JsonReviewStrategy.php";
require_once __DIR__ . "/manager/ReviewManager.php";

$strategy = new JsonReviewStrategy(__DIR__ . "/data/reviews.json");
$reviewManager = new ReviewManager($strategy);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($reviewManager->getAllReviews());
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['text']) && isset($data['stars']) && isset($data['photo'])) {
        $reviewManager->addReview($data);
        echo json_encode(["status" => "success", "message" => "Review added successfully."]);
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid data."]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['id'])) {
        $reviewManager->deleteReview((int)$data['id']);
        echo json_encode(["status" => "success", "message" => "Review deleted successfully."]);
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid ID."]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

http_response_code(405);
echo json_encode(["status" => "error", "message" => "Method not allowed."]);
