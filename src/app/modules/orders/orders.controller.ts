import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ordersService } from './orders.service';

const createOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await ordersService.createOrders(req.body, req.user);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order created successfully',
    data: result,
  });
});
const getAllOrders = catchAsync(async (req: Request, res: Response) => {

  const result = await ordersService.getAllOrders(req.user);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Orders retrieved successfully',
    data: result,
  });
});
// const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
//   const result = await categoryService.getSingleCategory(
//     req.params.id as string
//   );
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'Category fetched successfully',
//     data: result,
//   });
// });
// const updateCategory = catchAsync(async (req: Request, res: Response) => {
//   const result = await categoryService.updateCategory(
//     req.params.id as string,
//     req.body
//   );
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'Category updated successfully',
//     data: result,
//   });
// });
// const deleteCategory = catchAsync(async (req: Request, res: Response) => {
//   const result = await categoryService.deleteCategory(req.params.id as string);
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'Category deleted successfully',
//     data: result,
//   });
// });

export const orderController = {
  //   getAllCategories,
  //   getSingleCategory,
  //   updateCategory,
  //   deleteCategory,
  createOrders,
  getAllOrders
};
