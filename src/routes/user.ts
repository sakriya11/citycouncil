import userController from "../controller/user";
import authorization from '../middleware/tokenVerification';
import {Router} from "express";

const userRouter = Router();

userRouter.post("/user/registration",userController.userRegistration);
userRouter.post("/user/email/verification",userController.emailVerification);
userRouter.post("/user/login",userController.login);

export default userRouter;
