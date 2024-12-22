<?php
interface ReviewStorageStrategy {
    public function getAllReviews(): array;
    public function addReview(array $review): void;
    public function deleteReview(string $id): void; // ID как string (соответствие `uniqid` в reviews.php)
}
