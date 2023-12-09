"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGlobalError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        // Capture the stack trace (Error.captureStackTrace is not available in browser environments)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.CustomError = CustomError;
const handleGlobalError = (err, req, res, next) => {
    // Check if it's a custom error
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ error: err.message }); // Custom error response
    }
    // Check if it's a Mongoose validation error
    if (err.name === "ValidationError") {
        const validationErrors = {};
        for (const field in err.errors) {
            validationErrors[field] = err.errors[field].message;
        }
        return res
            .status(400)
            .json({ error: "Validation Error", details: validationErrors });
    }
    // Generic error response
    res.status(500).json({ error: "Internal Server Error" });
};
exports.handleGlobalError = handleGlobalError;
