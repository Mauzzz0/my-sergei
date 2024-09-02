export const generateRandomValue = (min: number, max: number): number => {
  return Math.round(Number(Math.random() * (max - min)) + min);
};

export const getRandomItem = <T>(items: T[]): T => {
  const index = generateRandomValue(0, items.length - 1);
  return items[index];
};

export function getRandomItems<T>(items: T[], maxLen: number): T[] {
  const words: T[] = [];
  for (let i = 0; i < maxLen; i++) {
    words.push(getRandomItem(items));
  }

  return words;
}
