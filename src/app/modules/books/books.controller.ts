import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookService } from './books.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.createBook(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Book created successfully',
    data: result,
  });
});
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, ['search', 'category', 'maxPrice', 'minPrice']);
  const result = await bookService.getAllBooks(options,filters);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Books fetched successfully',
    meta:result.meta,
    data: result.data,
  });
});
const getByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, ['search', 'category', 'maxPrice', 'minPrice']);
  const result = await bookService.getByCategoryId(options,filters,req.params.categoryId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Books with associated category data fetched successfully',
    meta:result.meta,
    data: result.data,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.getSingleBook(req.params.id as string);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Book fetched successfully',
    data: result,
  });
});
const updateSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.updateSingleBook(
    req.params.id as string,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Book updated successfully',
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.deleteBook(req.params.id as string);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Book is deleted successfully',
    data: result,
  });
});

export const booksController = {
  getAllBooks,
  getSingleBook,
  updateSingleBook,
  deleteBook,
  createBook,
  getByCategoryId
};
