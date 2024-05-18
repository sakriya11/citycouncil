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
const users_1 = __importDefault(require("../model/users"));
const emailverifications_1 = require("../service/emailverifications");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = __importDefault(require("../model/token"));
const generator_1 = require("../helper/generator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const userController = {
    userRegistration: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { fullName, email, password, confirmPassword, role } = req.body;
            // console.log("request",req.body);
            const emailExist = yield users_1.default.findOne({
                email: email,
            });
            if (emailExist) {
                return res.status(409).send({
                    message: "Given email id already exist",
                });
            }
            if (password !== confirmPassword) {
                return res.status(409).send({
                    message: "Password and confirm password did not match",
                });
            }
            const registerUser = yield users_1.default.create({
                fullName,
                email,
                password: bcryptjs_1.default.hashSync(password),
                role: role,
            });
            const emailVerificationToken = yield token_1.default.create({
                user: registerUser.id,
                token: (0, generator_1.genRandomNumber)(),
            });
            const option = (0, emailverifications_1.mailOption)(registerUser.email, registerUser.fullName, emailVerificationToken.token);
            yield (0, emailverifications_1.sendEmail)(option, emailverifications_1.transport);
            return res.status(200).send({
                message: "user registered succesfully",
            });
        }
        catch (error) {
            console.log("registration error", error);
            return res.status(500).send({
                message: "Registration error",
            });
        }
    }),
    emailVerification: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { verificationCode } = req.body;
            const verifyCode = Number(verificationCode);
            const tokenExist = yield token_1.default.findOne({
                token: verifyCode,
            });
            if (tokenExist) {
                yield users_1.default.findByIdAndUpdate(tokenExist.user, {
                    emailVerified: true,
                });
                return res.status(200).send({
                    message: "Email verified succesfully",
                });
            }
            else {
                return res.status(409).send({
                    message: "Email verification failed please sign up and resend the verification code ",
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "email not verified",
            });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const userExist = yield users_1.default.findOne({
                email: email,
            });
            if (!userExist) {
                return res.status(404).send({
                    message: "Given user does not exist",
                });
            }
            if (userExist.emailVerified !== true) {
                return res.status(409).send({
                    message: "Please verify email before loggin in",
                });
            }
            const passwordValidation = bcryptjs_1.default.compareSync(password, userExist.password);
            if (!passwordValidation) {
                return res.status(409).send({
                    message: "Incorrect password",
                });
            }
            const accessToken = jsonwebtoken_1.default.sign({ userExist }, config_1.default.jwt.jwt_secrect);
            const loggedInUser = userExist.toObject();
            delete loggedInUser.password;
            return res.status(200).send({
                message: "User logged in succesfully",
                accessToken: accessToken,
                user: loggedInUser,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Error user login",
            });
        }
    }),
};
exports.default = userController;
//# sourceMappingURL=user.js.map