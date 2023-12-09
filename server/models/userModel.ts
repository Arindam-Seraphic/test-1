// user.model.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import config from "config";

// const secret = config.get("jwt") as {
//   secret: string
// };
const secretConfig = config.get("jwt") as { secret: string };
const secret: Secret = secretConfig.secret;

// Define the user schema
interface IUser extends Document {
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
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// JWT token generation method
userSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign({ _id: this._id, email: this.email }, secret);
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
    throw new Error("Invalid email or password1");
  }

  return true;
};

export default User;
