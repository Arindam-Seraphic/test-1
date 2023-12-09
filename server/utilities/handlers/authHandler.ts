import { CustomError } from "../error-handler";
import { Request, Response } from "express";
import User from "../../models/userModel";
import { handleResponse } from "../req-res-handler";

const authHandler = {
  // register handler
  registerHandler: async (req: Request, res: Response) => {
    // Extract user details from the request body
    const {
      email,
      password,
      confirmPassword,
    }: { email: string; password: string; confirmPassword: string } = req.body;

    // Validate the request body
    if (!email || !password || !confirmPassword) {
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
        email,
        password: password.toString(),
        confirmPassword,
      });
      console.log(newUser);
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
    // Extract user details from the request body
    const { email, password }: { email: string; password: string } = req.body;

    // Validate the request body
    if (!email || !password) {
      throw new CustomError("Email and password are required", 400);
    }

    try {
      // Use the isPasswordValid method to check if the password is valid
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

      // At this point, authentication is successful
      // Generate a JWT token using the generateAuthToken method
      const token = user.generateAuthToken();

      // Send the token in the response
      handleResponse(res, 200, { message: "Login successful", token });
    } catch (error: any) {
      // Handle authentication failure errors
      throw new CustomError(error.message, error.statusCode);
    }
  },
};

export default authHandler;
