// import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: 'root',
  password: 'lucas',
  database: 'books_api',
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
}

export = config;