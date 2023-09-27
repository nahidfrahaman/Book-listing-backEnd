import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/signup', AuthController.insertToDb);
// router.patch('/:id', UserController.updateToDb);
// router.get('/:id', UserController.getOneToDb);
// router.delete('/:id', UserController.deleteToDb);
// router.get('/', UserController.getAllToDb);

export const AuthRoutes = router;
