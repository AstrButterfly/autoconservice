import logo from "/logo.png";
import Button from "../ButtonPlace/ButtonPlace";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="AC Service" />
      <ul>
        <li>ПРО НАС</li>
        <li>ВIДГУКИ</li>
        <li>ПОСЛУГИ</li>
        <li>КОНТАКТИ</li>
      </ul>
      <Button position="header">МIСЦЕЗНАХОДЖЕННЯ</Button>
    </header>
  );
}
