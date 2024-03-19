import mongoose, { ConnectOptions } from "mongoose";
import dbConfig from '../index';

const MONGO_URL = dbConfig.db.mongoUrl;

mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}as ConnectOptions).catch(console.error);

const db = mongoose.connection;

export default db;


