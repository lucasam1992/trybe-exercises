const mysql = require('mysql2/promise');

// import dotenv from 'dotenv';

// dotenv.config();

export default mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "lucas",
  database: "books_api"
});