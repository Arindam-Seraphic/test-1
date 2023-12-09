import { CustomError } from "../error-handler";
import { Request, Response } from "express";
import User from "../../models/userModel";
import { handleResponse } from "../req-res-handler";
import Session from "../../models/sessionModel";

const authHandler = {
  // register handler
  registerHandler: async (req: Request, res: Response) => {
    // Extract user details from the request body
    const {
      name,
      email,
      password,
      confirmPassword,
    }: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    } = req.body;

    // Validate the request body
    if (!name || !email || !password || !confirmPassword) {
      throw new CustomError("All fields are required", 400);
    }

    // Validate if the passwords match
    if (password !== confirmPassword) {
      throw new CustomError("Passwords do not match", 400);
    }

    try {
      // Check if the user already exists with the given email
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        throw new CustomError("User with this email already exists", 400);
      }

      // Create a new user
      const newUser = new User({
        name,
        email,
        password: password.toString(),
        confirmPassword,
      });

      await newUser.save();

      handleResponse(res, 201, {
        message: "User registered successfully",
        newUser,
      });
    } catch (error: any) {
      // Handle registration failure errors
      throw new CustomError(error.message, error.statusCode);
    }
  },

  // login handler
  loginHandler: async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
      throw new CustomError("Email and password are required", 400);
    }

    try {
      const user = await User.findByEmail(email);
      if (!user) {
        throw new CustomError("Invalid email or password", 401);
      }

      const isPasswordValid = await User.isPasswordValid(
        email,
        password.toString()
      );

      if (!isPasswordValid) {
        throw new CustomError("Invalid email or password", 401);
      }

      // Check if the user has an existing session
      const existingSession = await Session.findOne({ user: user._id });

      // Expire the existing session
      if (existingSession) {
        await Session.deleteOne({ _id: existingSession._id });
      }

      // Generate a new JWT token
      const token = user.generateAuthToken();

      // Store the new token in the session storage (MongoDB)
      const newSession = new Session({
        user: user._id,
        token,
      });
      await newSession.save();

      // Send the token in the response
      handleResponse(res, 200, { message: "Login successful", token });
    } catch (error: any) {
      // Handle authentication failure errors
      throw new CustomError(error.message, error.statusCode);
    }
  },
};

export default authHandler;
