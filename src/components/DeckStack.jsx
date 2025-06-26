import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getTopFive } from '../utils/scripts.jsx';
import { Card } from './Card.jsx';

const DeckStack = ({ cards, imageFolder, size = 5 }) => {
  const topFive = cards;

  return (
    <div className="deck-stack-container" style={{ position: 'relative', width: '300px', height: '512px' }}>
      <AnimatePresence initial={false} mode="popLayout">
        {topFive.map((card, index) => (
          <motion.div
            key={card.name}
            layout          /* keeps the card’s position when the list re-orders  */
            layoutId={card.name} /* needed only if you also want springy layout anims */
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, zIndex: 9999 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            style={{
              position: 'absolute',
              top:  index * 2,   // slight vertical stagger
              left: index * 2,   // slight horizontal stagger
              zIndex: topFive.length - index, // keeps the physical stack order
            }}
          >
            <Card card={card} imageFolder={imageFolder} top={index === 0}/>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default DeckStack;