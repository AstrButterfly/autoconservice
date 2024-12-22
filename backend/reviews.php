<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$jsonFile = __DIR__ . "/data/reviews.json";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($jsonFile)) {
        echo file_get_contents($jsonFile);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Файл с отзывами не найден."]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['action']) && $data['action'] === 'delete') {
        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Не указан ID для удаления."]);
            exit;
        }
        $reviews = json_decode(file_get_contents($jsonFile), true) ?? [];
        $filteredReviews = array_filter($reviews, fn($review) => $review['id'] != $data['id']);
        file_put_contents($jsonFile, json_encode(array_values($filteredReviews)));
        echo json_encode(["message" => "Отзыв удалён."]);
    } else    if (isset($_POST['action']) && $_POST['action'] === 'add') {

        $text = $_POST['text'] ?? '';
        $stars = $_POST['stars'] ?? 5;

        if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(["message" => "Ошибка загрузки файла."]);
            exit;
        }

        $uploadDir = __DIR__ . "/../public/reviews";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $fileName = uniqid() . "_" . basename($_FILES['file']['name']);
        $filePath = $uploadDir . $fileName;
        if (!move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
            http_response_code(500);
            echo json_encode(["message" => "Не удалось сохранить файл."]);
            exit;
        }

        $reviews = json_decode(file_get_contents($jsonFile), true) ?? [];
        
        $newReview = [
            "id" => uniqid(),
            "text" => $text,
            "stars" => $stars,
            "photo" => $fileName,
        ];
        $reviews[] = $newReview;

        file_put_contents($jsonFile, json_encode($reviews));

        echo json_encode(["message" => "Отзыв добавлен.", "review" => $newReview]);
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Неизвестное действие."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Метод запроса не поддерживается."]);
}


