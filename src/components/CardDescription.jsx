import React from 'react';
import { renderKeywords } from '../utils/scripts.jsx';
import './CardDescription.css';

const CardDescripition = ({ card }) => {
  return (
      <div className="card-details">
        <h2>{card.number}: {card.name}</h2>
        <p><strong>Keywords:</strong> {renderKeywords(card)}</p>
          <h3>Light:</h3>
          <ul>{card.meanings.light.map(item => <li key={item}>{item}</li>)}</ul>

          <h3>Shadow:</h3>
          <ul>{card.meanings.shadow.map(item => <li key={item}>{item}</li>)}</ul>

          <h3>Questions to Ask Yourself:</h3>
          <ul>{card.QuestionsToAsk.map(item => <li key={item}>{item}</li>)}</ul>
      </div>
  );
};

export default CardDescripition;