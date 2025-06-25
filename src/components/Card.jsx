import React, { useState, useEffect } from 'react';
import './Card.css';

const Card = ({ card, imageFolder }) => {
  const [flipped, setFlipped] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);

  useEffect(() => {
    // reset flip state without transition, then flip
    setDisableTransition(true);
    setFlipped(false);
    const timer = setTimeout(() => {
      setDisableTransition(false);
      setFlipped(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [card]);

  return (
    <div className="card-container">
      <div className={`card-flipper ${flipped ? 'flipped' : ''} ${disableTransition ? 'no-transition' : ''}`}>
        <img
          className="card-face card-back"
          src={`/images/${imageFolder}/tarot-card-back.JPG`}
          alt="Card Back"
        />
        <img
          className="card-face card-front"
          src={`/images/${imageFolder}/${card.img}`}
          alt={card.name}
        />
      </div>
    </div>
  );
};

export default Card;
