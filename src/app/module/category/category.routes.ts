import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/create-category', CategoryController.insertToDb);
router.patch('/:id', CategoryController.updateToDb);
router.get('/:id', CategoryController.getOneToDb);
router.delete('/:id', CategoryController.deleteToDb);
router.get('/', CategoryController.getAllToDb);

export const CategoryRoutes = router;
