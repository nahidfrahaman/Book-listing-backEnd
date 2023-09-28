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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../Error/ApiError"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertToDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = data;
    if (!password) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'please give password');
    }
    console.log(config_1.default.bycrypt_salt_rounds);
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bycrypt_salt_rounds));
    data.password = hashedPassword;
    const results = yield prisma_1.default.user.create({
        data,
    });
    const newUser = yield prisma_1.default.user.findUnique({
        where: {
            id: results.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
            password: false,
        },
    });
    return newUser;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'user not find');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'password not matched');
    }
    const { role, id } = isUserExist;
    console.log(config_1.default.jwt.secret, config_1.default.jwt.expires_in, config_1.default.jwt.refresh_secret);
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const getProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = user;
    const results = yield prisma_1.default.user.findUnique({
        where: {
            id,
            role,
        },
    });
    return results;
});
exports.AuthService = {
    insertToDb,
    login,
    getProfile,
};
