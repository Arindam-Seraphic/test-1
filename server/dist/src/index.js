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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const dbConnection_1 = __importDefault(require("../utilities/dbConnection"));
const error_handler_1 = require("../utilities/error-handler");
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("../routes/index"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const port = ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.PORT) ? (_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.PORT : 8080;
// Middleware to handle global errors
app.use(error_handler_1.handleGlobalError);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// routes
app.use("/api", index_1.default);
// testing route
app.get("/", (req, res) => {
    res.send("Hello, Express!");
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    // Connect to the database
    yield (0, dbConnection_1.default)();
    console.log(`Server is running on port ${port}`);
}));
