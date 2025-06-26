// import each JSON only once
import DefaultTarot from '../data/default-tarot.json'
import MarcoOptions from '../data/marco-tarot.json'

export const deckList = [
  { 
    key: 'default', 
    label: 'Classic Tarot', 
    data: DefaultTarot.cards, 
    imageFolder: 'tarot-cards', 
    description: DefaultTarot.description, 
  },
  { 
    key: 'storytarot', 
    label: 'Story Cards', 
    data: MarcoOptions.cards, 
    imageFolder: 'tarot-cards', 
    description: MarcoOptions.description, 
  },
]
