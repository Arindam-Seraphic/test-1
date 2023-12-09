"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", authController_1.default.loginController);
authRouter.post("/register", authController_1.default.registerController);
authRouter.get("/authenticity", authMiddleware_1.authenticateToken, authController_1.default.authenticityController);
exports.default = authRouter;
