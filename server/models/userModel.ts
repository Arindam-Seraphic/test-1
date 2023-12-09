// user.model.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import {config} from "dotenv";

config();

// Define the user schema
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  generateAuthToken(): string;
}

// Custom query helpers interface
interface IUserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
  isPasswordValid(email: string, password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username:{type:String, required:true, unique:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function (): string {
  // Set the desired expiration time (e.g., 1 hour)
  const expiresIn = "1h";

  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.SECRET || "defaultSecret", // Use your secret key
    { expiresIn }
  );

  return token;
};

// Hash the password before saving
userSchema.pre<IUser>("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

// Create the user model
const User = mongoose.model<IUser>("User", userSchema) as IUserModel;

// Custom query helper method
User.findByEmail = function (email: string): Promise<IUser | null> {
  return this.findOne({ email }).exec();
};

User.isPasswordValid = async function (
  email: string,
  password: string
): Promise<boolean> {
  const user = await this.findByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  return true;
};

export default User;
