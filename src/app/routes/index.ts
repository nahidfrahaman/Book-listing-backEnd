/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { CategoryRoutes } from '../module/category/category.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/categories',
    routes: CategoryRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes as any));
export default router;
