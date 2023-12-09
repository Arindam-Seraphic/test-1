// request-response-handler.ts
import { NextFunction, Request, Response } from "express";
import { CustomError, handleGlobalError } from "./error-handler"; // Import your custom error class

export const handleRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
  handler: (req: Request, res: Response) => Promise<void>
) => {
  try {
    await handler(req, res);
  } catch (error) {
    if (error instanceof CustomError) {
      // If it's a custom error, you can pass it to the global error handler
      return handleGlobalError(error, req, res, next);
    } else {
      // Alternatively, you can still respond directly to non-custom errors
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const handleResponse = (
  res: Response,
  statusCode: number,
  data?: any
) => {
  res.status(statusCode).json(data);
};
