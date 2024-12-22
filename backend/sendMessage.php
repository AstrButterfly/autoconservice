<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

class User {
    private $email;

    public function __construct($email) {
        $this->email = $email;
    }

    public function getEmail() {
        return $this->email;
    }

    public function notify($message) {
        // Відправка письма
        error_log("Відправка повідомлення на {$this->email}: $message\n", 3, "notifications.log");
    }
    
}

class NotificationManager {
    private $subscribers = [];

    public function loadSubscribers($filePath) {
        if (file_exists($filePath)) {
            $data = json_decode(file_get_contents($filePath), true);
            foreach ($data as $subscriber) {
                $this->subscribe(new User($subscriber['email']));
            }
        } else {
            throw new Exception("Файл с подписчиками не найден.");
        }
    }

    public function subscribe(User $user) {
        $this->subscribers[] = $user;
    }

    public function notifySubscribers($message) {
        foreach ($this->subscribers as $subscriber) {
            $subscriber->notify($message);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['message'])) {
            throw new Exception("Сообщение не передано.");
        }

        $notificationManager = new NotificationManager();
        $notificationManager->loadSubscribers('data/subscribers.json');

        $notificationManager->notifySubscribers($data['message']);
        
        ob_clean();
        header("Content-Type: application/json");
        echo json_encode(["status" => "success", "message" => "Повідомлення успішно відправлені"]);
    } catch (Exception $e) {
        http_response_code(400);
        header("Content-Type: application/json");
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    header("Content-Type: application/json");
    echo json_encode(["status" => "error", "message" => "Метод запроса не поддерживается."]);
}
