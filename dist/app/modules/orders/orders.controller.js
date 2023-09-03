"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const orders_service_1 = require("./orders.service");
const createOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.ordersService.createOrders(req.body, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Order created successfully',
        data: result,
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.ordersService.getAllOrders(req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Orders retrieved successfully',
        data: result,
    });
}));
const getSingleOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.ordersService.getSingleOrders(req.params.orderId, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Order fetched successfully',
        data: result,
    });
}));
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
exports.orderController = {
    //   getAllCategories,
    //   getSingleCategory,
    //   updateCategory,
    //   deleteCategory,
    createOrders,
    getAllOrders,
    getSingleOrders,
};
