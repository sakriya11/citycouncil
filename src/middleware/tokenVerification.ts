import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

import config from "../config";
import User, { IUser } from "../model/users";

interface IReqUser extends Request {
  user: IUser;
}

const authorization = {
  tokenVerification: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers["authorization"];
      const tokenExist = token && token.split(" ")[1];

      if (!tokenExist) {
        return res.status(401).send({
          message: "Given token user does not exist ",
        });
      }

      const decodeToken = jwt.verify(tokenExist, config.jwt.jwt_secrect) as {
        userExist: any;
      };

      const userExists = await User.findById(decodeToken.userExist._id);
      if (userExists.emailVerified !== true) {
        return res.status(403).send({
          message:
            "Email not verified register again and verifiy email before accessing the site",
        });
      }

      if (userExists) (req as IReqUser).user = userExists;
      else {
        res.status(401).send({
          ok: false,
          message: "Signed user not found. Please login again",
        });
        return;
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(422).send({
        ok: false,
        error: true,
        message: "Please login and try again.",
      });
    }
  },

  hasRole: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = (req as IReqUser).user;
      if (user.role) {
        next();
      } else {
        res.status(403).send({
          message: "User does not have permission",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default authorization;
