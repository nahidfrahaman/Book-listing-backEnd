"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooKRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../../enums/users");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.delete('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.deleteToDb);
router.post('/create-book', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.insertToDb);
router.get('/:id/category', book_controller_1.BookController.getBookByCategory);
router.patch('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.updateToDb);
router.get('/:id', book_controller_1.BookController.getOneToDb);
router.get('/', book_controller_1.BookController.getAllToDb);
exports.BooKRoutes = router;
