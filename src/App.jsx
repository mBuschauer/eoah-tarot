import React, { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
import { AllCards } from './components/AllCards';
import { NavBar } from './components/NavBar';
import { getDeckOptions } from './utils/scripts';


function App() {
  const options = getDeckOptions();
  const [selectedDeck, setSelectedDeck] = useState(options[0]);

  const renderSpread = () => {
    if (selectedDeck.spread_type === 'single') {
      return <SingleCard selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck} />;
    } else if (selectedDeck.spread_type === 'all') {
      return <AllCards selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck} />;
    } else {
      return <SingleCard selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck} />;
    }
  };

  return (
    <>
      <NavBar options={options} selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck} />
      {renderSpread()}
    </>
  );
}


export default App;