"use strict";
exports.__esModule = true;
var mysql = require('mysql2/promise');
// import dotenv from 'dotenv';
// dotenv.config();
exports["default"] = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "lucas",
    database: "books_api"
});
