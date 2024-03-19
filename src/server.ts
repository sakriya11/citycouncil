import  Express  from "express";
import config from "./config";
import { createServer } from "http";
import helmet from 'helmet';
import db from './config/db/db';

const server = Express();
const httpServer = createServer(server);

server.use(helmet()); //for security 
server.use(Express.json());

//db connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("close", function () {
  console.log("DB connection is close");
});
db.once("open", function () {
  console.log("Connected to MongoDB database!!");
});

const port=config.app.port;
const host=config.app.host;

httpServer.listen(port,()=>{
    console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
})


