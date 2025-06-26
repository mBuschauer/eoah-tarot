import React, { useState, useEffect } from 'react';
import { getDeckOptions, getDeck, getCard, spliceShuffle, stackSuffle, riffleShuffle, renderKeywords } from '../utils/scripts.jsx';
import Card from './Card.jsx'
import CardDescripition from './CardDescription.jsx';
import './SingleCard.css'

const SingleCard = () => {
  const options = getDeckOptions()
  const [selectedDeck, setSelectedDeck] = useState(options[0])
  // State to hold the current tarot deck
  const [tarotDeck, setTarotDeck] = useState(null);
  // State to hold the currently drawn card
  const [card, setCard] = useState(null);

  // initialize (or re-init) whenever selectedDeck changes
  useEffect(() => {
    setTarotDeck(getDeck(selectedDeck.key))
    setCard(null)
  }, [selectedDeck])

  // Applies a combination of shuffling methods to randomize the tarot deck
  const shuffle = () => {
    let deck = riffleShuffle(tarotDeck);
    deck = spliceShuffle(deck);
    deck = stackSuffle(deck);
    setTarotDeck(deck); // Updates the shuffled deck in state
  };

  // Draws a single card from the current deck
  const getThisCard = () => {
    setCard(getCard(tarotDeck)); // Randomly selects a card from the deck
  };

  return (
    <>
      <div>
        <button onClick={() => { setCard(null); shuffle(); }}>Shuffle</button>
        <button onClick={getThisCard}>Draw Card</button>
        <button onClick={() => { setTarotDeck(getDeck(selectedDeck.key)); setCard(null); }}>Reset</button>
        <label> Deck:
          <select value={selectedDeck.key} onChange={e => setSelectedDeck(options.find(o => o.key === e.target.value)) } >
            {options.map(o => ( <option key={o.key} value={o.key}>{o.label}</option> ))}
          </select>
        </label>
      </div>
      <p className="deck-description">{selectedDeck.description}</p>
      <div className="single-card">
        {
          card ? 
            (<>
              <Card card={card} imageFolder={selectedDeck.imageFolder} /> 
              <CardDescripition card={card} deck={selectedDeck}/>
            </>) 
            : 
            (<p>Cards are in order by default; Shuffle and Draw a Card.</p>)
        }
      </div>
    </>
  );
};


export default SingleCard;
