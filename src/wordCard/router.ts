import { Router } from 'express';
import { StatusCodes } from '../common/status-codes';
import {
  getWordCards,
  getWord,
  createWordCard,
  updateWordCard,
  deleteWordCard,
} from './repository';
import { WordCard } from './wordCard';
import { getCategoryById } from '../category/repository';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const data = await getWordCards();
    return res.json(data);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

router.get('/:word', async (req, res) => {
  try {
    const data = await getWord(req.params.word);
    if (!data) return res.sendStatus(StatusCodes.NotFound);
    return res.json(data);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

router.delete('/:word', async (req, res) => {
  try {
    await deleteWordCard(req.params.word);
    return res.sendStatus(StatusCodes.Ok);
  } catch (e) {
    return res.status(StatusCodes.NotFound).send(e);
  }
});

router.post('/', async (req, res) => {
  const data = req.body as WordCard;
  const category = await getCategoryById(data.categoryId!);
  if (!category) {
    return res.status(StatusCodes.BadRequest).send('Invalid category ID');
  }
  try {
    const newData = await createWordCard(data);
    return res.json(newData);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

router.put('/', async (req, res) => {
  const data = req.body as WordCard;
  const category = await getCategoryById(data.categoryId!);
  if (!category) {
    return res.status(StatusCodes.BadRequest).send('Invalid category ID');
  }
  try {
    const newData = await updateWordCard(data);
    return res.json(newData);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

export default router;
