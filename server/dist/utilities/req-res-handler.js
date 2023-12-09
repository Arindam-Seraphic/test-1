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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = exports.handleRequest = void 0;
const error_handler_1 = require("./error-handler"); // Import your custom error class
const handleRequest = (req, res, next, handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield handler(req, res);
    }
    catch (error) {
        if (error instanceof error_handler_1.CustomError) {
            // If it's a custom error, you can pass it to the global error handler
            return (0, error_handler_1.handleGlobalError)(error, req, res, next);
        }
        else {
            // Alternatively, you can still respond directly to non-custom errors
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});
exports.handleRequest = handleRequest;
const handleResponse = (res, statusCode, data) => {
    res.status(statusCode).json(data);
};
exports.handleResponse = handleResponse;
