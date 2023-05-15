import mongoose from "mongoose";
import 'dotenv/config';

const MONGO_DB_URL = 'mongodb://localhost:27017/trix';

const connectToDatabase = ( 
    mongoDatabaseURI = MONGO_DB_URL
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;