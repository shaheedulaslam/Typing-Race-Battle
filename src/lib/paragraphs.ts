export const paragraphs = [
  {
    id: 'p1',
    difficulty: 'easy',
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts. The only way to do great work is to love what you do. Believe you can and you're halfway there."
  },
  {
    id: 'p2',
    difficulty: 'medium',
    text: "The universe is a vast expanse of mystery and wonder, filled with galaxies that stretch across time. Every star tells a story of creation and destruction, a cosmic dance that has been ongoing for billions of years."
  },
  {
    id: 'p3',
    difficulty: 'hard',
    text: "Ineffable complexities within the quantum realm challenge our fundamental understanding of reality. Superposition and entanglement suggest a universe far more interconnected and bizarre than classical physics could ever describe."
  }
];

export const getRandomParagraph = (difficulty?: 'easy' | 'medium' | 'hard') => {
  const filtered = difficulty ? paragraphs.filter(p => p.difficulty === difficulty) : paragraphs;
  return filtered[Math.floor(Math.random() * filtered.length)].text;
};
