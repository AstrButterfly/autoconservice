import logo from "/logo.png";
import Button from "../ButtonPlace/ButtonPlace";
import "./Footer.css";

export default function Footer() {
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
        <li>ПРО НАС</li>
        <li>ВIДГУКИ</li>
        <li>ПОСЛУГИ</li>
        <li>КОНТАКТИ</li>
      </ul>
      <div className="contacts-place">
        <div className="numbers-phones">
          <p>+096-500-25-59</p>
          <p>+095-900-25-13</p>
        </div>
        <div className="email">
          <img src="/Subtract.png" alt="Sub" />
          <p>igrick007@gmail.com</p>
        </div>
        <Button position="footer" isFooter={true}>
          МIСЦЕЗНАХОДЖЕННЯ
        </Button>
      </div>
    </footer>
  );
}
