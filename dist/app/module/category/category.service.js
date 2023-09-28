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
exports.CategoryService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertToDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield prisma_1.default.category.create({
        data,
    });
    return results;
});
const getAllToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield prisma_1.default.category.findMany({});
    return results;
});
const getOneToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield prisma_1.default.category.findUnique({
        where: {
            id,
        },
    });
    return results;
});
const updateToDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield prisma_1.default.category.update({
        where: {
            id,
        },
        data: payload,
    });
    return results;
});
const deleteToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield prisma_1.default.category.delete({
        where: {
            id,
        },
    });
    return results;
});
exports.CategoryService = {
    insertToDb,
    getAllToDb,
    getOneToDb,
    updateToDb,
    deleteToDb,
};
