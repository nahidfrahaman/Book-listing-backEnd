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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../Error/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertToDb = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderedBooks } = payload;
    console.log(orderedBooks.length);
    if (user.role !== 'customer') {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'only customer can create order');
    }
    const newCreatedOrder = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createdorder = yield prisma_1.default.order.create({
            data: {
                userId: user.id,
            },
        });
        for (let i = 0; i < orderedBooks.length; i++) {
            const createdData = yield tx.orderdBook.create({
                data: {
                    orderId: createdorder.id,
                    bookId: orderedBooks[i].bookId,
                    quantity: orderedBooks[i].quantity,
                },
            });
            console.log('orderdbook', createdData);
        }
        return createdorder;
    }));
    if (newCreatedOrder) {
        const responseData = yield prisma_1.default.order.findUnique({
            where: {
                id: newCreatedOrder.id,
            },
            include: {
                orderd_books: true,
            },
        });
        return responseData;
    }
    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create course');
});
const getAllToDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = user;
    console.log(role, id);
    if (role === 'admin') {
        const results = yield prisma_1.default.order.findMany({
            include: {
                orderd_books: true,
            },
        });
        return results;
    }
    if (role === 'customer') {
        const results = yield prisma_1.default.order.findMany({
            where: {
                userId: id,
            },
            include: {
                orderd_books: true,
            },
        });
        return results;
    }
    throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'no order available');
});
const getSpecificData = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userid, role } = user;
    if (role === 'customer') {
        const results = yield prisma_1.default.order.findUnique({
            where: {
                id: id,
                userId: userid,
            },
            include: {
                orderd_books: true,
            },
        });
        return results;
    }
    console.log('Order0id:', id, role);
    const results = yield prisma_1.default.order.findUnique({
        where: {
            id: id,
        },
        include: {
            orderd_books: true,
        },
    });
    return results;
});
exports.OrderService = {
    insertToDb,
    getAllToDb,
    getSpecificData,
};
