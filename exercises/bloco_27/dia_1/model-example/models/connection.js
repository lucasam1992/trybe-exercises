// models/connection.js

const mysql = require('mysql2/promise');

const connection = mysql.createPool({ //método createPool retorna um objeto Pool representando uma sessão com o banco.
    host: 'localhost',
    user: 'lucas',
    password: 'lucas2112',
    database: 'model_example' });

module.exports = connection;