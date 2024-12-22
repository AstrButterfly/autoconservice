<?php
declare(strict_types=1);
require_once __DIR__ . "/ReviewStorageStrategy.php";

class JsonReviewStrategy implements ReviewStorageStrategy {
    private string $filePath;

    public function __construct(string $filePath) {
        $this->filePath = $filePath;
    }

    public function getAllReviews(): array {
        if (!file_exists($this->filePath)) {
            return [];
        }
        $data = file_get_contents($this->filePath);
        return json_decode($data, true) ?? [];
    }

    public function addReview(array $review): void {
        $reviews = $this->getAllReviews();
        $review['id'] = uniqid(); // Генерация уникального ID
        $reviews[] = $review;
        file_put_contents($this->filePath, json_encode($reviews, JSON_PRETTY_PRINT));
    }

    public function deleteReview($id): void {
        $reviews = $this->getAllReviews();
        $reviews = array_filter($reviews, fn($review) => $review['id'] !== $id);
        file_put_contents($this->filePath, json_encode(array_values($reviews), JSON_PRETTY_PRINT));
    }
    
}
