import { deckList } from './decks'

export const getDeckOptions = () => deckList;

// look up by key, falling back to the first one
export const getDeck = (deckKey = deckList[0].key) => {
    const deckObj = deckList.find(d => d.key === deckKey) || deckList[0]
    return Object.values(deckObj.data)
}

// Fisher-Yates Shuffle
export const spliceShuffle = (deck) => {
    let count = deck.length;
    let temp;
    while (count) {
        temp = deck.splice(Math.floor(Math.random() * count), 1);
        deck.splice(count, 0, temp[0]);
        count--;
    }
    return deck;
}
// moves the card in order to the bottom of the deck, fisher-yates variant
export const stackSuffle = (deck) => {
    let count = deck.length;
    while (count) {
        deck.push(deck.splice(Math.floor(Math.random() * count), 1)[0]);
        count--;
    }
    return deck;
}

// Riffle Shuffle
export const riffleShuffle = (deck) => {
    // split the deck in half and provide a variance in content count
    const cutDeckVariant = deck.length / 2 + Math.floor(Math.random() * 9) - 4;
    // specify the contents of left Half
    const leftHalf = deck.splice(0, cutDeckVariant);
    // Keep the right half upright for the first iteration
    deck.map(card => {
        if (card.inverted === true) card.inverted = false;
        if (card.inverted === false) card.inverted = true;
    });
    // flip leftHalf of the deck 'upside down'
    leftHalf.map(card => {
        if (card.inverted === false) card.inverted = true;
        if (card.inverted === true) card.inverted = false;
    })
    let leftCount = leftHalf.length;
    // specify the contents of the Right Half
    let rightCount = deck.length - Math.floor(Math.random() * 4);
    // Riffle the two decks together
    while (leftCount > 0) {
        const takeAmount = Math.floor(Math.random() * 4);
        deck.splice(rightCount, 0, ...leftHalf.splice(leftCount, takeAmount));
        leftCount -= takeAmount;
        rightCount = rightCount - Math.floor(Math.random() * 4) + takeAmount;
    }
    // combine any outliers
    deck.splice(rightCount, 0, ...leftHalf);
    return deck;
}

export const renderKeywords = (card) => {
    const keywords = card.keywords;
    let keywordString = '';
    for (let i = 0; i < keywords.length; i++) {
        let keyword = keywords[i];
        if (i === keywords.length - 1) keywordString += keyword;
        else keywordString += keyword + ', '
    }
    return keywordString.trim();
}

export const getCard = (deck) => {
    // nothing to draw - just bail out
    if (!deck || deck.length === 0) return null;

    // take the top card
    const [card] = deck.splice(0, 1);

    // and put it on the bottom so the deck never empties
    deck.push(card);

    return card;
};

export const getTopFive = (deck, n = 5) => {
  if (!deck || deck.length === 0) return [];
  const count = Math.min(n, deck.length);
  // remove the top `count` cards
  const topFive = deck.splice(0, count);
  // push only the first card back onto the bottom
  if (topFive.length > 0) deck.push(topFive[0]);
  return topFive;
};

export const getSpread = (deck, num) => {
    let thisSpread = [];
    for (let i = 0; i < num; i++) {
        thisSpread.push(deck[i]);
    }
    return thisSpread;
}
