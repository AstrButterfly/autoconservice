<?php
require_once __DIR__ . "/../strategies/ReviewStorageStrategy.php";

class ReviewManager {
    private ReviewStorageStrategy $strategy;

    public function __construct(ReviewStorageStrategy $strategy) {
        $this->strategy = $strategy;
    }

    public function getAllReviews(): array {
        return $this->strategy->getAllReviews();
    }

    public function addReview(array $review): void {
        $this->strategy->addReview($review);
    }

    public function deleteReview(int $id): void {
        $this->strategy->deleteReview($id);
    }
}
