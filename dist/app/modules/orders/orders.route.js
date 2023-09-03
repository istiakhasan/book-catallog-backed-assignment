"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const orders_controller_1 = require("./orders.controller");
const validationOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        orderedBooks: zod_1.z.array(zod_1.z.object({
            bookId: zod_1.z.string(),
            quantity: zod_1.z.number().int(),
        })),
    }),
});
const router = express_1.default.Router();
router.post('/create-order', (0, validateRequest_1.default)(validationOrderZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), orders_controller_1.orderController.createOrders);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), orders_controller_1.orderController.getAllOrders);
router.get('/:orderId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), orders_controller_1.orderController.getSingleOrders);
exports.ordersRouter = router;
