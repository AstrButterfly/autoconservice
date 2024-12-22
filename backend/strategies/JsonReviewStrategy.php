<?php
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
        return json_decode(file_get_contents($this->filePath), true) ?? [];
    }

    public function addReview(array $review): void {
        $reviews = $this->getAllReviews();
        $review['id'] = count($reviews) + 1; // Простая генерация ID
        $reviews[] = $review;
        file_put_contents($this->filePath, json_encode($reviews));
    }

    public function deleteReview(int $id): void {
        $reviews = $this->getAllReviews();
        $reviews = array_filter($reviews, fn($review) => $review['id'] !== $id);
        file_put_contents($this->filePath, json_encode(array_values($reviews)));
    }
}
