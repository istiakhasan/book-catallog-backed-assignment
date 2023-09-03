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
exports.profileService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma = new client_1.PrismaClient();
const getProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (user) {
        const isExist = yield prisma.user.findUnique({
            where: {
                id: user.userId
            }
        });
        if (!isExist) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
        }
        result = yield prisma.user.findUnique({
            where: {
                id: user.userId,
            },
        });
    }
    return result;
});
exports.profileService = {
    getProfile,
};
