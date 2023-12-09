// db.ts
import { config } from "dotenv";
import mongoose from "mongoose";

config();

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process?.env?.URL?process.env.URL:"");

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectToDatabase;
