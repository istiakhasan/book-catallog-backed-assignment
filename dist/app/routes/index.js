"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const books_routes_1 = require("../modules/books/books.routes");
const category_routes_1 = require("../modules/category/category.routes");
const orders_route_1 = require("../modules/orders/orders.route");
const profile_routes_1 = require("../modules/profile/profile.routes");
const users_routes_1 = require("../modules/users/users.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        routes: auth_routes_1.AuthRouter,
    },
    {
        path: '/users',
        routes: users_routes_1.userRouter,
    },
    {
        path: '/categories',
        routes: category_routes_1.categoryRouter,
    },
    {
        path: '/books',
        routes: books_routes_1.booksRouter,
    },
    {
        path: '/orders',
        routes: orders_route_1.ordersRouter,
    },
    {
        path: '/profile',
        routes: profile_routes_1.profileRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
