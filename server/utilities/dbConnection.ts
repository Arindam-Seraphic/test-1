// db.ts
import mongoose from "mongoose";
import config from "config";

const dbConfig = config.get("database") as {
  url: string;
};

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(dbConfig.url);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectToDatabase;
