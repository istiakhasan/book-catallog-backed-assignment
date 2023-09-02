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
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.getSingleCategory(req.params.id as string);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Category fetched successfully',
    data: result,
  });
});
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.updateCategory(
    req.params.id as string,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Category updated successfully',
    data: result,
  });
});
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.deleteCategory(req.params.id as string);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Category deleted successfully',
    data: result,
  });
});

export const booksController = {
  getAllBooks,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  createBook,
};
