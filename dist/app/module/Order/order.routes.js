"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../../enums/users");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post('/create-order', (0, auth_1.default)(users_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.insertToDb);
router.get('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.getSpecificData);
router.get('/', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.getAllToDb);
exports.OrderRoutes = router;
