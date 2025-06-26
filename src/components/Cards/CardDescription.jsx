import React, { useEffect }  from 'react';
import './CardDescription.css';
import { motion, AnimatePresence } from 'framer-motion';

const renderKeywords = (card) => {
  const keywords = card.keywords;
  let keywordString = '';
  for (let i = 0; i < keywords.length; i++) {
    let keyword = keywords[i];
    if (i === keywords.length - 1) keywordString += keyword;
    else keywordString += keyword + ', '
  }
  return keywordString.trim();
}


const TarotDescripition = ({ card }) => {
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
}

const StoryDescripition = ({ card }) => {
  return (
    <div className="card-details">
      <h2>{card.number}: {card.name}</h2>
      <p><strong>Keywords:</strong> {renderKeywords(card)}</p>
      <h3>Story:</h3>
      <p><strong>{card.story}:</strong> {card.story_description}</p>
    </div>
  );
}

const DetailDescripition = ({ card }) => {
  return (
    <div className="card-details">
      <h2>{card.number}: {card.name}</h2>
      <p><strong>Keywords:</strong> {renderKeywords(card)}</p>
      <p><strong>{card.suite_detail}: </strong>{card.detail}</p>
    </div>
  );
}

const CardDescripition = ({ card, deck }) => {

  var content = <TarotDescripition card={card} />
  if (deck.key === 'storytarot') {
    content = <StoryDescripition card={card} />
  } else if (deck.key === 'detailtarotdeck') {
    content = <DetailDescripition card={card} />
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${deck.key}-${card.name}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );

};

export default CardDescripition;