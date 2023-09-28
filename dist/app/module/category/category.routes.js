"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../../enums/users");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post('/create-category', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.insertToDb);
router.patch('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.updateToDb);
router.get('/:id', category_controller_1.CategoryController.getOneToDb);
router.delete('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.deleteToDb);
router.get('/', category_controller_1.CategoryController.getAllToDb);
exports.CategoryRoutes = router;
