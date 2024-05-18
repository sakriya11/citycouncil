"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tax_1 = __importDefault(require("../controller/tax"));
const express_1 = require("express");
const userTaxRouter = (0, express_1.Router)();
userTaxRouter.post("/user/create/tax", tax_1.default.createUserTax);
exports.default = userTaxRouter;
//# sourceMappingURL=tax.js.map