import React, { useState, useEffect } from 'react';
import './CardFlip.css';

export const CardFlip = ({ card, imageFolder, top = false }) => {
  const [flipped, setFlipped] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);

  useEffect(() => {
    setDisableTransition(true);
    setFlipped(false);

    const timer = setTimeout(() => {
      setDisableTransition(false);
      if (top) setFlipped(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [card, top]);

  return (
    <div className="card-container">
      <div
        className={`card-flipper ${flipped ? 'flipped' : ''} ${disableTransition ? 'no-transition' : ''
          }`}
      >
        <img
          className="card-face card-back"
          src={`./images/${imageFolder}/tarot-card-back.JPG`}
          alt="Card Back"
        />
        <img
          className="card-face card-front"
          src={`./images/${imageFolder}/${card.img}`}
          alt={card.name}
        />
      </div>
    </div>
  );
};