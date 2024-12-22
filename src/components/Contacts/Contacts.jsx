import "./Contacts";

export default function Contacts() {
  return (
    <div className="contacts-body">
      <p>КОНТАКТИ</p>
      <p>Наше місцезнаходження</p>
      <div className="info-map">
        <div className="info">
          <h3>Як зв'язатися з нами</h3>
          <div className="phone">
            <img src="" alt="" className="phone-img" />
            <p>096-500-25-59</p>
          </div>
          <div className="email">
            <img src="" alt="" className="email-img" />
            <p>igrick007@gmail.com</p>
            <p>м. Кривий Ріг, Дишинського 55</p>
          </div>
          <h3>Режим роботи</h3>
          <div className="days">
            <img src="" alt="" className="days-img" />
            <p>Пн. – Сб.: с 9:00 до 18:00</p>
          </div>
        </div>
        <div className="map"></div>
      </div>
    </div>
  );
}
