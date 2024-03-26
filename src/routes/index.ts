import userRouter from "./user";
import { Router } from "express";

const routes = Router();

routes.use(userRouter);

export default routes;
