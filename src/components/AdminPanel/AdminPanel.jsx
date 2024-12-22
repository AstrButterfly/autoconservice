import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import styles from "./AdminPanel.module.css";

const AdminPanel = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhones, setNewPhones] = useState(["", ""]);
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [file, setFile] = useState(null);
  const [newReview, setNewReview] = useState({
    text: "",
    stars: 5,
    photo: "",
  });

  const [contacts, setContacts] = useState({
    phone1: "",
    phone2: "",
    email: "",
  });

  const sendNewsletter = () => {
    if (!newsletterMessage.trim()) {
      alert("Введіть повідомлення для розсилки.");
      return;
    }

    axios
      .post(`${API_URL}/sendMessage.php`, { message: newsletterMessage })
      .then((response) => {
        console.log("Відповідь від серверу:", response.data);
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Помилка при відправці повідовлення:", error);
        alert("Виникла помилка при відправці повідовлення.");
      });
  };
  useEffect(() => {
    if (authenticated) {
      fetchReviews();
    }
  }, [authenticated]);

  const fetchReviews = () => {
    axios
      .get(`${API_URL}/reviews.php`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile.size > 1024 * 1024) {
      alert("Розмір файлу повинен бути меньше 1 МБ");
      return;
    }
    const validFormats = ["image/jpeg", "image/png", "image/gif"];
    if (!validFormats.includes(selectedFile.type)) {
      alert("Файл повинен бути формату (JPEG, PNG, GIF)");
      return;
    }
    setFile(selectedFile);
  };

  const addReview = async () => {
    if (!newReview.text.trim() || !file) {
      alert("Введіть текст відгуку та завантажте картинку.");
      return;
    }

    const formData = new FormData();
    formData.append("action", "add");
    formData.append("text", newReview.text);
    formData.append("stars", newReview.stars);
    formData.append("file", file);

    try {
      const response = await axios.post(`${API_URL}/reviews.php`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
      fetchReviews();
      setNewReview({ text: "", stars: 5 });
      setFile(null);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const deleteReview = (id) => {
    axios
      .post(`${API_URL}/reviews.php`, {
        action: "delete",
        id,
      })
      .then((response) => {
        alert(response.data.message);
        fetchReviews();
      })
      .catch((error) => console.error("Error deleting review:", error));
  };

  // Successful autorizate
  useEffect(() => {
    if (authenticated) {
      axios
        .get(`${API_URL}/settings.php`)
        .then((response) => {
          console.log("Response data:", response.data);
          const data = response.data || {};
          setContacts({
            phone1: data.phone[0],
            phone2: data.phone[1],
            email: data.email,
          });
        })
        .catch((error) => console.error("Error fetching contacts:", error));
    }
  }, [authenticated]);

  // Autorizate
  const login = () => {
    if (password === "admin") {
      setAuthenticated(true);
    } else {
      alert("Неверный пароль");
    }
  };

  const updateEmail = () => {
    axios
      .post(`${API_URL}/settings.php`, {
        key: "email",
        value: newEmail,
      })
      .then((response) => {
        alert(response.data.message);
        setContacts((prev) => ({ ...prev, email: newEmail }));
      })
      .catch((error) => console.error("Error updating email:", error));
  };

  const updatePhones = () => {
    axios
      .post(`${API_URL}/settings.php`, {
        key: "phone",
        value: newPhones,
      })
      .then((response) => {
        alert(response.data.message);
        setContacts((prev) => ({
          ...prev,
          phone1: newPhones[0],
          phone2: newPhones[1],
        }));
      })
      .catch((error) => console.error("Error updating phones:", error));
  };

  if (!authenticated) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles["login-wrapper"]}>
            <p className={styles["login-title"]}>Адмін-панель</p>
            <p>Введіть пароль для доступу:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles["login-input"]}
              placeholder="Пароль"
            />
            <button onClick={login} className={styles["login-button"]}>
              Ввійти
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles["card-title"]}>Адмін-панель</h2>
        <div className="mb-4">
          <h3 className={styles["section-title"]}>Поточні налаштування:</h3>
          <p>Email: {contacts.email}</p>
          <p>
            Телефони: {contacts.phone1}, {contacts.phone2}
          </p>
        </div>
        <div className="mb-4">
          <h3 className={styles["section-title"]}>Оновити email:</h3>
          <div className={styles["input-group"]}>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Новий email"
              className={styles.input}
            />
            <button
              onClick={updateEmail}
              className={`${styles.button} ${styles["button-primary"]}`}
            >
              Оновити
            </button>
          </div>
        </div>
        <div>
          <h3 className={styles["section-title"]}>Оновити телефони:</h3>
          <div className="mb-2">
            <input
              type="text"
              value={newPhones[0]}
              onChange={(e) =>
                setNewPhones((prev) => [e.target.value, prev[1]])
              }
              placeholder="Телефон 1"
              className={styles.input}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              value={newPhones[1]}
              onChange={(e) =>
                setNewPhones((prev) => [prev[0], e.target.value])
              }
              placeholder="Телефон 2"
              className={styles.input}
            />
          </div>
          <button
            onClick={updatePhones}
            className={`${styles.button} ${styles["button-success"]}`}
          >
            Оновити
          </button>
        </div>
      </div>
      <div className="mb-4">
        <h3 className={styles["section-title"]}>Розсилка повідомлень:</h3>
        <textarea
          value={newsletterMessage}
          onChange={(e) => setNewsletterMessage(e.target.value)}
          placeholder="Введіть повідомлення для підписників"
          className={styles.input}
          rows={4}
        ></textarea>
        <button
          onClick={sendNewsletter}
          className={`${styles.button} ${styles["button-primary"]} ${styles["mt-2"]}`}
        >
          Надіслати повідомлення
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.form}>
          <h3>Додати новий відгук</h3>
          <textarea
            value={newReview.text}
            onChange={(e) =>
              setNewReview((prev) => ({ ...prev, text: e.target.value }))
            }
            placeholder="Текст відгуку"
            rows={4}
            className={styles.input}
          ></textarea>
          <input
            type="number"
            min="1"
            max="5"
            value={newReview.stars}
            onChange={(e) =>
              setNewReview((prev) => ({
                ...prev,
                stars: Number(e.target.value),
              }))
            }
            placeholder="Оценка (1-5)"
            className={styles.input}
          />
          <input
            type="file"
            onChange={handleFileChange}
            className={styles.input}
          />
          <button
            onClick={addReview}
            className={`${styles.button} ${styles["button-success"]}`}
          >
            Додати відгук
          </button>
        </div>
      </div>
      <div className={styles.adminPanel}>
        <div className={styles.sidebar}>
          <h3>Відгуки</h3>
          <ul className={styles.reviewList}>
            {reviews.map((review) => (
              <li key={review.id} className={styles.reviewItem}>
                <div className={styles.stars}>
                  {"★".repeat(review.stars)}
                  {"☆".repeat(5 - review.stars)}
                </div>
                <p>{review.text}</p>
                <button
                  className={`${styles.button} ${styles["button-danger"]}`}
                  onClick={() => deleteReview(review.id)}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
