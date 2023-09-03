import express from 'express';
import { z } from 'zod';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { orderController } from './orders.controller';

const validationOrderZodSchema = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string(),
        quantity: z.number().int(),
      })
    ),
  }),
});
const router = express.Router();

router.post(
  '/create-order',
  validateRequest(validationOrderZodSchema),
  auth(ENUM_USER_ROLE.CUSTOMER),
  orderController.createOrders
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  orderController.getAllOrders
);
router.get(
  '/:orderId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  orderController.getSingleOrders
);

export const ordersRouter = router;
