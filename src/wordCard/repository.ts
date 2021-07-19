import { WordCard } from './wordCard';
import { allCard, CategoryInfo } from '../public/cards';
import { idCounter } from '../wordIdIncreaser';

const all: CategoryInfo[] = allCard;

const getWordCategory = (word: string) => all.find((cat) => cat.words.find((w) => w.word.toLowerCase() === word.toLowerCase()));
const getIDCategory = (id: number) => all.find((cat) => cat.categoryId === id);
const getWordIndex = (word: string) => all.findIndex((cat) => cat.words.findIndex((w) => w.word.toLowerCase() === word.toLowerCase()));
const getWordByWordId = (id: number) => all.findIndex((cat) => cat.words.findIndex((w) => w.id === id));
const getCategoryByWordId = (id: number) => all.find((cat) => cat.words.find((w) => w.id === id));
const getWordIndexById = (id: number) => allCard.filter((cat) => cat.words.some((w) => w.id === id))[0].words.findIndex((w) => w.id === id);

export function getWordCards(): Promise<WordCard[]> {
  const allWords:WordCard[] = [];
  all.forEach((cat) => allWords.push(...cat.words));
  return Promise.resolve<WordCard[]>(allWords);
}

export function getWord(word: string): Promise<WordCard | undefined> {
  const categorie = getWordCategory(word);
  return Promise.resolve(categorie?.words.find((w) => w.word.toLowerCase() === word.toLowerCase()));
}

export function createWordCard(item: WordCard): Promise<WordCard> {
  const isExist = typeof getWordCategory(item.word) !== 'undefined';
  if (isExist) {
    return Promise.reject(new Error(`Item with name ${item.word} is already exists.`));
  }
  const id = idCounter();
  const model = { ...item, id };
  getIDCategory(item.categoryId!)?.words.push(model);
  return Promise.resolve(model);
}

export function updateWordCard(item: WordCard): Promise<WordCard> {
  const itemIndex = getWordIndexById(item.id);
  if (itemIndex < 0) {
    return Promise.reject(new Error('Item not found'));
  }
  const existsItem = getCategoryByWordId(item.id)!.words.splice(itemIndex, 1)[0];
  const newItem: WordCard = {
    ...existsItem,
    ...item,
  };
  getIDCategory(newItem.categoryId!)?.words.push(newItem);
  return Promise.resolve(newItem);
}

export function deleteWordCard(word: string): Promise<void> {
  const index = getWordIndex(word);
  if (index < 0) {
    Promise.reject(new Error('Item not found.'));
  }
  getWordCategory(word)!.words.splice(index - 1, 1);
  return Promise.resolve();
}
