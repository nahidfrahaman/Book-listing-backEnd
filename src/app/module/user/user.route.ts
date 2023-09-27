import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/users';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.updateToDb);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getOneToDb);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteToDb);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllToDb);

export const UserRoutes = router;
