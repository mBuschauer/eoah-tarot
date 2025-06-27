import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Handle __dirname manually in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// File path
const inputPath = join(__dirname, 'detail-tarot.json');
const outputPath = join(__dirname, 'detail-tarot-1.json');

// Fields to remove
const fieldsToRemove = ['inverted', 'fortune_telling', 'meanings', 'Numerology', 'Astrology', 'Affirmation', 'QuestionsToAsk'];

const run = async () => {
  try {
    const data = JSON.parse(await readFile(inputPath, 'utf8'));

    data.cards = data.cards.map(card => {
      fieldsToRemove.forEach(field => delete card[field]);
      card.suite_detail = ""
      card.detail = "";
      return card;
    });

    await writeFile(outputPath, JSON.stringify(data, null, 2));
    console.log('File updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
};

run();
