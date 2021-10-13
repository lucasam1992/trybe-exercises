require('dotenv').config();

module.exports = {
  "development": {
    "username": "lucas",
    "password": "lucas2112",
    "database": "associations",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "lucas",
    "password": "lucas2112",
    "database": "orm_assoc_test_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging":false,
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
