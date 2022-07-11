"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const mysql = require('mysql2/promise');
const promise_js_1 = __importDefault(require("mysql2/promise.js"));
// import dotenv from 'dotenv';
// dotenv.config();
exports.default = promise_js_1.default.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "lucas",
    database: "books_api"
});
