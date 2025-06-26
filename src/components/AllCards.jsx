import React, { useState, useEffect } from 'react';
import './AllCards.css'
import { SmallCard, SmallDetail } from './Cards/SmallCards';

export function AllCards({ selectedDeck }) {
    const [selected, setSelected] = useState(null);

    return (
        <div>
            <div className="small-card-grid">
                {selectedDeck.data.map((item, index) => (
                    <SmallCard
                        key={index}
                        card={item}
                        imageFolder={selectedDeck.imageFolder}
                        onClick={() => setSelected(item)}
                    />
                ))}
            </div>

            <SmallDetail card={selected} onClose={() => setSelected(null)} />
        </div>
    );
}