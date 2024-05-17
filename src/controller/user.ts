import { Request, Response } from "express";
import User from "../model/users";
import {
  sendEmail,
  transport,
  mailOption,
} from "../service/emailverifications";
import bcryptjs from "bcryptjs";
import Token from "../model/token";
import { genRandomNumber } from "../helper/generator";
import jwt from "jsonwebtoken";
import config from "../config";

const userController = {
  userRegistration: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { fullName, email, password, confirmPassword, role } = req.body;
      // console.log("request",req.body);
      const emailExist = await User.findOne({
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

      const registerUser = await User.create({
        fullName,
        email,
        password: bcryptjs.hashSync(password),
        role: role,
      });

      const emailVerificationToken = await Token.create({
        user: registerUser.id,
        token: genRandomNumber(),
      });
      const option = mailOption(
        registerUser.email,
        registerUser.fullName,
        emailVerificationToken.token
      );
      await sendEmail(option, transport);

      return res.status(200).send({
        message: "user registered succesfully",
      });
    } catch (error) {
      console.log("registration error", error);
      return res.status(500).send({
        message: "Registration error",
      });
    }
  },

  emailVerification: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { verificationCode } = req.body;
      const verifyCode = Number(verificationCode);

      const tokenExist = await Token.findOne({
        token: verifyCode,
      });

      if (tokenExist) {
        await User.findByIdAndUpdate(tokenExist.user, {
          emailVerified: true,
        });
        return res.status(200).send({
          message: "Email verified succesfully",
        });
      } else {
        return res.status(409).send({
          message:
            "Email verification failed please sign up and resend the verification code ",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "email not verified",
      });
    }
  },

  login: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const userExist = await User.findOne({
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
      const passwordValidation = bcryptjs.compareSync(
        password,
        userExist.password
      );
      if (!passwordValidation) {
        return res.status(409).send({
          message: "Incorrect password",
        });
      }

      const accessToken = jwt.sign({ userExist }, config.jwt.jwt_secrect);
      const loggedInUser = userExist.toObject();
      delete loggedInUser.password;

      return res.status(200).send({
        message: "User logged in succesfully",
        accessToken: accessToken,
        user: loggedInUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Error user login",
      });
    }
  },
};

export default userController;
