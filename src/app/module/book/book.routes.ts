import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/users';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';

const router = express.Router();

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteToDb);
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.insertToDb,
);
router.get('/:id/category', BookController.getBookByCategory);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.updateToDb);
router.get('/:id', BookController.getOneToDb);
router.get('/', BookController.getAllToDb);

export const BooKRoutes = router;
