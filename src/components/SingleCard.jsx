import React, { useState, useEffect } from 'react';
import { getDeck, spliceShuffle, stackSuffle, riffleShuffle, getTopFive } from '../utils/scripts.jsx';
import CardDescripition from './Cards/CardDescription.jsx';
import './SingleCard.css'
import DeckStack from './Cards/DeckStack.jsx';

export function SingleCard({ selectedDeck }) {
  // State to hold the current tarot deck
  const [tarotDeck, setTarotDeck] = useState(null);
  // State to hold the currently drawn card
  const [card, setCard] = useState([]);

  // initialize (or re-init) whenever selectedDeck changes
  useEffect(() => {
    setTarotDeck(getDeck(selectedDeck.key))
    setCard([])
  }, [selectedDeck])

  useEffect(() => {
    if (tarotDeck && card.length === 0) {
      setCard(getTopFive(tarotDeck));
    }
  }, [tarotDeck]);

  // Applies a combination of shuffling methods to randomize the tarot deck
  const shuffle = () => {
    let deck = riffleShuffle(tarotDeck);
    deck = spliceShuffle(deck);
    deck = stackSuffle(deck);
    setTarotDeck(deck); // Updates the shuffled deck in state
  };

  // Draws a single card from the current deck
  const getThisCard = () => {
    setCard(getTopFive(tarotDeck));
  };

  return (
    <>
      <div className="deck-buttons">
        <button onClick={() => { setCard([]); shuffle(); getThisCard(); }}>Shuffle</button>
        <button onClick={getThisCard}>Draw Card</button>
        <button onClick={() => { setTarotDeck(getDeck(selectedDeck.key)); setCard([]); }}>Reset</button>
      </div>
      <div className="single-card">
        {card.length !== 0 ? (
          <>
            <DeckStack cards={card} imageFolder={selectedDeck.imageFolder} size={5} />
            <CardDescripition card={card[0]} deck={selectedDeck} />
          </>
        ) : (
          <p>Cards are in order by default; Shuffle and Draw a Card.</p>
        )}
      </div>
    </>
  );
};


export default SingleCard;