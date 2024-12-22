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
            <p className={styles["login-title"]}>Админ-панель</p>
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
    </div>
  );
};

export default AdminPanel;
