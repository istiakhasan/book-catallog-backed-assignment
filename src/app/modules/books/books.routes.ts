import express from 'express';
import { booksController } from './books.controller';

const router = express.Router();

router.post('/create-book', booksController.createBook);
router.get('/', booksController.getAllBooks);
router.get('/:categoryId/category', booksController.getByCategoryId);
router.get('/:id', booksController.getSingleBook);
router.patch('/:id', booksController.updateSingleBook);
// nicher gulo complete hoi ni 
router.delete('/:id', booksController.deleteBook);

export const booksRouter = router;
