const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'lucas',
  password: 'lucas2112',
  database: 'mvc_example'});

module.exports = connection;