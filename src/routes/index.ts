import userRouter from "./user";
import userTaxRouter from "./tax";
import { Router } from "express";
import authorization from '../middleware/tokenVerification';

const routes = Router();

routes.use(userRouter);
routes.use(authorization.tokenVerification,userTaxRouter);

export default routes;
