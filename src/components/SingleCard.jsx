import React, { useState, useEffect } from 'react';
import {
  getDeckOptions,
  getDeck,
  getCard,
  spliceShuffle,
  stackSuffle,
  riffleShuffle,
} from '../utils/scripts.jsx';
import Card from './Card.jsx';
import CardDescripition from './CardDescription.jsx';
import './SingleCard.css';

const STORAGE_KEY = 'selectedDeck';
const ORDER_KEY = key => `tarotDeckOrder-${key}`;

const SingleCard = () => {
  const options = getDeckOptions();

  // Load selectedDeck key from localStorage (or default)
  const [selectedDeck, setSelectedDeck] = useState(() => {
    const savedKey = localStorage.getItem(STORAGE_KEY);
    return options.find(o => o.key === savedKey) || options[0];
  });

  // tarotDeck + card state
  const [tarotDeck, setTarotDeck] = useState([]);
  const [card, setCard] = useState(null);

  // On mount & whenever selectedDeck changes:
  useEffect(() => {
    // persist deck choice
    localStorage.setItem(STORAGE_KEY, selectedDeck.key);

    // load saved deck order? else fresh
    const savedOrder = localStorage.getItem(ORDER_KEY(selectedDeck.key));
    const deck = savedOrder
      ? JSON.parse(savedOrder)
      : getDeck(selectedDeck.key);

    setTarotDeck(deck);

    // if we restored from storage, auto-load top card
    if (savedOrder) {
      setCard(deck[0]);
    } else {
      setCard(null);
    }
  }, [selectedDeck, options]);

  // Persist deck order anytime it changes
  useEffect(() => {
    localStorage.setItem(ORDER_KEY(selectedDeck.key), JSON.stringify(tarotDeck));
  }, [tarotDeck, selectedDeck.key]);

  // Shuffle methods all return a mutated array; clone to trigger React update
  const shuffle = () => {
    let deck = riffleShuffle(tarotDeck);
    deck = spliceShuffle(deck);
    deck = stackSuffle(deck);
    setTarotDeck([...deck]);
    setCard(null);
  };

  // Draw using our patched getCard
  const getThisCard = () => {
    const drawn = getCard(tarotDeck);
    setTarotDeck([...tarotDeck]);
    setCard(drawn);
  };

  // RESET: clear order and re-init
  const reset = () => {
    localStorage.removeItem(ORDER_KEY(selectedDeck.key));

    // fresh deck for the same selectedDeck
    const fresh = getDeck(selectedDeck.key);
    setTarotDeck(fresh);
    setCard(null);
  };

  return (
    <>
      <div>
        <button onClick={shuffle}>Shuffle</button>
        <button onClick={getThisCard}>Draw Card</button>
        <button onClick={reset}>Reset</button>
        <label> Deck:
          <select value={selectedDeck.key} onChange={e => setSelectedDeck(options.find(o => o.key === e.target.value)) } >
            {options.map(o => (<option key={o.key} value={o.key}>{o.label}</option>))}
          </select>
        </label>
      </div>

      <p className="deck-description">{selectedDeck.description}</p>

      <div className="single-card">
        {card ? (
          <>
            <Card card={card} imageFolder={selectedDeck.imageFolder} />
            <CardDescripition card={card} deck={selectedDeck} />
          </>
        ) : (
          <p>Cards are in order by default; Shuffle and Draw a Card.</p>
        )}
      </div>
    </>
  );
};

export default SingleCard;