import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/users';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = express.Router();

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.insertToDb,
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getAllToDb,
);

export const OrderRoutes = router;
