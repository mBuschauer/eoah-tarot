import React, { useState, useEffect } from 'react';
import { getDeck, getCard, spliceShuffle, stackSuffle, riffleShuffle, renderKeywords } from '../utils/scripts.jsx';
import { Button, Box, Typography } from '@mui/material';

const SingleCard = () => {
  const [tarotDeck, setTarotDeck] = useState(null);
  const [card, setCard] = useState(null);

  useEffect(() => {
    if (!tarotDeck) {
      setTarotDeck(getDeck());
    }
  }, [tarotDeck]);

  const shuffle = () => {
    let deck = riffleShuffle(tarotDeck);
    deck = spliceShuffle(deck);
    deck = stackSuffle(deck);
    setTarotDeck(deck);
  };

  const getThisCard = () => {
    setCard(getCard(tarotDeck));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <Button variant="contained" onClick={() => { setCard(null); shuffle(); }}>
          Shuffle
        </Button>
        <Button variant="contained" onClick={getThisCard}>
          Draw Card
        </Button>
        <Button variant="contained" onClick={() => { setTarotDeck(getDeck()); setCard(null); }}>
          Reset
        </Button>
      </Box>

      {card ? (
        <Box className="single_card" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <img className="card-image" src={`images/cards/${card.img}`} alt={card.name} style={{ maxWidth: '300px' }} />
          <Box className="card-details" sx={{ maxWidth: '600px' }}>
            <Typography variant="h5" sx={{ mb: 1 }}>{card.number}: {card.name}</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>Keywords: {renderKeywords(card)}</Typography>

            <Box className="meaning" sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Light:</Typography>
              <ul>{card.meanings.light.map(item => <li key={item}>{item}</li>)}</ul>
            </Box>

            <Box className="meaning" sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Shadow:</Typography>
              <ul>{card.meanings.shadow.map(item => <li key={item}>{item}</li>)}</ul>
            </Box>

            <Box className="meaning">
              <Typography variant="subtitle1">Questions to Ask Yourself:</Typography>
              <ul>{card.QuestionsToAsk.map(item => <li key={item}>{item}</li>)}</ul>
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Cards are in order by default; Shuffle and Draw a Card.
        </Typography>
      )}
    </Box>
  );
};

export default SingleCard;
