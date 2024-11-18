// models/User.ts
import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the User model
export interface IUser extends Document {
  user_id: string; // Custom user_id field
  user_name: string;
  email: string;
  password: string;
  google_id?: string;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}

// Create the User schema
const UserSchema: Schema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true, // Ensures that the user_id is unique across all users
    },
    user_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    google_id: {
      type: String,
      unique: true,
      sparse: true, // allows either google_id or password
    },
    avatar_url: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically handles `created_at` and `updated_at`
  }
);

// Create the User model
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
