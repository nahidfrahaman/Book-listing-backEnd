import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.delete('/:id', BookController.deleteToDb);
router.post('/create-book', BookController.insertToDb);
router.get('/:id/category', BookController.getBookByCategory);
router.patch('/:id', BookController.updateToDb);
router.get('/:id', BookController.getOneToDb);
router.get('/', BookController.getAllToDb);

export const BooKRoutes = router;
