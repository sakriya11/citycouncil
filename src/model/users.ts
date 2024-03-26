import { Schema, Document, model } from "mongoose";

const userSchema = new Schema(
  {
    fullName: String,
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
    },
    password: String,
    confirmPassword: String,
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  emailVerified:boolean;
}

const user = model<IUser>("User", userSchema);

export default user;
