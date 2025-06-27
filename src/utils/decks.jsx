// import each JSON only once
import DefaultTarot from '../data/default-tarot.json'
import StoryTarot from '../data/story-tarot.json'
import DetailTarot from '../data/detail-tarot.json'
import PlayingCards from '../data/playing-cards.json'

export const deckList = [
  {
    key: 'default',
    label: 'Classic Tarot',
    data: DefaultTarot.cards,
    imageFolder: 'tarot-cards',
    description: DefaultTarot.description,
    spread_type: 'single',
    back_face: 'tarot-card-back.JPG',
  },
  {
    key: 'storytarot',
    label: 'Story Cards',
    data: StoryTarot.cards,
    imageFolder: 'tarot-cards',
    description: StoryTarot.description,
    spread_type: 'single',
    back_face: 'tarot-card-back.JPG',
  },
    {
    key: 'storytarotspread',
    label: 'Story Card Spread',
    data: StoryTarot.cards,
    imageFolder: 'tarot-cards',
    description: StoryTarot.description,
    spread_type: 'all',
    back_face: 'tarot-card-back.JPG',
  },
  {
    key: 'detailtarotspread',
    label: 'Detail Spread',
    data: DetailTarot.cards,
    imageFolder: 'tarot-cards',
    description: DetailTarot.description,
    spread_type: 'all',
    back_face: 'tarot-card-back.JPG',
  },
  {
    key: 'detailtarotdeck',
    label: 'Detail Card',
    data: DetailTarot.cards,
    imageFolder: 'tarot-cards',
    description: DetailTarot.description,
    spread_type: 'single',
    back_face: 'tarot-card-back.JPG',
  },
  {
    key: 'playingcards',
    label: 'Playing Card',
    data: PlayingCards.cards,
    imageFolder: 'playing-cards',
    description: PlayingCards.description,
    spread_type: 'single',
    back_face: 'Card_back_01.svg',
  },
]
