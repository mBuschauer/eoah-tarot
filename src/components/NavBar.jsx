import React, { useState, useEffect } from 'react';

export function NavBar({ options, selectedDeck, setSelectedDeck }) {
  return (
    <nav className='nav-bar' style={{paddingBottom: '12px'}}>
      <div className="deck-selector">
        <label> Deck:&nbsp;
          <select value={selectedDeck.key} onChange={e => setSelectedDeck(options.find(o => o.key === e.target.value))}>
            {options.map(o => (<option key={o.key} value={o.key}> {o.label}</option>))}
          </select>
        </label>
      </div>
    </nav>

  );
}