import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/create-category', CategoryController.insertToDb);

export const CategoryRoutes = router;
