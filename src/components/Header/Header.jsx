import { Link } from "react-router-dom";
import logo from "/logo.png";
import Button from "../ButtonPlace/ButtonPlace";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="AC Service" />
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
      <Button position="header">МIСЦЕЗНАХОДЖЕННЯ</Button>
    </header>
  );
}
