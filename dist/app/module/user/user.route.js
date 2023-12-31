"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../../enums/users");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.patch('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.updateToDb);
router.get('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.getOneToDb);
router.delete('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.deleteToDb);
router.get('/', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.getAllToDb);
exports.UserRoutes = router;
