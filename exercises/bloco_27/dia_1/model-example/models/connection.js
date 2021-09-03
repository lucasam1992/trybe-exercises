// models/connection.js

 /*
const mysql = require('mysql2/promise');

const connection = mysql.createPool({ //método createPool retorna um objeto Pool representando uma sessão com o banco.
    host: 'localhost',
    user: 'lucas',
    password: 'lucas2112',
    database: 'model_example' 
});
*/



//MONGOBD
// models/connection.js

const { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

let db = null;

const connection = () => {
    return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
    db = conn.db('model_example');
    return db;
    })
};

module.exports = connection;