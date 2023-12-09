"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const app = (0, express_1.default)();
const port = config_1.default.get("server.port");
app.get("/", (req, res) => {
    res.send("Hello, Express!");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
