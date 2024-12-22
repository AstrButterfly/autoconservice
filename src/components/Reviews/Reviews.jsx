import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import styles from "./Reviews.module.css";

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleReviews = 7;

  useEffect(() => {
    axios
      .get(`${API_URL}/reviews.php`)
      .then((response) => {
        console.log("Reviews data:", response.data); // Отладка
        setReviewsData(response.data);
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const handleScrollDown = () => {
    if (startIndex + visibleReviews < reviewsData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handleScrollUp = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Відгуки клієнтів</h2>
      <button
        className={`${styles.button} ${
          startIndex === 0 ? styles.disabled : ""
        }`}
        onClick={handleScrollUp}
        disabled={startIndex === 0}
      >
        ↑
      </button>
      <div className={styles.list}>
        {reviewsData
          .slice(startIndex, startIndex + visibleReviews)
          .map((review) => (
            <div className={styles.item} key={review.id}>
              <img
                src={review.photo}
                alt="Фото клиента"
                className={styles.photo}
              />
              <p className={styles.text}>{review.text}</p>
              <div className={styles.stars}>
                {"★".repeat(review.stars)}
                {"☆".repeat(5 - review.stars)}
              </div>
            </div>
          ))}
      </div>
      <button
        className={`${styles.button} ${
          startIndex + visibleReviews >= reviewsData.length
            ? styles.disabled
            : ""
        }`}
        onClick={handleScrollDown}
        disabled={startIndex + visibleReviews >= reviewsData.length}
      >
        ↓
      </button>
    </div>
  );
};

export default Reviews;
