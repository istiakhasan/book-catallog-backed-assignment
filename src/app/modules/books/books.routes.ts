import express from 'express';
import { booksController } from './books.controller';

const router = express.Router();

router.post('/create-book', booksController.createBook);
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getSingleCategory);
router.patch('/:id', booksController.updateCategory);
router.delete('/:id', booksController.deleteCategory);

export const booksRouter = router;
