import taxController from "../controller/tax";
import {Router} from "express";

const userTaxRouter = Router();


userTaxRouter.post("/user/create/tax",taxController.createUserTax);

export default userTaxRouter;
