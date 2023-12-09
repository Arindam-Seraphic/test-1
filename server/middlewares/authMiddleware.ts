import jwt from "jsonwebtoken";
import { CustomError } from "../utilities/error-handler";
import { Request, Response, NextFunction } from "express";

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust the type based on your user structure
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(new CustomError("Access denied. No token provided.", 401));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET || "defaultSecret");

    // Attach the decoded user information to the request for further use
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return next(new CustomError("Invalid token.", 401));
  }
};
