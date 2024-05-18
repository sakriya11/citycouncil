"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const http_1 = require("http");
const helmet_1 = __importDefault(require("helmet"));
const db_1 = __importDefault(require("./config/db/db"));
const index_1 = __importDefault(require("../src/routes/index"));
const cors_1 = __importDefault(require("cors"));
const originRegex = new RegExp(config_1.default.app.originRegex);
const allowedOrigins = config_1.default.app.allowedOrigins.split(",");
const corsOption = {
    credentials: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    origin: function (origin, callback) {
        if (!origin) {
            callback(null, true);
            return;
        }
        if (allowedOrigins.indexOf(origin) !== -1 || originRegex.test(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
const server = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(server);
server.use((0, cors_1.default)(corsOption));
server.use((0, helmet_1.default)()); //for security 
server.use(express_1.default.json());
server.use('/api', index_1.default);
//db connection
db_1.default.on("error", console.error.bind(console, "MongoDB connection error:"));
db_1.default.on("close", function () {
    console.log("DB connection is close");
});
db_1.default.once("open", function () {
    console.log("Connected to MongoDB database!!");
});
const port = config_1.default.app.port;
const host = config_1.default.app.host;
httpServer.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
});
//# sourceMappingURL=server.js.map