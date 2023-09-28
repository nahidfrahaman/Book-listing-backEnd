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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../../helper/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertToDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield prisma_1.default.book.create({
        data,
    });
    const bookData = yield prisma_1.default.book.findUnique({
        where: {
            id: results.id,
        },
        include: {
            category: true,
        },
    });
    return bookData;
});
const getAllToDb = (paginationOption, filterOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = filterOption, filterData = __rest(filterOption, ["search"]);
    const { page, size, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOption);
    const andConditions = [];
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
    console.log(filterData);
    const { maxPrice, minPrice, category } = filterData;
    const total = yield yield prisma_1.default.book.count();
    if (maxPrice) {
        const results = yield prisma_1.default.book.findMany({
            where: {
                price: {
                    lte: Number(maxPrice), // Less than or equal to maxPrice
                },
            },
            skip: skip,
            take: size,
            orderBy: sortBy && sortOrder
                ? { [sortBy]: sortOrder }
                : {
                    createdAt: 'desc',
                },
            include: { category: true },
        });
        return {
            meta: {
                total,
                page,
                size,
            },
            data: results,
        };
    }
    if (minPrice) {
        const results = yield prisma_1.default.book.findMany({
            where: {
                price: {
                    gte: Number(minPrice), // Less than or equal to maxPrice
                },
            },
            skip: skip,
            take: size,
            orderBy: sortBy && sortOrder
                ? { [sortBy]: sortOrder }
                : {
                    createdAt: 'desc',
                },
            include: { category: true },
        });
        return {
            meta: {
                total,
                page,
                size,
            },
            data: results,
        };
    }
    if (category) {
        const results = yield prisma_1.default.book.findMany({
            where: {
                categoryId: category,
            },
            skip: skip,
            take: size,
            orderBy: sortBy && sortOrder
                ? { [sortBy]: sortOrder }
                : {
                    createdAt: 'desc',
                },
            include: { category: true },
        });
        return {
            meta: {
                total,
                page,
                size,
            },
            data: results,
        };
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    // console.log(whereConditions);
    const results = yield prisma_1.default.book.findMany({
        where: whereConditions,
        skip: skip,
        take: size,
        orderBy: sortBy && sortOrder
            ? { [sortBy]: sortOrder }
            : {
                createdAt: 'desc',
            },
        include: { category: true },
    });
    return {
        meta: {
            total,
            page,
            size,
        },
        data: results,
    };
});
const getBookByCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield prisma_1.default.book.findMany({
        where: {
            categoryId: id,
        },
        include: {
            category: true,
        },
    });
    return results;
});
const getOneToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    return results;
});
const updateToDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
        include: {
            category: true,
        },
    });
    return results;
});
const deleteToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return results;
});
exports.BookService = {
    insertToDb,
    getAllToDb,
    getBookByCategory,
    getOneToDb,
    updateToDb,
    deleteToDb,
};
