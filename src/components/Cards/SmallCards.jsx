import React from 'react';
import "./SmallCards.css"


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


export function SmallCard({ card, imageFolder, onClick }) {
    return (<>
        <div className='small-card-container'>
            <img className="small-card-face" onClick={onClick} src={`./images/${imageFolder}/${card.img}`} alt={card.name} />
            <p className="small-card-label"><strong>{card.name}</strong><br /><small>{renderKeywords(card)}</small></p>
        </div>
    </>);
}


export function SmallDetail({ card, selectedDeck, onClose }) {
    if (!card) return null;

    if (selectedDeck.key === 'storytarotspread') {
        return (
            <>
                <div className="small-card-overlay" onClick={onClose}>
                    <div className="small-card-overlay-content" onClick={e => e.stopPropagation()}>
                        <h2>{card.number}: {card.name}</h2>
                        <p><strong>Keywords:</strong> {renderKeywords(card)}</p>
                        <p><strong>{card.story}</strong><br />{card.story_description}</p>
                        <button onClick={onClose}>Close</button>
                    </div>
                </div>
            </>
        );
    }
    if (selectedDeck.key === 'detailtarotspread') {
        return (<>
            <div className="small-card-overlay" onClick={onClose}>
                <div className="small-card-overlay-content" onClick={e => e.stopPropagation()}>
                    <h2>{card.number}: {card.name}</h2>
                    <p><strong>Keywords:</strong> {renderKeywords(card)}</p>
                    <p><strong>{card.suite_detail}: </strong>{card.detail}</p>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </>);
    }

    return null;
}  