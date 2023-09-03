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
exports.ordersService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma = new client_1.PrismaClient();
const createOrders = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (user) {
        result = yield prisma.order.create({
            data: Object.assign(Object.assign({}, data), { userId: user.userId }),
        });
    }
    return result;
});
const getAllOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user, 'user');
    let result;
    if (user && user.role === user_1.ENUM_USER_ROLE.ADMIN) {
        result = yield prisma.order.findMany();
    }
    if (user && user.role === user_1.ENUM_USER_ROLE.CUSTOMER) {
        result = yield prisma.order.findMany({
            where: {
                userId: user.userId,
            },
        });
    }
    return result;
});
const getSingleOrders = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    const isExist = yield prisma.order.findUnique({
        where: {
            id
        }
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Data does not exist");
    }
    if (user && user.role === user_1.ENUM_USER_ROLE.ADMIN) {
        result = prisma.order.findUnique({
            where: {
                id: id,
            },
        });
    }
    if (user && user.role === user_1.ENUM_USER_ROLE.CUSTOMER) {
        result = prisma.order.findUnique({
            where: {
                id: id,
                userId: user.userId,
            },
        });
    }
    return result;
});
exports.ordersService = {
    getSingleOrders,
    createOrders,
    getAllOrders,
};
