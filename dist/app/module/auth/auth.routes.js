"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../../enums/users");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/signup', auth_controller_1.AuthController.insertToDb);
router.post('/signin', auth_controller_1.AuthController.login);
router.get('/', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.CUSTOMER), auth_controller_1.AuthController.getProfile);
exports.AuthRoutes = router;
