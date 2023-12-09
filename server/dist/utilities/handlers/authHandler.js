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
const error_handler_1 = require("../error-handler");
const userModel_1 = __importDefault(require("../../models/userModel"));
const req_res_handler_1 = require("../req-res-handler");
const authHandler = {
    // register handler
    registerHandler: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Extract user details from the request body
        const { email, password, confirmPassword, } = req.body;
        // Validate the request body
        if (!email || !password || !confirmPassword) {
            throw new error_handler_1.CustomError("All fields are required", 400);
        }
        // Validate if the passwords match
        if (password !== confirmPassword) {
            throw new error_handler_1.CustomError("Passwords do not match", 400);
        }
        try {
            // Check if the user already exists with the given email
            const existingUser = yield userModel_1.default.findByEmail(email);
            if (existingUser) {
                throw new error_handler_1.CustomError("User with this email already exists", 400);
            }
            // Create a new user
            const newUser = new userModel_1.default({
                email,
                password: password.toString(),
                confirmPassword,
            });
            yield newUser.save();
            (0, req_res_handler_1.handleResponse)(res, 201, {
                message: "User registered successfully",
                newUser,
            });
        }
        catch (error) {
            // Handle registration failure errors
            throw new error_handler_1.CustomError(error.message, error.statusCode);
        }
    }),
    // login handler
    loginHandler: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Extract user details from the request body
        const { email, password } = req.body;
        // Validate the request body
        if (!email || !password) {
            throw new error_handler_1.CustomError("Email and password are required", 400);
        }
        try {
            // Use the isPasswordValid method to check if the password is valid
            const user = yield userModel_1.default.findByEmail(email);
            if (!user) {
                throw new error_handler_1.CustomError("Invalid email or password", 401);
            }
            const isPasswordValid = yield userModel_1.default.isPasswordValid(email, password.toString());
            // At this point, authentication is successful
            // Generate a JWT token using the generateAuthToken method
            const token = user === null || user === void 0 ? void 0 : user.generateAuthToken();
            // Send the token in the response
            isPasswordValid &&
                (0, req_res_handler_1.handleResponse)(res, 200, { message: "Login successful", token });
        }
        catch (error) {
            // Handle authentication failure errors
            throw new error_handler_1.CustomError(error.message, error.statusCode);
        }
    }),
};
exports.default = authHandler;
