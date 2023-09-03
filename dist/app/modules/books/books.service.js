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
exports.bookService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma = new client_1.PrismaClient();
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllBooks = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    // pagination
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    //   search and filter
    const { search, category, minPrice, maxPrice } = filters;
    const andConditions = [];
    if (minPrice) {
        const regx = /^(0|[1-9]\d*)$/;
        const isNumberValid = regx.test(minPrice.toString());
        if (!isNumberValid) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Min price must be a valid number');
        }
        andConditions.push({
            price: {
                gte: Number(minPrice),
            },
        });
    }
    if (maxPrice) {
        const regx = /^(0|[1-9]\d*)$/;
        const isNumberValid = regx.test(maxPrice.toString());
        if (!isNumberValid) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Max price must be a valid number');
        }
        andConditions.push({
            price: {
                lte: Number(maxPrice),
            },
        });
    }
    if (category) {
        console.log(category);
        andConditions.push({
            AND: {
                categoryId: {
                    equals: category,
                },
            },
        });
    }
    if (search) {
        andConditions.push({
            OR: ['title', 'author', 'genre'].map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma.book.findMany({
        where: whereConditions,
        include: {
            category: true,
        },
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                publicationDate: 'desc',
            },
    });
    const total = yield prisma.book.count();
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
});
const getByCategoryId = (options, filters, id) => __awaiter(void 0, void 0, void 0, function* () {
    // pagination
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    //   search and filter
    const { search, category, minPrice, maxPrice } = filters;
    const andConditions = [];
    andConditions.push({
        categoryId: {
            equals: id,
        },
    });
    if (minPrice) {
        const regx = /^(0|[1-9]\d*)$/;
        const isNumberValid = regx.test(minPrice.toString());
        if (!isNumberValid) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Min price must be a valid number');
        }
        andConditions.push({
            price: {
                gte: Number(minPrice),
            },
        });
    }
    if (maxPrice) {
        const regx = /^(0|[1-9]\d*)$/;
        const isNumberValid = regx.test(maxPrice.toString());
        if (!isNumberValid) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Max price must be a valid number');
        }
        andConditions.push({
            price: {
                lte: Number(maxPrice),
            },
        });
    }
    if (category) {
        andConditions.push({
            AND: {
                categoryId: {
                    equals: category,
                },
            },
        });
    }
    if (search) {
        andConditions.push({
            OR: ['title', 'author', 'genre'].map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma.book.findMany({
        where: whereConditions,
        include: {
            category: true,
        },
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                publicationDate: 'desc',
            },
    });
    const total = yield prisma.book.count({
        where: {
            categoryId: id,
        },
    });
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book is not exist!');
    }
    return result;
});
const updateSingleBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.book.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book Not exist ');
    }
    const result = yield prisma.book.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.book.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book is  not exist');
    }
    const result = yield prisma.book.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.bookService = {
    getSingleBook,
    updateSingleBook,
    deleteBook,
    createBook,
    getAllBooks,
    getByCategoryId,
};
