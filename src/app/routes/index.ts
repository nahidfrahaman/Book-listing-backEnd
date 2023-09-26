/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '',
    routes: '',
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes as any));
export default router;
