// error-handler.ts
import { Request, Response, NextFunction } from "express";

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    // Capture the stack trace (Error.captureStackTrace is not available in browser environments)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const handleGlobalError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error:", err);

  // Check if it's a custom error
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message }); // Custom error response
  }

  // Check if it's a Mongoose validation error
  if (err.name === "ValidationError") {
    const validationErrors: { [key: string]: string } = {};
    for (const field in (err as any).errors) {
      validationErrors[field] = (err as any).errors[field].message;
    }
    return res
      .status(400)
      .json({ error: "Validation Error", details: validationErrors });
  }

  // Generic error response
  res.status(500).json({ error: "Internal Server Error" });
};

export { CustomError, handleGlobalError };
