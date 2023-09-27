import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.patch('/:id', UserController.updateToDb);
router.get('/:id', UserController.getOneToDb);
router.delete('/:id', UserController.deleteToDb);
router.get('/', UserController.getAllToDb);

export const UserRoutes = router;
