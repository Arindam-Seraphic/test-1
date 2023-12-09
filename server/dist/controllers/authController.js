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
const req_res_handler_1 = require("../utilities/req-res-handler");
const authHandler_1 = __importDefault(require("../utilities/handlers/authHandler"));
const authController = {
    registerController: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        (0, req_res_handler_1.handleRequest)(req, res, next, () => __awaiter(void 0, void 0, void 0, function* () {
            yield authHandler_1.default.registerHandler(req, res);
        }));
    }),
    loginController: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        (0, req_res_handler_1.handleRequest)(req, res, next, () => __awaiter(void 0, void 0, void 0, function* () {
            yield authHandler_1.default.loginHandler(req, res);
        }));
    }),
    authenticityController: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        (0, req_res_handler_1.handleRequest)(req, res, next, () => __awaiter(void 0, void 0, void 0, function* () {
            yield authHandler_1.default.authenticityHandler(req, res);
        }));
    }),
};
exports.default = authController;
