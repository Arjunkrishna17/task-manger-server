// models/Task.ts
import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the Task model
export interface ITask extends Document {
  task_id: string; // Custom task identifier (optional)
  title: string;
  description?: string;
  assigned_to?: {
    id: string;
    name: string; // Name of the assigned user
    avatar_url: string; // Avatar URL of the assigned user
  };
  status: string;
  user_id: string;
  due_date?: Date;
  priority: string;
  created_at: Date;
  updated_at: Date;
}

// Create the Task schema
const TaskSchema: Schema = new Schema(
  {
    task_id: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    assigned_to: {
      type: {
        id: {
          type: Schema.Types.ObjectId,
          ref: "User", // Reference to the User model
          required: true, // This is required, a task must have an assigned user
        },
        name: {
          type: String,
          required: true,
        },
        avatar_url: {
          type: String,
          required: true,
        },
      },
      required: false, // This field is optional initially
    },
    status: {
      type: String,
      required: true,
      enum: ["To Do", "In Progress", "Done"], // Possible task statuses
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Each task must be assigned to a user
    },

    due_date: {
      type: Date,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically handle created_at and updated_at
  }
);

// Create the Task model
const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
