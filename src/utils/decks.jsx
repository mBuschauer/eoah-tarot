// import each JSON only once
import DefaultTarot from '../data/default-tarot.json'
import StoryTarot from '../data/story-tarot.json'
import DetailTarot from '../data/detail-tarot.json'

export const deckList = [
  { 
    key: 'default', 
    label: 'Classic Tarot', 
    data: DefaultTarot.cards, 
    imageFolder: 'tarot-cards', 
    description: DefaultTarot.description,
    spread_type: 'single',
  },
  { 
    key: 'storytarot', 
    label: 'Story Cards', 
    data: StoryTarot.cards, 
    imageFolder: 'tarot-cards', 
    description: StoryTarot.description, 
    spread_type: 'single',
  },
  { 
    key: 'detailtarot', 
    label: 'Detail Cards', 
    data: DetailTarot.cards, 
    imageFolder: 'tarot-cards', 
    description: DetailTarot.description, 
    spread_type: 'all',
  },
]
