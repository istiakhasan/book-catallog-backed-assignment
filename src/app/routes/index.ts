import express from 'express';
import { AuthRouter } from '../modules/auth/auth.routes';
import { userRouter } from '../modules/users/users.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    routes: AuthRouter
  },{
    path:"/users",
    routes:userRouter
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
