"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const tax_1 = __importDefault(require("./tax"));
const express_1 = require("express");
const tokenVerification_1 = __importDefault(require("../middleware/tokenVerification"));
const routes = (0, express_1.Router)();
routes.use(user_1.default);
routes.use(tokenVerification_1.default.tokenVerification, tax_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map