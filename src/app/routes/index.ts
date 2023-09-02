import express from 'express';
import { AuthRouter } from '../modules/auth/auth.routes';
import { booksRouter } from '../modules/books/books.routes';
import { categoryRouter } from '../modules/category/category.routes';
import { ordersRouter } from '../modules/orders/orders.route';
import { profileRouter } from '../modules/profile/profile.routes';
import { userRouter } from '../modules/users/users.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: AuthRouter,
  },
  {
    path: '/users',
    routes: userRouter,
  },
  {
    path: '/categories',
    routes: categoryRouter,
  },
  {
    path: '/books',
    routes: booksRouter,
  },
  {
    path: '/orders',
    routes: ordersRouter,
  },
  {
    path: '/profile',
    routes: profileRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
