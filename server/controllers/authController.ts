import { NextFunction, Request, Response } from "express";
import { handleRequest } from "../utilities/req-res-handler";
import authHandler from "../utilities/handlers/authHandler";

const authController = {
  registerController: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    handleRequest(req, res, next, async () => {
      await authHandler.registerHandler(req, res);
    });
  },
  loginController: async (req: Request, res: Response, next: NextFunction) => {
    handleRequest(req, res, next, async () => {
      await authHandler.loginHandler(req, res);
    });
  },
};

export default authController;
