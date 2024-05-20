import  Express  from "express";
import config from "./config";
import { createServer } from "http";
import helmet from 'helmet';
import db from './config/db/db';
import routes from "../src/routes/index"
import cors from 'cors';

const originRegex = new RegExp(config.app.originRegex);
const allowedOrigins = config.app.allowedOrigins.split(",");


// const corsOption = {
//   credentials: true,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   origin: function (origin: string, callback: any) {
//     console.log("originnnnnnnnn",origin)
//     if (!origin) {
//       callback(null, true);
//       return;
//     }
//     if (allowedOrigins.indexOf(origin) !== -1 || originRegex.test(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET","POST"],
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// };

const server = Express();
const httpServer = createServer(server);
server.use(cors({
  origin:["https://citycouncil-frontend.vercel.app/","http://localhost:3000","https://master--kathmanducitycouncil.netlify.app/"],
  methods: ["GET","POST"],
  credentials:true
}));
// console.log(origin);

server.use(helmet()); //for security 
server.use(Express.json());
server.use('/api',routes);


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


