<?php
interface ReviewStorageStrategy {
    public function getAllReviews(): array;
    public function addReview(array $review): void;
    public function deleteReview(int $id): void;
}
