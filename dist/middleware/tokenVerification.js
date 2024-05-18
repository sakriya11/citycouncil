"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const users_1 = __importDefault(require("../model/users"));
const authorization = {
    tokenVerification: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers["authorization"];
            const tokenExist = token && token.split(" ")[1];
            if (!tokenExist) {
                return res.status(401).send({
                    message: "Given token user does not exist ",
                });
            }
            const decodeToken = jsonwebtoken_1.default.verify(tokenExist, config_1.default.jwt.jwt_secrect);
            const userExists = yield users_1.default.findById(decodeToken.userExist._id);
            if (userExists.emailVerified !== true) {
                return res.status(403).send({
                    message: "Email not verified register again and verifiy email before accessing the site",
                });
            }
            if (userExists)
                req.user = userExists;
            else {
                res.status(401).send({
                    ok: false,
                    message: "Signed user not found. Please login again",
                });
                return;
            }
            next();
        }
        catch (error) {
            console.log(error);
            return res.status(422).send({
                ok: false,
                error: true,
                message: "Please login and try again.",
            });
        }
    }),
    hasRole: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.user;
            if (user.role) {
                next();
            }
            else {
                res.status(403).send({
                    message: "User does not have permission",
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
};
exports.default = authorization;
//# sourceMappingURL=tokenVerification.js.map