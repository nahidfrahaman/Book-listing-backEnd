import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/users';
import auth from '../../middlewares/auth';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/signup', AuthController.insertToDb);
router.post('/signin', AuthController.login);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  AuthController.getProfile,
);

export const AuthRoutes = router;
