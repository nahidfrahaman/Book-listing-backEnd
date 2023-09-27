import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/users';
import auth from '../../middlewares/auth';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.insertToDb,
);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), CategoryController.updateToDb);
router.get('/:id', CategoryController.getOneToDb);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteToDb,
);
router.get('/', CategoryController.getAllToDb);

export const CategoryRoutes = router;
