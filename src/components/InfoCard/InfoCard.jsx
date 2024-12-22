import "./InfoCard.css";

const InfoCard = ({ cards }) => {
  return (
    <div className="cards">
      {cards.map((card, index) => (
        <div key={index} className="card-item">
          <img src={card.url} alt={card.altText} className="card-photo" />
          <div className="card-text">
            <p>{card.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
