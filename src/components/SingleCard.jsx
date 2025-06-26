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

  // Load selectedDeck (persisted) or default
  const [selectedDeck, setSelectedDeck] = useState(() => {
    const savedKey = localStorage.getItem(STORAGE_KEY);
    return options.find(o => o.key === savedKey) || options[0];
  });

  // Deck state + drawn card
  const [tarotDeck, setTarotDeck] = useState([]);
  const [card, setCard] = useState(null);

  // On mount + whenever selectedDeck changes
  useEffect(() => {
    // save deck choice
    localStorage.setItem(STORAGE_KEY, selectedDeck.key);

    // restore deck order if present
    const saved = localStorage.getItem(ORDER_KEY(selectedDeck.key));
    const deck = saved ? JSON.parse(saved) : getDeck(selectedDeck.key);

    setTarotDeck(deck);

    // only auto-draw if we actually restored an order
    if (saved) {
      setCard(deck[0]);
    }
    else {
      setCard(null);
    }
  }, [selectedDeck, options]);

  // Shuffle -> update state + persist order
  const shuffle = () => {
    let deckCopy = [...tarotDeck];
    deckCopy = riffleShuffle(deckCopy);
    deckCopy = spliceShuffle(deckCopy);
    deckCopy = stackSuffle(deckCopy);

    setTarotDeck(deckCopy);
    setCard(null);
    localStorage.setItem(ORDER_KEY(selectedDeck.key), JSON.stringify(deckCopy));
  };

  // Draw -> return new top + persist -> move old top to bottom
  const getThisCard = () => {
    let deckCopy = [...tarotDeck];
    const drawn = getCard(deckCopy);

    setTarotDeck(deckCopy);
    setCard(drawn);
    localStorage.setItem(ORDER_KEY(selectedDeck.key), JSON.stringify(deckCopy));
  };

  // Reset -> clear saved deck + fresh
  const reset = () => {
    localStorage.removeItem(ORDER_KEY(selectedDeck.key));

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
        <label>
          Deck:
          <select
            value={selectedDeck.key}
            onChange={e =>
              setSelectedDeck(options.find(o => o.key === e.target.value))
            }
          >
            {options.map(o => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
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
