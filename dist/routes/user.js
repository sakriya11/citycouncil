"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../controller/user"));
const tax_1 = __importDefault(require("../controller/tax"));
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.post("/user/registration", user_1.default.userRegistration);
userRouter.post("/user/email/verification", user_1.default.emailVerification);
userRouter.post("/user/login", user_1.default.login);
userRouter.post("/user/create/tax", tax_1.default.createUserTax);
exports.default = userRouter;
//# sourceMappingURL=user.js.map