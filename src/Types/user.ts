import { Document } from "mongoose";

export interface user {
  user_id: string; // Custom user_id field
  user_name: string;
  email: string;
  password?: string;
  google_id?: string;
  avatar_url?: string;
}

export interface userDoc extends Document {
  created_at: Date;
  updated_at: Date;
}
