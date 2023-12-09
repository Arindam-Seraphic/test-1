import { Router } from "express";
import authController from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", authController.loginController);
authRouter.post("/register", authController.registerController);

export default authRouter;
