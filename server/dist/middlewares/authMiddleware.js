"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handler_1 = require("../utilities/error-handler");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return next(new error_handler_1.CustomError("Access denied. No token provided.", 401));
    }
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET || "defaultSecret");
        // Attach the decoded user information to the request for further use
        req.user = decoded;
        // Continue to the next middleware or route handler
        next();
    }
    catch (error) {
        return next(new error_handler_1.CustomError("Invalid token.", 401));
    }
};
exports.authenticateToken = authenticateToken;
