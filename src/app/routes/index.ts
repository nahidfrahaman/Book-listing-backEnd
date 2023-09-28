/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { OrderRoutes } from '../module/Order/order.routes';
import { AuthRoutes } from '../module/auth/auth.routes';
import { BooKRoutes } from '../module/book/book.routes';
import { CategoryRoutes } from '../module/category/category.routes';
import { UserRoutes } from '../module/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/categories',
    routes: CategoryRoutes,
  },
  {
    path: '/books',
    routes: BooKRoutes,
  },
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/orders',
    routes: OrderRoutes,
  },
  {
    path: '/profile',
    routes: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes as any));
export default router;
