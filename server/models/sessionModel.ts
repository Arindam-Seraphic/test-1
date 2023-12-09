// sessionModel.ts
import mongoose, { Document, Schema } from "mongoose";

interface ISession extends Document {
  user: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: "1h" }, // Set your desired expiration time
  },
  { timestamps: true }
);

const Session = mongoose.model<ISession>("Session", sessionSchema);

export default Session;
