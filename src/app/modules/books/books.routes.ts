import express from 'express';
import { booksController } from './books.controller';

const router = express.Router();

router.post('/create-book', booksController.createBook);
router.get('/', booksController.getAllBooks);
router.get('/:categoryId/category', booksController.getByCategoryId);
router.get('/:id', booksController.getSingleBook);
// nicher gulo complete hoi ni 
router.patch('/:id', booksController.updateCategory);
router.delete('/:id', booksController.deleteCategory);

export const booksRouter = router;
