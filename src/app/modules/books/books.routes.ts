import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { booksController } from './books.controller';
import { bookZodValidation } from './books.validation';

const router = express.Router();

router.post('/create-book',validateRequest(bookZodValidation),auth(ENUM_USER_ROLE.ADMIN), booksController.createBook);
router.get('/', booksController.getAllBooks);
router.get('/:categoryId/category', booksController.getByCategoryId);
router.get('/:id', booksController.getSingleBook);
router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN), booksController.updateSingleBook);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), booksController.deleteBook);

export const booksRouter = router;
