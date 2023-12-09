import { Router } from "express";
import authController from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post("/login", authController.loginController);
authRouter.post("/register", authController.registerController);
authRouter.get(
  "/authenticity",
  authenticateToken,
  authController.authenticityController
);

export default authRouter;
