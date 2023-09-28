"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const order_routes_1 = require("../module/Order/order.routes");
const auth_routes_1 = require("../module/auth/auth.routes");
const book_routes_1 = require("../module/book/book.routes");
const category_routes_1 = require("../module/category/category.routes");
const user_route_1 = require("../module/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/categories',
        routes: category_routes_1.CategoryRoutes,
    },
    {
        path: '/books',
        routes: book_routes_1.BooKRoutes,
    },
    {
        path: '/auth',
        routes: auth_routes_1.AuthRoutes,
    },
    {
        path: '/users',
        routes: user_route_1.UserRoutes,
    },
    {
        path: '/orders',
        routes: order_routes_1.OrderRoutes,
    },
    {
        path: '/profile',
        routes: auth_routes_1.AuthRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
