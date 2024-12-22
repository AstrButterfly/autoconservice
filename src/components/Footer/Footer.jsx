import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "/logo.png";
import Button from "../ButtonPlace/ButtonPlace";
import "./Footer.css";
import axios from "axios";
import { API_URL } from "../../config";

export default function Footer() {
  const [contacts, setContacts] = useState({
    phone1: "",
    phone2: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/settings.php`)
      .then((response) => {
        console.log("Response data:", response.data); // Отладка
        const data = response.data;
        setContacts({
          phone1: data.phone[0],
          phone2: data.phone[1],
          email: data.email,
        });
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  return (
    <footer>
      <img className="footer-back" src="/footer-back.png" alt="background" />
      <div className="logo-info">
        <img src={logo} alt="AC Service" />
        <p className="rights">
          © 2024 АС Service.
          <br />
          Всі права захищені.
        </p>
      </div>

      <ul>
        <li>
          <Link to="/">ПРО НАС</Link>
        </li>
        <li>
          <Link to="/reviews">ВIДГУКИ</Link>
        </li>
        <li>
          <Link to="/services">ПОСЛУГИ</Link>
        </li>
        <li>
          <Link to="/contacts">КОНТАКТИ</Link>
        </li>
      </ul>
      <div className="contacts-place">
        <div className="numbers-phones">
          <p>{contacts.phone1}</p>
          <p>{contacts.phone2}</p>
        </div>
        <div className="email">
          <img src="/Subtract.png" alt="Sub" />
          <p>{contacts.email}</p>
        </div>
        <Button position="footer" isFooter={true}>
          МIСЦЕЗНАХОДЖЕННЯ
        </Button>
      </div>
    </footer>
  );
}
